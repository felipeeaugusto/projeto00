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

## Pendências relacionadas (não fazem parte deste procedimento — registradas separadamente no caderno do projeto)

- Avaliar alternativas técnicas (Chrome sempre aberto em background / `launchPersistentContext` nativo do Playwright) — @dev, sem pressa
- Transformar este comando num script `.ps1` salvo no repositório — @devops
- Backup da pasta `ChromeDebugKarzen` — Felipe confirmou que quer, execução ainda em aberto
