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

    // Selecionar banner (A1) e checar formatacao real via painel lateral / toolbar
    await irParaCelula(page, 'A1');
    await page.waitForTimeout(400);

    // Ler o estado dos botoes de negrito e do campo de tamanho de fonte na toolbar
    const boldBtn = page.locator('[aria-label="Negrito (Ctrl+B)"], #t-bold-button, [aria-label*="Negrito"]').first();
    const boldPressed = await boldBtn.getAttribute('aria-pressed').catch(() => 'nao encontrado');
    console.log('Botao Negrito aria-pressed (banner A1):', boldPressed);

    const fontSizeInput = page.locator('#t-font-size, [aria-label*="Tamanho da fonte"]').first();
    const fontSizeValue = await fontSizeInput.textContent().catch(() => 'nao encontrado');
    console.log('Tamanho da fonte (banner A1):', fontSizeValue);

    // Checar wrap na coluna C (Titulo na Campanha) -- selecionar C7 (Panini, titulo longo)
    await irParaCelula(page, 'C7');
    await page.waitForTimeout(400);
    const wrapBtn = page.locator('[aria-label*="Ajuste de texto"], [aria-label*="Wrap"]').first();
    const wrapCount = await wrapBtn.count();
    console.log('Botao de Ajuste de texto encontrado:', wrapCount);
    if (wrapCount > 0) {
      const wrapPressed = await wrapBtn.getAttribute('aria-pressed').catch(() => null);
      console.log('Ajuste de texto aria-pressed (C7):', wrapPressed);
    }

    // Checar largura de colunas via getBoundingClientRect dos headers, comparando
    // uma coluna de dado (C = Titulo) com uma coluna espacadora (B = spacer)
    const larguras = await page.evaluate(() => {
      const headers = document.querySelectorAll('.column-headers-background .header-col, [role="columnheader"]');
      return Array.from(headers).slice(0, 10).map(h => ({ texto: h.textContent, largura: h.getBoundingClientRect().width }));
    }).catch(e => 'erro: ' + e.message);
    console.log('Larguras de coluna (amostra):', JSON.stringify(larguras));

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
