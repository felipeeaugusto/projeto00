// Modulo de referencia do procedimento "Modo Navegador" -- ver
// .aiox-core/development/tasks/modo-navegador-browser-access.md,
// secao "Uso de bringToFront() -- regra obrigatoria".
//
// Minimiza TODAS as janelas do Chrome existentes no momento (nao uma fixa) e
// VERIFICA de verdade que funcionou (IsIconic), nao so a ausencia de erro.
// Usar sempre dentro do mesmo script que chamou bringToFront(), no finally,
// antes de process.exit() -- nunca como comando separado depois.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function minimizeChrome() {
  const psScript = `
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class Win32MinForce {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")]
    public static extern bool IsIconic(IntPtr hWnd);
}
'@
$SW_FORCEMINIMIZE = 11
for ($i = 0; $i -lt 15; $i++) {
  $procs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero }
  $allMinimized = $true
  foreach ($p in $procs) {
    if (-not [Win32MinForce]::IsIconic($p.MainWindowHandle)) {
      [Win32MinForce]::ShowWindow($p.MainWindowHandle, $SW_FORCEMINIMIZE) | Out-Null
      $allMinimized = $false
    }
  }
  if ($allMinimized) { break }
  Start-Sleep -Milliseconds 200
}
`;
  const tmpFile = path.join(os.tmpdir(), `minimize-chrome-${Date.now()}-${Math.random().toString(36).slice(2)}.ps1`);
  fs.writeFileSync(tmpFile, psScript);
  try {
    execSync(`powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "${tmpFile}"`, { stdio: 'pipe' });
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

module.exports = { minimizeChrome };
