// Modulo de referencia do procedimento "Modo Navegador" -- ver
// .aiox-core/development/tasks/modo-navegador-browser-access.md,
// secao "Abrir aba em segundo plano via CDP".
//
// Abre uma aba nova via Target.createTarget com background: true, evitando
// que o Chrome ative a janela (o que context.newPage() faz por baixo dos panos).

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
