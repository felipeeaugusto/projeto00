Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public class ChildEnum {
    [DllImport("user32.dll")]
    public static extern bool EnumChildWindows(IntPtr hWndParent, EnumWindowsProc lpEnumFunc, IntPtr lParam);
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
    [DllImport("user32.dll")]
    public static extern int GetWindowTextLength(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);

    public static List<string> Listar(IntPtr parent) {
        var resultado = new List<string>();
        EnumChildWindows(parent, (hWnd, lParam) => {
            var sbClass = new StringBuilder(256);
            GetClassName(hWnd, sbClass, sbClass.Capacity);
            int length = GetWindowTextLength(hWnd);
            var sbText = new StringBuilder(length + 1);
            GetWindowText(hWnd, sbText, sbText.Capacity);
            resultado.Add(hWnd + " :: class=" + sbClass.ToString() + " :: text=" + sbText.ToString());
            return true;
        }, IntPtr.Zero);
        return resultado;
    }
}
"@

$parent = [IntPtr]67006
$controles = [ChildEnum]::Listar($parent)
foreach ($c in $controles) { Write-Output $c }
