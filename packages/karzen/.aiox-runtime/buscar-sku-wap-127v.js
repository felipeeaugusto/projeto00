// Busca pelo SKU WW2-127V (achado via reverse-lookup do MLB #6796952512) na aba de Anuncios.
// Extrai o texto completo dos resultados. So leitura.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-127V';

async function rolarPagina(page, vezes = 14) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

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
    await campo.fill(SKU_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await rolarPagina(page, 14);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const texto = await page.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const bloco = texto.slice(idxFiltrar, idxFiltrar + 6000);
    console.log(bloco);

    const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []))];
    console.log('\n\n=== MLBs encontrados nesse SKU: ===', todosMlbs.join(', '));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
