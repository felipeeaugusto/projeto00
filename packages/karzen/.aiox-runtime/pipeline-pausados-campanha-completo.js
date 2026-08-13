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

// Correção real (13/08/2026): a versão anterior localizava a linha do MLB via
// `ancestor::div[contains(@class,"sll-list-grid-row__main-row")]).first()` -- o eixo
// XPath ancestor:: retorna em ordem de documento (do mais externo pro mais interno),
// então `.first()` pegava o CARD inteiro (2 linhas, Clássico+Premium) em vez da linha
// específica do MLB, e sempre clicava no botão de 3 pontinhos da 1ª linha do card.
// Resultado real: 3 de 8 MLBs testados (WW2-127V/WW2-220V) saíram classificados errado.
// Correção validada: usar o ÍNDICE POSICIONAL do botão (0,1,2,3... na mesma ordem em
// que os MLBs aparecem nos cabeçalhos dos cards, de cima pra baixo) em vez de qualquer
// seletor por classe CSS ou texto. Ver `checar-alterar-v6-robusto.js` (script de
// referência já validado nesta sessão).
//
// Pressupõe que `pageAnuncios` já tem os resultados da busca do SKU carregados e
// rolados (chamador garante isso). Clica no botão de 3 pontinhos daquele índice e
// abre "Alterar". IMPORTANTE: o item de menu "Alterar" não é um <a href> comum (0
// links encontrados via seletor `a` quando o menu certo estava aberto, confirmado em
// diagnóstico real) -- é outro tipo de elemento com navegação via JS. Por isso a
// navegação acontece NA MESMA aba, não em "nova guia" -- tecnicamente não existe um
// href pra abrir via "abrir link em nova guia" nesse menu específico. Documentado como
// desvio consciente da instrução original do Felipe (que pedia sempre nova guia) por
// impossibilidade técnica -- reportar isso de volta antes de considerar resolvido.
async function abrirAlterarPorIndice(pageAnuncios, indice) {
  const botoes = pageAnuncios.locator('button[aria-label="Ações secundárias"]');
  const qtd = await botoes.count();
  if (indice >= qtd) return null;
  const botaoAlvo = botoes.nth(indice);
  await botaoAlvo.scrollIntoViewIfNeeded();
  await pageAnuncios.waitForTimeout(400);
  await botaoAlvo.click();
  // Delay essencial (13/08/2026): queries mais rápidas que ~1.5s retornam 0 elementos
  // "Alterar" por timing, não por ausência real -- confirmado em investigação real.
  await pageAnuncios.waitForTimeout(1500);

  const itemAlterar = pageAnuncios.locator('*').filter({ hasText: /^Alterar$/ }).last();
  if (await itemAlterar.count() === 0) {
    await pageAnuncios.keyboard.press('Escape').catch(() => {});
    return null;
  }
  await itemAlterar.click();
  await pageAnuncios.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  await pageAnuncios.waitForTimeout(1500);

  const texto = await pageAnuncios.locator('body').innerText();
  return { url: pageAnuncios.url(), texto };
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

// REGRA VALIDADA (13/08/2026, adicionar também ao Passo A.1 de
// mapeamento-skus-ads-catalogo-mercadolivre.md): os N MLBs no cabeçalho de um card
// correspondem, EM ORDEM, aos N blocos de dados que seguem -- 1º MLB do cabeçalho →
// 1º bloco, 2º MLB → 2º bloco, etc. Nunca delimitar blocos via regex `#\d+` genérico
// (bug real anterior: "Sincronizado com #X, #Y" aparece DENTRO do bloco de dados de um
// MLB e cortava o bloco cedo demais, antes do próximo MLB de verdade começar -- mesmo
// erro que gerou o dado errado da Sanduicheira originalmente). O marcador de início de
// bloco confiável é a sequência "R$ <preço>\nem promoção a R$ <preço>\n(Clássico|Premium)",
// que só ocorre no início de cada bloco de preço/condição, nunca dentro de uma menção
// "Sincronizado com".
async function analisarSku(pageAnuncios, context, sku) {
  async function buscarERolar() {
    const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(sku);
    await pageAnuncios.keyboard.press('Enter');
    await pageAnuncios.waitForTimeout(3000);
    await rolarPagina(pageAnuncios, 14);
    await pageAnuncios.mouse.wheel(0, -20000);
    await pageAnuncios.waitForTimeout(500);
    const texto = await pageAnuncios.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    return texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 12000);
  }

  function extrairCards(bloco) {
    const linhas = bloco.split('\n');
    const cards = [];
    for (let i = 0; i < linhas.length; i++) {
      const mSku = linhas[i].match(/^SKU\s+(\S+)/);
      if (!mSku) continue;
      let j = i - 1;
      const mlbsHeader = [];
      while (j >= 0 && /^#\d{7,11}$/.test(linhas[j].trim())) {
        mlbsHeader.unshift(linhas[j].trim().replace('#', ''));
        j--;
      }
      if (mlbsHeader.length === 0) continue;
      cards.push({ skuValor: mSku[1], mlbsHeader, linhaSkuIdx: i, linhaHeaderIdx: j + 1 });
    }
    return { linhas, cards };
  }

  const blocoBruto = await buscarERolar();
  const { linhas, cards } = extrairCards(blocoBruto);
  const mlbs = {};
  const ordemMlbsGlobal = []; // ordem visual/DOM de TODOS os cards retornados -- usada
                               // como índice do botão de 3 pontinhos (bug 1 corrigido)

  for (let ci = 0; ci < cards.length; ci++) {
    const card = cards[ci];
    card.mlbsHeader.forEach(mlb => ordemMlbsGlobal.push(mlb));
    if (card.skuValor !== sku) continue; // só processa dados detalhados do SKU buscado

    const janelaCardTexto = linhas.slice(card.linhaSkuIdx, card.linhaSkuIdx + 30).join('\n');
    const fullMatch = janelaCardTexto.match(/Full:\s*\n\s*([^\n]+)/);
    const depMatch = janelaCardTexto.match(/Depósito:\s*\n\s*([^\n]+)/);

    const proximoCard = cards[ci + 1];
    const fimRegiao = proximoCard ? proximoCard.linhaHeaderIdx : linhas.length;
    const regiaoTexto = linhas.slice(card.linhaSkuIdx, fimRegiao).join('\n');

    const marcadorBloco = /R\$\s*\n?\s*[\d.,]+\nem promoção a R\$\s*\n?\s*[\d.,]+\n(Clássico|Premium)/g;
    const posicoes = [];
    let m;
    while ((m = marcadorBloco.exec(regiaoTexto)) !== null) {
      posicoes.push({ inicio: m.index, condicao: m[1] });
    }

    for (let bi = 0; bi < card.mlbsHeader.length; bi++) {
      const mlb = card.mlbsHeader[bi];
      const inicioBloco = posicoes[bi] ? posicoes[bi].inicio : null;
      const fimBloco = posicoes[bi + 1] ? posicoes[bi + 1].inicio : regiaoTexto.length;
      const blocoMlb = inicioBloco !== null ? regiaoTexto.slice(inicioBloco, fimBloco) : '';

      const precoBaseMatch = blocoMlb.match(/R\$\s*\n?\s*([\d.,]+)/);
      const precoPromoMatch = blocoMlb.match(/em promoção a R\$\s*\n?\s*([\d.,]+)/);
      const inativo = /Inativo sem estoque/.test(blocoMlb);
      const statusMatch = blocoMlb.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/i);
      const condMatch = blocoMlb.match(/\b(Clássico|Premium)\b/);
      const qualMatch = blocoMlb.match(/Analisar métricas de desempenho\s*\n\s*(\d+)\s*\n\s*([^\n]+)/);
      const expMatch = blocoMlb.match(/Analisar métricas de desempenho\s*\n\s*\d+\s*\n\s*[^\n]+\s*\n\s*(\d+|--)\s*\n\s*([^\n]+)/);

      mlbs[mlb] = {
        full: fullMatch ? fullMatch[1].trim() : null,
        deposito: depMatch ? depMatch[1].trim() : null,
        statusProduto: inativo ? 'Pausado' : 'Ativo',
        condicao: condMatch ? condMatch[1] : (posicoes[bi] ? posicoes[bi].condicao : null),
        statusCatalogo: statusMatch ? statusMatch[1].toUpperCase() : null,
        qualidade: qualMatch ? qualMatch[1] : null,
        experiencia: expMatch ? expMatch[1] : null,
        precoBase: precoBaseMatch ? precoBaseMatch[1] : null,
        precoPromo: precoPromoMatch ? precoPromoMatch[1] : null,
        viaAlterar: null,
      };
    }
  }

  const todosMlbs = cards.filter(c => c.skuValor === sku).flatMap(c => c.mlbsHeader);

  // Caminho 2, corrigido (bug 3): checa TODO MLB sem status explícito via Alterar,
  // não só o primeiro do SKU inteiro -- e usa casamento de preço (regra nova) pra
  // extrair o status real, não só um binário catálogo/pai.
  const mlbsSemStatus = todosMlbs.filter(mlb => mlbs[mlb] && !mlbs[mlb].statusCatalogo);
  for (const mlb of mlbsSemStatus) {
    const indiceGlobal = ordemMlbsGlobal.indexOf(mlb);
    if (indiceGlobal === -1) continue;

    try {
      // Re-busca do zero garante que os botões de 3 pontinhos na tela batem com o
      // índice calculado (a página de Alterar anterior pode ter navegado a aba pra longe)
      await buscarERolar();
      const resultado = await abrirAlterarPorIndice(pageAnuncios, indiceGlobal);

      if (!resultado) {
        mlbs[mlb].viaAlterar = { erro: 'nao encontrou botao ou item Alterar' };
      } else {
        const temCompetindo = resultado.texto.includes('COMPETINDO');
        const idxConc = resultado.texto.indexOf('Concorrência no Mercado Livre');
        const temConcorrencia = idxConc !== -1;

        if (!temCompetindo || !temConcorrencia) {
          mlbs[mlb].viaAlterar = { ehPai: true, temCompetindo, temConcorrencia };
        } else {
          const blocoConc = resultado.texto.slice(idxConc);
          const opcoes = [...blocoConc.matchAll(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b[\s\S]{0,150}?R\$\s*\n?\s*([\d.,]+)/g)]
            .map(mm => ({ status: mm[1].toUpperCase(), preco: mm[2] }));
          const precosProprios = [mlbs[mlb].precoBase, mlbs[mlb].precoPromo].filter(Boolean);
          const opcaoBatida = opcoes.find(o => precosProprios.includes(o.preco));

          mlbs[mlb].viaAlterar = { ehPai: false, temCompetindo, temConcorrencia, opcoesEncontradas: opcoes, opcaoBatida: opcaoBatida || null };
          if (opcaoBatida) mlbs[mlb].statusCatalogo = opcaoBatida.status;
        }
      }
    } catch (errMlb) {
      mlbs[mlb].viaAlterar = { erro: errMlb.message };
    } finally {
      // Sempre volta pra aba de Anúncios limpa antes do próximo uso -- clicar em
      // "Alterar" navega a MESMA aba (não abre guia nova, ver nota em abrirAlterarPorIndice)
      await pageAnuncios.goto(URL_ANUNCIOS).catch(() => {});
      await pageAnuncios.waitForTimeout(1000);
    }
  }

  const statusCatalogoViaAlterar = mlbsSemStatus
    .filter(mlb => mlbs[mlb] && mlbs[mlb].viaAlterar)
    .map(mlb => ({ mlb, ...mlbs[mlb].viaAlterar }));

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

// Exportado pra permitir teste isolado (ex: reprocessar so 1 produto) sem duplicar
// logica nem disparar a execucao completa das 7 campanhas -- ver secao abaixo.
module.exports = {
  acharSkuDoMlb,
  analisarSku,
  normalizarNumeroOuTraco,
  normalizarQualExp,
  URL_ANUNCIOS,
};

if (require.main === module) {
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
}
