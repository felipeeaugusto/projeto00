// Checa via "Alterar" os 3 MLBs do SKU WW2-220V que nao tem G/P/C/R explicito na listagem.
// Metodologia: COMPETINDO + secao "Concorrencia no Mercado Livre" existem -> catalogo.
// So leitura.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-220V';
const MLBS_PARA_CHECAR = ['4653317905', '4653317901', '6680169332'];

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

async function checarUmMlb(browser, context, mlb) {
  const page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
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

  const elExato = page.getByText(`#${mlb}`, { exact: true }).first();
  const count = await elExato.count();
  if (count === 0) { await page.close(); return { mlb, erro: 'elemento exato nao encontrado' }; }

  const linhaCard = elExato.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
  const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
  if (await botao3pontos.count() === 0) { await page.close(); return { mlb, erro: 'botao 3 pontinhos nao encontrado' }; }

  await botao3pontos.click();
  await page.waitForTimeout(700);
  const linkAlterar = page.locator('a', { hasText: 'Alterar' }).first();
  const href = await linkAlterar.getAttribute('href').catch(() => null);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  let resultado = { mlb, href };
  if (href) {
    const itemIdMatch = href.match(/itemId=MLB(\d+)/);
    resultado.itemIdNoHref = itemIdMatch ? itemIdMatch[1] : null;

    const urlCompleta = href.startsWith('http') ? href : `https://vendedores.mercadolivre.com.br${href}`;
    const pageAlterar = await openBackgroundPage(browser, context, urlCompleta);
    await pageAlterar.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    await pageAlterar.waitForTimeout(2500);
    const textoAlt = await pageAlterar.locator('body').innerText();
    resultado.temCompetindo = textoAlt.includes('COMPETINDO');
    const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
    resultado.temSecaoConcorrencia = idxConc !== -1;
    resultado.trechoConc = idxConc !== -1 ? textoAlt.slice(idxConc, idxConc + 300) : null;
    await pageAlterar.close();
  }

  await page.close();
  return resultado;
}

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    const resultados = {};
    for (const mlb of MLBS_PARA_CHECAR) {
      console.log(`\n=== Checando ${mlb} isoladamente ===`);
      const r = await checarUmMlb(browser, context, mlb);
      console.log(JSON.stringify(r, null, 2));
      resultados[mlb] = r;
    }

    console.log('\n\n=== RESULTADO FINAL ===');
    for (const [mlb, r] of Object.entries(resultados)) {
      if (r.erro) { console.log(`MLB ${mlb}: ERRO -- ${r.erro}`); continue; }
      const catalogo = r.temCompetindo && r.temSecaoConcorrencia;
      console.log(`MLB ${mlb}: ${catalogo ? 'CATALOGO' : 'PAI (descartar)'} -- itemId real: ${r.itemIdNoHref}, temCompetindo: ${r.temCompetindo}, temConcorrencia: ${r.temSecaoConcorrencia}`);
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
