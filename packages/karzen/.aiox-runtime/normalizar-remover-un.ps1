$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }

foreach ($nomeAba in @('Mapeamento Completo da Planilha', 'Prioridade - Fora de Ads')) {
    $ws = $wb.Worksheets | Where-Object { $_.Name -eq $nomeAba }
    $ultimaLinha = $ws.UsedRange.Row + $ws.UsedRange.Rows.Count - 1
    Write-Output "=== $nomeAba ==="
    for ($l = 5; $l -le $ultimaLinha; $l += 2) {
        $sku = $ws.Cells.Item($l, 1).Text
        if ($sku -eq '') { continue }
        foreach ($col in 7, 9) {
            $celula = $ws.Cells.Item($l, $col)
            $valor = $celula.Text
            if ($valor -match '^(\d+)\s*un\.?$') {
                $celula.Value2 = [int]$Matches[1]
                Write-Output "  L$l $sku C$col : '$valor' -> '$($Matches[1])'"
            }
        }
    }
    Write-Output ""
}
Write-Output "CONCLUIDO."
