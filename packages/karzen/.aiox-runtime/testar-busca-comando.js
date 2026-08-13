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

    await irParaCelula(page, 'A1');
    await page.waitForTimeout(300);

    await page.keyboard.press('Alt+/');
    await page.waitForTimeout(600);
    await page.keyboard.type('Desfazer mesclagem', { delay: 50 });
    await page.waitForTimeout(700);

    const bodyText = await page.locator('body').innerText();
    const temOpcao = bodyText.includes('Desfazer mesclagem');
    console.log('Encontrou "Desfazer mesclagem" na busca de menus?', temOpcao);

    if (temOpcao) {
      const opcao = page.locator('*', { hasText: 'Desfazer mesclagem' }).last();
      // Tentar Enter direto, que geralmente executa o primeiro resultado da busca de menus
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
    } else {
      await page.keyboard.press('Escape');
    }

    console.log('A1:', JSON.stringify(await lerCelula(page, 'A1')));
    console.log('C1:', JSON.stringify(await lerCelula(page, 'C1')));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
