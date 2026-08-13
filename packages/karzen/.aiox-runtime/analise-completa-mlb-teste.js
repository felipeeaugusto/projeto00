// Analise completa, so leitura, do MLB 4302286661 (SKU AP-40-R-127V) -- aplicando o
// processo entendido: MLB por MLB, isolado, sem olhar "sincronizado".
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'AP-40-R-127V';
const MLB_ALVO = '4302286661';

async function rolarPagina(page, vezes = 10) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await rolarPagina(page, 12);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const texto = await page.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

    // Achar o bloco proprio do MLB alvo -- ate o proximo "#numero" que esteja no
    // INICIO de uma linha (ignora mencoes tipo "Sincronizado com #X" no meio do texto)
    const idxMlb = bloco.indexOf(`#${MLB_ALVO}`);
    if (idxMlb === -1) throw new Error('MLB nao encontrado na busca -- SKU pode ter mudado');

    const resto = bloco.slice(idxMlb + 1);
    const matchProximo = resto.match(/\n#\d{7,11}/);
    const blocoMlb = matchProximo
      ? resto.slice(0, matchProximo.index + 1)
      : resto;

    console.log('=== TEXTO BRUTO CAPTURADO PARA', MLB_ALVO, '===\n');
    console.log(blocoMlb);
    console.log('\n=== FIM DO BLOCO ===');

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
