// Reconhecimento: entrar numa campanha real e ver como aparecem os produtos
// pausados, e onde estao Qualidade/Experiencia -- antes de montar o pipeline completo.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_CAMPANHAS = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns?navigate_to=mercado_ads';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br/product-ads/admin/campaigns'));
    if (!page) page = await openBackgroundPage(browser, context, URL_CAMPANHAS);

    let texto = '';
    for (let t = 0; t < 8; t++) {
      await page.waitForTimeout(1500);
      texto = await page.locator('body').innerText();
      if (texto.length > 200) break;
    }
    console.log('URL atual:', page.url());
    console.log('Tamanho do texto:', texto.length);
    const idxLista = texto.indexOf('Nome da campanha');
    console.log('--- A partir de "Nome da campanha" (2500 chars) ---');
    console.log(texto.slice(idxLista, idxLista + 2500));

    const links = await page.locator('a').evaluateAll((els) =>
      els.filter((el) => /CURVA|PERFORMANCE|ACOS|ALTA/i.test(el.textContent || ''))
         .map((el) => ({ texto: el.textContent.trim(), href: el.getAttribute('href') }))
    );
    console.log('\n--- Links de campanhas encontrados ---');
    console.log(JSON.stringify(links, null, 2));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
