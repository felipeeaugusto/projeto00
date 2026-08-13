// Pipeline completo (A -> A.1 -> A.2) pros 16 SKUs restantes do lote 5-24
// (TVSAM-43 ja foi feita no teste do pipeline).
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

const dadosLote = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'lote-05-24.json'), 'utf8'));
const skusUnicos = [...new Map(dadosLote.filter((d) => d.sku && d.sku !== 'TVSAM-43').map((d) => [d.sku, d])).values()];

async function rolarPagina(page) {
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(450);
  }
  await page.mouse.wheel(0, -20000);
  await page.waitForTimeout(400);
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
  await pageAlterar.waitForTimeout(2000);
  return pageAlterar;
}

(async () => {
  let browser;
  const resultados = {};
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1000);
    let pageAds = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br'));
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);
    await pageAds.waitForTimeout(1000);

    for (const item of skusUnicos) {
      const sku = item.sku;
      console.log(`\n=== SKU: ${sku} ===`);
      const r = { sku, statusAds: item.status };

      try {
        const campo = page.locator(SELETOR_BUSCA_ANUNCIOS).first();
        await campo.click();
        await campo.fill('');
        await campo.fill(sku);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2500);
        await rolarPagina(page);

        let texto = await page.locator('body').innerText();
        let idxFiltrar = texto.indexOf('Filtrar e ordenar');
        const idxRodape = texto.indexOf('Você recebeu');
        const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

        const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []).map(m => m.replace('#','')))];
        r.todosMlbsSincronizados = todosMlbs;
        console.log(`  Passo A -- ${todosMlbs.length} MLBs: ${todosMlbs.join(', ')}`);

        const opcoes = extrairOpcoesDeCatalogo(bloco, sku);
        const catalogo = { 'Clássico': null, 'Premium': null };
        for (const op of opcoes) {
          if (op.status && ['GANHANDO','PERDENDO','COMPARTILHANDO','RESTRITO PARA GANHAR'].includes(op.status) && !catalogo[op.condicao]) {
            catalogo[op.condicao] = op.mlb;
          }
        }
        console.log(`  A.1 caminho 1: ${JSON.stringify(catalogo)}`);

        for (const condicao of ['Clássico', 'Premium']) {
          if (catalogo[condicao]) continue;
          const candidatos = [...new Set(opcoes.filter(o => o.condicao === condicao).map(o => o.mlb))];
          for (const mlbCand of candidatos) {
            const idxMlb = bloco.indexOf(`#${mlbCand}`);
            const nossoBloco = bloco.slice(idxMlb, idxMlb + 600);
            const precoMatch = nossoBloco.match(/R\$\s*([\d.,]+)/);
            const precoNosso = precoMatch ? precoMatch[1] : null;

            const pageAlt = await abrirAlterarDoMlb(page, context, mlbCand);
            if (!pageAlt) continue;
            const textoAlt = await pageAlt.locator('body').innerText();
            await pageAlt.close();
            const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
            if (idxConc === -1) continue;
            const blocoConc = textoAlt.slice(idxConc, idxConc + 800);
            if (precoNosso && blocoConc.includes(precoNosso)) {
              catalogo[condicao] = mlbCand;
              console.log(`  A.1 caminho 2: ${condicao} = ${mlbCand} (preço ${precoNosso} bateu)`);
              break;
            }
          }
        }
        r.catalogoConfirmado = catalogo;
        console.log(`  A.1 final: ${JSON.stringify(catalogo)}`);

        // A.2 -- Deposito/FULL/Status do Produto
        r.a2 = {};
        for (const [rot, mlb] of [['Clássico', catalogo['Clássico']], ['Premium', catalogo['Premium']]]) {
          if (!mlb) continue;
          const idxMlb2 = bloco.indexOf(`#${mlb}`);
          const blocoMlb = bloco.slice(idxMlb2, idxMlb2 + 700);
          const fullMatch = blocoMlb.match(/Full:\s*\n\s*([^\n]+)/);
          const depMatch = blocoMlb.match(/Depósito:\s*\n\s*([^\n]+)/);
          const inativo = /Inativo sem estoque/.test(blocoMlb);
          r.a2[rot] = { mlb, full: fullMatch ? fullMatch[1].trim() : null, deposito: depMatch ? depMatch[1].trim() : null, statusProduto: inativo ? 'Pausado' : 'Ativo' };
        }
        console.log(`  A.2: ${JSON.stringify(r.a2)}`);

        // Titulo de catalogo
        const mlbTitulo = catalogo['Clássico'] || catalogo['Premium'];
        if (mlbTitulo) {
          const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
          if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAds.waitForTimeout(300); }
          const campoAds = pageAds.locator(SELETOR_BUSCA_ADS).first();
          await campoAds.click();
          await campoAds.fill('');
          await campoAds.fill(`MLB${mlbTitulo}`);
          await pageAds.keyboard.press('Enter');
          await pageAds.waitForTimeout(2600);
          const textoAds = await pageAds.locator('body').innerText();
          const idxCat = textoAds.indexOf('CATÁLOGO');
          if (idxCat !== -1) {
            const linhasCat = textoAds.slice(idxCat, idxCat + 300).split('\n').map(l => l.trim()).filter(Boolean);
            const idxOrig = linhasCat.findIndex(l => l.includes('ORIGEM'));
            r.tituloCatalogo = idxOrig !== -1 ? linhasCat[idxOrig + 1] : null;
          }
        }
        console.log(`  Título de catálogo: ${r.tituloCatalogo}`);
      } catch (errItem) {
        console.log(`  ERRO nesse SKU: ${errItem.message}`);
        r.erro = errItem.message;
      }

      resultados[sku] = r;
      fs.writeFileSync(path.resolve(__dirname, 'lote-completo-final.json'), JSON.stringify(resultados, null, 2));
    }

    console.log('\n\nTODOS OS SKUS PROCESSADOS. Salvo em lote-completo-final.json');
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
