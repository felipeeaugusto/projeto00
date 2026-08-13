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

    // Clicar no botao de Ajuste de texto na toolbar
    const wrapBtn = page.locator('[aria-label*="Ajuste de texto"]').first();
    await wrapBtn.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itensWrap = await page.locator('.goog-menuitem:visible').allTextContents().catch(() => []);
    console.log('Itens visiveis apos clicar em Ajuste de texto:', JSON.stringify(itensWrap.filter(t => t)));

    // Procurar "Ajustar" ou "Quebrar" no dropdown
    const opcaoQuebrar = page.locator('.goog-menuitem', { hasText: /^Ajustar$/ }).first();
    const countQuebrar = await opcaoQuebrar.count();
    console.log('Opcao "Ajustar" encontrada:', countQuebrar);

    if (countQuebrar > 0) {
      await opcaoQuebrar.click({ timeout: 5000 });
      await page.waitForTimeout(500);
      console.log('Clicou em Ajustar.');
    } else {
      await page.keyboard.press('Escape');
    }

    // Validar via style computado da celula
    const wrapAplicado = await page.evaluate(() => {
      // Procurar a celula ativa/selecionada no grid
      const el = document.querySelector('.cell-input, .waffle-active-cell-border, [role="gridcell"].active');
      return el ? window.getComputedStyle(el).whiteSpace : 'elemento nao encontrado';
    }).catch(e => 'erro: ' + e.message);
    console.log('whiteSpace computado:', wrapAplicado);

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
