$dir = $PSScriptRoot

function Read-JsonUtf8($caminho) {
    $texto = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    return $texto | ConvertFrom-Json
}

$lote = Read-JsonUtf8 (Join-Path $dir 'lote-completo-final.json')
$tvsam43 = Read-JsonUtf8 (Join-Path $dir 'pipeline-teste-resultado.json')

# Junta tudo num só hashtable indexado por SKU
$todos = @{}
foreach ($prop in $lote.PSObject.Properties) { $todos[$prop.Name] = $prop.Value }
$todos[$tvsam43.sku] = $tvsam43

# Evitar literal acentuado 'Clássico' no proprio arquivo .ps1 -- powershell.exe -File
# le esse arquivo com o codepage errado e corrompe a comparacao silenciosamente
# (mesmo bug ja visto com 'ANÚNCIOS' no nome do workbook). Em vez disso, acha a
# propriedade "classico" dinamicamente como "a que nao se chama Premium".
function Get-PropClassico($objetoPai) {
    if (-not $objetoPai) { return $null }
    $prop = $objetoPai.PSObject.Properties | Where-Object { $_.Name -ne 'Premium' } | Select-Object -First 1
    if ($prop) { return $prop.Value }
    return $null
}
function Get-PropPremium($objetoPai) {
    if (-not $objetoPai) { return $null }
    $prop = $objetoPai.PSObject.Properties | Where-Object { $_.Name -eq 'Premium' } | Select-Object -First 1
    if ($prop) { return $prop.Value }
    return $null
}

# Normalizacoes do Depósito/FULL na planilha final (decidido com o Felipe, 12/08/2026):
# 1. "sem estoque" vira "-"
# 2. "N un." vira so "N" (sem a palavra "un.")
# So se aplica a esses 2 campos, nao ao Status do Produto.
function Normalizar-SemEstoque([string]$valor, [string]$campo) {
    if ($campo -ne 'deposito' -and $campo -ne 'full') { return $valor }
    if ($valor -match '(?i)^sem estoque$') { return '-' }
    if ($valor -match '^(\d+)\s*un\.?$') { return $Matches[1] }
    return $valor
}

function Get-ValorUnico($classico, $premium, [string]$campo) {
    $v1 = if ($classico) { $classico.$campo } else { $null }
    $v2 = if ($premium) { $premium.$campo } else { $null }
    if ($v1 -and $v2) {
        if ($v1 -eq $v2) { return (Normalizar-SemEstoque $v1 $campo) } else { return "$(Normalizar-SemEstoque $v1 $campo)`n$(Normalizar-SemEstoque $v2 $campo)" }
    }
    if ($v1) { return (Normalizar-SemEstoque $v1 $campo) }
    if ($v2) { return (Normalizar-SemEstoque $v2 $campo) }
    return '-'
}

function Get-CelulaMlbs($item) {
    $linhas = @()
    $mlbClassico = Get-PropClassico $item.catalogoConfirmado
    $mlbPremium = Get-PropPremium $item.catalogoConfirmado
    if ($mlbClassico) { $linhas += "#$mlbClassico" }
    if ($mlbPremium) { $linhas += "#$mlbPremium" }
    return ($linhas -join "`n")
}

$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

# Mapeamento linha -> SKU (levantado manualmente antes de rodar)
$mapaMapeamento = @{
    5='HQ-426MDFF-127V'; 7='EMG70-220V'; 9='TVTCL-QLED55'; 11='LCS15';
    13='HQ-140RDF-CZ-127V'; 15='HQ-264CVEFFX-127V'; 17='MPN-01-BF-127V'; 19='TVSAM-43';
    21='PRODT-1270'; 23='IMPC-G3110'; 25='BBX4-JBL'; 27='SLKM-BIV';
    29='MSAMOLED-49'; 31='TVSAM-32'; 33='PCX26000'; 35='BAF45A-220V'; 37='PGR21PI-127V'
}
$mapaPrioridade = @{ 5='LCS15'; 7='HQ-140RDF-CZ-127V'; 9='HQ-264CVEFFX-127V'; 11='PCX26000'; 13='BAF45A-220V' }

function Escrever-Aba($ws, $mapa, [bool]$temStatusProduto) {
    foreach ($linha in $mapa.Keys) {
        $sku = $mapa[$linha]
        $item = $todos[$sku]
        if (-not $item) { Write-Output "AVISO: sem dados pro SKU $sku (linha $linha)"; continue }

        $classico = Get-PropClassico $item.a2
        $premium = Get-PropPremium $item.a2

        $ws.Cells.Item($linha, 3).Value2 = Get-CelulaMlbs $item
        $ws.Cells.Item($linha, 3).WrapText = $true

        $ws.Cells.Item($linha, 5).Value2 = if ($item.tituloCatalogo) { $item.tituloCatalogo } else { '-' }
        $ws.Cells.Item($linha, 5).WrapText = $true

        $ws.Cells.Item($linha, 7).Value2 = Get-ValorUnico $classico $premium 'deposito'
        $ws.Cells.Item($linha, 7).WrapText = $true

        $ws.Cells.Item($linha, 9).Value2 = Get-ValorUnico $classico $premium 'full'
        $ws.Cells.Item($linha, 9).WrapText = $true

        if ($temStatusProduto) {
            $ws.Cells.Item($linha, 11).Value2 = Get-ValorUnico $classico $premium 'statusProduto'
            $ws.Cells.Item($linha, 11).WrapText = $true
        }

        Write-Output "Linha $linha ($sku): escrito"
    }
}

$wsMapeamento = $wb.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }
Write-Output "=== Mapeamento Completo da Planilha ==="
Escrever-Aba $wsMapeamento $mapaMapeamento $true

$wsPrioridade = $wb.Worksheets | Where-Object { $_.Name -eq 'Prioridade - Fora de Ads' }
Write-Output ""
Write-Output "=== Prioridade - Fora de Ads ==="
Escrever-Aba $wsPrioridade $mapaPrioridade $false

Write-Output ""
Write-Output "CONCLUIDO."
