// v4: usa INDICE posicional do botao (0-based, na ordem em que os MLBs aparecem
// no cabecalho de cada card, de cima pra baixo) em vez de heuristica de texto/classe/
// distancia -- que se mostraram nao-confiaveis. O indice bate com a ordem real dos
// <button aria-label="Ações secundárias"> no DOM, 1 por linha/condicao.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

async function checarPorIndice(browser, context, sku, mlb, indice) {
  const page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
  await page.waitForTimeout(1200);

  const campo = page.locator(SELETOR_BUSCA).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(sku);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await rolarPagina(page, 12);
  await page.mouse.wheel(0, -20000);
  await page.waitForTimeout(500);

  const todosBotoes = page.locator('button[aria-label="Ações secundárias"]');
  const qtd = await todosBotoes.count();
  if (indice >= qtd) { await page.close(); return { mlb, erro: `indice ${indice} fora do range (qtd=${qtd})` }; }

  const botaoAlvo = todosBotoes.nth(indice);
  await botaoAlvo.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await botaoAlvo.click();
  await page.waitForTimeout(1000);

  const itemAlterar = page.locator(':visible', { hasText: /^Alterar$/ }).last();
  if (await itemAlterar.count() === 0) {
    await page.keyboard.press('Escape');
    await page.close();
    return { mlb, erro: 'item Alterar nao encontrado' };
  }

  const [novaPagina] = await Promise.all([
    context.waitForEvent('page', { timeout: 8000 }).catch(() => null),
    itemAlterar.click(),
  ]);
  await page.waitForTimeout(1500);

  let urlFinal, pageAlterar = null;
  if (novaPagina) {
    await novaPagina.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    await novaPagina.waitForTimeout(1500);
    urlFinal = novaPagina.url();
    pageAlterar = novaPagina;
  } else {
    urlFinal = page.url();
  }

  const itemIdMatch = urlFinal.match(/item_id=MLB(\d+)/i) || urlFinal.match(/itemId=MLB(\d+)/i);
  const itemIdNaUrl = itemIdMatch ? itemIdMatch[1] : null;

  let temCompetindo = null, temSecaoConcorrencia = null;
  if (pageAlterar) {
    const textoAlt = await pageAlterar.locator('body').innerText();
    temCompetindo = textoAlt.includes('COMPETINDO');
    temSecaoConcorrencia = textoAlt.indexOf('Concorrência no Mercado Livre') !== -1;
    await pageAlterar.close();
  }

  await page.close();
  return { mlb, indice, urlFinal, itemIdNaUrl, bateComSiMesmo: itemIdNaUrl === mlb, temCompetindo, temSecaoConcorrencia };
}

// SKU WW2-220V: card1[#4639741851(idx0,Classico), #4653317905(idx1,Premium)],
//               card2[#4653317901(idx2,Premium), #6680169332(idx3,Classico)]
const CHECAGENS = [
  { sku: 'WW2-220V', mlb: '4653317905', indice: 1 },
];

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    for (const { sku, mlb, indice } of CHECAGENS) {
      console.log(`\n=== Checando ${mlb} (SKU ${sku}, indice ${indice}) ===`);
      const r = await checarPorIndice(browser, context, sku, mlb, indice);
      console.log(JSON.stringify(r, null, 2));
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
