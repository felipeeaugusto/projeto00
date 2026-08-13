$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$xlOpenXMLWorkbook = 51

$mapa = @(
    @{ nomeParcial = 'Analise Oficial'; destino = 'C:\Downloads\Analise Oficial.xlsx' },
    @{ nomeParcial = 'KARZEN ELETRO';   destino = 'C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx' }
)

foreach ($item in $mapa) {
    Write-Output "=== Procurando workbook .xlsb nao salvo pra: $($item.nomeParcial) ==="
    $candidatos = $excel.Workbooks | Where-Object { $_.Name -like "*$($item.nomeParcial)*" -and $_.Name -like '*version*' }
    if (-not $candidatos) {
        Write-Output "  NENHUM candidato .xlsb encontrado -- pulando"
        continue
    }
    $wb = $candidatos | Select-Object -First 1
    Write-Output "  Workbook encontrado: $($wb.Name) (Saved=$($wb.Saved))"

    $nomeFinal = Split-Path $item.destino -Leaf
    $conflito = $excel.Workbooks | Where-Object { $_.Name -eq $nomeFinal }
    if ($conflito) {
        Write-Output "  Fechando workbook original conflitante: $($conflito.Name)"
        $conflito.Close($false)
    }

    Write-Output "  Salvando como: $($item.destino)"
    $wb.SaveAs($item.destino, $xlOpenXMLWorkbook)
    Write-Output "  OK -- salvo. Novo FullName: $($wb.FullName)  Saved=$($wb.Saved)"
    Write-Output ""
}

$excel.DisplayAlerts = $true

Write-Output "=== Estado final ==="
foreach ($wb in $excel.Workbooks) {
    Write-Output "  $($wb.Name) -- FullName=$($wb.FullName) Saved=$($wb.Saved)"
}
