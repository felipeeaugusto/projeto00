$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

# Copiar SOMENTE o formato (nao o conteudo) de um bloco ja correto (91:92) pras linhas 94:103,
# que ficaram sem formatacao porque o range replicado original so ia ate a linha 93.
$xlPasteFormats = -4122

$origem = $wsNovo.Range("A91:Y92")
$origem.Copy() | Out-Null
$destino = $wsNovo.Range("A94:Y103")
$destino.PasteSpecial($xlPasteFormats) | Out-Null
$excel.CutCopyMode = $false

$wbNovo.Save()
$excel.DisplayAlerts = $true

# Verificacao
$linhas = @()
foreach ($r in @(94, 95, 100, 103)) {
    $cel = $wsNovo.Cells.Item($r, 3)
    $linhas += ("Linha $r -- texto: [" + $cel.Text + "] HAlign: " + $cel.HorizontalAlignment + " WrapText: " + $cel.WrapText + " RowHeight: " + $wsNovo.Rows.Item($r).RowHeight)
}
[System.IO.File]::WriteAllText('C:\Users\Felipe Augusto\AppData\Local\Temp\claude\C--Users-Felipe-Augusto-projeto00-packages-karzen\89427cf3-3008-4569-921c-46fa10410132\scratchpad\verificacao-pos-correcao.txt', ($linhas -join [Environment]::NewLine), [System.Text.Encoding]::UTF8)
