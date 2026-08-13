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

    // So navegar pra A1 (celula lider da mesclagem), sem especificar o range completo
    await irParaCelula(page, 'A1');
    await page.waitForTimeout(300);
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(400);
    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.hover({ timeout: 5000 });
    await page.waitForTimeout(400);
    const itemDesfazer = page.locator('.goog-menuitem', { hasText: 'Desfazer mesclagem' }).first();
    const disabled = await itemDesfazer.getAttribute('aria-disabled');
    console.log('aria-disabled do item Desfazer mesclagem (selecionando so A1):', disabled);

    if (disabled !== 'true') {
      await itemDesfazer.click({ timeout: 5000 });
      await page.waitForTimeout(400);
      console.log('Desmesclado com sucesso.');
    } else {
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
    }

    const c1 = await lerCelula(page, 'A1');
    const c2 = await lerCelula(page, 'C1');
    console.log('A1:', JSON.stringify(c1), ' C1:', JSON.stringify(c2));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
