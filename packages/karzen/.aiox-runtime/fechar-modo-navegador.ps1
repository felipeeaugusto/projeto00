$processoPrincipal = Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match 'ChromeDebugKarzen' -and $_.CommandLine -notmatch '--type=' }

$count = 0
if ($processoPrincipal) {
    $count = ($processoPrincipal | Measure-Object).Count
}
Write-Output "Processos principais encontrados: $count"

if ($count -eq 1) {
    Stop-Process -Id $processoPrincipal.ProcessId -Force
    Write-Output "Processo $($processoPrincipal.ProcessId) encerrado."
} else {
    Write-Output "0 ou mais de 1 processo encontrado -- NAO fechando automaticamente. Investigar antes."
}
