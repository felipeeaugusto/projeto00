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

$proc = Start-Process -FilePath $exe -ArgumentList "--user-data-dir=`"$dst`" --remote-debugging-port=9222 --no-restore-last-session --no-first-run" -PassThru

$deadline = (Get-Date).AddSeconds(15)
$minimized = $false
while ((Get-Date) -lt $deadline -and -not $minimized) {
    Start-Sleep -Milliseconds 300
    $p = Get-Process -Id $proc.Id -ErrorAction SilentlyContinue
    if ($p -and $p.MainWindowHandle -ne [IntPtr]::Zero) {
        [Win32ApiCDP]::ShowWindow($p.MainWindowHandle, 6) | Out-Null
        $minimized = $true
    }
}
```

**As 4 flags são obrigatórias, nenhuma é opcional:**
- `--user-data-dir="C:\Users\Felipe Augusto\ChromeDebugKarzen"` — perfil isolado, fora da pasta padrão protegida do Chrome
- `--remote-debugging-port=9222` — abre a ponte CDP
- `--no-restore-last-session` — evita restaurar abas antigas sem querer
- `--no-first-run` — **crítica**. Sem ela, o Chrome trava com "Falha ao criar o diretório de dados" antes até de conseguir escrever seu próprio log. Essa flag faltou na primeira tentativa de reproduzir o processo em 04/08/2026 e causou horas de investigação.

**Timeout: 15 segundos.** Se a janela não aparecer (`MainWindowHandle` não populado) dentro desse prazo, considerar travado e ir para o Protocolo de Falha.

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

```javascript
const { chromium } = require('playwright');
const browser = await chromium.connectOverCDP('http://localhost:9222');
const context = browser.contexts()[0];
const page = await context.newPage(); // sempre aba nova — nunca navegar em aba já existente do usuário
await page.goto('URL_DESEJADA', { waitUntil: 'domcontentloaded', timeout: 30000 });
```

---

## Uso de `bringToFront()` — regra obrigatória (crítica, 04/08/2026)

Algumas ações (`page.screenshot()` em aba minimizada, alguns cliques em painéis específicos) só funcionam de forma confiável se a aba estiver em primeiro plano — exigindo `page.bringToFront()`. Isso é aceitável, **mas nunca pode ser uma chamada de ferramenta separada de quem minimiza depois**.

**Motivo:** se `bringToFront()` roda num script/tool call e o minimizar roda em outro script/tool call separado, existe uma janela de tempo entre os dois onde a tela fica visível pro Felipe — e se qualquer coisa (uma pergunta do usuário, uma interrupção) acontecer nesse intervalo, o minimizar nunca chega a rodar e a tela fica presa em primeiro plano indefinidamente.

**Bug adicional descoberto:** mesmo colocando os dois passos dentro do mesmo script Node (`bringToFront()` seguido de um `ShowWindow(SW_MINIMIZE)` único), a janela ainda pode aparecer — porque o `bringToFront()` do Playwright é assíncrono e o Windows pode elevar a janela pro primeiro plano **depois** que o minimize já rodou (race condition). Um único `ShowWindow` não é suficiente.

**Solução validada:** todo script que usa `bringToFront()` DEVE, antes de `process.exit()`, chamar uma rotina que minimiza e **fica reforçando o minimize por ~2 segundos** (loop, não chamada única), pra pegar qualquer elevação tardia da janela. Módulo de referência (`minimize-chrome.js`):

```javascript
const { execSync } = require('child_process');

function minimizeChrome() {
  const ps = `
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class Win32MinPersist {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
'@
for ($i = 0; $i -lt 10; $i++) {
  $procs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero }
  foreach ($p in $procs) { [Win32MinPersist]::ShowWindow($p.MainWindowHandle, 6) | Out-Null }
  Start-Sleep -Milliseconds 200
}
`;
  execSync(`powershell -NoProfile -Command "${ps.replace(/"/g, '\\"')}"`, { stdio: 'ignore' });
}

module.exports = { minimizeChrome };
```

Uso: `require('./minimize-chrome.js').minimizeChrome()` chamado **dentro do mesmo script** que chamou `bringToFront()`, sempre antes de `process.exit()`. Nunca como comando PowerShell separado depois — isso reintroduz a brecha de interrupção.

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
- **`context.newPage()` e ações de teclado (`keyboard.press`) podem, em certas condições ainda não totalmente isoladas, trazer a janela pro primeiro plano.** Preferir sempre clique por elemento (`locator.click()`) e evitar `page.mouse.click(x,y)` por coordenada de tela (que exige a janela visível) e `keyboard.press` quando houver alternativa por clique de elemento.

## Pendências relacionadas (não fazem parte deste procedimento — registradas separadamente no caderno do projeto)

- Avaliar alternativas técnicas (Chrome sempre aberto em background / `launchPersistentContext` nativo do Playwright) — @dev, sem pressa
- Transformar este comando num script `.ps1` salvo no repositório — @devops
- Backup da pasta `ChromeDebugKarzen` — Felipe confirmou que quer, execução ainda em aberto
