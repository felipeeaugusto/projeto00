// Reprocessa CKESSTC-ITA5Q com os MLBs de catalogo confirmados pelo Felipe
// (o extrator nao reconhecia "Restrito para ganhar" como status de catalogo valido).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_ADS = 'https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads';
const SELETOR_BUSCA_ANUNCIOS = 'input[placeholder="Buscar por título, código ou SKU"]';
const SELETOR_BUSCA_ADS = 'input[placeholder="Procurar por # ou título"]';

const SKU = 'CKESSTC-ITA5Q';
const MLB_CLASSICO = '4277217107';
const MLB_PREMIUM = '4277230155';

async function buscarTituloEStatusComPolling(pageAds, mlb) {
  const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAds.waitForTimeout(300); }
  const campoAds = pageAds.locator(SELETOR_BUSCA_ADS).first();
  await campoAds.click();
  await campoAds.fill('');
  await campoAds.fill(`MLB${mlb}`);
  await pageAds.keyboard.press('Enter');
  let textoAds = '', idxCat = -1, idxSemCampanha = -1;
  for (let t = 0; t < 6; t++) {
    await pageAds.waitForTimeout(1500);
    textoAds = await pageAds.locator('body').innerText();
    idxCat = textoAds.indexOf('CATÁLOGO');
    idxSemCampanha = textoAds.indexOf('Sem Campanha');
    if (idxCat !== -1 || idxSemCampanha !== -1) break;
  }
  let titulo = null;
  if (idxCat !== -1) {
    const linhasCat = textoAds.slice(idxCat, idxCat + 300).split('\n').map(l => l.trim()).filter(Boolean);
    const idxOrig = linhasCat.findIndex(l => l.includes('ORIGEM'));
    titulo = idxOrig !== -1 ? linhasCat[idxOrig + 1] : null;
  }
  let statusAds;
  if (idxSemCampanha !== -1 && (idxCat === -1 || Math.abs(idxSemCampanha - idxCat) < 500)) {
    statusAds = 'Sem Campanha';
  } else {
    const temPausado = await pageAds.evaluate(() => Array.from(document.querySelectorAll('*')).some(el => el.children.length === 0 && el.textContent.trim() === 'PAUSADO' && el.offsetParent !== null));
    statusAds = temPausado ? 'Pausada' : 'Ativa';
  }
  return { titulo, statusAds };
}

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1000);
    let pageAds = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br'));
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);
    await pageAds.waitForTimeout(1000);

    const campo = page.locator(SELETOR_BUSCA_ANUNCIOS).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2800);

    const texto = await page.locator('body').innerText();
    let idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

    const r = { sku: SKU, catalogoConfirmado: { 'Clássico': MLB_CLASSICO, 'Premium': MLB_PREMIUM }, a2: {} };
    for (const [rot, mlb] of [['Clássico', MLB_CLASSICO], ['Premium', MLB_PREMIUM]]) {
      const idxMlb = bloco.indexOf(`#${mlb}`);
      if (idxMlb === -1) { console.log(`AVISO: #${mlb} nao encontrado no bloco da busca`); continue; }
      const blocoMlb = bloco.slice(idxMlb, idxMlb + 700);
      const fullMatch = blocoMlb.match(/Full:\s*\n\s*([^\n]+)/);
      const depMatch = blocoMlb.match(/Depósito:\s*\n\s*([^\n]+)/);
      const inativo = /Inativo sem estoque/.test(blocoMlb);
      r.a2[rot] = { mlb, full: fullMatch ? fullMatch[1].trim() : null, deposito: depMatch ? depMatch[1].trim() : null, statusProduto: inativo ? 'Pausado' : 'Ativo' };
    }
    console.log('A.2:', JSON.stringify(r.a2));

    const { titulo, statusAds } = await buscarTituloEStatusComPolling(pageAds, MLB_CLASSICO);
    r.tituloCatalogo = titulo;
    r.statusAds = statusAds;
    console.log('Título:', titulo, '| Status em Ads:', statusAds);

    fs.writeFileSync(path.resolve(__dirname, 'ckesstc-corrigido.json'), JSON.stringify(r, null, 2));
    console.log('\nSalvo em ckesstc-corrigido.json');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
