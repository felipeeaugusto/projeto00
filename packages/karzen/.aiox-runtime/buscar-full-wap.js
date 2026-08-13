// Busca os 2 SKUs de novo e extrai especificamente as linhas "Full:" e "Deposito:"
// de cada card, que faltaram na tabela anterior. So leitura.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

async function rolarPagina(page, vezes = 14) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

async function buscarSku(browser, context, sku) {
  const page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
  await page.waitForTimeout(1200);
  const campo = page.locator(SELETOR_BUSCA).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(sku);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await rolarPagina(page, 14);
  await page.mouse.wheel(0, -20000);
  await page.waitForTimeout(500);
  const texto = await page.locator('body').innerText();
  await page.close();
  return texto;
}

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    for (const sku of ['WW2-127V', 'WW2-220V']) {
      console.log(`\n\n########## SKU ${sku} ##########`);
      const texto = await buscarSku(browser, context, sku);
      const idxFiltrar = texto.indexOf('Filtrar e ordenar');
      const bloco = texto.slice(idxFiltrar, idxFiltrar + 6000);

      // Extrai cada trecho "SKU {sku}" ate "Depósito:\n{valor}" pra pegar Full e Deposito juntos
      const regexBlocoCard = /SKU [\s\S]{0,400}?Depósito:\n([^\n]+)/g;
      let m;
      let i = 0;
      while ((m = regexBlocoCard.exec(bloco)) !== null) {
        i++;
        const trecho = m[0];
        const fullMatch = trecho.match(/Full:\s*\n?([^\n⚠]+)/);
        console.log(`--- Card ${i} ---`);
        console.log('Full:', fullMatch ? fullMatch[1].trim() : '(nao encontrado / nao tem Full)');
        console.log('Depósito:', m[1].trim());
      }
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
