// Teste do pipeline completo (A -> A.1 -> A.2 -> B -> C) numa unica linha/SKU.
// Usa TVSAM-43 (8 MLBs, exige caminho 2 de verdade).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { extrairOpcoesDeCatalogo } = require('./extrator-catalogo-v2.js');

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_ADS = 'https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads';
const SELETOR_BUSCA_ANUNCIOS = 'input[placeholder="Buscar por título, código ou SKU"]';
const SELETOR_BUSCA_ADS = 'input[placeholder="Procurar por # ou título"]';
const ITEM_ID = '6712897810'; // linha 13 original, produto TVSAM-43

async function rolarEPegarTexto(page) {
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(500);
  }
  await page.mouse.wheel(0, -20000); // volta pro topo
  await page.waitForTimeout(500);
  const idxFiltrar0 = (await page.locator('body').innerText()).indexOf('Filtrar e ordenar');
  return await page.locator('body').innerText();
}

async function abrirAlterarDoMlb(page, context, mlb) {
  const elMlb = page.locator(`text=#${mlb}`).first();
  if (await elMlb.count() === 0) return null;
  const linhaCard = elMlb.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
  const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
  if (await botao3pontos.count() === 0) return null;
  await botao3pontos.click();
  await page.waitForTimeout(500);
  const linkAlterar = page.locator('a', { hasText: 'Alterar' }).first();
  const href = await linkAlterar.getAttribute('href').catch(() => null);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  if (!href) return null;
  const urlCompleta = href.startsWith('http') ? href : `https://vendedores.mercadolivre.com.br${href}`;
  const pageAlterar = await openBackgroundPage(context.browser(), context, urlCompleta);
  await pageAlterar.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
  await pageAlterar.waitForTimeout(2200);
  return pageAlterar;
}

function extrairPrecoENossoPreco(textoAlterar, condicaoAlvo) {
  const idx = textoAlterar.indexOf('Concorrência no Mercado Livre');
  if (idx === -1) return { temSecao: false };
  const bloco = textoAlterar.slice(idx, idx + 800);
  // Preco "nosso" na aba anuncios: procurar por "R$ X ... [condicao]" antes da secao
  return { temSecao: true, bloco };
}

(async () => {
  let browser;
  const resultado = { itemId: ITEM_ID };
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1000);

    // PASSO A: buscar Item ID, achar SKU
    const campo = page.locator(SELETOR_BUSCA_ANUNCIOS).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(ITEM_ID);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2800);
    let texto = await page.locator('body').innerText();
    let idxFiltrar = texto.indexOf('Filtrar e ordenar');
    let bloco1 = texto.slice(idxFiltrar, idxFiltrar + 2000);
    const skuMatch = bloco1.match(/SKU\s+(\S+)/);
    if (!skuMatch) { console.log('SKU nao encontrado'); return; }
    const sku = skuMatch[1];
    resultado.sku = sku;
    console.log('SKU encontrado:', sku);

    // Busca de novo pelo SKU, rola a pagina inteira
    await campo.click();
    await campo.fill('');
    await campo.fill(sku);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2800);
    texto = await rolarEPegarTexto(page);
    idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    const blocoCompleto = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

    const todosMlbs = [...new Set((blocoCompleto.match(/#\d{7,11}/g) || []).map(m => m.replace('#','')))];
    resultado.todosMlbsSincronizados = todosMlbs;
    console.log('PASSO A -- todos os MLBs sincronizados:', todosMlbs.length, todosMlbs);

    // PASSO A.1 -- caminho 1
    const opcoes = extrairOpcoesDeCatalogo(blocoCompleto, sku);
    console.log('Opcoes com condicao/status:', JSON.stringify(opcoes));
    const catalogoConfirmado = { 'Clássico': null, 'Premium': null };
    for (const op of opcoes) {
      if (op.status && ['GANHANDO','PERDENDO','COMPARTILHANDO','RESTRITO PARA GANHAR'].includes(op.status) && !catalogoConfirmado[op.condicao]) {
        catalogoConfirmado[op.condicao] = op.mlb;
      }
    }
    console.log('PASSO A.1 caminho 1 -- catalogo confirmado:', JSON.stringify(catalogoConfirmado));

    // PASSO A.1 -- caminho 2, pros que faltam
    for (const condicao of ['Clássico', 'Premium']) {
      if (catalogoConfirmado[condicao]) continue;
      const candidatos = opcoes.filter(o => o.condicao === condicao).map(o => o.mlb);
      console.log(`Caminho 2 para ${condicao}, candidatos:`, candidatos);
      for (const mlbCandidato of candidatos) {
        // Preco "nosso" desse MLB, da aba Anuncios
        const idxMlbNoTexto = blocoCompleto.indexOf(`#${mlbCandidato}`);
        const nossoBloco = blocoCompleto.slice(idxMlbNoTexto, idxMlbNoTexto + 600);
        const precoNossoMatch = nossoBloco.match(/R\$\s*([\d.,]+)/);
        const precoNosso = precoNossoMatch ? precoNossoMatch[1] : null;

        const pageAlterar = await abrirAlterarDoMlb(page, context, mlbCandidato);
        if (!pageAlterar) { console.log(`  ${mlbCandidato}: nao abriu Alterar`); continue; }
        const textoAlterar = await pageAlterar.locator('body').innerText();
        const info = extrairPrecoENossoPreco(textoAlterar, condicao);
        await pageAlterar.close();

        if (!info.temSecao) { console.log(`  ${mlbCandidato}: sem secao Concorrencia`); continue; }
        const bateuPreco = precoNosso && info.bloco.includes(precoNosso);
        console.log(`  ${mlbCandidato}: nosso preco=${precoNosso} | bateu no bloco Concorrencia? ${bateuPreco}`);
        console.log(`  Bloco Concorrencia: ${info.bloco.slice(0,300)}`);
        if (bateuPreco) {
          catalogoConfirmado[condicao] = mlbCandidato;
          console.log(`  >>> ${condicao} confirmado via caminho 2: ${mlbCandidato}`);
          break;
        }
      }
    }
    resultado.catalogoConfirmado = catalogoConfirmado;
    console.log('RESULTADO FINAL A.1:', JSON.stringify(catalogoConfirmado));

    fs.writeFileSync(path.resolve(__dirname, 'pipeline-teste-resultado.json'), JSON.stringify(resultado, null, 2));
  } catch (err) {
    console.error('ERRO GERAL:', err.message, err.stack);
  } finally {
    if (browser) {
      await minimizeChrome();
      await browser.close();
    }
  }
  process.exit(0);
})();
