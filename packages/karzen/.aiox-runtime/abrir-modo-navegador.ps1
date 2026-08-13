Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class Win32ApiCDP {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
'@

$exe = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$dst = 'C:\Users\Felipe Augusto\ChromeDebugKarzen'

$proc = Start-Process -FilePath $exe -ArgumentList "--user-data-dir=`"$dst`" --profile-directory=`"Profile 3`" --remote-debugging-port=9222 --no-restore-last-session --no-first-run" -PassThru

$deadline = (Get-Date).AddSeconds(15)
$minimized = $false
while ((Get-Date) -lt $deadline -and -not $minimized) {
    Start-Sleep -Milliseconds 300
    $p = Get-Process -Id $proc.Id -ErrorAction SilentlyContinue
    if ($p -and $p.MainWindowHandle -ne [IntPtr]::Zero) {
        [Win32ApiCDP]::ShowWindow($p.MainWindowHandle, 11) | Out-Null
        $minimized = $true
    }
}

Write-Output "ProcessId: $($proc.Id)"
Write-Output "Minimized: $minimized"

# Verificacao de vigia duplicado antes de lancar
$vigiaExistente = Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Where-Object { $_.CommandLine -match 'focus-watchdog' -and $_.CommandLine -match "-TargetPid $($proc.Id)\b" }
if (-not $vigiaExistente) {
    $watchdogPath = 'C:\Users\Felipe Augusto\projeto00\.aiox-core\development\scripts\modo-navegador\focus-watchdog.ps1'
    $logPath = 'C:\Users\Felipe Augusto\projeto00\packages\karzen\.aiox-runtime\watchdog-events.csv'
    $argArray = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$watchdogPath`"", '-TargetPid', "$($proc.Id)", '-LogPath', "`"$logPath`"")
    Start-Process -FilePath 'powershell' -ArgumentList $argArray -WindowStyle Hidden
    Write-Output "Vigia de foco lancado."
} else {
    Write-Output "Vigia ja existente para esse PID -- nao lancado de novo."
}
