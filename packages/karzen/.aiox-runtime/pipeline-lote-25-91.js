// Pipeline completo (A -> A.1 -> A.2 -> B) pras linhas 25-91 da planilha de origem.
// Começa do Item ID (como nas linhas 2/4), pois essas linhas nunca foram buscadas por SKU antes.
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

const ARQUIVO_ITENS = path.resolve(__dirname, 'linhas-25-91-itemids.json');
const ARQUIVO_SAIDA = path.resolve(__dirname, 'linhas-25-91-resultado.json');

function lerJsonSemBom(caminho) {
  let texto = fs.readFileSync(caminho, 'utf8');
  if (texto.charCodeAt(0) === 0xFEFF) texto = texto.slice(1);
  return JSON.parse(texto);
}

const ITENS = lerJsonSemBom(ARQUIVO_ITENS);

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

async function buscarTituloEStatusComPolling(pageAds, mlb) {
  const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAds.waitForTimeout(300); }
  const campoAds = pageAds.locator(SELETOR_BUSCA_ADS).first();
  await campoAds.click();
  await campoAds.fill('');
  await campoAds.fill(`MLB${mlb}`);
  await pageAds.keyboard.press('Enter');

  let textoAds = '';
  let idxCat = -1;
  let idxSemCampanha = -1;
  for (let tentativa = 0; tentativa < 6; tentativa++) {
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
    const temPausado = await pageAds.evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'));
      return els.some(el => el.children.length === 0 && el.textContent.trim() === 'PAUSADO' && el.offsetParent !== null);
    });
    statusAds = temPausado ? 'Pausada' : 'Ativa';
  }

  return { titulo, statusAds };
}

(async () => {
  let browser;
  let resultados = {};
  if (fs.existsSync(ARQUIVO_SAIDA)) {
    resultados = JSON.parse(fs.readFileSync(ARQUIVO_SAIDA, 'utf8'));
    console.log(`Retomando -- ${Object.keys(resultados).length} linhas ja processadas anteriormente.`);
  }
  const skusJaProcessados = new Set(Object.values(resultados).filter(r => r.sku).map(r => r.sku));

  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1000);
    let pageAds = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br'));
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);
    await pageAds.waitForTimeout(1000);

    for (const alvo of ITENS) {
      const chave = `linha-${alvo.row}`;
      if (resultados[chave]) { continue; } // ja processado numa retomada anterior

      console.log(`\n=== LINHA ${alvo.row} (Item ID ${alvo.itemId}) ===`);
      const r = { row: alvo.row, itemId: alvo.itemId };

      try {
        // Passo A - 1: buscar o Item ID puro pra descobrir o SKU
        let campo = page.locator(SELETOR_BUSCA_ANUNCIOS).first();
        await campo.click();
        await campo.fill('');
        await campo.fill(alvo.itemId);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2500);

        let texto = await page.locator('body').innerText();
        const idxSku = texto.indexOf('SKU ');
        if (idxSku === -1) {
          console.log('  Anuncio nao encontrado (0 resultados)');
          r.erro = 'ANUNCIO_NAO_ENCONTRADO';
          resultados[chave] = r;
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          continue;
        }
        const skuMatch = texto.slice(idxSku, idxSku + 60).match(/SKU\s+(\S+)/);
        const sku = skuMatch ? skuMatch[1] : null;
        if (!sku) {
          r.erro = 'SKU_NAO_PARSEADO';
          resultados[chave] = r;
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          continue;
        }
        r.sku = sku;
        console.log(`  SKU encontrado: ${sku}`);

        if (skusJaProcessados.has(sku)) {
          console.log(`  SKU ${sku} ja foi processado nesse lote (produto repetido) -- pulando o resto do pipeline`);
          r.duplicado = true;
          resultados[chave] = r;
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          continue;
        }
        skusJaProcessados.add(sku);

        // Passo A - 2: re-buscar pelo SKU, rolar a pagina inteira
        await campo.click();
        await campo.fill('');
        await campo.fill(sku);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2500);
        await rolarPagina(page);

        texto = await page.locator('body').innerText();
        let idxFiltrar = texto.indexOf('Filtrar e ordenar');
        const idxRodape = texto.indexOf('Você recebeu');
        const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

        const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []).map(m => m.replace('#', '')))];
        r.todosMlbsSincronizados = todosMlbs;
        console.log(`  Passo A -- ${todosMlbs.length} MLBs: ${todosMlbs.join(', ')}`);

        // Passo A.1 -- caminho 1
        const opcoes = extrairOpcoesDeCatalogo(bloco, sku);
        const catalogo = { 'Clássico': null, 'Premium': null };
        for (const op of opcoes) {
          if (op.status && ['GANHANDO', 'PERDENDO', 'COMPARTILHANDO'].includes(op.status) && !catalogo[op.condicao]) {
            catalogo[op.condicao] = op.mlb;
          }
        }
        console.log(`  A.1 caminho 1: ${JSON.stringify(catalogo)}`);

        // Passo A.1 -- caminho 2
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

        // Passo A.2 -- Deposito/FULL/Status do Produto
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

        // Titulo de catalogo + Passo B (status em Ads), com polling
        const mlbTitulo = catalogo['Clássico'] || catalogo['Premium'];
        if (mlbTitulo) {
          const { titulo, statusAds } = await buscarTituloEStatusComPolling(pageAds, mlbTitulo);
          r.tituloCatalogo = titulo;
          r.statusAds = statusAds;
        }
        console.log(`  Título de catálogo: ${r.tituloCatalogo}`);
        console.log(`  Passo B -- Status em Ads: ${r.statusAds}`);
      } catch (errItem) {
        console.log(`  ERRO nessa linha: ${errItem.message}`);
        r.erro = errItem.message;
      }

      resultados[chave] = r;
      fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
    }

    console.log('\n\nCONCLUIDO. Salvo em linhas-25-91-resultado.json');
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
