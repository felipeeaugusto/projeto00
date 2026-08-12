$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

foreach ($nomeAba in @('Mapeamento Completo da Planilha', 'Prioridade - Fora de Ads')) {
    $ws = $wb.Worksheets | Where-Object { $_.Name -eq $nomeAba }
    $ultimaLinha = $ws.UsedRange.Row + $ws.UsedRange.Rows.Count - 1
    Write-Output "=== $nomeAba ==="
    for ($l = 5; $l -le $ultimaLinha; $l += 2) {
        $sku = $ws.Cells.Item($l, 1).Text
        if ($sku -eq '') { continue }
        $mlbs = ($ws.Cells.Item($l, 3).Text) -replace "`n", ' / '
        $titulo = $ws.Cells.Item($l, 5).Text
        $dep = $ws.Cells.Item($l, 7).Text
        $full = $ws.Cells.Item($l, 9).Text
        $status = if ($nomeAba -eq 'Mapeamento Completo da Planilha') { $ws.Cells.Item($l, 11).Text } else { 'N/A' }
        Write-Output "L$l $sku | MLBs=[$mlbs] | Dep=[$dep] | Full=[$full] | Status=[$status]"
        Write-Output "    Titulo=[$titulo]"
    }
    Write-Output ""
}
