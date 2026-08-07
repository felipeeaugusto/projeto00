param(
    [Parameter(Mandatory=$true)][int]$TargetPid,
    [Parameter(Mandatory=$true)][string]$LogPath  # NUNCA usar default com $PSScriptRoot -- nao resolve
                                                    # corretamente quando lancado via Start-Process -File
                                                    # (bug real: tentou escrever em C:\ raiz, "acesso negado")
)

Add-Type -AssemblyName System.Windows.Forms

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WatchdogWin32 {
    public delegate void WinEventDelegate(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime);

    [DllImport("user32.dll")]
    public static extern IntPtr SetWinEventHook(uint eventMin, uint eventMax, IntPtr hmodWinEventProc, WinEventDelegate lpfnWinEventProc, uint idProcess, uint idThread, uint dwFlags);

    [DllImport("user32.dll")]
    public static extern bool UnhookWinEvent(IntPtr hWinEventHook);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    public static extern bool IsIconic(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    public const uint EVENT_SYSTEM_FOREGROUND = 0x0003;
    public const uint EVENT_SYSTEM_MINIMIZESTART = 0x0016;
    public const uint EVENT_SYSTEM_MINIMIZEEND = 0x0017;
    public const uint WINEVENT_OUTOFCONTEXT = 0x0000;
    public const int SW_FORCEMINIMIZE = 11;
}
'@

function Get-WindowTitleSafe($hwnd) {
    if ($hwnd -eq [IntPtr]::Zero) { return '(sem janela)' }
    $sb = New-Object System.Text.StringBuilder 256
    [WatchdogWin32]::GetWindowText($hwnd, $sb, 256) | Out-Null
    if ($sb.Length -eq 0) { return '(sem titulo)' }
    return $sb.ToString()
}

function Get-ProcessNameSafe($procId) {
    try {
        $p = Get-Process -Id $procId -ErrorAction Stop
        return $p.ProcessName
    } catch {
        return '(desconhecido)'
    }
}

function Log-Event($msg) {
    $ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    "$ts,$msg" | Out-File -FilePath $LogPath -Append -Encoding utf8
}

# CSV com coluna extra (07/08/2026): captura o processo/janela que estava em
# primeiro plano no exato momento do evento -- serve de "camera" automatica
# para o mistério de eventos sem gatilho de script identificado (registrado 06/08/2026).
"epoch_ms,event,janela_propria_titulo,foreground_pid,foreground_processo,foreground_titulo" | Out-File -FilePath $LogPath -Encoding utf8
Log-Event "watchdog_start_pid_$TargetPid,,,,"

$callback = {
    param($hWinEventHook, $eventType, $hwnd, $idObject, $idChild, $dwEventThread, $dwmsEventTime)
    if ($hwnd -eq [IntPtr]::Zero) { return }
    $ownerPid = 0
    [WatchdogWin32]::GetWindowThreadProcessId($hwnd, [ref]$ownerPid) | Out-Null
    if ($ownerPid -eq $TargetPid -and -not [WatchdogWin32]::IsIconic($hwnd)) {
        # Captura o estado ANTES de minimizar -- é o instantâneo do "quem roubou o foco"
        $ownWindowTitle = Get-WindowTitleSafe $hwnd
        $fgHwnd = [WatchdogWin32]::GetForegroundWindow()
        $fgPid = 0
        [WatchdogWin32]::GetWindowThreadProcessId($fgHwnd, [ref]$fgPid) | Out-Null
        $fgProcessName = Get-ProcessNameSafe $fgPid
        $fgTitle = Get-WindowTitleSafe $fgHwnd

        [WatchdogWin32]::ShowWindow($hwnd, [WatchdogWin32]::SW_FORCEMINIMIZE) | Out-Null

        # Aspas duplicadas para escapar virgulas/aspas dentro dos titulos (CSV valido)
        $ownWindowTitleCsv = '"' + ($ownWindowTitle -replace '"','""') + '"'
        $fgTitleCsv = '"' + ($fgTitle -replace '"','""') + '"'
        Log-Event "reagiu_evento_$eventType,$ownWindowTitleCsv,$fgPid,$fgProcessName,$fgTitleCsv"
    }
}

$delegate = [WatchdogWin32+WinEventDelegate]$callback
$hook1 = [WatchdogWin32]::SetWinEventHook([WatchdogWin32]::EVENT_SYSTEM_FOREGROUND, [WatchdogWin32]::EVENT_SYSTEM_FOREGROUND, [IntPtr]::Zero, $delegate, 0, 0, [WatchdogWin32]::WINEVENT_OUTOFCONTEXT)
$hook2 = [WatchdogWin32]::SetWinEventHook([WatchdogWin32]::EVENT_SYSTEM_MINIMIZESTART, [WatchdogWin32]::EVENT_SYSTEM_MINIMIZEEND, [IntPtr]::Zero, $delegate, 0, 0, [WatchdogWin32]::WINEVENT_OUTOFCONTEXT)
Log-Event "hooks_installed,,,,"

# Timer verifica a cada 1s se o processo alvo ainda existe -- se nao, o vigia se encerra sozinho
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 1000
$timer.Add_Tick({
    if (-not (Get-Process -Id $TargetPid -ErrorAction SilentlyContinue)) {
        [WatchdogWin32]::UnhookWinEvent($hook1) | Out-Null
        [WatchdogWin32]::UnhookWinEvent($hook2) | Out-Null
        [System.Windows.Forms.Application]::Exit()
    }
})
$timer.Start()
[System.Windows.Forms.Application]::Run()
