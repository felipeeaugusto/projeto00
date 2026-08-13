const { chromium } = require('playwright');
const path = require('path');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_CAMPANHA_AVA = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357312967/dashboard?navigate_to=mercado_ads';
const TITULO_PRODUTO = 'Aspirador extrator Tambor Wap Spot Cleaner W2 4.17L';

async function rolarPagina(page, vezes = 10) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(600); }
}

(async () => {
  let browser;
  let pageCampanha;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
    pageCampanha = await openBackgroundPage(browser, context, URL_CAMPANHA_AVA);

    let texto = '';
    for (let t = 0; t < 10; t++) {
      await pageCampanha.waitForTimeout(1500);
      texto = await pageCampanha.locator('body').innerText();
      if (texto.length > 500) break;
    }
    await rolarPagina(pageCampanha, 10);
    await pageCampanha.waitForTimeout(1500);

    const botaoPausados = pageCampanha.getByText('Pausados', { exact: true }).first();
    await botaoPausados.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    if (await botaoPausados.count() > 0) {
      await botaoPausados.click();
      await pageCampanha.waitForTimeout(4000);
      await rolarPagina(pageCampanha, 14);
      await pageCampanha.waitForTimeout(1500);
    }

    // Confirmar que o produto existe na lista de pausados
    const elTitulo = pageCampanha.getByText(TITULO_PRODUTO, { exact: true }).first();
    const existe = await elTitulo.count();
    console.log('Produto encontrado na lista de Pausados?', existe > 0);

    if (existe > 0) {
      await elTitulo.scrollIntoViewIfNeeded();
      await pageCampanha.waitForTimeout(800);
      const linkVerVariacoes = elTitulo.locator('xpath=following::*[normalize-space(text())="Ver variações"][1]');
      await linkVerVariacoes.click();
      await pageCampanha.waitForTimeout(2500);
      await rolarPagina(pageCampanha, 10);
      await pageCampanha.waitForTimeout(1000);

      const textoDrawer = await pageCampanha.locator('body').innerText();
      const idxTitulo = textoDrawer.lastIndexOf(TITULO_PRODUTO);
      const mlbsNoDrawer = [...new Set((textoDrawer.slice(idxTitulo).match(/MLB\d{7,11}/g) || []).map(m => m.replace('MLB','')))];
      console.log('MLBs no drawer:', mlbsNoDrawer.length, '-', mlbsNoDrawer.join(', '));

      await pageCampanha.keyboard.press('Escape').catch(() => {});
    }

    await pageCampanha.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (pageCampanha) await pageCampanha.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
