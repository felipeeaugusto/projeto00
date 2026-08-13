const { chromium } = require('playwright');
const path = require('path');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const pages = context.pages();
    console.log(`Paginas abertas: ${pages.length}`);
    for (const p of pages) {
      console.log(`  - ${p.url()} (closed=${p.isClosed()})`);
    }

    // A pagina do sheets deveria ser a ultima ou a que tem docs.google.com/spreadsheets
    const pageSheets = pages.find(p => p.url().includes('docs.google.com/spreadsheets'));
    if (pageSheets) {
      console.log('Pagina do Sheets encontrada. Tentando ler o corpo...');
      const bodyText = await pageSheets.locator('body').innerText({ timeout: 10000 }).catch(e => `ERRO: ${e.message}`);
      console.log('Corpo (primeiros 500 chars):', bodyText.slice(0, 500));

      // Verificar se ha um menu goog-menu aberto travando algo
      const menusAbertos = await pageSheets.locator('.goog-menu:visible').count().catch(() => -1);
      console.log('Menus .goog-menu visiveis:', menusAbertos);
    } else {
      console.log('Nenhuma pagina do Sheets encontrada entre as abertas.');
    }

    await browser.close();
  } catch (err) {
    console.error('ERRO GERAL:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) { console.error('erro ao minimizar:', e.message); }
  }
  process.exit(0);
})();
