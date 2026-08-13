// v6: versao final e robusta -- indice posicional do botao + delay extra antes de
// buscar o item "Alterar" (o timing curto estava causando falsos negativos) +
// lida com navegacao na MESMA aba (nao so nova aba). Reusavel pra qualquer MLB/indice.
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
  await page.waitForTimeout(500);
  await botaoAlvo.click();
  await page.waitForTimeout(1500); // delay extra -- essencial, timing curto dava falso negativo

  const candidato = page.locator('*').filter({ hasText: /^Alterar$/ }).last();
  if (await candidato.count() === 0) {
    await page.keyboard.press('Escape');
    await page.close();
    return { mlb, erro: 'item Alterar nao encontrado mesmo com delay extra' };
  }

  const [novaPagina] = await Promise.all([
    context.waitForEvent('page', { timeout: 6000 }).catch(() => null),
    candidato.click(),
  ]);
  await page.waitForTimeout(1500);

  const pageDestino = novaPagina || page;
  await pageDestino.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  await pageDestino.waitForTimeout(1500);
  const urlFinal = pageDestino.url();
  const itemIdMatch = urlFinal.match(/item_id=MLB(\d+)/i) || urlFinal.match(/itemId=MLB(\d+)/i);
  const itemIdNaUrl = itemIdMatch ? itemIdMatch[1] : null;

  const textoAlt = await pageDestino.locator('body').innerText();
  const temCompetindo = textoAlt.includes('COMPETINDO');
  const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
  const temSecaoConcorrencia = idxConc !== -1;
  const trechoConc = temSecaoConcorrencia ? textoAlt.slice(idxConc, idxConc + 250) : null;

  if (novaPagina) await novaPagina.close();
  else await page.close();

  return { mlb, indice, urlFinal, itemIdNaUrl, bateComSiMesmo: itemIdNaUrl === mlb, temCompetindo, temSecaoConcorrencia, trechoConc };
}

// WW2-220V card1[#4639741851(idx0,Classico,ja explicito GANHANDO), #4653317905(idx1,Premium)]
//         card2[#4653317901(idx2,Premium), #6680169332(idx3,Classico)]
// WW2-127V card1[#6796950300(idx0,Classico,explicito PERDENDO), #6796952512(idx1,Premium,explicito PERDENDO)]
//          card2[#6796916178(idx2,Classico), #6796918550(idx3,Premium)]
const CHECAGENS = [
  { sku: 'WW2-220V', mlb: '4653317901', indice: 2 },
  { sku: 'WW2-220V', mlb: '6680169332', indice: 3 },
  { sku: 'WW2-127V', mlb: '6796916178', indice: 2 },
  { sku: 'WW2-127V', mlb: '6796918550', indice: 3 },
];

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    const resultados = {};
    for (const { sku, mlb, indice } of CHECAGENS) {
      console.log(`\n=== Checando ${mlb} (SKU ${sku}, indice ${indice}) ===`);
      const r = await checarPorIndice(browser, context, sku, mlb, indice);
      console.log(JSON.stringify(r, null, 2));
      resultados[mlb] = r;
    }

    console.log('\n\n=== RESULTADO FINAL (v6, robusto) ===');
    for (const [mlb, r] of Object.entries(resultados)) {
      if (r.erro) { console.log(`MLB ${mlb}: ERRO -- ${r.erro}`); continue; }
      const catalogo = r.temCompetindo && r.temSecaoConcorrencia;
      console.log(`MLB ${mlb}: ${catalogo ? 'CATALOGO' : 'PAI (descartar)'} -- bateComSiMesmo=${r.bateComSiMesmo}, temCompetindo=${r.temCompetindo}, temConcorrencia=${r.temSecaoConcorrencia}`);
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
