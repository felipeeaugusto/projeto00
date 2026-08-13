$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*KARZEN ELETRO*' }
$ws = $wb.Worksheets | Where-Object { $_.Name -like '*CAMPANHA*' }

$linhas = @()
for ($l = 25; $l -le 91; $l++) {
    $itemId = $ws.Cells.Item($l, 3).Text
    $linhas += [PSCustomObject]@{ row = $l; itemId = $itemId }
}
$saida = $linhas | ConvertTo-Json
[System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'linhas-25-91-itemids.json'), $saida, [System.Text.Encoding]::UTF8)
Write-Output "Total: $($linhas.Count) linhas salvas em linhas-25-91-itemids.json"
$linhas | ForEach-Object { Write-Output "$($_.row): $($_.itemId)" }
