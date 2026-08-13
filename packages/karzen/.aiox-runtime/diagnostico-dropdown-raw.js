// Diagnostico v3: apos clicar no botao de 3 pontinhos, tira screenshot e dump do
// texto visivel da tela inteira, pra ver exatamente o que apareceu.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-220V';
const MLB_TESTE = '4653317905';

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

    const elExato = page.getByText(`#${MLB_TESTE}`, { exact: true }).first();
    await elExato.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const linhaCard = elExato.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').last();
    const qtdBotoes = await linhaCard.locator('button[aria-label="Ações secundárias"]').count();
    console.log('Qtd de botoes 3-pontinhos dentro da linha (deveria ser 1):', qtdBotoes);

    const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
    await botao3pontos.click();
    await page.waitForTimeout(1200);

    await page.screenshot({ path: path.resolve(__dirname, 'dropdown-screenshot.png'), fullPage: false });
    console.log('Screenshot salvo em dropdown-screenshot.png');

    const bodyTexto = await page.locator('body').innerText();
    const idx = bodyTexto.indexOf('Ações secundárias');
    console.log('=== Texto perto do dropdown (se achou marcador) ===');
    console.log(bodyTexto.length);

    // Procura qualquer coisa parecida com "Alterar" (case insensitive, parcial)
    const candidatosAlterar = page.locator(':visible', { hasText: /^Alterar$/i });
    console.log('Elementos visiveis com texto batendo /^Alterar$/i:', await candidatosAlterar.count());

    const candidatosParcial = page.locator(':visible', { hasText: /Alterar/i });
    const qtdParcial = await candidatosParcial.count();
    console.log('Elementos visiveis contendo "Alterar" (parcial):', qtdParcial);
    for (let i = 0; i < Math.min(qtdParcial, 15); i++) {
      const el = candidatosParcial.nth(i);
      const tag = await el.evaluate(e => e.tagName).catch(() => '?');
      const txt = (await el.innerText().catch(() => '')).slice(0, 60).replace(/\n/g, ' | ');
      console.log(`  [${i}] tag=${tag} texto="${txt}"`);
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
