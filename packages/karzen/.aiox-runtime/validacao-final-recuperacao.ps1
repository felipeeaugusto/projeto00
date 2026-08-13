$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$arquivos = @(
    'C:\Downloads\Pausados em Campanha - Karzen.xlsx',
    'C:\Downloads\Analise Oficial.xlsx',
    'C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx'
)

# Fechar (sem salvar, ja esta tudo salvo) e reabrir cada um do zero, direto do disco
foreach ($caminho in $arquivos) {
    $nome = Split-Path $caminho -Leaf
    $wbAberto = $excel.Workbooks | Where-Object { $_.Name -eq $nome }
    if ($wbAberto) { $wbAberto.Close($false) }
}

Write-Output "=== Reabrindo do disco e validando ==="
foreach ($caminho in $arquivos) {
    $wb = $excel.Workbooks.Open($caminho)
    Write-Output "`n--- $($wb.Name) ---"
    foreach ($ws in $wb.Worksheets) {
        $ur = $ws.UsedRange
        Write-Output "  Aba '$($ws.Name)': $($ur.Address()) ($($ur.Rows.Count) linhas x $($ur.Columns.Count) colunas)"
    }
}

Write-Output "`n=== Checagens especificas ==="

$wbPausados = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsPausados = $wbPausados.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }
Write-Output "Pausados -- Banner: [$($wsPausados.Cells.Item(1,1).Text)]"
Write-Output "Pausados -- Pattern banner (deve ser -4142, sem buraco branco): $($wsPausados.Cells.Item(1,1).Interior.Pattern)"
Write-Output "Pausados -- Cabecalho col1: [$($wsPausados.Cells.Item(3,1).Text)]  col21: [$($wsPausados.Cells.Item(3,21).Text)]"

$wbOficial = $excel.Workbooks | Where-Object { $_.Name -eq 'Analise Oficial.xlsx' }
$wsMapeamento = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }
Write-Output "`nAnalise Oficial -- Mapeamento Completo: $($wsMapeamento.UsedRange.Rows.Count) linhas"
Write-Output "Analise Oficial -- ultima linha, col1 (SKU): [$($wsMapeamento.Cells.Item($wsMapeamento.UsedRange.Rows.Count,1).Text)]"

$wbEletro = $excel.Workbooks | Where-Object { $_.Name -like '*KARZEN ELETRO*' }
$wsSemCampanha = $wbEletro.Worksheets | Where-Object { $_.Name -eq 'SEM CAMPANHA' }
Write-Output "`nKARZEN ELETRO -- SEM CAMPANHA: $($wsSemCampanha.UsedRange.Rows.Count) linhas"
$corLinha2 = $wsSemCampanha.Cells.Item(2,1).Interior.Color
Write-Output "KARZEN ELETRO -- cor de fundo linha 2 col A (deve ter cor de processado, nao branco/sem cor -1): $corLinha2"

$excel.DisplayAlerts = $true
Write-Output "`n=== Validacao concluida ==="
