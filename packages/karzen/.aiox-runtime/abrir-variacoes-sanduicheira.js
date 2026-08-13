const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_CAMPANHA = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357312967/dashboard?navigate_to=mercado_ads';
const TITULO_ALVO = 'Sanduicheira elétrica Kian ELETRO Sanduicheira e Grill 24500';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_CAMPANHA);

    console.log('Aguardando pagina carregar...');
    await page.waitForTimeout(3000);
    let texto = await page.locator('body').innerText();
    for (let t = 0; t < 10 && texto.length < 500; t++) {
      await page.waitForTimeout(1500);
      texto = await page.locator('body').innerText();
    }

    console.log('Rolando a pagina...');
    for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 1000); await page.waitForTimeout(700); }
    await page.waitForTimeout(2000);

    console.log('Clicando no filtro "Pausados"...');
    const botaoPausados = page.getByText('Pausados', { exact: true }).first();
    await botaoPausados.waitFor({ state: 'visible', timeout: 15000 });
    await botaoPausados.click();
    await page.waitForTimeout(4000);
    for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 1000); await page.waitForTimeout(700); }
    await page.waitForTimeout(2000);

    texto = await page.locator('body').innerText();
    console.log('Titulo alvo esta na pagina?', texto.includes(TITULO_ALVO));

    // Localizar o elemento de texto exato do titulo, depois o "Ver variações" logo a seguir no DOM
    const elTitulo = page.getByText(TITULO_ALVO, { exact: true }).first();
    await elTitulo.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Titulo encontrado e visivel na tela.');

    const linkVerVariacoes = elTitulo.locator('xpath=following::*[normalize-space(text())="Ver variações"][1]');
    const existeLink = await linkVerVariacoes.count();
    console.log('Link "Ver variações" logo apos o titulo, encontrado?', existeLink);

    if (existeLink > 0) {
      await linkVerVariacoes.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      console.log('Clicando em "Ver variações"...');
      await linkVerVariacoes.click();
      console.log('Aguardando o painel/drawer abrir...');
      await page.waitForTimeout(3000);

      const textoDepois = await page.locator('body').innerText();
      const idxTituloDrawer = textoDepois.lastIndexOf(TITULO_ALVO);
      console.log('\n--- Conteudo do drawer (a partir do titulo repetido, 3000 chars) ---');
      console.log(textoDepois.slice(idxTituloDrawer, idxTituloDrawer + 3000));
      console.log('\nTamanho total do texto:', textoDepois.length, '| posicao do titulo no drawer:', idxTituloDrawer);
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
