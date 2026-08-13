$dir = $PSScriptRoot
function Read-JsonUtf8($caminho) {
    $texto = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    return $texto | ConvertFrom-Json
}
$dados = Read-JsonUtf8 (Join-Path $dir 'linhas-2-4-resultado.json')

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
    if ($valor -match '^([\d\.]+)\s*un\.?$') { return ($Matches[1] -replace '\.', '') }
    return $valor
}

function Get-ValorUnico($classico, $premium, [string]$campo) {
    $v1 = if ($classico) { $classico.$campo } else { $null }
    $v2 = if ($premium) { $premium.$campo } else { $null }
    if ($v1 -and $v2) { if ($v1 -eq $v2) { return (Normalizar-SemEstoque $v1 $campo) } else { return "$(Normalizar-SemEstoque $v1 $campo)`n$(Normalizar-SemEstoque $v2 $campo)" } }
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

$linha2 = $dados.'linha-2'
$linha4 = $dados.'linha-4'

$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

# ===== Mapeamento Completo da Planilha =====
$wsMapa = $wb.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }
$ultimaLinhaMapa = $wsMapa.UsedRange.Row + $wsMapa.UsedRange.Rows.Count - 1
Write-Output "Mapeamento -- ultima linha usada: $ultimaLinhaMapa"

# Copia o par (linha vazia + linha de dados) do final pra criar 2 pares novos
$origemMapa = $wsMapa.Range("A$($ultimaLinhaMapa - 1):M$ultimaLinhaMapa")
$destino1 = $wsMapa.Range("A$($ultimaLinhaMapa + 1):M$($ultimaLinhaMapa + 2)")
$origemMapa.Copy($destino1)
$destino2 = $wsMapa.Range("A$($ultimaLinhaMapa + 3):M$($ultimaLinhaMapa + 4)")
$origemMapa.Copy($destino2)

$linhaDado1 = $ultimaLinhaMapa + 2   # linha 2 (HQ-HQMGI45-220V)
$linhaDado2 = $ultimaLinhaMapa + 4   # linha 4 (HQ-100CFX-127V)

function Escrever-LinhaMapa($ws, $linhaExcel, $item, [bool]$temStatusProduto) {
    $classico = Get-PropClassico $item.a2
    $premium = Get-PropPremium $item.a2

    $ws.Cells.Item($linhaExcel, 1).Value2 = $item.sku
    $ws.Cells.Item($linhaExcel, 3).Value2 = Get-CelulaMlbs $item
    $ws.Cells.Item($linhaExcel, 3).WrapText = $true
    $ws.Cells.Item($linhaExcel, 5).Value2 = if ($item.tituloCatalogo) { $item.tituloCatalogo } else { '-' }
    $ws.Cells.Item($linhaExcel, 5).WrapText = $true
    $ws.Cells.Item($linhaExcel, 7).Value2 = Get-ValorUnico $classico $premium 'deposito'
    $ws.Cells.Item($linhaExcel, 7).WrapText = $true
    $ws.Cells.Item($linhaExcel, 9).Value2 = Get-ValorUnico $classico $premium 'full'
    $ws.Cells.Item($linhaExcel, 9).WrapText = $true
    if ($temStatusProduto) {
        $ws.Cells.Item($linhaExcel, 11).Value2 = Get-ValorUnico $classico $premium 'statusProduto'
        $ws.Cells.Item($linhaExcel, 11).WrapText = $true
        $ws.Cells.Item($linhaExcel, 13).Value2 = $item.statusAds
        $ws.Cells.Item($linhaExcel, 13).WrapText = $true
    }
}

Escrever-LinhaMapa $wsMapa $linhaDado1 $linha2 $true
Write-Output "Mapeamento L$linhaDado1 : $($linha2.sku) escrito"
Escrever-LinhaMapa $wsMapa $linhaDado2 $linha4 $true
Write-Output "Mapeamento L$linhaDado2 : $($linha4.sku) escrito"

# ===== Prioridade - Fora de Ads (so linha 4 / HQ-100CFX-127V, status Sem Campanha) =====
$wsPrio = $wb.Worksheets | Where-Object { $_.Name -eq 'Prioridade - Fora de Ads' }
$ultimaLinhaPrio = $wsPrio.UsedRange.Row + $wsPrio.UsedRange.Rows.Count - 1
Write-Output "Prioridade -- ultima linha usada: $ultimaLinhaPrio"

$origemPrio = $wsPrio.Range("A$($ultimaLinhaPrio - 1):I$ultimaLinhaPrio")
$destinoPrio = $wsPrio.Range("A$($ultimaLinhaPrio + 1):I$($ultimaLinhaPrio + 2)")
$origemPrio.Copy($destinoPrio)
$linhaDadoPrio = $ultimaLinhaPrio + 2

Escrever-LinhaMapa $wsPrio $linhaDadoPrio $linha4 $false
Write-Output "Prioridade L$linhaDadoPrio : $($linha4.sku) escrito"

Write-Output ""
Write-Output "CONCLUIDO."
