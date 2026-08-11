// Modulo de referencia do procedimento "Modo Navegador" -- ver
// .aiox-core/development/tasks/modo-navegador-browser-access.md,
// secao "Uso de bringToFront() -- regra obrigatoria".
//
// Minimiza TODAS as janelas *da automacao* existentes no momento (nao uma fixa,
// mas tambem nunca uma janela de Chrome alheia -- ver filtro por CommandLine
// abaixo) e VERIFICA de verdade que funcionou (IsIconic), nao so a ausencia de erro.
// Usar sempre dentro do mesmo script que chamou bringToFront(), no finally,
// antes de process.exit() -- nunca como comando separado depois.
//
// Correcao critica (11/08/2026): esta funcao ficou 3 dias com a versao antiga,
// sem filtro (Get-Process chrome puro), porque o fix documentado em 10/08/2026
// nunca foi copiado pra este arquivo real -- causou 2 incidentes reais de foco
// roubado no Chrome pessoal do Felipe. Ver Camada 3 (secao do .md agora aponta
// pra este arquivo em vez de duplicar o codigo) e o teste de comportamento em
// minimize-chrome.test.js, que existe exatamente pra nunca mais depender de
// alguem lembrar de sincronizar doc com codigo.

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
  $pids = (Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match 'ChromeDebugKarzen' }).ProcessId
  $procs = Get-Process -Id $pids -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero }
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
