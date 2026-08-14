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

// REGRA GERAL (14/08/2026, aplicada no PROCESSO INTEIRO, não em pontos isolados --
// ver mapeamento-skus-ads-catalogo-mercadolivre.md): nunca confiar que um tempo fixo
// (waitForTimeout) significa "a página/ação terminou de carregar". Toda ação que
// dispara alguma mudança na tela (busca, clique em filtro, clique em "Ver variações",
// navegação) usa esta função em vez de um waitForTimeout isolado -- espera o texto da
// página parar de mudar entre 2 leituras seguidas antes de considerar pronta pra ler.
// Usada agora em TODOS os pontos do processo que antes tinham tempo fixo: busca de SKU,
// busca reversa de MLB, filtro Pausados, abrir Ver variações, carregar campanha, abrir
// Alterar (menu e conteúdo).
async function esperarTextoEstabilizar(page, maxTentativas = 8, intervaloMs = 1000) {
  let anterior = null;
  for (let t = 0; t < maxTentativas; t++) {
    const atual = await page.locator('body').innerText();
    if (anterior !== null && atual === anterior && !atual.includes('A página está carregando') && atual.length > 200) {
      return atual;
    }
    anterior = atual;
    await page.waitForTimeout(intervaloMs);
  }
  return anterior;
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
// Correcao real (14/08/2026, regra geral de paciencia -- ver mapeamento-skus...md):
// um waitForTimeout fixo, mesmo de 1.5s, as vezes nao e suficiente (conexao lenta,
// cache do Chrome, pagina muito cheia) -- fazendo o item "Alterar" parecer ausente
// quando na verdade so ainda nao carregou. Caso real: MLB #5923053118 (SKU
// MCT-32MM-BIV) falhou com "nao encontrou botao ou item Alterar" numa rodada e
// funcionou normalmente em outra, mesma pagina, mesmo indice -- prova que era timing,
// nao ausencia real. Correcao: polling ate 8s (checando a cada 1s) em vez de um unico
// tempo fixo curto, so desistindo de verdade se realmente nao aparecer apos esperar.
async function esperarElementoComCalma(locator, maxTentativas = 8, intervaloMs = 1000) {
  for (let t = 0; t < maxTentativas; t++) {
    if (await locator.count() > 0) return true;
    await locator.page().waitForTimeout(intervaloMs);
  }
  return false;
}

async function abrirAlterarPorIndice(pageAnuncios, indice) {
  const botoes = pageAnuncios.locator('button[aria-label="Ações secundárias"]');
  const qtd = await botoes.count();
  if (indice >= qtd) return null;
  const botaoAlvo = botoes.nth(indice);
  await botaoAlvo.scrollIntoViewIfNeeded();
  await pageAnuncios.waitForTimeout(400);
  await botaoAlvo.click();

  const itemAlterar = pageAnuncios.locator('*').filter({ hasText: /^Alterar$/ }).last();
  const apareceu = await esperarElementoComCalma(itemAlterar);
  if (!apareceu) {
    await pageAnuncios.keyboard.press('Escape').catch(() => {});
    return null;
  }
  await itemAlterar.click();
  await pageAnuncios.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  // Correcao real (14/08/2026): mesma regra de paciencia, agora aplicada ao CONTEUDO
  // da pagina de destino (nao so ao menu) -- um waitForTimeout fixo apos navegar deixava
  // ler a pagina "COMPETINDO" ja renderizado mas a secao "Concorrencia no Mercado Livre"
  // ainda nao (texto inconsistente: temCompetindo=true, temConcorrencia=false, ao mesmo
  // tempo). Caso real: SKU WL4000-127V, MLB #5000383363. Correcao: esperar o texto da
  // pagina estabilizar (2 leituras seguidas identicas) antes de ler de verdade.
  const texto = await esperarTextoEstabilizar(pageAnuncios);
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
  const texto = await esperarTextoEstabilizar(pageAnuncios);
  const idxSku = texto.indexOf('SKU ');
  if (idxSku === -1) return null;
  const m = texto.slice(idxSku, idxSku + 60).match(/SKU\s+(\S+)/);
  return m ? m[1] : null;
}

// Correcao real (14/08/2026): a extracao anterior so reconhecia as 4 palavras oficiais
// (GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR) e assumia que o status sempre
// aparece ANTES do marcador "Opção N" -- mas o Mercado Livre usa 2 ordens diferentes:
// "GANHANDO\n\nOpção 1\n...\nR$ 900" (status antes) quando o anuncio esta competindo de
// verdade, e "Opção 1\n...\nR$ 349,90\nInativa" (status DEPOIS do preco, dentro da propria
// opcao) quando o anuncio esta inativo/pausado. Caso real: SKU MCT-32MM-BIV, MLBs
// #5923065708/#5923142884, ambos com Concorrencia confirmada mas status "Inativa" nunca
// capturado por isso. Essa funcao cobre as 2 ordens e aceita qualquer palavra de status
// (nao so as 4 oficiais) -- quem decide se e catalogo e o casamento por preco, nao o
// texto do status em si.
// Correcao real (14/08/2026): quando o anuncio tem SO 1 opcao de venda (sem Classico
// E Premium concorrendo, so um dos dois), o Mercado Livre nao usa o rotulo "Opção N" --
// mostra a condicao direto: "Clássico e Frete grátis\nR$\n1.200\nInativa", sem numeracao.
// Caso real: SKU WL4000-220V, MLB #6680162274 (Concorrencia confirmada, mas
// extrairOpcoesConcorrencia() achava 0 "Opção N" porque nao existia nenhum rotulo).
function extrairOpcaoUnicaSemRotulo(blocoConc) {
  const m = blocoConc.match(/(Clássico|Premium)\s+e\s+Frete\s+grátis\s*\n?\s*R\$\s*\n?\s*([\d.,]+)\s*\n?\s*([^\n]{0,40})/);
  if (!m) return [];
  return [{ preco: m[2], status: m[3].trim() || null, condicaoDaOpcao: m[1] }];
}

function extrairOpcoesConcorrencia(blocoConc) {
  const marcadores = [...blocoConc.matchAll(/Opção\s*\d+/g)];
  if (marcadores.length === 0) return extrairOpcaoUnicaSemRotulo(blocoConc);
  const opcoes = [];
  for (let i = 0; i < marcadores.length; i++) {
    const inicioOpcao = marcadores[i].index;
    const fimOpcao = marcadores[i + 1] ? marcadores[i + 1].index : blocoConc.length;
    const segmento = blocoConc.slice(inicioOpcao, fimOpcao);
    const precoMatch = segmento.match(/R\$\s*\n?\s*([\d.,]+)/);
    if (!precoMatch) continue;

    // Status DEPOIS do preco, dentro do proprio segmento (ex: "Inativa")
    const restoAposPreco = segmento.slice(precoMatch.index + precoMatch[0].length);
    const statusDepoisMatch = restoAposPreco.match(/^\s*\n?\s*([A-ZÀ-Úa-zà-ú][^\n]{0,40})/);
    const statusDepois = statusDepoisMatch ? statusDepoisMatch[1].trim() : null;

    // Status ANTES do marcador "Opção N" (ex: "GANHANDO\n\nOpção 1")
    const antesTexto = blocoConc.slice(Math.max(0, inicioOpcao - 60), inicioOpcao);
    const statusAntesMatch = antesTexto.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b\s*$/);
    const statusAntes = statusAntesMatch ? statusAntesMatch[1] : null;

    opcoes.push({ preco: precoMatch[1], status: statusAntes || statusDepois || null });
  }
  return opcoes;
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
    await esperarTextoEstabilizar(pageAnuncios);
    await rolarPagina(pageAnuncios, 14);
    await pageAnuncios.mouse.wheel(0, -20000);
    const texto = await esperarTextoEstabilizar(pageAnuncios);
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
      // Correcao real (14/08/2026): regex era case-insensitive (/i), o que casava a
      // palavra "ganhando" minuscula dentro de frases comuns como "Voce esta ganhando
      // com outra opcao de venda" (mensagem de MLB SEM status explicito) como se fosse
      // o badge oficial "GANHANDO" (sempre maiusculo de verdade). Isso fez o MLB pular
      // a checagem via Alterar+preco que deveria ter rodado. Caso real: SKU MCT-19MM-BIV,
      // MLB #5923239572 foi classificado errado como "GANHANDO explicito" sem nunca ter
      // status de verdade. Correcao: case-sensitive -- o badge real e sempre maiusculo,
      // frases comuns usam minuscula, entao nao ha ambiguidade real.
      const statusMatch = blocoMlb.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/);
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
          const opcoes = extrairOpcoesConcorrencia(blocoConc);
          const precosProprios = [mlbs[mlb].precoBase, mlbs[mlb].precoPromo].filter(Boolean);
          const opcaoBatida = opcoes.find(o => o.status && precosProprios.includes(o.preco));

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
      await esperarTextoEstabilizar(pageAnuncios);
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
    await esperarTextoEstabilizar(pageAnuncios);

    for (const campanha of CAMPANHAS) {
      const chaveCampanha = campanha.nome;
      if (!resultados[chaveCampanha]) resultados[chaveCampanha] = {};

      console.log(`\n\n########## CAMPANHA: ${campanha.nome} ##########`);
      const pageCampanha = await openBackgroundPage(browser, context, campanha.url);

      let texto = await esperarTextoEstabilizar(pageCampanha);
      await rolarPagina(pageCampanha, 10);
      texto = await esperarTextoEstabilizar(pageCampanha);

      const botaoPausados = pageCampanha.getByText('Pausados', { exact: true }).first();
      await botaoPausados.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      if (await botaoPausados.count() > 0) {
        await botaoPausados.click();
        await esperarTextoEstabilizar(pageCampanha);
        await rolarPagina(pageCampanha, 14);
        await esperarTextoEstabilizar(pageCampanha);
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

          const linkVerVariacoes = elTitulo.locator('xpath=following::*[normalize-space(text())="Ver variações"][1]');
          const apareceuLink = await esperarElementoComCalma(linkVerVariacoes);
          if (!apareceuLink) { console.log('  Link Ver variacoes nao encontrado -- pulando'); continue; }
          await linkVerVariacoes.click();
          await rolarPagina(pageCampanha, 10);
          const textoDrawer = await esperarTextoEstabilizar(pageCampanha);
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

            // Trava de seguranca (13/08/2026, pedida pelo Felipe apos auditoria do @analyst):
            // os 2 unicos SKUs testados nesta sessao (WW2-127V, WW2-220V) tinham no maximo
            // 2 MLBs de catalogo confirmados (1 Classico + 1 Premium). Um SKU com 3+ MLBs de
            // catalogo e um cenario real possivel (ex: 2 anuncios Classico concorrendo entre
            // si) mas NUNCA foi validado contra a estrutura de dados real -- para o pipeline
            // aqui, mostra a tabela pro Felipe revisar ao vivo, e nao marca este produto como
            // concluido (sera reprocessado do zero ao retomar, garantindo consistencia).
            const qtdCatalogoConfirmado = Object.values(analise.mlbs).filter(d => d.statusCatalogo).length;
            if (qtdCatalogoConfirmado >= 3) {
              console.log(`\n\n⚠️⚠️⚠️ SKU COM ${qtdCatalogoConfirmado} MLBs DE CATÁLOGO CONFIRMADOS: ${sku} ⚠️⚠️⚠️`);
              console.log('Cenário nunca testado nesta sessão -- pipeline parado pra revisão manual.\n');
              const linhasTabela = Object.entries(analise.mlbs)
                .filter(([, d]) => d.statusCatalogo)
                .map(([mlbId, d]) => ({
                  MLB: mlbId,
                  Condição: d.condicao || '-',
                  'Status Catálogo': d.statusCatalogo || '-',
                  Depósito: d.deposito || '-',
                  FULL: d.full || '-',
                  Qualidade: d.qualidade || '-',
                  Experiência: d.experiencia || '-',
                }));
              console.table(linhasTabela);

              const arquivoAlerta = path.resolve(__dirname, 'alerta-3-catalogos.json');
              fs.writeFileSync(arquivoAlerta, JSON.stringify({ campanha: chaveCampanha, produto: tituloProduto, sku, mlbsDetalhe: analise.mlbs }, null, 2));
              console.log(`\n🛑 PIPELINE PARADO -- revise a tabela acima com o Felipe.`);
              console.log(`Progresso já salvo em ${ARQUIVO_SAIDA} (este produto NÃO foi marcado como concluído -- será reprocessado do zero ao retomar).`);
              console.log(`Detalhe completo do alerta salvo em ${arquivoAlerta}.`);
              console.log('Depois de revisar, rode o pipeline de novo pra continuar de onde parou.');
              await minimizeChrome().catch(() => {});
              await browser.close().catch(() => {});
              process.exit(1);
            }

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
