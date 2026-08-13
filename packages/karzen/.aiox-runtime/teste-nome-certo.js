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
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    await irParaCelula(page, 'V540:X542');
    await page.waitForTimeout(300);

    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    // Nome certo: "Mesclar todas" (exact match pra nao confundir com "Mesclar células")
    const mesclarTodas = page.locator('.goog-menuitem').filter({ hasText: /^Mesclar todas$/ }).first();
    const count = await mesclarTodas.count();
    console.log('Item "Mesclar todas" encontrado:', count);
    if (count > 0) {
      await mesclarTodas.click({ timeout: 5000 });
      await page.waitForTimeout(800);
      console.log('Clicou em "Mesclar todas".');
    }

    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('W541', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const valor = await nameBox.inputValue();
    const mesclou = valor !== 'W541';
    console.log(`RESULTADO: mesclou de verdade? ${mesclou} (Name Box: "${valor}")`);

    await irParaCelula(page, 'V540:X542');
    await page.waitForTimeout(200);
    await page.keyboard.press('Control+\\');
    await page.waitForTimeout(300);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);

    console.log(`\n>>> TESTE ${mesclou ? 'PASSOU' : 'FALHOU'} <<<`);

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
