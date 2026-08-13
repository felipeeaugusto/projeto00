const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function alturaLinha7(page) {
  return await page.evaluate(() => {
    // Header de linha "7" no grid do Sheets
    const rowHeaders = document.querySelectorAll('.row-header, [role="rowheader"]');
    for (const rh of rowHeaders) {
      if (rh.textContent.trim() === '7') {
        return rh.getBoundingClientRect().height;
      }
    }
    return null;
  });
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    const alturaAntes = await alturaLinha7(page);
    console.log('Altura da linha 7 ANTES:', alturaAntes);

    await irParaCelula(page, 'C7');
    await page.waitForTimeout(300);
    const wrapBtn = page.locator('[aria-label*="Ajuste de texto"]').first();
    await wrapBtn.click({ timeout: 5000 });
    await page.waitForTimeout(400);
    const ajustar = page.locator('[aria-label="Ajustar"]').first();
    await ajustar.click({ timeout: 5000 });
    await page.waitForTimeout(700);

    const alturaDepois = await alturaLinha7(page);
    console.log('Altura da linha 7 DEPOIS:', alturaDepois);
    console.log('Mudou?', alturaAntes !== alturaDepois);

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
