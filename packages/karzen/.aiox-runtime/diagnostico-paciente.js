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

    await irParaCelula(page, 'A1:C1');
    await page.waitForTimeout(300);

    // bringToFront pra garantir renderizacao completa antes do screenshot
    await page.bringToFront();
    await page.waitForTimeout(500);

    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(600);

    await page.screenshot({ path: path.resolve(__dirname, 'diag-menu-aberto.png'), timeout: 15000 }).catch(e => console.log('erro screenshot 1:', e.message));

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.click({ timeout: 5000 });
    console.log('Clicou. Esperando 3s antes de verificar...');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: path.resolve(__dirname, 'diag-apos-clique.png'), timeout: 15000 }).catch(e => console.log('erro screenshot 2:', e.message));

    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('B1', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    const valor = await nameBox.inputValue();
    console.log('Name Box apos ir pra B1 (esperando 3s antes de checar):', valor);

    // Checar tambem via texto da pagina se ha algum aviso/dialogo
    const bodyText = await page.locator('body').innerText();
    console.log('Contem "erro"?', bodyText.toLowerCase().includes('erro'));
    console.log('Contem "protegid"?', bodyText.toLowerCase().includes('protegid'));
    console.log('Contem "permiss"?', bodyText.toLowerCase().includes('permiss'));

  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
