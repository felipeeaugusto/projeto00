// Modulo de referencia do procedimento "Modo Navegador" -- ver
// .aiox-core/development/tasks/modo-navegador-browser-access.md,
// secao "Abrir aba em segundo plano via CDP".
//
// Abre uma aba nova via Target.createTarget com background: true, evitando
// que o Chrome ative a janela (o que context.newPage() faz por baixo dos panos).

async function openBackgroundPage(browser, context, url, options = {}) {
  const { timeoutMs = 20000, retries = 1 } = options;
  const targetUrl = url || 'about:blank';
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

module.exports = { openBackgroundPage };
