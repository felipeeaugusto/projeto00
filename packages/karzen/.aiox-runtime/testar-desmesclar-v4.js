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
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    const box = await itemMesclar.boundingBox();
    console.log('BoundingBox do item Mesclar celulas:', JSON.stringify(box));

    if (box) {
      // Mover o mouse de verdade pra dentro do item, com um pequeno movimento em 2 etapas
      await page.mouse.move(box.x + 5, box.y + box.height / 2);
      await page.waitForTimeout(200);
      await page.mouse.move(box.x + box.width - 5, box.y + box.height / 2, { steps: 5 });
      await page.waitForTimeout(700);
    }

    const itensAgora = await page.locator('.goog-menuitem').allTextContents();
    console.log('Itens apos mouse.move:', JSON.stringify(itensAgora.filter(t => /mescl/i.test(t))));

    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
