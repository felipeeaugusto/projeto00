const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

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

    await irParaCelula(page, 'C7');
    await page.waitForTimeout(300);

    const wrapBtn = page.locator('[aria-label*="Ajuste de texto"]').first();
    await wrapBtn.click({ timeout: 5000 });
    await page.waitForTimeout(600);

    const itensComLabel = await page.locator('.goog-menu:visible [aria-label], .goog-menu:visible [data-tooltip]').all();
    console.log(`Itens com aria-label/data-tooltip: ${itensComLabel.length}`);
    for (const el of itensComLabel) {
      const label = await el.getAttribute('aria-label').catch(() => null);
      const tooltip = await el.getAttribute('data-tooltip').catch(() => null);
      console.log(`  aria-label="${label}" data-tooltip="${tooltip}"`);
    }

    await page.keyboard.press('Escape');
    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
