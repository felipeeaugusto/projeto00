const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU = 'SPANK-220V';
const MLB_A_VERIFICAR = '6929868116';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    const fecharDrawer = page.locator('button[aria-label="Cerrar"]');
    if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await page.waitForTimeout(500); }

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    // Achar o card do MLB a verificar, clicar nos 3 pontinhos, achar "Alterar"
    const elMlb = page.locator(`text=#${MLB_A_VERIFICAR}`).first();
    const linhaCard = elMlb.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
    const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
    console.log('Botao 3 pontinhos encontrado?', await botao3pontos.count());
    await botao3pontos.click();
    await page.waitForTimeout(800);
    const linkAlterar = page.locator('a', { hasText: 'Alterar' }).first();
    const href = await linkAlterar.getAttribute('href').catch(() => null);
    console.log('Href do Alterar:', href);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    if (!href) { console.log('Nao achei o link Alterar. Parando.'); return; }
    const urlCompleta = href.startsWith('http') ? href : `https://vendedores.mercadolivre.com.br${href}`;
    const pageAlterar = await openBackgroundPage(context.browser(), context, urlCompleta);
    await pageAlterar.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    await pageAlterar.waitForTimeout(2500);

    const textoAlt = await pageAlterar.locator('body').innerText();
    const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
    console.log('\nSecao "Concorrência no Mercado Livre" existe?', idxConc !== -1);
    if (idxConc !== -1) {
      console.log('\n--- Trecho da secao (900 chars) ---');
      console.log(textoAlt.slice(idxConc, idxConc + 900));
    }
    await pageAlterar.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
