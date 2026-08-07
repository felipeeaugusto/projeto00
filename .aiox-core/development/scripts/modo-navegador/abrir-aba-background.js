// Modulo de referencia do procedimento "Modo Navegador" -- ver
// .aiox-core/development/tasks/modo-navegador-browser-access.md,
// secao "Abrir aba em segundo plano via CDP".
//
// Abre uma aba nova via Target.createTarget com background: true, evitando
// que o Chrome ative a janela (o que context.newPage() faz por baixo dos panos).

// Padrao de titulo de pagina de erro do Mercado Livre (ex: "Mercado Livre - Ocorreu um erro"),
// encontrado em 07/08/2026 durante testes reais contra o Ads ML -- nao e o bug de foco,
// e o proprio site devolvendo erro (provavelmente por requisicoes em sequencia rapida).
const ERROR_TITLE_PATTERN = /erro/i;

async function createBackgroundTarget(browser, context, targetUrl, timeoutMs, retries) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const cdpSession = await browser.newBrowserCDPSession();
    try {
      const pagePromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(
          () => reject(new Error('Timeout esperando a aba em background aparecer no context')),
          timeoutMs
        );
        context.once('page', (page) => {
          clearTimeout(timeout);
          resolve(page);
        });
      });
      await cdpSession.send('Target.createTarget', { url: targetUrl, background: true });
      return await pagePromise;
    } catch (err) {
      lastError = err;
      // Fallback antes de desistir/tentar de novo: em paginas reais mais pesadas,
      // o Chrome pode ter criado a aba de verdade mesmo com o evento 'page' do
      // Playwright atrasado -- procurar por ela evita deixar aba orfa e evita
      // criar uma segunda aba duplicada numa proxima tentativa.
      const fallbackPage = context.pages().find((p) => p.url() === targetUrl);
      if (fallbackPage) {
        return fallbackPage;
      }
    } finally {
      await cdpSession.detach(); // fecha só a sessao CDP auxiliar -- nao fecha a aba nem o Chrome
    }
  }
  throw lastError;
}

// Depois de abrir a aba, confirma que o titulo nao e uma pagina de erro do proprio site.
// Se vier com erro, fecha a aba e abre outra do zero pelo MESMO caminho seguro
// (Target.createTarget com background: true) -- nunca usa page.goto() pra "tentar de novo"
// na aba existente, porque esse padrao nunca foi validado contra o bug de foco original
// (ver nota de 07/08/2026 no doc, secao "Conexão via Playwright").
async function ensurePageWithoutErrorTitle(browser, context, page, targetUrl, timeoutMs, openRetries, errorRetries, errorRetryDelayMs) {
  let currentPage = page;
  for (let i = 0; i <= errorRetries; i++) {
    await currentPage.waitForLoadState('domcontentloaded', { timeout: timeoutMs }).catch(() => {});
    const title = await currentPage.title().catch(() => '');
    if (!ERROR_TITLE_PATTERN.test(title)) {
      return currentPage;
    }
    if (i === errorRetries) {
      return currentPage; // esgotou as tentativas -- devolve mesmo com titulo de erro, quem chamou decide o que fazer
    }
    await currentPage.close().catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, errorRetryDelayMs));
    currentPage = await createBackgroundTarget(browser, context, targetUrl, timeoutMs, openRetries);
  }
  return currentPage;
}

async function openBackgroundPage(browser, context, url, options = {}) {
  const {
    timeoutMs = 20000,
    retries = 1,
    checkErrorTitle = true,
    errorRetries = 2,
    errorRetryDelayMs = 2000,
  } = options;
  const targetUrl = url || 'about:blank';

  const page = await createBackgroundTarget(browser, context, targetUrl, timeoutMs, retries);

  if (checkErrorTitle && targetUrl !== 'about:blank') {
    return ensurePageWithoutErrorTitle(browser, context, page, targetUrl, timeoutMs, retries, errorRetries, errorRetryDelayMs);
  }
  return page;
}

module.exports = { openBackgroundPage };
