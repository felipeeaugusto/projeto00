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

    await irParaCelula(page, 'A7:A11');
    await page.waitForTimeout(300);

    // Abrir menu "Formatar"
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    // Procurar item "Mesclar células" no menu aberto
    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    const existeItem = await itemMesclar.count();
    console.log('Item "Mesclar células" encontrado no menu Formatar:', existeItem);
    if (existeItem > 0) {
      await itemMesclar.click({ timeout: 5000 });
      await page.waitForTimeout(500);
      // Deve abrir submenu -- procurar "Mesclar tudo"
      const submenuTudo = page.locator('.goog-menuitem', { hasText: 'Mesclar tudo' }).first();
      const existeSubmenu = await submenuTudo.count();
      console.log('Submenu "Mesclar tudo" encontrado:', existeSubmenu);
      if (existeSubmenu > 0) {
        await submenuTudo.click({ timeout: 5000 });
        await page.waitForTimeout(800);
      }
    }

    const valorA7 = await lerCelula(page, 'A7');
    const valorA9 = await lerCelula(page, 'A9');
    console.log('Apos mesclar via menu -- A7:', JSON.stringify(valorA7), ' A9:', JSON.stringify(valorA9));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
