const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_CAMPANHA = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357312967/dashboard?navigate_to=mercado_ads';
const TITULO_ALVO = 'Sanduicheira elétrica Kian Panini Linea Eletro';

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
    for (let i = 0; i < 10; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(650); }
    await page.waitForTimeout(1500);

    console.log('Clicando no filtro "Pausados"...');
    const botaoPausados = page.getByText('Pausados', { exact: true }).first();
    await botaoPausados.waitFor({ state: 'visible', timeout: 15000 });
    await botaoPausados.click();
    await page.waitForTimeout(4000);
    for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(650); }
    await page.waitForTimeout(1500);

    texto = await page.locator('body').innerText();
    console.log('Titulo alvo esta na pagina?', texto.includes(TITULO_ALVO));

    const elTitulo = page.getByText(TITULO_ALVO, { exact: true }).first();
    await elTitulo.waitFor({ state: 'visible', timeout: 10000 });
    await elTitulo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const linkVerVariacoes = elTitulo.locator('xpath=following::*[normalize-space(text())="Ver variações"][1]');
    console.log('Link "Ver variações" encontrado?', await linkVerVariacoes.count());
    await linkVerVariacoes.click();
    console.log('Aguardando o drawer abrir...');
    await page.waitForTimeout(3000);

    // Rolar DENTRO do drawer -- tentar rolar a pagina toda (o drawer geralmente ocupa boa parte da tela)
    console.log('Rolando dentro do drawer pra carregar todas as variacoes...');
    for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 800); await page.waitForTimeout(600); }
    await page.waitForTimeout(1500);

    const textoDrawer = await page.locator('body').innerText();
    const idxTituloDrawer = textoDrawer.lastIndexOf(TITULO_ALVO);
    console.log('\n--- Conteudo do drawer (5000 chars a partir do titulo) ---');
    console.log(textoDrawer.slice(idxTituloDrawer, idxTituloDrawer + 5000));

    const mlbsNoDrawer = [...new Set((textoDrawer.slice(idxTituloDrawer).match(/MLB\d{7,11}/g) || []))];
    console.log('\nMLBs encontrados no drawer:', mlbsNoDrawer.length);
    console.log(mlbsNoDrawer.join(', '));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
