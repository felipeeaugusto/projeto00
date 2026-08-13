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

    await page.bringToFront();
    await page.waitForTimeout(300);

    await irParaCelula(page, 'A1');
    await page.waitForTimeout(300);
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.hover({ timeout: 5000 });
    await page.waitForTimeout(600);

    const itensAgora = await page.locator('.goog-menuitem').allTextContents();
    console.log('Itens apos hover (com bringToFront):', JSON.stringify(itensAgora.filter(t => /mescl/i.test(t))));

    const itemDesfazer = page.locator('.goog-menuitem', { hasText: 'Desfazer mesclagem' }).first();
    if (await itemDesfazer.count() > 0) {
      const disabled = await itemDesfazer.getAttribute('aria-disabled');
      console.log('aria-disabled:', disabled);
      if (disabled !== 'true') {
        await itemDesfazer.click({ timeout: 5000 });
        await page.waitForTimeout(500);
        console.log('Desmesclado.');
      }
    } else {
      await page.keyboard.press('Escape');
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
