const path = require('path');
const { chromium } = require('playwright');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1200);
    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill('WW2-220V');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const texto = await page.locator('body').innerText();
    const idx = texto.indexOf('4639741851');
    console.log(texto.slice(idx - 50, idx + 700));
    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
