// Teste de comportamento pra minimizeChrome() -- ver minimize-chrome.js.
//
// Nao testa o TEXTO do codigo (isso quebra toda vez que a implementacao muda
// de jeito, mesmo sem bug). Testa a PROMESSA real de seguranca: minimizeChrome()
// NUNCA pode tocar uma janela de Chrome que nao seja da automacao (identificada
// pelo marcador 'ChromeDebugKarzen' no --user-data-dir).
//
// Criado em 11/08/2026 depois de 2 incidentes reais (10/08 e 11/08) onde essa
// promessa foi quebrada -- ver modo-navegador-browser-access.md, secao
// "Uso de bringToFront()". Este teste existe pra pegar qualquer bug futuro
// nessa funcao, mesmo um que ninguem documentou ainda -- nao depende de
// sincronia entre doc e codigo.
//
// Seguranca: lanca 2 janelas de Chrome NOVAS, com perfis temporarios isolados
// em %TEMP% -- nunca toca no Chrome pessoal do Felipe nem na instancia real
// do ChromeDebugKarzen que possa estar rodando pra trabalho de verdade.
//
// Uso: node minimize-chrome.test.js

const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { minimizeChrome } = require('./minimize-chrome.js');

const CHROME_EXE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function findWindowState(pid) {
  const psScript = `
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class Win32TestCheck {
    [DllImport("user32.dll")]
    public static extern bool IsIconic(IntPtr hWnd);
}
'@
$p = Get-Process -Id ${pid} -ErrorAction SilentlyContinue
if ($null -eq $p -or $p.MainWindowHandle -eq [IntPtr]::Zero) {
  Write-Output "NO_WINDOW"
} elseif ([Win32TestCheck]::IsIconic($p.MainWindowHandle)) {
  Write-Output "ICONIC"
} else {
  Write-Output "NORMAL"
}
`;
  const tmpFile = path.join(os.tmpdir(), `test-check-${Date.now()}-${Math.random().toString(36).slice(2)}.ps1`);
  fs.writeFileSync(tmpFile, psScript);
  try {
    const out = execFileSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', tmpFile], { encoding: 'utf8' });
    return out.trim();
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function waitForWindow(pid, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const state = findWindowState(pid);
    if (state !== 'NO_WINDOW') return state;
  }
  return 'NO_WINDOW';
}

function launchChrome(profileDirName) {
  const profileDir = path.join(os.tmpdir(), profileDirName);
  const proc = spawn(CHROME_EXE, [
    `--user-data-dir=${profileDir}`,
    '--no-restore-last-session',
    '--no-first-run',
    'about:blank',
  ], { detached: true, stdio: 'ignore' });
  proc.unref();
  return { pid: proc.pid, profileDir };
}

function killProcessTree(pid) {
  try {
    execFileSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore' });
  } catch (_) {
    // ja pode ter morrido sozinho -- nao e falha do teste
  }
}

(async () => {
  let automationProc;
  let strangeProc;
  let exitCode = 1;

  try {
    console.log('Lancando janela de teste "da automacao" (com ChromeDebugKarzen no perfil)...');
    automationProc = launchChrome('ChromeDebugKarzenTesteAutomacao_' + Date.now());

    console.log('Lancando janela de teste "estranha" (sem relacao com a automacao)...');
    strangeProc = launchChrome('ChromeTesteEstranhoNaoAutomacao_' + Date.now());

    const automationStateBefore = waitForWindow(automationProc.pid, 15000);
    const strangeStateBefore = waitForWindow(strangeProc.pid, 15000);
    console.log(`Estado antes -- automacao: ${automationStateBefore} | estranha: ${strangeStateBefore}`);

    if (automationStateBefore === 'NO_WINDOW' || strangeStateBefore === 'NO_WINDOW') {
      throw new Error('Uma das janelas de teste nao abriu a tempo -- nao da pra validar o teste.');
    }

    console.log('Rodando minimizeChrome()...');
    minimizeChrome();

    await new Promise((r) => setTimeout(r, 500));

    const automationStateAfter = findWindowState(automationProc.pid);
    const strangeStateAfter = findWindowState(strangeProc.pid);
    console.log(`Estado depois -- automacao: ${automationStateAfter} | estranha: ${strangeStateAfter}`);

    const automationOk = automationStateAfter === 'ICONIC';
    const strangeOk = strangeStateAfter === 'NORMAL';

    if (automationOk && strangeOk) {
      console.log('PASS: minimizeChrome() minimizou so a janela da automacao. A janela estranha nao foi tocada.');
      exitCode = 0;
    } else {
      if (!automationOk) {
        console.error(`FALHA: a janela da automacao deveria estar ICONIC, mas ficou "${automationStateAfter}".`);
      }
      if (!strangeOk) {
        console.error(`FALHA CRITICA: a janela estranha (nao-automacao) deveria continuar "NORMAL", mas ficou "${strangeStateAfter}" -- isso e exatamente o bug que causou os incidentes reais de foco roubado.`);
      }
      exitCode = 1;
    }
  } catch (err) {
    console.error('ERRO no teste:', err.message);
    exitCode = 1;
  } finally {
    if (automationProc) killProcessTree(automationProc.pid);
    if (strangeProc) killProcessTree(strangeProc.pid);
    // Limpeza dos perfis temporarios de teste
    [automationProc, strangeProc].forEach((p) => {
      if (p && p.profileDir) {
        fs.rm(p.profileDir, { recursive: true, force: true }, () => {});
      }
    });
  }

  process.exit(exitCode);
})();
