const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_CAMPANHA = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358239193/dashboard?navigate_to=mercado_ads';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_CAMPANHA);

    let texto = '';
    for (let t = 0; t < 8; t++) {
      await page.waitForTimeout(1500);
      texto = await page.locator('body').innerText();
      if (texto.length > 500) break;
    }
    console.log('URL:', page.url());
    console.log('Tamanho texto (1a leitura):', texto.length);

    // Esperar mais e rolar a pagina -- lista de produtos pode ser lazy-load
    for (let t = 0; t < 6; t++) {
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(800);
    }
    await page.waitForTimeout(2000);
    texto = await page.locator('body').innerText();
    console.log('Tamanho texto (apos rolar):', texto.length);

    // Procurar abas/links dentro da campanha (Anuncios, etc)
    const abas = await page.locator('a, button').evaluateAll((els) =>
      els.filter((el) => /an[uú]ncio/i.test(el.textContent || ''))
         .map((el) => ({ tag: el.tagName, texto: el.textContent.trim().slice(0,60), href: el.getAttribute('href') }))
    );
    console.log('\n--- Abas/links com "anuncio" ---');
    console.log(JSON.stringify(abas.slice(0,10), null, 2));

    // Clicar no filtro "Pausados"
    const botaoPausados = page.locator('text=Pausados').first();
    if (await botaoPausados.count() > 0) {
      await botaoPausados.click();
      await page.waitForTimeout(3000);
      for (let t = 0; t < 4; t++) { await page.mouse.wheel(0, 1000); await page.waitForTimeout(600); }
      const textoPausados = await page.locator('body').innerText();
      const idxLista2 = textoPausados.indexOf('anúncios patrocinados');
      console.log('\n--- Apos clicar em "Pausados" (2500 chars a partir do contador) ---');
      console.log(textoPausados.slice(Math.max(0, idxLista2 - 50), idxLista2 + 2500));
      console.log('\nPAUSADO no texto pos-filtro:', (textoPausados.match(/PAUSADO/gi) || []).length);
    } else {
      console.log('Botao "Pausados" nao encontrado');
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
