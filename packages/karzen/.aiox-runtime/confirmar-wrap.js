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
    const expandedAntes = await wrapBtn.getAttribute('aria-expanded');
    console.log('aria-expanded ANTES do clique:', expandedAntes);

    await wrapBtn.click({ timeout: 5000 });
    await page.waitForTimeout(600);

    const expandedDepois = await wrapBtn.getAttribute('aria-expanded');
    console.log('aria-expanded DEPOIS do clique:', expandedDepois);

    // Listar QUALQUER elemento com role=menu ou goog-menu visivel agora
    const menusVisiveis = await page.locator('.goog-menu:visible, [role="menu"]:visible').count();
    console.log('Menus/dropdowns visiveis agora:', menusVisiveis);

    if (menusVisiveis > 0) {
      const textos = await page.locator('.goog-menu:visible *:visible').allTextContents().catch(() => []);
      console.log('Textos visiveis no dropdown:', JSON.stringify(textos.filter(t => t.trim()).slice(0, 20)));
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
