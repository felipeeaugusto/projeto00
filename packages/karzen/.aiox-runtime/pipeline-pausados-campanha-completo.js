// Pipeline completo: mapeia todos os produtos pausados nas 7 Campanhas de Ads.
// Pra cada produto pausado: abre "Ver variações", rola o drawer inteiro, acha todos os MLBs,
// identifica cada SKU distinto (podem ser varios por produto), analisa cada um (Passo A/A.1/A.2
// do mapeamento-skus-ads-catalogo-mercadolivre.md + Qualidade/Experiencia do mapeamento-pausados).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const ARQUIVO_SAIDA = path.resolve(__dirname, 'pausados-campanha-resultado.json');

const CAMPANHAS = [
  { nome: '[ML] [AVA] [PERFORMANCE]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357312967/dashboard?navigate_to=mercado_ads' },
  { nome: '[ML] [BAIXA PERFORMANCE]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358247429/dashboard?navigate_to=mercado_ads' },
  { nome: '[ML] [CONTROLE ACOS]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357473382/dashboard?navigate_to=mercado_ads' },
  { nome: '[ML] [CURVA-A]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358232940/dashboard?navigate_to=mercado_ads' },
  { nome: '[ML] [CURVA-B]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358239185/dashboard?navigate_to=mercado_ads' },
  { nome: '[ML] [CURVA-C]', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358239193/dashboard?navigate_to=mercado_ads' },
  { nome: 'Em Alta', url: 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358678889/dashboard?navigate_to=mercado_ads' },
];

function lerJsonSeguro(caminho, padrao) {
  if (!fs.existsSync(caminho)) return padrao;
  let texto = fs.readFileSync(caminho, 'utf8');
  if (texto.charCodeAt(0) === 0xFEFF) texto = texto.slice(1);
  try { return JSON.parse(texto); } catch { return padrao; }
}

async function rolarPagina(page, vezes = 10) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(600); }
}

async function abrirAlterarDoMlb(page, context, mlb) {
  const elMlb = page.locator(`text=#${mlb}`).first();
  if (await elMlb.count() === 0) return null;
  const linhaCard = elMlb.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
  const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
  if (await botao3pontos.count() === 0) return null;
  await botao3pontos.click();
  await page.waitForTimeout(600);
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

async function acharSkuDoMlb(pageAnuncios, mlb) {
  const fecharDrawer = pageAnuncios.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAnuncios.waitForTimeout(400); }
  const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(mlb);
  await pageAnuncios.keyboard.press('Enter');
  await pageAnuncios.waitForTimeout(2800);
  const texto = await pageAnuncios.locator('body').innerText();
  const idxSku = texto.indexOf('SKU ');
  if (idxSku === -1) return null;
  const m = texto.slice(idxSku, idxSku + 60).match(/SKU\s+(\S+)/);
  return m ? m[1] : null;
}

async function analisarSku(pageAnuncios, context, sku) {
  const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(sku);
  await pageAnuncios.keyboard.press('Enter');
  await pageAnuncios.waitForTimeout(3000);
  await rolarPagina(pageAnuncios, 10);
  await pageAnuncios.mouse.wheel(0, -20000);
  await pageAnuncios.waitForTimeout(500);

  const texto = await pageAnuncios.locator('body').innerText();
  const idxFiltrar = texto.indexOf('Filtrar e ordenar');
  const idxRodape = texto.indexOf('Você recebeu');
  const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

  const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []).map(x => x.replace('#','')))];
  const mlbs = {};
  for (const mlb of todosMlbs) {
    const idxMlb = bloco.indexOf(`#${mlb}`);
    const blocoMlb = bloco.slice(idxMlb, idxMlb + 2200);
    const fullMatch = blocoMlb.match(/Full:\s*\n\s*([^\n]+)/);
    const depMatch = blocoMlb.match(/Depósito:\s*\n\s*([^\n]+)/);
    const inativo = /Inativo sem estoque/.test(blocoMlb);
    const statusMatch = blocoMlb.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/i);
    const condMatch = blocoMlb.match(/\b(Clássico|Premium)\b/);
    const qualMatch = blocoMlb.match(/Analisar métricas de desempenho\s*\n\s*(\d+)\s*\n\s*([^\n]+)/);
    const expMatch = blocoMlb.match(/Analisar métricas de desempenho\s*\n\s*\d+\s*\n\s*[^\n]+\s*\n\s*(\d+|--)\s*\n\s*([^\n]+)/);
    mlbs[mlb] = {
      full: fullMatch ? fullMatch[1].trim() : null,
      deposito: depMatch ? depMatch[1].trim() : null,
      statusProduto: inativo ? 'Pausado' : 'Ativo',
      condicao: condMatch ? condMatch[1] : null,
      statusCatalogo: statusMatch ? statusMatch[1].toUpperCase() : null,
      qualidade: qualMatch ? qualMatch[1] : null,
      experiencia: expMatch ? expMatch[1] : null,
    };
  }

  // Fallback caminho 2 se nenhum MLB confirmou status de catalogo
  const nenhumConfirmado = todosMlbs.length > 0 && Object.values(mlbs).every(d => !d.statusCatalogo);
  let statusCatalogoViaAlterar = null;
  if (nenhumConfirmado) {
    const primeiroMlb = todosMlbs[0];
    const idxMlbPreco = bloco.indexOf(`#${primeiroMlb}`);
    const nossoBloco = bloco.slice(idxMlbPreco, idxMlbPreco + 600);
    const precoMatch = nossoBloco.match(/R\$\s*([\d.,]+)/);
    const precoNosso = precoMatch ? precoMatch[1] : null;
    const pageAlt = await abrirAlterarDoMlb(pageAnuncios, context, primeiroMlb);
    if (pageAlt) {
      const textoAlt = await pageAlt.locator('body').innerText();
      await pageAlt.close();
      const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
      if (idxConc !== -1) {
        const blocoConc = textoAlt.slice(idxConc, idxConc + 900);
        const statusConcMatch = blocoConc.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/i);
        const bateuPreco = precoNosso && blocoConc.includes(precoNosso);
        statusCatalogoViaAlterar = { mlb: primeiroMlb, bateuPreco, status: statusConcMatch ? statusConcMatch[1].toUpperCase() : null };
        if (bateuPreco && statusConcMatch) mlbs[primeiroMlb].statusCatalogo = statusConcMatch[1].toUpperCase();
      }
    }
  }

  return { todosMlbsSincronizados: todosMlbs, mlbs, statusCatalogoViaAlterar };
}

function normalizarNumeroOuTraco(valor) {
  if (!valor) return '-';
  if (/^sem estoque$/i.test(valor)) return '-';
  const m = valor.match(/^([\d\.]+)\s*un\.?$/);
  if (m) return m[1].replace(/\./g, '');
  return valor;
}

function normalizarQualExp(valor) {
  if (!valor || valor === '--') return '-';
  const n = parseInt(valor, 10);
  if (isNaN(n)) return '-';
  return n <= 65 ? String(n) : '-';
}

(async () => {
  let browser;
  let resultados = lerJsonSeguro(ARQUIVO_SAIDA, {});

  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let pageAnuncios = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);

    for (const campanha of CAMPANHAS) {
      const chaveCampanha = campanha.nome;
      if (!resultados[chaveCampanha]) resultados[chaveCampanha] = {};

      console.log(`\n\n########## CAMPANHA: ${campanha.nome} ##########`);
      const pageCampanha = await openBackgroundPage(browser, context, campanha.url);

      let texto = '';
      for (let t = 0; t < 10; t++) {
        await pageCampanha.waitForTimeout(1500);
        texto = await pageCampanha.locator('body').innerText();
        if (texto.length > 500) break;
      }
      await rolarPagina(pageCampanha, 10);
      await pageCampanha.waitForTimeout(1500);

      const botaoPausados = pageCampanha.getByText('Pausados', { exact: true }).first();
      await botaoPausados.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      if (await botaoPausados.count() > 0) {
        await botaoPausados.click();
        await pageCampanha.waitForTimeout(4000);
        await rolarPagina(pageCampanha, 14);
        await pageCampanha.waitForTimeout(1500);
      }

      texto = await pageCampanha.locator('body').innerText();
      const qtdPausado = (texto.match(/PAUSADO/g) || []).length;
      console.log(`Badges PAUSADO encontrados: ${qtdPausado}`);

      // Listar produtos pausados (titulo + posicao no texto)
      const idxInicio = texto.search(/anúncios patrocinados/);
      const blocoLista = texto.slice(idxInicio);
      const linhas = blocoLista.split('\n').map(l => l.trim());
      const produtosPausados = [];
      for (let i = 0; i < linhas.length; i++) {
        if (/^#MLB\d+/.test(linhas[i])) {
          let j = i + 1;
          while (j < linhas.length && linhas[j] === '') j++;
          const titulo = linhas[j] || '';
          const temPausado = linhas.slice(i, i + 6).some(l => l === 'PAUSADO');
          if (temPausado && titulo) produtosPausados.push(titulo);
        }
      }
      const titulosUnicos = [...new Set(produtosPausados)];
      console.log(`Produtos pausados distintos encontrados: ${titulosUnicos.length}`);
      console.log(titulosUnicos.map((t, i) => `  ${i+1}. ${t}`).join('\n'));

      for (const tituloProduto of titulosUnicos) {
        const chaveProduto = tituloProduto;
        if (resultados[chaveCampanha][chaveProduto] && !resultados[chaveCampanha][chaveProduto].erro) {
          console.log(`\n[JA PROCESSADO] ${tituloProduto}`);
          continue;
        }

        console.log(`\n--- Produto: ${tituloProduto} ---`);
        try {
          // Fechar qualquer drawer que tenha sobrado aberto do produto anterior (bug real
          // 13/08/2026: o drawer "Ver variações" nao fechava sozinho e bloqueava o clique
          // do proximo produto com "intercepts pointer events", quebrando quase todo o lote).
          await pageCampanha.keyboard.press('Escape').catch(() => {});
          await pageCampanha.waitForTimeout(500);
          const botaoFecharDrawer = pageCampanha.locator('.drawer--open button[aria-label], .ad-variant-drawer button[aria-label]').first();
          if (await botaoFecharDrawer.count() > 0) {
            await botaoFecharDrawer.click().catch(() => {});
            await pageCampanha.waitForTimeout(500);
          }

          const elTitulo = pageCampanha.getByText(tituloProduto, { exact: true }).first();
          await elTitulo.waitFor({ state: 'visible', timeout: 10000 });
          await elTitulo.scrollIntoViewIfNeeded();
          await pageCampanha.waitForTimeout(800);

          const linkVerVariacoes = elTitulo.locator('xpath=following::*[normalize-space(text())="Ver variações"][1]');
          if (await linkVerVariacoes.count() === 0) { console.log('  Link Ver variacoes nao encontrado -- pulando'); continue; }
          await linkVerVariacoes.click();
          await pageCampanha.waitForTimeout(2500);
          await rolarPagina(pageCampanha, 10);
          await pageCampanha.waitForTimeout(1000);

          const textoDrawer = await pageCampanha.locator('body').innerText();
          const idxTituloDrawer = textoDrawer.lastIndexOf(tituloProduto);
          const mlbsNoDrawer = [...new Set((textoDrawer.slice(idxTituloDrawer).match(/MLB\d{7,11}/g) || []).map(m => m.replace('MLB','')))];
          console.log(`  MLBs no drawer: ${mlbsNoDrawer.length} -- ${mlbsNoDrawer.join(', ')}`);

          const skusDoProduto = {};
          const mlbsJaCobertos = new Set();

          for (const mlb of mlbsNoDrawer) {
            if (mlbsJaCobertos.has(mlb)) continue;
            const sku = await acharSkuDoMlb(pageAnuncios, mlb);
            if (!sku) { console.log(`    MLB ${mlb}: SKU nao encontrado (nao verificavel)`); mlbsJaCobertos.add(mlb); continue; }
            if (skusDoProduto[sku]) { mlbsJaCobertos.add(mlb); continue; }

            console.log(`    MLB ${mlb} -> SKU ${sku}`);
            const analise = await analisarSku(pageAnuncios, context, sku);
            analise.todosMlbsSincronizados.forEach(m => mlbsJaCobertos.add(m));

            // Determinar catalogo Classico/Premium confirmado (primeiro de cada condicao com status valido)
            const catalogo = { Classico: null, Premium: null };
            for (const [mlbId, dados] of Object.entries(analise.mlbs)) {
              if (dados.statusCatalogo && dados.condicao) {
                const chave = dados.condicao === 'Clássico' ? 'Classico' : 'Premium';
                if (!catalogo[chave]) catalogo[chave] = mlbId;
              }
            }

            // Pegar depósito/full/qualidade/experiencia do 1o MLB confirmado (ou do primeiro disponivel)
            const mlbReferencia = catalogo.Classico || catalogo.Premium || analise.todosMlbsSincronizados[0];
            const dadosRef = analise.mlbs[mlbReferencia] || {};

            skusDoProduto[sku] = {
              sku,
              todosMlbsSincronizados: analise.todosMlbsSincronizados,
              catalogoClassico: catalogo.Classico,
              catalogoPremium: catalogo.Premium,
              deposito: normalizarNumeroOuTraco(dadosRef.deposito),
              full: normalizarNumeroOuTraco(dadosRef.full),
              qualidade: normalizarQualExp(dadosRef.qualidade),
              experiencia: normalizarQualExp(dadosRef.experiencia),
              statusProduto: dadosRef.statusProduto || null,
              statusCatalogoViaAlterar: analise.statusCatalogoViaAlterar,
              mlbsDetalhe: analise.mlbs,
            };
          }

          resultados[chaveCampanha][chaveProduto] = { titulo: tituloProduto, mlbsNoDrawer, skus: skusDoProduto };
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          console.log(`  Salvo. SKUs encontrados: ${Object.keys(skusDoProduto).join(', ')}`);

          // Fechar o drawer deste produto antes de ir pro proximo (nao confiar so na
          // checagem defensiva do topo do loop -- fechar aqui, assim que terminar, e mais robusto)
          await pageCampanha.keyboard.press('Escape').catch(() => {});
          await pageCampanha.waitForTimeout(600);
        } catch (errProduto) {
          console.log(`  ERRO no produto "${tituloProduto}": ${errProduto.message}`);
          resultados[chaveCampanha][chaveProduto] = { titulo: tituloProduto, erro: errProduto.message };
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          // Mesmo em erro, tentar fechar qualquer drawer que tenha ficado aberto
          await pageCampanha.keyboard.press('Escape').catch(() => {});
          await pageCampanha.waitForTimeout(600);
        }
      }

      await pageCampanha.close();
    }

    console.log('\n\n########## TODAS AS CAMPANHAS PROCESSADAS ##########');
  } catch (err) {
    console.error('ERRO GERAL:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
