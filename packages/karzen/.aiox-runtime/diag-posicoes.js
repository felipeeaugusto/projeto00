// Diagnostico: mostra a posicao (Y) de CADA botao "Acoes secundarias" e a posicao
// do texto exato "#4653317905", pra confirmar visualmente o alinhamento antes de
// automatizar o clique. So leitura, screenshot pra eu ver.
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
    const boxTexto = await elExato.boundingBox();
    console.log('Box do texto #4653317905:', JSON.stringify(boxTexto));

    const todosBotoes = page.locator('button[aria-label="Ações secundárias"]');
    const qtd = await todosBotoes.count();
    console.log('Qtd de botoes na pagina:', qtd);
    for (let i = 0; i < qtd; i++) {
      const box = await todosBotoes.nth(i).boundingBox().catch(() => null);
      console.log(`  botao[${i}] box=${JSON.stringify(box)}`);
    }

    await page.screenshot({ path: path.resolve(__dirname, 'diag-posicoes-screenshot.png'), fullPage: false });
    console.log('Screenshot salvo.');

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (page) await page.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
