Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinClose {
    [DllImport("user32.dll")]
    public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
    public const uint WM_CLOSE = 0x0010;
}
"@

$hwnd = [IntPtr]67006
$ok = [WinClose]::PostMessage($hwnd, [WinClose]::WM_CLOSE, [IntPtr]::Zero, [IntPtr]::Zero)
Write-Output "PostMessage WM_CLOSE enviado para hWnd 67006: $ok"
