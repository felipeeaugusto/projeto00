// Diagnostico: buscar 1 MLB do Wap W2 4.17L na aba de Anuncios e ver o texto ao redor
// da linha (pra descobrir onde o SKU aparece na listagem, se aparece). So leitura.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const MLB_TESTE = '6796952512';

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(MLB_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    const texto = await page.locator('body').innerText();
    const idx = texto.indexOf(MLB_TESTE);
    console.log('=== Trecho ao redor do MLB (800 chars antes, 1500 depois) ===');
    console.log(texto.slice(Math.max(0, idx - 800), idx + 1500));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
