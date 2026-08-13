const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    // Ultima linha com dado real via Ctrl+End
    await irParaCelula(page, 'A1');
    await page.keyboard.press('Control+End');
    await page.waitForTimeout(500);
    const extensao = await page.locator('#t-name-box').inputValue().catch(() => null);
    console.log('Extensao final (Ctrl+End):', extensao);

    // Amostra do meio e do fim
    for (const cel of ['A51', 'B51', 'C51', 'D51', 'E51', 'A53', 'C53', 'A103', 'C103']) {
      const v = await lerCelula(page, cel);
      console.log(`  ${cel}: [${v}]`);
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
