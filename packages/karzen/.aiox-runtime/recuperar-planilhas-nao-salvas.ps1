$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')

$xlOpenXMLWorkbook = 51  # .xlsx sem macro

$mapa = @(
    @{ nomeParcial = 'Pausados em Campanha'; destino = 'C:\Downloads\Pausados em Campanha - Karzen.xlsx' },
    @{ nomeParcial = 'Analise Oficial';       destino = 'C:\Downloads\Analise Oficial.xlsx' },
    @{ nomeParcial = 'KARZEN ELETRO';         destino = 'C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx' }
)

foreach ($item in $mapa) {
    Write-Output "=== Procurando workbook .xlsb nao salvo pra: $($item.nomeParcial) ==="
    $candidatos = $excel.Workbooks | Where-Object { $_.Name -like "*$($item.nomeParcial)*" -and $_.Name -like '*version*' }
    if (-not $candidatos) {
        Write-Output "  NENHUM candidato .xlsb encontrado para $($item.nomeParcial) -- pulando"
        continue
    }
    $wb = $candidatos | Select-Object -First 1
    Write-Output "  Workbook encontrado: $($wb.Name) (Saved=$($wb.Saved))"

    # Se o arquivo original (mesmo nome final) ja estiver aberto no Excel, fecha ele
    # sem salvar antes -- ja temos backup feito em Downloads\backup-antes-recuperacao-2026-08-13
    $nomeFinal = Split-Path $item.destino -Leaf
    $conflito = $excel.Workbooks | Where-Object { $_.Name -eq $nomeFinal }
    if ($conflito) {
        Write-Output "  Fechando workbook original conflitante (ja tem backup): $($conflito.Name)"
        $conflito.Close($false)
    }

    Write-Output "  Salvando como: $($item.destino)"
    $wb.SaveAs($item.destino, $xlOpenXMLWorkbook)
    Write-Output "  OK -- salvo. Novo FullName: $($wb.FullName)  Saved=$($wb.Saved)"
    Write-Output ""
}

Write-Output "=== Estado final dos workbooks abertos ==="
foreach ($wb in $excel.Workbooks) {
    Write-Output "  $($wb.Name) -- FullName=$($wb.FullName) Saved=$($wb.Saved)"
}
