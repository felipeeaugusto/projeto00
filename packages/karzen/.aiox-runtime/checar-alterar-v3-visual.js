// v3: escopo por proximidade VISUAL (nao por classe CSS ambigua). Acha o botao de
// 3 pontinhos cujo centro Y esteja mais perto do centro Y do texto exato "#MLB".
// Clica nele, pega o item de menu "Alterar" mais proximo do clique, abre o href.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

async function checarUmMlb(browser, context, sku, mlb) {
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

  const elExato = page.getByText(`#${mlb}`, { exact: true }).first();
  if (await elExato.count() === 0) { await page.close(); return { mlb, erro: 'elemento exato nao encontrado' }; }
  await elExato.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const boxTexto = await elExato.boundingBox();
  if (!boxTexto) { await page.close(); return { mlb, erro: 'sem boundingBox do texto' }; }
  const centroYTexto = boxTexto.y + boxTexto.height / 2;

  const todosBotoes = page.locator('button[aria-label="Ações secundárias"]');
  const qtdBotoes = await todosBotoes.count();
  let melhorBotao = null;
  let melhorDist = Infinity;
  let melhorIdx = -1;
  for (let i = 0; i < qtdBotoes; i++) {
    const btn = todosBotoes.nth(i);
    const box = await btn.boundingBox().catch(() => null);
    if (!box) continue;
    const centroY = box.y + box.height / 2;
    const dist = Math.abs(centroY - centroYTexto);
    if (dist < melhorDist) { melhorDist = dist; melhorBotao = btn; melhorIdx = i; }
  }
  if (!melhorBotao) { await page.close(); return { mlb, erro: 'nenhum botao 3-pontinhos encontrado' }; }

  await melhorBotao.click();
  await page.waitForTimeout(1000);

  // Item de menu "Alterar" -- qualquer tag, texto exato, visivel
  const itemAlterar = page.locator(':visible', { hasText: /^Alterar$/ }).last();
  const qtdAlterar = await itemAlterar.count();
  if (qtdAlterar === 0) {
    await page.keyboard.press('Escape');
    await page.close();
    return { mlb, erro: 'item de menu Alterar nao encontrado apos clique', melhorIdx, distanciaPx: melhorDist };
  }

  const [novaPagina] = await Promise.all([
    context.waitForEvent('page', { timeout: 8000 }).catch(() => null),
    itemAlterar.click(),
  ]);
  await page.waitForTimeout(1500);

  let urlFinal = null;
  let pageAlterar = null;
  if (novaPagina) {
    await novaPagina.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    await novaPagina.waitForTimeout(1500);
    urlFinal = novaPagina.url();
    pageAlterar = novaPagina;
  } else {
    urlFinal = page.url();
  }

  const itemIdMatch = urlFinal.match(/item_id=MLB(\d+)/i) || urlFinal.match(/itemId=MLB(\d+)/i);
  const itemIdNoUrl = itemIdMatch ? itemIdMatch[1] : null;

  let temCompetindo = null, temSecaoConcorrencia = null;
  if (pageAlterar) {
    const textoAlt = await pageAlterar.locator('body').innerText();
    temCompetindo = textoAlt.includes('COMPETINDO');
    temSecaoConcorrencia = textoAlt.indexOf('Concorrência no Mercado Livre') !== -1;
    await pageAlterar.close();
  } else {
    await page.goBack().catch(() => {});
  }

  await page.close();
  return { mlb, distanciaPx: melhorDist, urlFinal, itemIdNoUrl, bateComSiMesmo: itemIdNoUrl === mlb, temCompetindo, temSecaoConcorrencia };
}

const CHECAGENS = [
  { sku: 'WW2-220V', mlb: '4653317905' },
];

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    for (const { sku, mlb } of CHECAGENS) {
      console.log(`\n=== Checando ${mlb} (SKU ${sku}) via escopo visual ===`);
      const r = await checarUmMlb(browser, context, sku, mlb);
      console.log(JSON.stringify(r, null, 2));
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
