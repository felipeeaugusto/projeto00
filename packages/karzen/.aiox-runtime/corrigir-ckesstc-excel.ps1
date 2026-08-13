$dir = $PSScriptRoot
function Read-JsonUtf8($caminho) {
    $texto = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    return $texto | ConvertFrom-Json
}
$novos = Read-JsonUtf8 (Join-Path $dir 'novos-sku-25-91.json')
$item = $novos.'CKESSTC-ITA5Q'

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
    if ($valor -match '^([\d\.]+)\s*un\.?$') { return ($Matches[1] -replace '\.', '') }
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
    $ws.Cells.Item($linhaExcel, 3).WrapText = $true
    $ws.Cells.Item($linhaExcel, 5).Value2 = if ($item.tituloCatalogo) { $item.tituloCatalogo } else { '-' }
    $ws.Cells.Item($linhaExcel, 5).WrapText = $true
    $ws.Cells.Item($linhaExcel, 7).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'deposito'
    $ws.Cells.Item($linhaExcel, 7).WrapText = $true
    $ws.Cells.Item($linhaExcel, 9).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'full'
    $ws.Cells.Item($linhaExcel, 9).WrapText = $true
    if ($temStatusProduto) {
        $ws.Cells.Item($linhaExcel, 11).Value2 = Get-ValorUnico $ordem.A2Primeiro $ordem.A2Segundo 'statusProduto'
        $ws.Cells.Item($linhaExcel, 11).WrapText = $true
        $ws.Cells.Item($linhaExcel, 13).Value2 = $item.statusAds
        $ws.Cells.Item($linhaExcel, 13).WrapText = $true
    }
}

$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

$wsMapa = $wb.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }
Escrever-Celulas $wsMapa 107 $item $true
Write-Output "Mapeamento L107 (CKESSTC-ITA5Q): corrigido"

$wsPrio = $wb.Worksheets | Where-Object { $_.Name -eq 'Prioridade - Fora de Ads' }
$ultimaLinhaPrio = $wsPrio.UsedRange.Row + $wsPrio.UsedRange.Rows.Count - 1
$origemPrio = $wsPrio.Range("A$($ultimaLinhaPrio - 1):I$ultimaLinhaPrio")
$destinoPrio = $wsPrio.Range("A$($ultimaLinhaPrio + 1):I$($ultimaLinhaPrio + 2)")
$origemPrio.Copy($destinoPrio) | Out-Null
$linhaDadoPrio = $ultimaLinhaPrio + 2
$wsPrio.Cells.Item($linhaDadoPrio, 1).Value2 = 'CKESSTC-ITA5Q'
Escrever-Celulas $wsPrio $linhaDadoPrio $item $false
Write-Output "Prioridade L$linhaDadoPrio (CKESSTC-ITA5Q): adicionado"

Write-Output "CONCLUIDO."
