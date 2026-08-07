# modo-navegador-browser-access

## Propósito

Procedimento único e validado para qualquer agente AIOX conectar, via Playwright/CDP, num Chrome já logado com a conta real do Felipe — sem pedir login manual, sem abrir em primeiro plano, sem inventar solução alternativa quando algo falhar.

Este é o procedimento referenciado pelo gatilho **"Modo Navegador"** (ver CLAUDE.md, BLOCO 0-X).

Validado em 04/08/2026 (projeto Karzen, leitura de anúncios no Mercado Livre). Serve para **qualquer site**, não é exclusivo do Mercado Livre — só a URL de destino muda.

---

## Pré-requisito obrigatório

Antes de tentar qualquer coisa, confirmar que o executável existe:

```
C:\Program Files\Google\Chrome\Application\chrome.exe
```

Se não existir nesse caminho, **parar e perguntar ao Felipe** — não presumir outro caminho.

## Verificação de processo duplicado

Antes de lançar, checar se já existe um processo Chrome usando a pasta `ChromeDebugKarzen` (evita conflito se dois agentes tentarem usar "Modo Navegador" ao mesmo tempo):

```powershell
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match 'ChromeDebugKarzen' }
```

Se já existir um processo ativo e saudável (porta 9222 responde), reutilizar — não abrir uma segunda instância.

## Comando validado (literal — não parafrasear)

```powershell
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
        [Win32ApiCDP]::ShowWindow($p.MainWindowHandle, 11) | Out-Null  # SW_FORCEMINIMIZE, nao SW_MINIMIZE (6) -- ver secao do vigia abaixo
        $minimized = $true
    }
}

# Logo em seguida, SEMPRE lancar o vigia de foco (ver secao propria abaixo), passando $proc.Id
```

**As 5 flags são obrigatórias, nenhuma é opcional:**
- `--user-data-dir="C:\Users\Felipe Augusto\ChromeDebugKarzen"` — perfil isolado, fora da pasta padrão protegida do Chrome
- `--profile-directory="Profile 3"` — **crítica, adicionada em 05/08/2026**. Essa pasta de perfil tem múltiplos perfis do Chrome dentro dela (Default, Profile 3, Profile 4 — só "Profile 3" é o perfil real do Felipe, "Felipe Simplicio", `felipeaatrabalho@gmail.com`, confirmado via `Local State` → `profile.info_cache`). Sem essa flag, o Chrome pode mostrar a tela de seleção de perfil (visível, exige clique manual do Felipe) em vez de ir direto pro perfil certo — bug real encontrado em 05/08/2026, nunca tinha sido notado antes.
- `--remote-debugging-port=9222` — abre a ponte CDP
- `--no-restore-last-session` — evita restaurar abas antigas sem querer
- `--no-first-run` — **crítica**. Sem ela, o Chrome trava com "Falha ao criar o diretório de dados" antes até de conseguir escrever seu próprio log. Essa flag faltou na primeira tentativa de reproduzir o processo em 04/08/2026 e causou horas de investigação.

**Timeout: 15 segundos.** Se a janela não aparecer (`MainWindowHandle` não populado) dentro desse prazo, considerar travado e ir para o Protocolo de Falha.

**Se a pasta de perfil já tiver múltiplos perfis e não for possível confirmar qual é o certo:** ler `C:\Users\Felipe Augusto\ChromeDebugKarzen\Local State` (JSON), campo `profile.info_cache` — cada chave é o nome da pasta (`Default`, `Profile 3`, etc.), e o valor tem `gaia_name`/`user_name` com a identidade real. O campo `profile.last_used` também indica qual foi usado por último.

## Verificação da porta (obrigatória antes de conectar via Playwright)

```powershell
try {
    Invoke-WebRequest -Uri "http://localhost:9222/json/version" -UseBasicParsing -TimeoutSec 5
} catch {
    # falhou — ir para Protocolo de Falha, não prosseguir
}
```

Só prosseguir para `connectOverCDP` se essa chamada retornar sucesso.

## Conexão via Playwright

**A partir de 07/08/2026: NUNCA usar `context.newPage()` para abrir a aba de automação — usar `openBackgroundPage()` (ver seção "Abrir aba em segundo plano via CDP" abaixo).** `context.newPage()` continua existindo no Playwright, mas ativa a janela do Chrome no processo (causa raiz confirmada em 05/08/2026) — a nova função evita a causa em vez de só reagir a ela depois.

```javascript
const { chromium } = require('playwright');
const { openBackgroundPage } = require('CAMINHO_RELATIVO_ATE/.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'); // módulo persistido — ver seção "Abrir aba em segundo plano via CDP" abaixo

const browser = await chromium.connectOverCDP('http://localhost:9222');
const context = browser.contexts()[0];
const page = await openBackgroundPage(browser, context); // sempre aba nova, sempre em background — nunca navegar em aba já existente do usuário
await page.goto('URL_DESEJADA', { waitUntil: 'domcontentloaded', timeout: 30000 });
```

---

## Uso de `bringToFront()` — regra obrigatória (crítica, 04/08/2026)

Algumas ações (`page.screenshot()` em aba minimizada, alguns cliques em painéis específicos) só funcionam de forma confiável se a aba estiver em primeiro plano — exigindo `page.bringToFront()`. Isso é aceitável, **mas nunca pode ser uma chamada de ferramenta separada de quem minimiza depois**.

**Motivo:** se `bringToFront()` roda num script/tool call e o minimizar roda em outro script/tool call separado, existe uma janela de tempo entre os dois onde a tela fica visível pro Felipe — e se qualquer coisa (uma pergunta do usuário, uma interrupção) acontecer nesse intervalo, o minimizar nunca chega a rodar e a tela fica presa em primeiro plano indefinidamente.

**Bug adicional descoberto:** mesmo colocando os dois passos dentro do mesmo script Node (`bringToFront()` seguido de um `ShowWindow(SW_MINIMIZE)` único), a janela ainda pode aparecer — porque o `bringToFront()` do Playwright é assíncrono e o Windows pode elevar a janela pro primeiro plano **depois** que o minimize já rodou (race condition). Um único `ShowWindow` não é suficiente.

**Solução validada (versão final, corrigida em 05/08/2026 após investigação com timestamps — ver seção "Investigação a fundo" abaixo):** todo script que usa `bringToFront()` DEVE, antes de `process.exit()`, chamar uma rotina que minimiza e **verifica de verdade se funcionou** (via `IsIconic`, não só ausência de erro). Módulo de referência (`minimize-chrome.js`):

```javascript
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
```

**Bug real encontrado (06/08/2026): faltava `-WindowStyle Hidden` na chamada `execSync`.** Sem essa flag, todo `minimizeChrome()` (chamado no `finally` de praticamente todo script do Modo Navegador) abre um processo `powershell.exe` visível por uma fração de segundo antes de fechar sozinho. A janela em si nunca chega a ser percebida (nasce e morre rápido demais pra renderizar), mas o Windows já reage à criação da janela e pode roubar o foco de **qualquer outra janela do usuário** (não só do Chrome) — sintoma relatado pelo Felipe como "o foco muda do nada" na tela em que ele estava trabalhando, sem nenhuma janela visível para explicar. Ocorreu repetidamente numa sessão com muitas chamadas de script seguidas (cada uma dispara um `minimizeChrome()`). Corrigido adicionando `-WindowStyle Hidden` direto na invocação do `powershell.exe` (mesmo princípio já usado no lançamento do vigia via `Start-Process -WindowStyle Hidden`, só que aqui a flag precisa ir para o `powershell.exe` em si, já que a chamada é via `execSync`/shell, não via `Start-Process`).

Uso: `require('./minimize-chrome.js').minimizeChrome()` chamado **dentro do mesmo script** que chamou `bringToFront()`, sempre antes de `process.exit()`, dentro de um `finally` (ver seção seguinte). Nunca como comando PowerShell separado depois — isso reintroduz a brecha de interrupção.

**Ao "restaurar" a janela pra um estado limpo (ex: preparar um teste), NUNCA usar `ShowWindow(hWnd, 9)` (`SW_RESTORE`)** — essa flag restaura **e ativa/foca** a janela, roubando o foco do Felipe sozinha. Usar `ShowWindow(hWnd, 4)` (`SW_SHOWNOACTIVATE`) quando o objetivo é só "não estar minimizado", sem ativar/focar.

---

## Sempre desconectar com `browser.close()` — regra obrigatória (crítica, 05/08/2026)

**Todo script DEVE chamar `await browser.close()` num bloco `finally`, antes de `process.exit()`.** Nunca terminar um script só com `process.exit(0)` sem desconectar antes.

**Causa raiz encontrada (investigação real, não suposição):** ao longo de uma sessão longa, dezenas de scripts conectam via `chromium.connectOverCDP('http://localhost:9222')` e terminam abruptamente com `process.exit(0)`, sem nunca chamar `browser.close()`. Isso não fecha a conexão CDP de forma limpa — o processo Node morre e o socket é fechado à força pelo sistema operacional, em vez de o protocolo CDP receber um sinal explícito de "sessão encerrada". Depois de muitas conexões acumuladas dessa forma na mesma sessão do Chrome, o rastreamento de páginas do Playwright (em conexões *seguintes*) fica instável, chegando a reportar `Target page, context or browser has been closed` em páginas que **continuam abertas e funcionando normalmente** no navegador real.

**Prova (05/08/2026):** um script que abriu uma página "Alterar" travou com esse erro. Diagnóstico: a aba nunca fechou — `context.pages()` numa conexão nova confirmou que ela seguia lá, `page.isClosed()` retornou `false`. Ao ler essa mesma página numa conexão que desconecta corretamente (`browser.close()` no `finally`), tudo funcionou sem nenhum erro.

**Importante:** `browser.close()` numa sessão obtida via `connectOverCDP()` **não fecha o Chrome real** — apenas desconecta o cliente Playwright daquela sessão CDP, de forma limpa. É seguro chamar sempre, em qualquer script.

**Padrão obrigatório para todo script novo:**

```javascript
const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    // ... lógica do script ...
  } catch (err) {
    console.error('ERRO:', err.message);
  } finally {
    if (browser) {
      await browser.close(); // desconecta limpo — NÃO fecha o Chrome real
    }
  }
  process.exit(0);
})();
```

Isso vale em conjunto com a regra de `minimizeChrome()` no `finally` — quando o script usa `bringToFront()`, os dois ficam no mesmo bloco `finally`.

**Por que minimizar TODAS as janelas, não uma fixa:** o script consulta `Get-Process chrome | Where MainWindowHandle -ne Zero` **a cada chamada**, pegando qualquer janela do Chrome que exista naquele momento — não uma janela específica lembrada de antes. Isso importa porque, se uma segunda janela solta aparecer no meio da sessão (ver "Janela solta" nos Riscos conhecidos abaixo), um script que minimizasse só a janela original conhecida deixaria a nova passar batido. Minimizar "tudo que existir agora" cobre esse caso automaticamente, sem precisar detectar a janela nova primeiro.

---

## `context.newPage()` traz a janela pro primeiro plano — regra obrigatória (crítica, 05/08/2026)

**Investigação a fundo (com timestamps, não suposição) confirmou: `context.newPage()` sozinho — sem nenhum `bringToFront()` — pode trazer a janela do Chrome pro primeiro plano.** Medido com um monitor externo checando `IsIconic`/`GetForegroundWindow` a cada 100ms: a transição pra primeiro plano aconteceu a menos de 100ms da chamada de `context.newPage()`, antes até da Promise resolver. Ou seja, é o próprio Chrome ativando a janela ao criar a aba via protocolo CDP — não é um bug do nosso código, é comportamento do navegador.

**Consequência prática: TODO script que chama `context.newPage()` — não só os que chamam `bringToFront()` — precisa do mesmo tratamento de minimizar no `finally`.** A regra antiga (só minimizar quando o script usa `bringToFront()`) estava incompleta.

**Três bugs reais encontrados na função de minimizar em si, nenhum óbvio, todos confirmados com medição, não suposição:**

1. **`SW_MINIMIZE` (6) não é garantido ao minimizar de outro processo.** Precisa de `SW_FORCEMINIMIZE` (11), documentado especificamente para minimizar uma janela de uma thread/processo diferente do dono da janela.
2. **`ShowWindow()` sempre "funciona" sem lançar erro — mas o valor de retorno não indica se a ação pedida teve efeito**, só se a janela estava visível *antes* da chamada. Confiar na ausência de exceção é insuficiente; é obrigatório verificar depois com `IsIconic()`.
3. **O maior: passar o script PowerShell inline via `powershell -Command "..."` com aspas escapadas manualmente (`.replace(/"/g, '\\"')`) é frágil e pode corromper um script multi-linha silenciosamente** — sem lançar nenhum erro no Node, porque o `execSync` só falha se o **processo** `powershell.exe` falhar, não se o script rodar errado internamente. A correção é escrever o script pra um arquivo `.ps1` temporário e rodar com `-File` (nunca `-Command` inline pra scripts com mais de uma linha).
4. **Ao trocar pra `-File`, apareceu um quarto bug, esse sim com erro real e visível:** a Execution Policy do PowerShell do Windows bloqueia rodar arquivos `.ps1` por padrão (`about_Execution_Policies`). A correção é `powershell -ExecutionPolicy Bypass -File "..."` — bypass só afeta aquele processo específico, não altera a política do sistema.

**Como cada um foi provado, não só teorizado:** isolando o `ShowWindow(FORCEMINIMIZE)` puro (fora do `execSync`, comando direto) — funcionou 100% das vezes, confirmado com `IsIconic` antes/depois. Rodando o mesmo script via `execSync` com `-Command` inline — sem erro, mas sem efeito real (`IsIconic` continuava `False` minutos depois). Trocando pra `-File` sem a `ExecutionPolicy` — erro real e explícito. Com `-ExecutionPolicy Bypass -File` — funcionou, confirmado com um monitor externo rodando 100ms antes, durante e depois, mostrando a transição `minimized: False → True` no exato momento da chamada, permanecendo `True` por mais de 5 segundos depois sem regressão.

**Regra de disciplina (a lição maior, apontada pelo Felipe):** não basta verificar o resultado de uma ação só nos pontos "oficiais" de um teste — **qualquer comando que toque a janela do Chrome (inclusive comandos de preparação/diagnóstico, como "restaurar pra estado limpo") precisa ser verificado e corrigido imediatamente depois, não só no final da sequência.** Foi exatamente um comando de preparação (`ShowWindow(hWnd, 9)` = `SW_RESTORE`, que ativa/foca a janela ao restaurar) que roubou o foco do Felipe sem que a investigação notasse — porque a verificação só acontecia nos pontos planejados do teste, não depois de cada ação individual.

---

## Abrir aba em segundo plano via CDP — correção da causa raiz (crítica, 07/08/2026)

**Contexto:** a seção anterior confirmou (com medição, não suposição) que `context.newPage()` é o próprio Chrome ativando a janela ao criar a aba via CDP — não um bug do nosso código. Até 06/08/2026, a única defesa era reagir depois (`minimizeChrome()` no `finally`, mais o vigia de evento) — funciona, mas depende de checagem/hook rodando *depois* do fato consumado, com uma janela de milissegundos de exposição real (medida: 2-19ms por rodada de teste em 05/08/2026).

**Correção que ataca a causa em vez de reagir a ela:** o protocolo CDP tem um parâmetro oficial, `background: true`, no comando `Target.createTarget` — pedir pro Chrome já criar a aba **sem nunca ativar a janela**, em vez de criar e ativar (`context.newPage()` faz isso por baixo dos panos) e só depois tentar desfazer. Isso não é gambiarra nem parâmetro não documentado: é a opção oficial do protocolo Chrome DevTools para exatamente esse caso de uso.

**Como enviar esse comando via Playwright:** o Playwright não expõe `background: true` na sua API de alto nível (`context.newPage()` não aceita essa opção), mas expõe uma sessão CDP no nível do browser via `browser.newBrowserCDPSession()` — daí dá pra mandar o comando `Target.createTarget` diretamente. O Playwright continua detectando a aba nova automaticamente (evento `'page'` no `context`, o mesmo mecanismo que ele already usa internamente para `context.newPage()`), então o resto do script (`page.goto()`, `page.click()`, etc.) funciona exatamente igual.

**Módulo persistido (07/08/2026):** ao contrário dos outros trechos de código deste procedimento (que cada script ad-hoc precisa copiar manualmente), este já está salvo como arquivo real em `.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js` — qualquer script novo importa direto de lá, sem copiar o código abaixo.

```javascript
// .aiox-core/development/scripts/modo-navegador/abrir-aba-background.js
async function openBackgroundPage(browser, context, url) {
  const cdpSession = await browser.newBrowserCDPSession();
  try {
    const pagePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error('Timeout esperando a aba em background aparecer no context')),
        10000
      );
      context.once('page', (page) => {
        clearTimeout(timeout);
        resolve(page);
      });
    });
    await cdpSession.send('Target.createTarget', { url: url || 'about:blank', background: true });
    return await pagePromise;
  } finally {
    await cdpSession.detach(); // fecha só a sessao CDP auxiliar -- nao fecha a aba nem o Chrome
  }
}

module.exports = { openBackgroundPage };
```

**O vigia de foco e o `minimizeChrome()` continuam ativos — não foram removidos.** Mesmo com a causa raiz resolvida, a defesa em camadas se mantém por dois motivos: (1) ações que exigem `bringToFront()` (screenshot em aba minimizada, alguns cliques específicos) continuam existindo e continuam precisando do tratamento já documentado acima; (2) o grupo de 4 eventos do vigia sem gatilho de script identificado (registrado em 06/08/2026) ainda não tem causa confirmada — enquanto esse mistério não for resolvido, remover qualquer camada de proteção seria prematuro.

**O que muda na prática:** `context.newPage()` deixa de ser usado para abrir a aba de automação em qualquer script novo do Modo Navegador — `openBackgroundPage()` é o substituto direto. Isso não elimina a necessidade de `minimizeChrome()` no `finally` (continua lá, ver seção "Uso de `bringToFront()`" acima), só remove a exposição de milissegundos que existia especificamente na criação da aba.

---

## Vigia de foco por evento — solução definitiva (crítica, 05/08/2026)

**Por que o `minimizeChrome()` no `finally` de cada script (seção acima) não é suficiente sozinho:** ele depende de checagem repetida (polling a cada ~100-200ms) DEPOIS que a ação já rodou. Isso significa até ~100ms de exposição real, visível ao olho humano, toda vez — e depende de cada script individual lembrar de chamar a rotina. Se um script novo (de qualquer agente, presente ou futuro) esquecer, a proteção não existe.

**A solução estrutural: um processo separado, sempre rodando, que não fica checando de tempos em tempos — o Windows AVISA ele instantaneamente** via `SetWinEventHook` (hook de evento do sistema operacional), no exato momento em que a janela do Chrome sai do estado minimizado, por qualquer motivo (`bringToFront()`, `context.newPage()`, ou qualquer causa futura ainda não descoberta). Esse vigia roda **independente de qualquer script de automação lembrar de fazer algo** — a proteção fica ligada o tempo todo, para qualquer agente, durante toda a vida daquela instância do Chrome.

**Dois eventos precisam ser monitorados juntos, não só um** — bug real encontrado durante a validação: monitorando só `EVENT_SYSTEM_FOREGROUND` (janela virou ativa), o vigia perdeu 2 de 4 casos de teste, porque a janela pode sair do estado minimizado **sem** tecnicamente virar a janela em foreground (fica visível, mas outra janela continua "ativa" segundo o Windows). A correção: monitorar também o intervalo `EVENT_SYSTEM_MINIMIZESTART`..`EVENT_SYSTEM_MINIMIZEEND`, que cobre qualquer transição de sair-de-minimizado, com ou sem foreground.

**Módulo persistido (07/08/2026):** salvo em `.aiox-core/development/scripts/modo-navegador/focus-watchdog.ps1` — inclui uma coluna extra no CSV de log (`foreground_pid`, `foreground_processo`, `foreground_titulo`) que captura automaticamente qual processo/janela estava em primeiro plano no exato momento de cada reação sem gatilho de script identificado, servindo de "câmera" para o mistério registrado em 06/08/2026.

**Script de referência (`focus-watchdog.ps1`):**

```powershell
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

    public const uint EVENT_SYSTEM_FOREGROUND = 0x0003;
    public const uint EVENT_SYSTEM_MINIMIZESTART = 0x0016;
    public const uint EVENT_SYSTEM_MINIMIZEEND = 0x0017;
    public const uint WINEVENT_OUTOFCONTEXT = 0x0000;
    public const int SW_FORCEMINIMIZE = 11;
}
'@

function Log-Event($msg) {
    $ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    "$ts,$msg" | Out-File -FilePath $LogPath -Append -Encoding utf8
}
"epoch_ms,event" | Out-File -FilePath $LogPath -Encoding utf8
Log-Event "watchdog_start_pid_$TargetPid"

$callback = {
    param($hWinEventHook, $eventType, $hwnd, $idObject, $idChild, $dwEventThread, $dwmsEventTime)
    if ($hwnd -eq [IntPtr]::Zero) { return }
    $ownerPid = 0
    [WatchdogWin32]::GetWindowThreadProcessId($hwnd, [ref]$ownerPid) | Out-Null
    if ($ownerPid -eq $TargetPid -and -not [WatchdogWin32]::IsIconic($hwnd)) {
        [WatchdogWin32]::ShowWindow($hwnd, [WatchdogWin32]::SW_FORCEMINIMIZE) | Out-Null
        Log-Event "reagiu_evento_$eventType"
    }
}

$delegate = [WatchdogWin32+WinEventDelegate]$callback
$hook1 = [WatchdogWin32]::SetWinEventHook([WatchdogWin32]::EVENT_SYSTEM_FOREGROUND, [WatchdogWin32]::EVENT_SYSTEM_FOREGROUND, [IntPtr]::Zero, $delegate, 0, 0, [WatchdogWin32]::WINEVENT_OUTOFCONTEXT)
$hook2 = [WatchdogWin32]::SetWinEventHook([WatchdogWin32]::EVENT_SYSTEM_MINIMIZESTART, [WatchdogWin32]::EVENT_SYSTEM_MINIMIZEEND, [IntPtr]::Zero, $delegate, 0, 0, [WatchdogWin32]::WINEVENT_OUTOFCONTEXT)
Log-Event "hooks_installed"

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
```

**Como lançar (parte obrigatória do procedimento de abertura do "Modo Navegador", logo após o Chrome estar minimizado pela primeira vez):**

```powershell
$watchdogPath = 'CAMINHO\focus-watchdog.ps1'  # gravar o script acima nesse arquivo antes
$logPath = 'CAMINHO\watchdog-events.csv'
# CRITICO: elementos do array com espaco no caminho precisam de aspas escapadas DENTRO
# do proprio elemento -- bug real: Start-Process quebra "C:\Users\Felipe Augusto\..." em
# dois argumentos separados se nao vier com `"..."` embutido.
$argArray = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$watchdogPath`"", '-TargetPid', "$proc.Id", '-LogPath', "`"$logPath`"")
Start-Process -FilePath 'powershell' -ArgumentList $argArray -WindowStyle Hidden
```

**Validado com medição real (05/08/2026), não suposição:** 5 rodadas de teste consecutivas, cada uma disparando `context.newPage()` — todas as 5 detectadas e corrigidas pelo vigia, sem nenhuma ação manual. Tempos de reação (evento detectado → `ShowWindow` chamado): **2ms, 2ms, 5ms, 9ms, 19ms** — ordens de magnitude abaixo do limiar de percepção visual humana consciente (~50-100ms).

**Sendo honesto sobre o limite real:** isso não é "matematicamente impossível a janela existir visível nem por 1 milissegundo" — é "existe por um punhado de milissegundos, tempo abaixo do que dá pra perceber conscientemente". A única forma de exposição zero absoluta é headless (sem janela nenhuma) — e headless foi descartado (ver seção própria) por dois motivos: o Mercado Livre bloqueia navegadores headless por completo (mesmo na home page, sem login nenhum envolvido), e headless remove a possibilidade do Felipe acessar manualmente a janela quando quiser, que é um requisito explícito dele.

---

## `--headless=new` — por que foi descartado definitivamente (05/08/2026)

Investigado a fundo depois de uma dúvida legítima do Felipe: será que o erro antigo ("Multiple targets not supported") era na verdade causado pela falta da flag `--profile-directory`, e não pela criptografia de cookies como a documentação antiga dizia?

**Testado com `--headless=new` + `--profile-directory="Profile 3"` juntos:** o erro antigo realmente sumiu (processo não morre mais, porta 9222 responde normalmente, sem "Multiple targets not supported"). A suspeita do Felipe estava certa quanto a isso.

**Mas apareceu um bloqueio diferente e definitivo:** o Mercado Livre detecta o `User-Agent` do Chrome headless (contém literalmente a string `"HeadlessChrome"`) e bloqueia a página com um erro genérico deles ("Hubo un error accediendo a esta página...") — confirmado até na página inicial pública, sem login nenhum envolvido, então não é sobre sessão/cookie, é o site rejeitando o navegador headless em si.

**Mesmo sem esse bloqueio, headless nunca serviria pro objetivo real:** o Felipe quer automação silenciosa **mas acessível manualmente se ele quiser conferir** (like uma janela minimizada, que ele pode restaurar clicando na barra de tarefas). Headless não tem janela nenhuma — nem minimizada, nem acessível de nenhuma forma. Ou seja, headless remove exatamente a capacidade que o Felipe quer manter. **Não é a solução certa pro objetivo dele, independente do bloqueio do Mercado Livre.**

---

## Protocolo de falha (obrigatório, sem exceção)

Se qualquer etapa acima falhar, **parar imediatamente** e rodar, nessa ordem, só os checks abaixo (todos somente leitura — nenhum tenta corrigir nada sozinho):

1. **Processo**: `Get-Process -Id <id>` — o processo ainda existe? Qual o título da janela?
2. **Porta**: `Invoke-WebRequest http://localhost:9222/json/version` — responde?
3. **Pasta**: a pasta `ChromeDebugKarzen` existe, tem a estrutura de perfil válida (`Default`, `Local State`)?
4. **Permissão**: `icacls` na pasta — tem controle total pro usuário atual?
5. **Versão**: comparar `Get-Item chrome.exe | Select VersionInfo` com o conteúdo do arquivo `Last Version` dentro da pasta do perfil — houve atualização do Chrome desde o último uso?

Depois de rodar os 5 checks, **reportar ao Felipe o que foi encontrado e parar**. Terminantemente proibido tentar uma solução alternativa (mudar flags, trocar de pasta, mudar de porta, etc.) sem autorização explícita dele.

---

## Riscos conhecidos (documentados, sem solução técnica — só ciência)

- **Chrome se autoatualiza sozinho** e pode voltar a quebrar esse procedimento no futuro sem aviso (foi exatamente o que causou a falha de 04/08/2026 — a receita antiga estava sem o `--no-first-run`). Não tem prevenção; a resposta é sempre o Protocolo de Falha acima.
- **Login pode expirar por inatividade.** Isso é manutenção normal, não é bug — se acontecer, Felipe precisa logar manualmente de novo nessa mesma pasta, uma única vez, e o login volta a ficar salvo.
- **A janela é real**, só minimizada — pode reaparecer em primeiro plano se algo forçar foco nela (ex: Alt+Tab). Risco aceito, não eliminável tecnicamente.
- **Janela solta sem flags de debug pode se misturar com a de automação.** Em 04/08/2026, uma segunda janela do `chrome.exe` (sem `--remote-debugging-port` nenhum, perfil padrão) apareceu em primeiro plano repetidamente durante uma sessão longa, dando a impressão de que a automação estava "roubando o foco" — quando na verdade era uma janela completamente separada, não conectada via CDP. **Antes de investigar qualquer causa de "tela aparecendo sem explicação", checar `Get-Process chrome | Where MainWindowHandle -ne 0` e comparar a `CommandLine` de cada uma via `Get-CimInstance Win32_Process` — só a que tem `--remote-debugging-port=9222` é a de automação; qualquer outra visível é estranha ao processo e pode ser fechada (`Stop-Process`) após confirmar com o Felipe.**
- **`context.newPage()` traz a janela pro primeiro plano — isso NÃO é mais um risco "não isolado", foi confirmado e resolvido em 05/08/2026** (ver seção própria acima). A causa é o próprio Chrome ativando a janela ao criar aba via CDP; a solução é chamar `minimizeChrome()` no `finally` de todo script que usa `context.newPage()`, exatamente como já era feito pra `bringToFront()`. Ações de teclado (`keyboard.press`) continuam como risco não totalmente isolado — preferir sempre clique por elemento (`locator.click()`) quando houver alternativa.

## Pendências relacionadas (não fazem parte deste procedimento — registradas separadamente no caderno do projeto)

- Avaliar alternativas técnicas (Chrome sempre aberto em background / `launchPersistentContext` nativo do Playwright) — @dev, sem pressa
- Transformar este comando num script `.ps1` salvo no repositório — @devops
- Backup da pasta `ChromeDebugKarzen` — Felipe confirmou que quer, execução ainda em aberto
