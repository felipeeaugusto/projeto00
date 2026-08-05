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
    execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tmpFile}"`, { stdio: 'pipe' });
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

module.exports = { minimizeChrome };
```

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
