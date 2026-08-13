// Diagnostico: clica no botao[indice] e faz dump do HTML de qualquer elemento com
// role=menu ou similar, pra achar o seletor certo do item "Alterar".
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-220V';
const INDICE = 1;

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1200);

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await rolarPagina(page, 12);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const todosBotoes = page.locator('button[aria-label="Ações secundárias"]');
    const botaoAlvo = todosBotoes.nth(INDICE);
    await botaoAlvo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await botaoAlvo.click();
    await page.waitForTimeout(1200);

    await page.screenshot({ path: path.resolve(__dirname, 'diag-dropdown-html-screenshot.png'), fullPage: false });
    console.log('Screenshot salvo.');

    // Dump de qualquer elemento com role de menu
    const menus = page.locator('[role="menu"], [role="listbox"], [class*="dropdown"], [class*="menu"]');
    const qtdMenus = await menus.count();
    console.log('Elementos candidatos a menu:', qtdMenus);
    for (let i = 0; i < Math.min(qtdMenus, 10); i++) {
      const el = menus.nth(i);
      const visivel = await el.isVisible().catch(() => false);
      if (!visivel) continue;
      const tag = await el.evaluate(e => e.tagName).catch(() => '?');
      const cls = await el.getAttribute('class').catch(() => '');
      const txt = (await el.innerText().catch(() => '')).slice(0, 200).replace(/\n/g, ' | ');
      console.log(`[${i}] tag=${tag} class="${cls}" texto="${txt}"`);
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (page) await page.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
