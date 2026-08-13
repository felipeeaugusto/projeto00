const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    await page.waitForTimeout(1000);

    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(300);
    await page.keyboard.type('AB1', { delay: 60 });
    await page.waitForTimeout(400);

    // Ver o valor atual da name box ANTES de apertar Enter
    const valorNameBox = await nameBox.inputValue().catch(() => 'N/A (nao e input)');
    console.log('Valor da Name Box antes do Enter:', valorNameBox);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);

    const bodyText = await page.locator('body').innerText();
    const temErro = bodyText.includes('Ocorreu um erro');
    console.log('Tem "Ocorreu um erro"?', temErro);
    if (temErro) {
      const idx = bodyText.indexOf('Ocorreu um erro');
      console.log('Contexto do erro:', bodyText.slice(Math.max(0,idx-200), idx+300));
    }

    await page.screenshot({ path: path.resolve(__dirname, 'diagnostico-sheets-erro.png') });
    console.log('Screenshot salvo.');

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
