Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinFocus {
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);
}
"@

$hwnd = [IntPtr]67006
$visivelAntes = [WinFocus]::IsWindowVisible($hwnd)
Write-Output "Janela ainda visivel antes: $visivelAntes"

if ($visivelAntes) {
    [WinFocus]::ShowWindow($hwnd, 5) | Out-Null   # SW_SHOW
    [WinFocus]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 400
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 400
}

$visivelDepois = [WinFocus]::IsWindowVisible($hwnd)
Write-Output "Janela ainda visivel depois do ESC: $visivelDepois"
