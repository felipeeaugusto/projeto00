$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wbOficial = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }
$wsOficial = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -like '*Pausados em Campanha*' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

function Descrever-Celula($ws, [int]$l, [int]$c) {
    $cel = $ws.Cells.Item($l, $c)
    [PSCustomObject]@{
        Texto = $cel.Text
        InteriorColor = $cel.Interior.Color
        InteriorPattern = $cel.Interior.Pattern
        FontBold = $cel.Font.Bold
        FontSize = $cel.Font.Size
        FontColor = $cel.Font.Color
        HAlign = $cel.HorizontalAlignment
        VAlign = $cel.VerticalAlignment
        WrapText = $cel.WrapText
        BorderTop = $cel.Borders.Item(8).LineStyle
        BorderBottom = $cel.Borders.Item(9).LineStyle
        BorderLeft = $cel.Borders.Item(7).LineStyle
        BorderRight = $cel.Borders.Item(10).LineStyle
        MergeArea = $cel.MergeArea.Address()
        NumberFormat = $cel.NumberFormat
    }
}

Write-Output "=== LINHA 1 (banner), coluna 1 ==="
Write-Output "OFICIAL:"; Descrever-Celula $wsOficial 1 1 | Format-List
Write-Output "NOVO:"; Descrever-Celula $wsNovo 1 1 | Format-List

Write-Output "`n=== LINHA 2 (spacer), coluna 1 ==="
Write-Output "OFICIAL RowHeight: $($wsOficial.Rows.Item(2).RowHeight)"
Write-Output "NOVO RowHeight: $($wsNovo.Rows.Item(2).RowHeight)"
Write-Output "OFICIAL:"; Descrever-Celula $wsOficial 2 1 | Format-List
Write-Output "NOVO:"; Descrever-Celula $wsNovo 2 1 | Format-List

Write-Output "`n=== LINHA 3 (header), coluna 1 ==="
Write-Output "OFICIAL:"; Descrever-Celula $wsOficial 3 1 | Format-List
Write-Output "NOVO:"; Descrever-Celula $wsNovo 3 1 | Format-List

Write-Output "`n=== Colunas: OFICIAL vs NOVO (largura) ==="
for ($c = 1; $c -le 13; $c++) {
    Write-Output "Col $c -- Oficial: $($wsOficial.Columns.Item($c).ColumnWidth) | Novo: $($wsNovo.Columns.Item($c).ColumnWidth)"
}

Write-Output "`n=== Painel de configuracao geral ==="
Write-Output "Oficial - StandardHeight: $($wsOficial.StandardHeight) | StandardWidth: $($wsOficial.StandardWidth)"
Write-Output "Novo - StandardHeight: $($wsNovo.StandardHeight) | StandardWidth: $($wsNovo.StandardWidth)"
Write-Output "Oficial DisplayGridlines: $($excel.Windows.Item($wbOficial.Name).DisplayGridlines)"
