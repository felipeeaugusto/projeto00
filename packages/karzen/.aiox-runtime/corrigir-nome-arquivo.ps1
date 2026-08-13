$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$wb = $excel.Workbooks | Where-Object { $_.Name -like '*KARZEN ELETRO*' }
Write-Output "Workbook encontrado: $($wb.Name)"
Write-Output "FullName atual: $($wb.FullName)"

$destinoCerto = "C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx"
$wb.SaveAs($destinoCerto, 51)
Write-Output "Novo FullName: $($wb.FullName)"
Write-Output "Saved: $($wb.Saved)"

$excel.DisplayAlerts = $true
