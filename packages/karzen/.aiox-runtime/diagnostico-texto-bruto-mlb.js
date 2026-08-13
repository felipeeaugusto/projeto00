// Diagnostico: mostra o texto BRUTO que o script captura pra cada MLB do SKU
// SPANK-R-220V, sem interpretar nada -- so leitura, nao escreve em lugar nenhum.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'SPANK-R-220V';

async function rolarPagina(page, vezes = 10) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(600); }
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
    await rolarPagina(page, 10);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const texto = await page.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

    const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []).map(x => x.replace('#','')))];
    console.log('MLBs encontrados nessa busca:', todosMlbs);

    for (const mlb of todosMlbs) {
      const idxMlb = bloco.indexOf(`#${mlb}`);
      const proximoMlbIdx = bloco.slice(idxMlb + 1).search(/#\d{7,11}/);
      const blocoMlb = proximoMlbIdx !== -1
        ? bloco.slice(idxMlb, idxMlb + 1 + proximoMlbIdx)
        : bloco.slice(idxMlb);

      console.log(`\n\n========== TEXTO BRUTO CAPTURADO PARA MLB ${mlb} (${blocoMlb.length} caracteres) ==========`);
      console.log(blocoMlb);
      console.log('========== FIM DO BLOCO ==========');
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
