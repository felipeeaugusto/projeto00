$dir = $PSScriptRoot
function Read-JsonUtf8($caminho) {
    $texto = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    return $texto | ConvertFrom-Json
}
$novos = Read-JsonUtf8 (Join-Path $dir 'novos-sku-25-91.json')

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
function Normalizar-SemEstoque([string]$valor, [string]$campo) {
    if ($campo -ne 'deposito' -and $campo -ne 'full') { return $valor }
    if ($valor -match '(?i)^sem estoque$') { return '-' }
    if ($valor -match '^([\d\.]+)\s*un\.?$') { return $Matches[1] }
    return $valor
}
function Get-OrdemItem($item) {
    $mlbClassico = Get-PropClassico $item.catalogoConfirmado
    $mlbPremium = Get-PropPremium $item.catalogoConfirmado
    $a2Classico = Get-PropClassico $item.a2
    $a2Premium = Get-PropPremium $item.a2
    $inverter = $false
    if ($a2Classico -and $a2Premium -and $a2Classico.statusProduto -and $a2Premium.statusProduto -and $a2Classico.statusProduto -ne $a2Premium.statusProduto) {
        if ($a2Premium.statusProduto -eq 'Ativo') { $inverter = $true }
    }
    if ($inverter) { return [PSCustomObject]@{ MlbPrimeiro=$mlbPremium; MlbSegundo=$mlbClassico; A2Primeiro=$a2Premium; A2Segundo=$a2Classico } }
    return [PSCustomObject]@{ MlbPrimeiro=$mlbClassico; MlbSegundo=$mlbPremium; A2Primeiro=$a2Classico; A2Segundo=$a2Premium }
}
function Get-ValorUnico($primeiro, $segundo, [string]$campo) {
    $v1 = if ($primeiro) { $primeiro.$campo } else { $null }
    $v2 = if ($segundo) { $segundo.$campo } else { $null }
    if ($v1 -and $v2) { if ($v1 -eq $v2) { return (Normalizar-SemEstoque $v1 $campo) } else { return "$(Normalizar-SemEstoque $v1 $campo)`n$(Normalizar-SemEstoque $v2 $campo)" } }
    if ($v1) { return (Normalizar-SemEstoque $v1 $campo) }
    if ($v2) { return (Normalizar-SemEstoque $v2 $campo) }
    return '-'
}
function Get-CelulaMlbs($ordem) {
    $linhas = @()
    if ($ordem.MlbPrimeiro) { $linhas += "#$($ordem.MlbPrimeiro)" }
    if ($ordem.MlbSegundo) { $linhas += "#$($ordem.MlbSegundo)" }
    return ($linhas -join "`n")
}

function Escrever-Celulas($ws, $linhaExcel, $item, [bool]$temStatusProduto) {
    $ordem = Get-OrdemItem $item
    $ws.Cells.Item($linhaExcel, 3).Value2 = Get-CelulaMlbs $ordem
    $ws.Cells.Item($linhaExcel, 7).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'deposito'
    $ws.Cells.Item($linhaExcel, 9).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'full'
    if ($temStatusProduto) {
        $ws.Cells.Item($linhaExcel, 11).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'statusProduto'
    }
}

$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

$wsMapa = $wb.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }
Escrever-Celulas $wsMapa 109 $novos.'BB-PLUS' $true
Write-Output "Mapeamento L109 (BB-PLUS): corrigido"
Escrever-Celulas $wsMapa 83 $novos.'SGK-127V' $true
Write-Output "Mapeamento L83 (SGK-127V): corrigido"

$wsPrio = $wb.Worksheets | Where-Object { $_.Name -eq 'Prioridade - Fora de Ads' }
Escrever-Celulas $wsPrio 35 $novos.'BB-PLUS' $false
Write-Output "Prioridade L35 (BB-PLUS): corrigido"

Write-Output "CONCLUIDO."
