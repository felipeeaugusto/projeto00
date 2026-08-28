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

// Correcao real (14/08/2026): descoberto durante o teste da SKU PROSB-3000 -- em algum
// ponto do fluxo (provavelmente uma consequencia colateral de cliques repetidos no menu
// de "Acoes secundarias"/Alterar), o menu lateral do site (`nav-sidebar-app`) pode
// expandir sozinho e passar a interceptar cliques na caixa de busca ("... subtree
// intercepts pointer events"), quebrando toda checagem seguinte. Protecao defensiva:
// checar e fechar o menu lateral ANTES de cada clique na caixa de busca.
async function fecharSidebarSeAberta(page) {
  const expandida = await page.locator('.nav-sidebar-app.nav-sidebar--expanded').count().catch(() => 0);
  if (expandida > 0) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.mouse.click(600, 150).catch(() => {}); // clique em area neutra, longe do sidebar
    await page.waitForTimeout(500);
  }
}

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

// Correção real (14/08/2026, item 1 do checklist de correção pedido pelo Felipe/@analyst):
// a versão anterior rolava um número FIXO de vezes (`vezes`) -- isso não é a mesma coisa
// que "rolar até esgotar de verdade". O Felipe confirmou que a listagem é infinite-scroll
// real (sem paginação por botão), então o critério certo é rolar até a altura do conteúdo
// da página PARAR DE CRESCER (mesmo princípio da REGRA GERAL de paciência, aplicado à
// rolagem em vez de à leitura de conteúdo). O parâmetro `maxTentativas` deixa de ser "quantas
// vezes rolar" e passa a ser só um teto de segurança (nunca roda pra sempre) -- na prática,
// pra páginas pequenas (2-4 cards) o loop já para bem antes desse teto, então os valores
// antigos passados nas chamadas (10, 14, 16...) continuam funcionando sem precisar editar
// cada chamada, só que agora como teto, não como contagem exata.
async function rolarPagina(page, maxTentativas = 40, intervaloMs = 600) {
  let alturaAnterior = -1;
  let semCrescerSeguidas = 0;
  for (let i = 0; i < maxTentativas; i++) {
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(intervaloMs);
    const alturaAtual = await page.evaluate(() => document.body.scrollHeight).catch(() => -1);
    if (alturaAtual === alturaAnterior) {
      semCrescerSeguidas++;
      // 3 medições seguidas sem crescer = considera esgotado -- evita parar cedo demais
      // por causa de um unico "engasgo" de rede entre 2 medições.
      if (semCrescerSeguidas >= 3) break;
    } else {
      semCrescerSeguidas = 0;
    }
    alturaAnterior = alturaAtual;
  }
}

// Item 4 do checklist (14/08/2026) -- "ID Family": um agrupamento colapsado que aparece
// quando várias variações de um SKU compartilham um "Product ID" externo do Mercado
// Livre (número de 16 dígitos, ex: #3688504835686264 -- não bate no padrão normal de
// MLB #\d{7,11}, e não tem linha "SKU <valor>" própria, mostra preço em FAIXA em vez de
// preço único: "R$ 239,90 a R$ 279"). Cada card assim tem um botão com
// aria-label="Expandir anúncios" que, quando clicado, revela sub-cards com os MLBs reais
// escondidos dentro -- cada um desses sub-cards já vem no formato normal (SKU própria,
// preço único, 1 MLB por card) que `extrairCards`/`analisarSku` já sabem processar sem
// nenhuma mudança. Caso real validado: SKU PROSB-3000 (2 grupos ID Family, 6 MLBs reais
// escondidos dentro deles, revelados só depois de expandir).
//
// Descoberta real (14/08/2026): o botão MANTÉM o aria-label "Expandir anúncios" mesmo
// depois de já expandido (não muda pra "Recolher anúncios") -- por isso NUNCA usar um
// loop que re-checa a contagem esperando ela DIMINUIR (trava pra sempre, ou pior, fica
// clicando no mesmo botão repetidas vezes alternando expandir/recolher).
//
// Correção real (14/08/2026, item 1 da validação do @analyst sobre a correção do bug de
// índice): a versão anterior contava os botões UMA VEZ e clicava em cada índice UMA VEZ,
// assumindo que nenhum "ID Family" pode conter outro "ID Family" aninhado dentro dele.
// Nunca visto na prática, mas nunca descartado -- se expandir um grupo revelar um NOVO
// botão "Expandir anúncios" (grupo dentro de grupo), esse clique nunca aconteceria e os
// MLBs escondidos lá dentro nem apareceriam no texto (pior que o bug de índice: MLBs
// sumindo silenciosamente). Correção: repetir rodadas -- em cada rodada, reconta quantos
// botões existem AGORA; se a contagem cresceu desde a última rodada, clica só nos ÍNDICES
// NOVOS (de `qtdJaClicada` até `qtdAtual - 1`) -- nunca reclica nos que já foram clicados
// antes (o aria-label não muda, então reclicar neles os RECOLHERIA por engano). Repete até
// uma rodada não achar nenhum índice novo, com teto de segurança de 10 rodadas.
async function expandirTodosIdFamily(page) {
  let qtdJaClicada = 0;
  for (let rodada = 0; rodada < 10; rodada++) {
    const botoesExpandir = page.locator('button[aria-label="Expandir anúncios"]');
    const qtdAtual = await botoesExpandir.count();
    if (qtdAtual <= qtdJaClicada) break; // nenhum botão novo nesta rodada -- esgotado

    for (let i = qtdJaClicada; i < qtdAtual; i++) {
      await botoesExpandir.nth(i).click({ timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1800);
    }
    qtdJaClicada = qtdAtual;
    // Conteúdo revelado pode estar fora da viewport atual -- rola antes da próxima
    // rodada recontar, senão um grupo aninhado que só carrega ao rolar nunca é visto.
    await rolarPagina(page, 10);
  }
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
//
// Correção real (14/08/2026, item 2 do checklist): "texto parou de mudar" sozinho NÃO
// prova que o conteúdo real carregou -- um estado intermediário (ex: "0 anúncios" antes
// do AJAX popular, ou COMPETINDO renderizado mas a seção Concorrência ainda não) pode
// ficar parado tempo suficiente pra passar como "estável" sem estar completo. Caso real:
// SKU WL4000-220V voltou vazio numa rodada; MLB #5000383363 (WL4000-127V) leu
// temCompetindo=true e temConcorrencia=false ao mesmo tempo -- combinação logicamente
// impossível se a pagina tivesse carregado de verdade. Correção: aceita um `validarConteudo`
// opcional (callback) que checa marcadores estruturais especificos, ALÉM da estabilidade
// de texto -- só aceita como "carregado" quando as 2 condições baterem juntas.
async function esperarTextoEstabilizar(page, opcoes = {}) {
  const { maxTentativas = 8, intervaloMs = 1000, validarConteudo = () => true } = opcoes;
  let anterior = null;
  for (let t = 0; t < maxTentativas; t++) {
    const atual = await page.locator('body').innerText();
    const textoEstavel = anterior !== null && atual === anterior && !atual.includes('A página está carregando') && atual.length > 200;
    if (textoEstavel && validarConteudo(atual)) {
      return atual;
    }
    anterior = atual;
    await page.waitForTimeout(intervaloMs);
  }
  return anterior;
}

// Validadores de conteúdo reutilizáveis (item 2 do checklist) -- cada um confirma um
// marcador estrutural específico, além da estabilidade genérica de texto.
//
// Correcao real (14/08/2026, achado durante o reprocessamento real da campanha
// [ML] [BAIXA PERFORMANCE]): os 2 marcadores genericos abaixo ("Filtrar e ordenar" +
// contador de anuncios) sao verdadeiros pro resultado de QUALQUER busca -- inclusive
// uma busca ANTIGA que ainda esteja na tela, se a busca nova nao tiver disparado de
// verdade (caso real confirmado: um `.fill()+Enter` que nao atualizou a pagina, MLB
// 6174001096 retornou o SKU de outro produto completamente diferente). Agora exige
// tambem que o TERMO BUSCADO (MLB ou SKU) apareca no texto -- fecha o buraco de aceitar
// conteudo desatualizado como se fosse o resultado da busca atual.
function validarBuscaSkuCarregada(texto, termoBuscado) {
  if (!texto.includes('Filtrar e ordenar')) return false;
  if (!/\d+\s+an[uú]ncios?/i.test(texto)) return false;
  if (termoBuscado && !texto.includes(termoBuscado)) return false;
  return true;
}

function validarPaginaAlterarCarregada(texto) {
  // Nunca aceitar COMPETINDO sem a seção de Concorrência -- combinação contraditória
  // que indica renderização parcial (caso real: MLB #5000383363, SKU WL4000-127V).
  if (texto.includes('COMPETINDO') && !texto.includes('Concorrência no Mercado Livre')) return false;
  return true;
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

// Correcao real (17/08/2026, achado pelo Felipe + investigado pelo @analyst via *elicit):
// a versao anterior desta funcao (abrirAlterarPorIndice, removida) clicava no menu "Acoes
// secundarias" + item "Alterar", navegando a MESMA aba de Anuncios pra dentro da tela de
// EDICAO do anuncio -- sem nunca abrir separado nem fechar depois. Felipe considerou isso
// um risco serio (a tela "Alterar" edita um anuncio real de producao; ficar repetidamente
// navegando pra dentro dela na mesma aba usada pro resto do processo, sem isolamento,
// aumenta a exposicao a qualquer interacao inesperada). Investigacao ao vivo do @analyst
// revelou que a suposicao antiga ("impossivel abrir em aba nova, o item nao e um <a href>
// de verdade") estava ERRADA -- o item "Alterar" e um link real:
// <a href="https://www.mercadolivre.com.br/syi/core/modify?itemId=MLB{numero}">.
// Esta funcao substitui a antiga inteira: monta essa URL direto (sem precisar clicar em
// nenhum menu por posicao/indice -- elimina tambem a classe de bug "indice de botao
// errado", causa real do erro do MLB AOC21-30HM/4526861389 mais cedo hoje), abre numa aba
// SEPARADA via openBackgroundPage (mesmo padrao ja validado no projeto pro "Modo
// Navegador"), le o texto, e SEMPRE fecha essa aba antes de retornar (bloco finally, roda
// mesmo em erro) -- a aba principal de Anuncios nunca e tocada/navegada.
// Correcao real (17/08/2026): a versao anterior fechava a aba num `finally` interno,
// mas o fluxo que le o formato "colapsado" (ver mais abaixo, extrairBadgeConcorrenciaColapsada)
// precisa CLICAR na secao pra expandir e reler DEPOIS de receber o resultado desta funcao
// -- ou seja, precisa da pagina ainda ABERTA. Por isso esta funcao devolve a `page` viva
// junto do texto (em vez de fechar sozinha) -- quem chama e responsavel por fechar, DEPOIS
// de terminar toda interacao (incluindo o clique de expandir), num finally no site de
// chamada. So fecha aqui dentro no caminho de FALHA (quando nunca vai ser usada mesmo).
async function abrirAlterarPorMlb(context, mlb) {
  const browser = context.browser();
  const urlAlterar = `https://www.mercadolivre.com.br/syi/core/modify?itemId=MLB${mlb}`;
  const pageAlterar = await openBackgroundPage(browser, context, urlAlterar);
  await pageAlterar.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  // Mesma regra de paciencia de sempre (14/08/2026): esperar o texto estabilizar E
  // confirmar consistencia estrutural antes de ler de verdade.
  const texto = await esperarTextoEstabilizar(pageAlterar, { validarConteudo: validarPaginaAlterarCarregada });
  // Marcador que sempre aparece numa pagina de Alterar carregada de verdade (visto em
  // toda captura real de hoje) -- se nao aparecer, a URL nao levou pra onde devia (ex:
  // MLB sem essa tela disponivel, mesmo padrao do caso AOC21-30HM/4526861389) e nao da
  // pra confiar no conteudo.
  if (!texto || !texto.includes('Estoque no depósito')) {
    await pageAlterar.close().catch(() => {});
    return null;
  }
  return { page: pageAlterar, url: pageAlterar.url(), texto };
}

// Correcao real (14/08/2026, achado durante o reprocessamento real da campanha
// [ML] [BAIXA PERFORMANCE]): a busca reversa MLB->SKU nao confirmava que a busca NOVA
// realmente disparou antes de ler o resultado -- se o `.fill()+Enter` nao atualizasse
// a pagina de verdade (caso real confirmado via diagnostico isolado), o codigo aceitava
// conteudo de uma busca ANTERIOR como se fosse o resultado do MLB pedido, retornando o
// SKU errado silenciosamente. Correcao: `validarBuscaSkuCarregada` agora exige que o
// MLB buscado apareca no texto (ver comentario na definicao da funcao); alem disso,
// defesa redundante aqui -- se mesmo assim o texto final nao contiver o MLB, tenta a
// busca de novo UMA vez do zero antes de desistir (cobre o caso em que o `.fill()+Enter`
// falhou silenciosamente em disparar a busca, onde so esperar mais nao ajuda).
async function tentarBuscarMlb(pageAnuncios, mlb) {
  const fecharDrawer = pageAnuncios.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAnuncios.waitForTimeout(400); }
  await fecharSidebarSeAberta(pageAnuncios);
  const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(mlb);
  await pageAnuncios.keyboard.press('Enter');
  await esperarTextoEstabilizar(pageAnuncios, { validarConteudo: (texto) => validarBuscaSkuCarregada(texto, mlb) });
  // Correcao real (16/08/2026, achado pelo Felipe na validacao manual): essa busca nunca
  // expandia "ID Family" -- se o MLB buscado estivesse escondido dentro de um Card
  // colapsado, o numero dele nem aparece no texto ate expandir, entao a validacao de
  // termo (item anterior) SEMPRE falhava pra esse caso, mesmo com retry. Caso real
  // confirmado: MLB #5948136650 (produto "Mixer Philco PMX1000") -- o Felipe expandiu
  // manualmente o ID Family e achou o SKU real (PMX1000-220V) sem problema. `buscarERolar`
  // (usada pra buscar por SKU) ja fazia isso certo; essa funcao (busca reversa MLB->SKU)
  // ficou incompleta. Custo aceito: quando nao ha ID Family, expandirTodosIdFamily sai
  // rapido (contagem de botoes e 0, quebra na primeira checagem).
  await rolarPagina(pageAnuncios, 40);
  await expandirTodosIdFamily(pageAnuncios);
  await rolarPagina(pageAnuncios, 40);
  return esperarTextoEstabilizar(pageAnuncios, { validarConteudo: (texto) => validarBuscaSkuCarregada(texto, mlb) });
}

async function acharSkuDoMlb(pageAnuncios, mlb) {
  let texto = await tentarBuscarMlb(pageAnuncios, mlb);
  if (!texto.includes(mlb)) {
    texto = await tentarBuscarMlb(pageAnuncios, mlb); // re-busca do zero, uma vez
    if (!texto.includes(mlb)) return null;
  }
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
// Correcao real (14/08/2026, item 3 do checklist): a regex aceitava qualquer texto na
// linha seguinte ao preco como "status", sem validar se faz sentido. Caso real: MLB
// #5000740711 (SKU WL4000-127V) capturou "Nível de visitas:" (um rotulo de interface,
// nao um status) como se fosse status valido. Lista de rejeicao pra descartar capturas
// obviamente erradas -- texto terminando em ":" (rotulo de campo) ou frases conhecidas
// que nao sao status.
// Correcao real (14/08/2026, item 1 da validacao do @analyst sobre a lacuna do casamento
// de preco): entradas de "Outras opcoes de venda" (referencia ao proprio anuncio irmao,
// ex: "Clássico e Frete grátis") sao capturadas por extrairOpcoesConcorrencia() como se
// fossem "status" -- mas nao sao status de competicao real, sao so um rotulo de condicao.
// Foi exatamente uma entrada dessas ("Clássico e Frete grátis R$1.399,90") que causou o
// bug original reportado pelo Felipe: o preco dela coincidiu com o precoBase do MLB
// #6714259004 e foi usada como se fosse o status catalogo dele. Rejeitar aqui faz essas
// entradas virarem status:null, o que ja exclui elas de `opcoes.find(o => o.status && ...)`
// em analisarSku -- sem precisar mudar mais nada.
// Correcao real (16/08/2026): "Pagamento sem juros"/"Frete grátis"/"Envios com
// coleta"/"Envios no mesmo dia" sao rotulos de forma de pagamento/entrega que sempre
// aparecem logo apos o preco na secao Concorrencia -- nunca sao status real. Caso real:
// MLB #5247671694 (SKU CHTMINI-BIV) capturou "Pagamento sem juros" como se fosse status.
const FRASES_NAO_STATUS = [/:$/, /^Outras opções de venda$/i, /^Nível de visitas$/i, /^Experiência de compra$/i, /^(Clássico|Premium)\s+e\s+(?:Frete\s+grátis|Envio por conta do comprador)$/i, /^Pagamento sem juros$/i, /^Frete grátis$/i, /^Envios com coleta$/i, /^Envios no mesmo dia$/i];
function pareceStatusValido(texto) {
  if (!texto) return false;
  const limpo = texto.trim();
  if (!limpo) return false;
  return !FRASES_NAO_STATUS.some(re => re.test(limpo));
}

// Correcao real (16/08/2026, achado pelo Felipe na validacao manual): quando a
// Concorrencia mostra "anuncio ganhador vs nosso anuncio perdendo" sem numeracao "Opção
// N", pode ter "Nível de visitas:\n(Mínimo|Máximo)\n" entre a condicao e o preco -- ex:
// "Clássico e Frete grátis\nNível de visitas:\nMínimo\nR$174,58". O regex antigo exigia
// o preco logo depois da condicao, sem texto no meio, e nunca batia nesse caso. Caso
// real confirmado: MLB #5247671694 (SKU CHTMINI-BIV). Correcao: grupo opcional especifico
// pra esse texto -- nao generico o suficiente pra aceitar qualquer coisa, so o padrao
// real ja confirmado. Indices dos grupos capturados nao mudam (m[1]=condicao, m[2]=preco,
// m[3]=status).
//
// Correcao real (16/08/2026, achado direto no texto ao vivo, nao so na transcricao do
// Felipe): confirmei que o texto real desse mesmo caso (MLB #5247671694) tem "PERDENDO"
// ANTES da condicao ("PERDENDO\n\nClássico e Frete grátis..."), e o texto logo APOS o
// preco e "Pagamento sem juros" (rotulo de forma de pagamento, nao status). Essa funcao
// so olhava DEPOIS do preco -- nunca verificava se havia um status explicito ANTES,
// diferente de extrairOpcoesConcorrencia (que ja faz essa checagem "antes" pro formato
// numerado). Correcao: mesma logica de prioridade aqui -- status antes tem prioridade
// sobre status depois.
// Correcao real (17/08/2026, achado na regressao apos trocar o mecanismo de Alterar):
// o regex so reconhecia "e Frete grátis" como sufixo de condicao -- mas o Mercado Livre
// tambem usa "e Envio por conta do comprador" pro mesmo formato (mesma estrutura, so a
// forma de envio muda). Caso real confirmado: MLB #4315960981 (SKU FP100-220V), texto
// real "Clássico e Envio por conta do comprador\n...\nR$\n78,99\n..." -- nunca batia,
// opcoesComStatus.length ficava 0 por engano, e o MLB caia (errado) no fallback de
// "formato colapsado".
function extrairOpcaoUnicaSemRotulo(blocoConc) {
  // Correcao real (17/08/2026, achado ao vivo -- MLB #6722040752/PAF15B-220V): so
  // aceitava "Nível de visitas: Mínimo" ou "Máximo" -- "Médio" (3o valor real, nunca visto
  // antes) fazia o grupo opcional falhar em consumir a linha, quebrando o match inteiro
  // (nada casava, blocoConc caia no fallback de clicar-pra-expandir, que troca a secao
  // inteira por "Experiência de compra" e destroi o texto da comparacao que ja estava
  // certo). Confirmado ao vivo: badge estava la, estavel, em 3 leituras seguidas
  // (COMPARTILHANDO) -- o problema era so nao reconhecer "Médio".
  const m = blocoConc.match(/(Clássico|Premium)\s+e\s+(?:Frete\s+grátis|Envio por conta do comprador)\s*\n?\s*(?:Nível de visitas:\s*\n?\s*(?:Mínimo|Médio|Máximo)\s*\n?\s*)?R\$\s*\n?\s*([\d.,]+)\s*\n?\s*([^\n]{0,40})/);
  if (!m) return [];

  const antesTexto = blocoConc.slice(Math.max(0, m.index - 60), m.index);
  const statusAntesMatch = antesTexto.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b\s*$/);
  const statusAntes = statusAntesMatch ? statusAntesMatch[1] : null;

  const statusDepoisBruto = m[3].trim();
  const statusDepois = pareceStatusValido(statusDepoisBruto) ? statusDepoisBruto : null;

  return [{ preco: m[2], status: statusAntes || statusDepois || null, condicaoDaOpcao: m[1] }];
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

    // Status DEPOIS do preco, dentro do proprio segmento (ex: "Inativa"). Mesma guarda
    // do item 3 do checklist -- rejeita capturas obvias de nao-status (rotulos de campo).
    const restoAposPreco = segmento.slice(precoMatch.index + precoMatch[0].length);
    const statusDepoisMatch = restoAposPreco.match(/^\s*\n?\s*([A-ZÀ-Úa-zà-ú][^\n]{0,40})/);
    const statusDepoisBruto = statusDepoisMatch ? statusDepoisMatch[1].trim() : null;
    const statusDepois = pareceStatusValido(statusDepoisBruto) ? statusDepoisBruto : null;

    // Status ANTES do marcador "Opção N" (ex: "GANHANDO\n\nOpção 1")
    const antesTexto = blocoConc.slice(Math.max(0, inicioOpcao - 60), inicioOpcao);
    const statusAntesMatch = antesTexto.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b\s*$/);
    const statusAntes = statusAntesMatch ? statusAntesMatch[1] : null;

    // Correcao real (24/08/2026, achada no SKU JBLQ-360 -- Felipe apontou via screenshots
    // 41/42 que cada "Opção N" ja vem rotulada com a condicao ("Clássico e Frete grátis" /
    // "Premium e Frete grátis"), mas essa extracao nunca capturava isso -- so
    // extrairOpcaoUnicaSemRotulo capturava `condicaoDaOpcao`. Sem isso, o casamento por
    // condicao adicionado no `opcaoBatida` (mesma correcao) era um no-op pra esse formato
    // -- exatamente o formato usado pelos 2 casos reais problematicos de hoje (JBLQ-360,
    // PCX26000). Mesmo padrao de regex ja usado no resto do arquivo pra condicao.
    const condicaoMatch = segmento.match(/\b(Clássico|Premium)\b/);

    opcoes.push({ preco: precoMatch[1], status: statusAntes || statusDepois || null, condicaoDaOpcao: condicaoMatch ? condicaoMatch[1] : null });
  }
  return opcoes;
}

// Correcao real (16/08/2026, achado pelo Felipe na validacao manual, investigado ao vivo
// pelo @analyst via *elicit): existe um 3o formato de "Concorrencia no Mercado Livre",
// diferente dos 2 que extrairOpcoesConcorrencia/extrairOpcaoUnicaSemRotulo ja cobrem --
// comparacao unica contra 1 concorrente externo, mostrada COLAPSADA por padrao (so o
// badge + um texto generico tipo "Melhore o preco..."), sem nenhuma "Opção N" nem o
// padrao "Clássico e Frete grátis". Precisa clicar no cabecalho da secao pra expandir e
// revelar a tabela real ("Características | Média de outros anúncios | Seu anúncio").
// Caso real confirmado: MLB #4935565074 (SKU PROSB-3000), badge "PREÇO ALTO" -- o
// pipeline classificava esse MLB como "pai" (sem catalogo) so por a palavra "COMPETINDO"
// nao aparecer, quando na verdade "COMPETINDO" e um badge de pagina DIFERENTE (aparece
// perto do titulo do anuncio, no formato "Opção N"), nao tem nada a ver com este formato.
// O badge deste formato (ex: "PREÇO ALTO") vem logo apos "Concorrência no Mercado
// Livre\n\n" -- usado como o proprio statusCatalogo (mesma logica ja usada pros outros 2
// formatos: o texto literal do badge/status real, nao uma lista fechada de palavras).
function extrairBadgeConcorrenciaColapsada(blocoConc) {
  const m = blocoConc.match(/Concorrência no Mercado Livre\s*\n+\s*([^\n]+)\s*\n/);
  if (!m) return null;
  const badge = m[1].trim();
  // Correcao real (17/08/2026, achado na regressao apos trocar o mecanismo de Alterar):
  // a primeira linha apos o cabecalho "Concorrência no Mercado Livre" NEM SEMPRE e o
  // badge -- varios formatos tem uma frase introdutoria generica ANTES do badge de
  // verdade (ex: "Outros vendedores oferecem melhores condições de venda.", "Você
  // oferece condições de venda semelhantes às de outros vendedores."). Casos reais
  // confirmados: MLB #4315960981 (FP100-220V) e #6722040752 (PAF15B-220V) -- essas
  // frases viraram "statusCatalogo" por engano. pareceStatusValido() sozinho nao pegava
  // isso (lista de bloqueio so cobre frases ja vistas antes, cresceria pra sempre).
  // Todos os badges reais confirmados hoje (GANHANDO, PERDENDO, COMPARTILHANDO,
  // RESTRITO PARA GANHAR, PREÇO ALTO) sao sempre TODO EM MAIUSCULA -- exigir isso
  // rejeita qualquer frase descritiva (sempre com minuscula e pontuacao) de forma
  // estrutural, sem precisar listar cada frase nova conforme aparece.
  if (!/^[A-ZÀ-Ú\s]+$/.test(badge)) {
    // Correcao real (18/08/2026, achado no piloto do reprocessamento completo, SKU
    // CKESSTC-ITA5Q, MLBs #4277217107/#4277230155): quando o vendedor esta impedido de
    // disputar por Experiencia de compra ruim, ESTA pagina especifica (Alterar, formato
    // colapsado) mostra uma frase narrativa em vez do badge maiusculo "RESTRITO PARA
    // GANHAR" -- confirmado ao vivo: "Você não pode ganhar porque tem experiência de
    // compra ruim." Mesma situacao ja documentada (mapeamento-skus-ads-catalogo-
    // mercadolivre.md, Passo A.1 -- "'Restrito para ganhar' significa que o MLB é de
    // catálogo, mas está impedido de disputar... porque a Experiência de compra do
    // vendedor está baixa"), so que nesta tela especifica ela aparece em texto corrido,
    // nao como badge maiusculo isolado.
    if (/você não pode ganhar/i.test(badge)) return 'RESTRITO PARA GANHAR';
    return null;
  }
  return pareceStatusValido(badge) ? badge : null;
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
  // Correcao real (14/08/2026, item 3 da validacao do @analyst sobre o bug de busca
  // reversa MLB->SKU): mesma fragilidade existia aqui -- se a busca inicial pelo SKU
  // nao disparasse de verdade, o resto do fluxo (rolagem, expansao de ID Family,
  // leitura final) rodaria sobre a pagina ERRADA (de uma busca anterior). Consequencia
  // aqui e mais branda que em acharSkuDoMlb (o filtro `cards.filter(c => c.skuValor ===
  // sku)` mais abaixo evitaria atribuir dado errado), mas ainda pode gerar um resultado
  // vazio silencioso (parece "SKU sem MLBs" quando na verdade a busca nunca atualizou).
  // Correcao: exigir que o SKU buscado apareca no texto antes de aceitar a busca inicial
  // como carregada, com 1 retry (busca do zero) se nao bater.
  async function realizarBuscaInicial() {
    await fecharSidebarSeAberta(pageAnuncios);
    const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(sku);
    await pageAnuncios.keyboard.press('Enter');
    return esperarTextoEstabilizar(pageAnuncios, { validarConteudo: (texto) => validarBuscaSkuCarregada(texto, sku) });
  }

  async function buscarERolar() {
    let textoInicial = await realizarBuscaInicial();
    if (!textoInicial.includes(sku)) {
      textoInicial = await realizarBuscaInicial(); // re-busca do zero, uma vez
    }
    await rolarPagina(pageAnuncios, 40);
    // Item 4 do checklist: expandir todo "ID Family" colapsado ANTES de ler o texto --
    // a expansao revela novo conteudo (sub-cards com MLBs reais), entao rola de novo
    // depois pra garantir que tudo o que foi revelado tambem esta visivel/carregado.
    await expandirTodosIdFamily(pageAnuncios);
    await rolarPagina(pageAnuncios, 40);
    await pageAnuncios.mouse.wheel(0, -20000);
    const texto = await esperarTextoEstabilizar(pageAnuncios, { validarConteudo: (texto) => validarBuscaSkuCarregada(texto, sku) });
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

  // Correcao real (14/08/2026) -- indice de botao errado apos expandir "ID Family":
  // `ordemMlbsGlobal` so incluia MLBs reais, mas cada card "ID Family" (agrupamento
  // colapsado, ver expandirTodosIdFamily) TAMBEM tem seu proprio botao "Acoes
  // secundarias" no DOM (pra acoes no nivel do grupo inteiro) -- esse botao continua
  // existindo mesmo depois de expandido. Como esse botao nunca era contado, todo indice
  // calculado a partir do 1o grupo em diante ficava deslocado, clicando no botao errado.
  // Caso real confirmado (SKU PROSB-3000, mapeamento indice->item_id real validado 1 a
  // 1): 8 botoes no DOM pra 6 MLBs reais -- os 2 extras sao os cabecalhos dos 2 grupos
  // ID Family, um logo ANTES dos MLBs do proprio grupo.
  //
  // Correcao: escanear TODA linha "#numero" (qualquer tamanho, nao so 7-11 digitos) na
  // ordem em que aparecem no texto -- cada uma corresponde a exatamente 1 botao "Acoes
  // secundarias" no DOM. As que SAO MLB real (ja capturadas em `cards`) entram com o
  // proprio numero; as que NAO sao (cabecalhos de grupo ID Family, 12+ digitos, sem
  // "SKU" propria) entram como `null` -- ocupando o slot de indice sem nunca ser
  // retornadas por `.indexOf(mlb)`, preservando o deslocamento correto pros MLBs reais
  // que vem depois.
  function construirOrdemBotoes(linhas, cards) {
    const linhasRealMlb = new Set();
    for (const card of cards) {
      for (let li = card.linhaHeaderIdx; li < card.linhaSkuIdx; li++) linhasRealMlb.add(li);
    }
    const ordem = [];
    for (let i = 0; i < linhas.length; i++) {
      if (/^#\d+$/.test(linhas[i].trim())) {
        ordem.push(linhasRealMlb.has(i) ? linhas[i].trim().replace('#', '') : null);
      }
    }
    return ordem;
  }

  const blocoBruto = await buscarERolar();
  const { linhas, cards } = extrairCards(blocoBruto);
  const mlbs = {};
  // Ordem real dos botoes "Acoes secundarias" no DOM -- inclui `null` nas posicoes dos
  // cabecalhos de grupo ID Family, pra manter os indices dos MLBs reais corretos.
  const ordemMlbsGlobal = construirOrdemBotoes(linhas, cards);

  // Item 3 da validação do @analyst (14/08/2026): autocheck de runtime -- compara o
  // total calculado a partir do TEXTO (`ordemMlbsGlobal.length`, já conta reais + null)
  // contra a contagem real de botões "Ações secundárias" no DOM, no MESMO estado de
  // página (já expandido/rolado por `buscarERolar`). Se não baterem, os índices podem
  // estar deslocados por algum caso não previsto (ex: uma linha "#numero" isolada que
  // não corresponde a nenhum botão, ou vice-versa).
  //
  // Correção real (22/08/2026, achada pelo Felipe na validação manual do SKU P-JU-03 --
  // avaliada pelo @analyst via *elicit): até aqui essa divergência só virava um
  // console.log, descartado -- foi exatamente o sinal que teria pego a captura
  // incompleta do P-JU-03 (achou só 1 de 4 MLBs reais, sem nenhum erro registrado).
  // Agora o resultado da comparação é devolvido pro chamador (`divergenciaContagemBotoes`)
  // pra virar um `erro` de verdade no registro salvo -- entra automaticamente na regra já
  // validada de "linha com erro é sempre reprocessada, nunca aceita como feita
  // silenciosamente".
  const qtdBotoesReal = await pageAnuncios.locator('button[aria-label="Ações secundárias"]').count().catch(() => -1);
  const divergenciaContagemBotoes = qtdBotoesReal !== -1 && qtdBotoesReal !== ordemMlbsGlobal.length;
  if (divergenciaContagemBotoes) {
    console.log(`⚠️ Divergência de contagem de botões pro SKU ${sku}: calculado ${ordemMlbsGlobal.length}, DOM real ${qtdBotoesReal} — possível captura incompleta`);
  }

  for (let ci = 0; ci < cards.length; ci++) {
    const card = cards[ci];
    if (card.skuValor !== sku) continue; // só processa dados detalhados do SKU buscado

    const janelaCardTexto = linhas.slice(card.linhaSkuIdx, card.linhaSkuIdx + 30).join('\n');
    const fullMatch = janelaCardTexto.match(/Full:\s*\n\s*([^\n]+)/);
    const depMatch = janelaCardTexto.match(/Depósito:\s*\n\s*([^\n]+)/);

    const proximoCard = cards[ci + 1];
    const fimRegiao = proximoCard ? proximoCard.linhaHeaderIdx : linhas.length;
    const regiaoTexto = linhas.slice(card.linhaSkuIdx, fimRegiao).join('\n');

    // Correcao real (16/08/2026, achado pelo Felipe na validacao manual): anuncios sem
    // promocao ativa (preco unico, so "R$ X\n(Clássico|Premium)", sem a linha "em promoção
    // a R$ Y") nunca batiam nesse regex -- o bloco desse MLB nunca era delimitado, perdendo
    // preco, condicao E status explicito (ex: "RESTRITO PARA GANHAR", que estava logo ali
    // no texto, so fora do recorte). Caso real confirmado: MLB #4315960981 (SKU
    // FP100-220V). Correcao: tornar a linha "em promoção a R$ Y" opcional -- a ancora de
    // seguranca da REGRA VALIDADA de 13/08 (nunca usar #\d+ generico) continua intacta,
    // porque o que garante que esse regex nunca bate em lugar errado e a adjacencia final
    // "(Clássico|Premium)" logo depois de um "R$", nao a presenca da linha de promocao.
    // Bonus: fecha tambem um risco latente -- card com MLBs COM e SEM promocao misturados
    // podia dessincronizar o casamento por indice posicional (posicoes[bi]), atribuindo
    // preco de um MLB a outro por engano. Agora todo MLB gera uma entrada em `posicoes`,
    // mantendo os indices sempre alinhados.
    const marcadorBloco = /R\$\s*\n?\s*[\d.,]+\n(?:em promoção a R\$\s*\n?\s*[\d.,]+\n)?(Clássico|Premium)/g;
    const posicoes = [];
    let m;
    while ((m = marcadorBloco.exec(regiaoTexto)) !== null) {
      posicoes.push({ inicio: m.index, condicao: m[1] });
    }

    // Correcao real (16/08/2026, achado pelo Atlas via *elicit): quando o card so tem 1 MLB
    // (ou e o ultimo do card) e nao existe um 2o marcador de preco na regiao, `fimBloco` caia
    // em `regiaoTexto.length` -- ou seja, blocoMlb corria SEM LIMITE ate o fim de toda a
    // regiao, que pode conter o bloco inteiro de metricas/badge/titulo do PROXIMO card real
    // (o titulo sempre aparece 2x logo antes do "#MLB" do proximo card -- ver REGRA VALIDADA
    // de 13/08 sobre a ordem MLB->bloco). Caso real confirmado: MLB #5247646674 (SKU
    // CHTMINI-BIV, anuncio "Sincronizado" -- card de 1 MLB so, sem 2o marcador de preco)
    // capturou o "GANHANDO" de um produto vizinho em vez do proprio "RESTRITO PARA GANHAR".
    // Correcao: usar "Selecionar anúncio\n{titulo}\n{titulo repetido}" (padrao confirmado em
    // 2 capturas ao vivo distintas, sempre logo antes do #MLB do PROXIMO card real) como
    // limite ADICIONAL de corte -- so entra em jogo quando nao ha 2o marcador de preco pra
    // fechar o bloco (regra validada de 13/08 sobre nunca delimitar via #\d+ continua intacta,
    // esse limite nao usa "#numero").
    const limiteProximoCard = /Selecionar anúncio\n([^\n]+)\n\1(?=\n|$)/;

    for (let bi = 0; bi < card.mlbsHeader.length; bi++) {
      const mlb = card.mlbsHeader[bi];
      const inicioBloco = posicoes[bi] ? posicoes[bi].inicio : null;
      let fimBloco = posicoes[bi + 1] ? posicoes[bi + 1].inicio : regiaoTexto.length;
      const blocoEraSemLimite = fimBloco === regiaoTexto.length; // sem 2o marcador de preco pra fechar
      if (inicioBloco !== null && blocoEraSemLimite) {
        const limiteMatch = regiaoTexto.slice(inicioBloco).match(limiteProximoCard);
        if (limiteMatch) fimBloco = inicioBloco + limiteMatch.index;
      }
      const blocoMlb = inicioBloco !== null ? regiaoTexto.slice(inicioBloco, fimBloco) : '';

      const precoBaseMatch = blocoMlb.match(/R\$\s*\n?\s*([\d.,]+)/);
      const precoPromoMatch = blocoMlb.match(/em promoção a R\$\s*\n?\s*([\d.,]+)/);

      // Item 2 da validação do @analyst (14/08/2026, mitigação -- não é prova, é uma
      // camada extra de defesa): hoje a única distinção entre um cabeçalho de grupo "ID
      // Family" (que deve ser ignorado) e um MLB real é o comprimento do número
      // (`/^#\d{7,11}$/` em extrairCards) -- baseado em 1 caso real só (PROSB-3000, 16
      // dígitos), não é uma invariante confirmada do Mercado Livre (ver
      // .aiox/itens-em-aberto.md). Se este "MLB" não tem preço único reconhecível E o
      // bloco mostra preço em FAIXA ("R$ X a R$ Y", marcador de card colapsado de "ID
      // Family"), é suspeito de ser na verdade um cabeçalho de grupo cujo número
      // coincidentemente caiu no range de 7-11 dígitos -- avisa e pula em vez de
      // processar como MLB normal.
      const PADRAO_PRECO_FAIXA = /R\$\s*\n?\s*[\d.,]+\s*\n?\s*a\s*\n?\s*R\$\s*\n?\s*[\d.,]+/;
      if (!precoBaseMatch && PADRAO_PRECO_FAIXA.test(blocoMlb || janelaCardTexto)) {
        console.log(`⚠️ MLB ${mlb} (SKU ${sku}) suspeito: sem preço único reconhecível e associado a preço em FAIXA -- pode ser cabeçalho de grupo "ID Family" com 7-11 dígitos. Pulando este item.`);
        continue;
      }

      // Correcao real (22/08/2026, achada pelo Felipe na validacao manual do SKU P-JU-03
      // -- avaliada pelo @analyst via *elicit): a regex antiga so reconhecia UMA frase
      // especifica ("Inativo sem estoque"), deixando passar qualquer outro motivo de
      // inatividade (ex: "Inativo\nÉ igual a outro anúncio.") como se o anuncio estivesse
      // Ativo por padrao -- silencioso, sem gerar erro. Caso real confirmado: MLB
      // 4741778985/SKU P-JU-03, "Inativo" sozinho numa linha, motivo na linha seguinte.
      // Generalizado pra reconhecer a palavra "Inativo" isolada (mesmo padrao de limite
      // de palavra ja usado pros badges GANHANDO/PERDENDO/etc), capturando o motivo tanto
      // se vier na mesma linha ("Inativo sem estoque") quanto na linha seguinte ("Inativo"
      // sozinho, motivo depois) -- superconjunto da regra antiga, nao quebra nenhum caso
      // ja validado (a palavra "Inativo" continua presente em "Inativo sem estoque").
      // Correcao real (27/08/2026, achada pelo Felipe na validacao manual do SKU BG-03 --
      // avaliada pelo @analyst via *elicit): "Inativo" nao e a unica palavra que o Mercado
      // Livre usa pra anuncio nao-ativo -- "Pausado" (com botao "Ativar anúncio" logo
      // depois) e um estado real e distinto (pausa manual do vendedor), nunca coberto pela
      // regex antiga. Caso real confirmado: MLB 5217415498/SKU BG-03, texto "Pausado |
      // Ativar anúncio", sem a palavra "Inativo" em lugar nenhum -- salvo como "Ativo" por
      // engano, silenciosamente (sem erro). Corrigido exigindo os 2 sinais juntos
      // ("Pausado" seguido do botao "Ativar anúncio", mesmo padrao de exigir confirmacao
      // estrutural ja usado no resto do pipeline) -- nunca confia em "Pausado" sozinho,
      // que poderia aparecer solto em outro contexto.
      const inativoMatch = blocoMlb.match(/\bInativo\b[ \t]*\n?[ \t]*([^\n]*)/);
      const pausadoMatch = blocoMlb.match(/\bPausado\b[ \t]*\n?[ \t]*Ativar an[uú]ncio\b/);
      const inativo = !!inativoMatch || !!pausadoMatch;
      const motivoInativo = inativoMatch && inativoMatch[1].trim()
        ? inativoMatch[1].trim()
        : (pausadoMatch ? 'Pausado' : null);
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
        motivoInativo: motivoInativo,
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
  //
  // Correcao real (17/08/2026, achado pelo Felipe + investigado pelo @analyst via
  // *elicit): o badge da pagina de LISTAGEM principal (usado acima pra preencher
  // statusCatalogo antes deste loop) pode estar desatualizado/cacheado -- confirmado
  // em pelo menos 2 casos reais (FP100-220V: "RESTRITO PARA GANHAR" na listagem vs
  // "PERDENDO" real no Alterar; PAF11B-220V: "GANHANDO" na listagem vs "COMPARTILHANDO"
  // real no Alterar). Levantamento no dataset inteiro: 89,5% dos MLBs ja passavam pelo
  // Alterar mesmo antes desta correcao (so 10,5% dependiam so da listagem) -- custo de
  // sempre verificar e baixo. Antes so entrava aqui quem NAO tinha status da listagem;
  // agora TODO MLB passa por aqui, e o Alterar (fonte mais confiavel) sempre tem a
  // ultima palavra sobre o status final.
  const mlbsSemStatus = todosMlbs.filter(mlb => mlbs[mlb]);
  // Correcao real (24/08/2026, pedido explicito do Felipe, generalizada em seguida pra
  // qualquer anomalia de classificacao futura -- ver .aiox/itens-em-aberto.md, principio
  // "anomalia de classificacao nunca mapeada -> parar o lote"): quando o pipeline encontra
  // um padrao de CONTEUDO/CLASSIFICACAO nunca visto/documentado (nao um erro tecnico
  // transitorio, que continua no fluxo normal de retry), nao pode só ficar registrado no
  // MLB individual -- precisa parar o lote inteiro ate ser resolvido, nunca continuar
  // processando outras linhas silenciosamente. `anomaliaClassificacaoDetectada` e generico
  // de proposito -- qualquer caso futuro desse tipo (nao so padrao_concorrencia_nao_
  // mapeado) preenche esse mesmo campo com seu proprio `tipo`, sem precisar duplicar o
  // mecanismo de parada no loop principal. Devolvido pro chamador (mesmo padrao ja usado
  // pra divergenciaContagemBotoes).
  let anomaliaClassificacaoDetectada = null;

  async function checarMlbViaAlterar(mlb) {
    // Correcao real (17/08/2026): nao precisa mais de indice de botao nem de re-buscar
    // a listagem antes -- abrirAlterarPorMlb abre por URL direta, numa aba separada, sem
    // depender do estado da pagina de listagem. `resultado.page` (se existir) so e
    // fechada no finally, DEPOIS de qualquer interacao extra (ex: clique de expandir).
    let resultado = null;
    try {
      resultado = await abrirAlterarPorMlb(context, mlb);

      if (!resultado) {
        mlbs[mlb].viaAlterar = { erro: 'nao foi possivel abrir a pagina de Alterar' };
        // Correcao real (17/08/2026): ja provamos que o badge da listagem pode estar
        // errado (ver comentario acima) -- sem conseguir confirmar via Alterar, nao faz
        // sentido deixar esse valor nao confiavel sobrevivendo escondido. Mesma filosofia
        // ja aplicada ao caso AOC21-30HM (sem confirmacao = fica de fora da planilha,
        // decisao do Felipe): limpa o status em vez de manter o da listagem.
        mlbs[mlb].statusCatalogo = null;
      } else {
        const temCompetindo = resultado.texto.includes('COMPETINDO');
        const idxConc = resultado.texto.indexOf('Concorrência no Mercado Livre');
        const temConcorrencia = idxConc !== -1;

        // Correcao real (24/08/2026, achada pelo Felipe na validacao manual do SKU
        // P32CRB -- REVERTE a correcao de 16/08/2026, que estava errada): temConcorrencia
        // sozinho NAO e mais o sinal de catalogo -- o badge "COMPETINDO" (perto do titulo
        // do anuncio, fora da secao) agora e obrigatorio junto. Casos reais confirmados em
        // 24/08: PROSB-3000/MLB#4935565074 e WAF-127V/MLB#4690623743 mostravam a secao
        // Concorrencia (formato colapsado, badge tipo "PREÇO ALTO") SEM "COMPETINDO", e
        // NAO sao catalogo -- confirmado tambem por colegas em outros PCs, que abrindo os
        // MESMOS MLBs nem viram a secao Concorrencia aparecer (reforca que nao e uma
        // disputa de catalogo real e estavel). Ver mapeamento-skus-ads-catalogo-
        // mercadolivre.md, correcao de 24/08/2026, para os 3 formatos validados como
        // catalogo de verdade (sempre COM "COMPETINDO"): 1 card unico, comparacao lado a
        // lado, "Opção N" com "Inativa" quando Pausado.
        if (!temConcorrencia || !temCompetindo) {
          mlbs[mlb].viaAlterar = { ehPai: true, temCompetindo, temConcorrencia };
        } else {
          const blocoConc = resultado.texto.slice(idxConc);
          const opcoes = extrairOpcoesConcorrencia(blocoConc);
          const opcoesComStatus = opcoes.filter(o => o.status);

          if (opcoesComStatus.length === 0) {
            // Correcao real (24/08/2026, achada no SKU CKESSTC-ITA5Q via a trava do BLOCO
            // 0-AD -- Felipe aprovou como catalogo confirmado): o formato narrativo do
            // "Restrito para ganhar" ("Você não pode ganhar porque tem experiência de
            // compra ruim.") já é um caso valido conhecido desde 18/08/2026 (ver
            // mapeamento-skus-ads-catalogo-mercadolivre.md) -- so nao batia com Opção N nem
            // sem rotulo porque e um texto narrativo, nao uma tabela de preco. Diferente do
            // caso PREÇO ALTO/PREÇO COMPETITIVO (que nunca tem "COMPETINDO"), este SEMPRE
            // tem "COMPETINDO" presente -- por isso e seguro reconhecer aqui, sem reabrir a
            // brecha revertida hoje.
            const restritoNarrativo = /você não pode ganhar porque tem experiência de compra ruim/i.test(blocoConc);
            if (restritoNarrativo) {
              mlbs[mlb].statusCatalogo = mlbs[mlb].statusProduto === 'Pausado' ? 'Inativo' : 'RESTRITO PARA GANHAR';
              mlbs[mlb].viaAlterar = { ehPai: false, temCompetindo, temConcorrencia, formatoNarrativoRestrito: true };
              return;
            }
            // Correcao real (24/08/2026): o caminho do formato colapsado (clicar pra
            // expandir, extrair badge tipo "PREÇO ALTO" via
            // extrairBadgeConcorrenciaColapsada, com dupla-leitura) foi construido em cima
            // da premissa de 16/08 que hoje sabemos errada -- deixa de decidir catalogo.
            // Se "COMPETINDO" esta presente mas nenhum dos formatos conhecidos e validados
            // (Opção N / sem rotulo / narrativo Restrito) extraiu uma opcao com status,
            // isso e um padrao NUNCA mapeado antes -- nao presumir catalogo nem "nao
            // catalogo", nunca. Vira pendencia sempre visivel (regra obrigatoria do
            // mapeamento-skus-ads-catalogo-mercadolivre.md, 24/08/2026, e BLOCO 0-AD do
            // CLAUDE.md) -- decisao fica com o Felipe, nunca automatica.
            mlbs[mlb].viaAlterar = { erro: 'padrao_concorrencia_nao_mapeado', temConcorrencia, temCompetindo };
            mlbs[mlb].statusCatalogo = null;
            if (!anomaliaClassificacaoDetectada) {
              anomaliaClassificacaoDetectada = { tipo: 'padrao_concorrencia_nao_mapeado', mlb, sku };
            }
          } else {
            // Correcao real (14/08/2026, reportada pelo Felipe): o preco "de" (precoBase)
            // pode ser IDENTICO entre condicoes diferentes do mesmo catalogo (ex: Classico
            // e Premium anunciados com o mesmo preco cheio antes da promocao) -- casar por
            // ele primeiro e ambiguo, pode pegar a opcao de OUTRO MLB por coincidencia de
            // preco. Caso real: SKU WL4000-220V, MLB #6714259004 (Premium) tem precoBase
            // "1.399,90" IGUAL ao precoBase do MLB #4984216839 (Classico) -- o casamento
            // antigo (precoBase OU precoPromo, primeiro que bater na ordem do texto) pegou
            // a opcao errada (GANHANDO, que na verdade era so a coincidencia de preco "de"),
            // quando a opcao certa era a que batia com o precoPromo (867,28, PERDENDO -- esse
            // sim exclusivo deste MLB). Correcao: tentar casar pelo precoPromo (preco real
            // de venda, raramente coincide entre condicoes) PRIMEIRO -- so cai pro precoBase
            // se nao achar nada pelo promo.
            // Correcao real (24/08/2026, achada no SKU JBLQ-360 -- Felipe apontou via
            // screenshots que o Mercado Livre ja rotula cada opcao com a condicao
            // (Clássico/Premium) no formato "Opção N", e o extrator ja captura isso em
            // `condicaoDaOpcao` -- so nao estava sendo usado no casamento, que confiava so
            // no preco. Quando 2 MLBs de condicoes diferentes tem o MESMO preco (caso real:
            // JBLQ-360, R$799,90 nos 2), o casamento so-por-preco fica ambiguo de verdade
            // (ver aviso `qtdMesmoPreco` abaixo). Correcao: se a opcao tiver `condicaoDaOpcao`
            // rotulada, exigir que bata com a condicao do proprio MLB tambem -- so restringe
            // quando o rotulo ja existe (formato "sem rotulo", sem `condicaoDaOpcao`,
            // continua identico a antes, nunca fica mais permissivo).
            const opcaoBatida = (mlbs[mlb].precoPromo && opcoes.find(o => o.status && o.preco === mlbs[mlb].precoPromo && (!o.condicaoDaOpcao || o.condicaoDaOpcao === mlbs[mlb].condicao)))
              || (mlbs[mlb].precoBase && opcoes.find(o => o.status && o.preco === mlbs[mlb].precoBase && (!o.condicaoDaOpcao || o.condicaoDaOpcao === mlbs[mlb].condicao)))
              || null;

            // Item 2 da validacao do @analyst (14/08/2026): mesmo depois de excluir "Outras
            // opcoes de venda" (item 1 acima), 2 opcoes com status REAL (GANHANDO/PERDENDO/
            // etc.) ainda podem, em teoria, compartilhar o mesmo preco (ex: precoPromo
            // coincidindo entre condicoes por algum motivo) -- `.find()` sempre resolve pra
            // uma resposta, silenciosamente, mesmo quando ha mais de 1 candidato valido.
            // Autocheck: se mais de 1 opcao com status real tem o mesmo preco escolhido,
            // avisa (nao trava) -- mesmo padrao ja usado no autocheck de indice de botao.
            if (opcaoBatida) {
              const qtdMesmoPreco = opcoes.filter(o => o.status && o.preco === opcaoBatida.preco).length;
              if (qtdMesmoPreco > 1) {
                console.log(`⚠️ Preço ${opcaoBatida.preco} ambíguo pro MLB ${mlb} — ${qtdMesmoPreco} opções com esse preço e status real, pegou a primeira ("${opcaoBatida.status}")`);
              }
            }

            mlbs[mlb].viaAlterar = { ehPai: false, temCompetindo, temConcorrencia, opcoesEncontradas: opcoes, opcaoBatida: opcaoBatida || null };
            // Correcao real (17/08/2026, achado pelo @analyst via *elicit): a regra
            // "Pausado -> Inativo" (ver comentario na linha ~695, formato colapsado)
            // so cobria aquele 1 caminho -- este aqui (formatos "Opção N" e "sem
            // rotulo", que convergem no mesmo opcaoBatida) nao tinha a mesma protecao.
            // Replicando a mesma logica pra fechar o buraco.
            if (opcaoBatida) {
              mlbs[mlb].statusCatalogo = mlbs[mlb].statusProduto === 'Pausado' ? 'Inativo' : opcaoBatida.status;
            }
          }
        }
      }
    } catch (errMlb) {
      mlbs[mlb].viaAlterar = { erro: errMlb.message };
    } finally {
      // Correcao real (17/08/2026): a pagina de Alterar agora e sempre uma aba SEPARADA
      // (ver abrirAlterarPorMlb) -- fecha ela aqui, sempre, depois de qualquer interacao
      // (incluindo o clique de expandir do formato colapsado). A aba de Anuncios nunca e
      // tocada/navegada por esse fluxo inteiro, entao nao precisa mais "voltar" pra ela.
      if (resultado && resultado.page) {
        await resultado.page.close().catch(() => {});
      }
    }
  }

  // Correcao real (28/08/2026, achada no SKU BG-03 -- Felipe apontou que a regra de
  // selecao final (ate 2 MLBs, 1o Classico + 1o Premium encontrados, ver
  // listarCatalogoPorCondicao em reprocessar-analise-oficial-completo.js) ja estava
  // satisfeita ANTES do loop terminar de checar TODOS os MLBs da familia -- um MLB
  // desnecessario (nunca usado no resultado final, MLB #5334248308) foi o que travou o
  // lote com uma anomalia de classificacao. Design testado em 4 cenarios via *elicit
  // antes de codar (familia mista, so-Classico, so 1 confirmado, nenhum confirmado --
  // ver .aiox/itens-em-aberto.md): em vez de checar em ordem de pagina (que intercala
  // Classico/Premium de forma imprevisivel -- no BG-03, o Premium so aparecia na 7a
  // posicao), separa os candidatos por condicao e checa intercalado (1 Classico, 1
  // Premium, alternando), parando assim que a regra de selecao ja estiver satisfeita.
  // Preserva o comportamento antigo (checar todos) exatamente nos casos em que ainda e
  // necessario: nenhum confirmado ainda, ou so 1 tipo existe na familia e ainda nao tem
  // 2 confirmados dele.
  const classicoQueue = mlbsSemStatus.filter(mlb => mlbs[mlb].condicao === 'Clássico');
  const premiumQueue = mlbsSemStatus.filter(mlb => mlbs[mlb].condicao === 'Premium');
  // MLBs com condicao desconhecida (nem Classico nem Premium -- caso raro, condMatch e
  // o fallback posicoes[bi] falharam os 2) nunca entram em catalogoConfirmado de
  // qualquer forma (listarCatalogoPorCondicao exige dados.condicao truthy) -- mas pra
  // nao mudar nenhum comportamento existente fora dessa otimizacao, continuam sendo
  // SEMPRE checados via Alterar, sem entrar no calculo de parada antecipada.
  const semCondicaoQueue = mlbsSemStatus.filter(mlb => mlbs[mlb].condicao !== 'Clássico' && mlbs[mlb].condicao !== 'Premium');
  let idxClassico = 0;
  let idxPremium = 0;

  const contarConfirmados = (queue, ateIndice) =>
    queue.slice(0, ateIndice).filter(mlb => mlbs[mlb].statusCatalogo).length;

  while (true) {
    const classicosEsgotados = idxClassico >= classicoQueue.length;
    const premiumsEsgotados = idxPremium >= premiumQueue.length;
    const confirmClassicos = contarConfirmados(classicoQueue, idxClassico);
    const confirmPremiums = contarConfirmados(premiumQueue, idxPremium);

    if (confirmClassicos >= 1 && confirmPremiums >= 1) break;
    if (classicosEsgotados && premiumsEsgotados) break;
    if (confirmClassicos >= 2 && premiumsEsgotados) break;
    if (confirmPremiums >= 2 && classicosEsgotados) break;
    if (anomaliaClassificacaoDetectada) break;

    if (!classicosEsgotados) {
      await checarMlbViaAlterar(classicoQueue[idxClassico++]);
    }
    if (anomaliaClassificacaoDetectada) break;
    if (!premiumsEsgotados) {
      await checarMlbViaAlterar(premiumQueue[idxPremium++]);
    }
  }

  for (const mlb of semCondicaoQueue) {
    if (anomaliaClassificacaoDetectada) break;
    await checarMlbViaAlterar(mlb);
  }

  const mlbsChecados = [...new Set([
    ...classicoQueue.slice(0, idxClassico),
    ...premiumQueue.slice(0, idxPremium),
    ...semCondicaoQueue,
  ])];

  const statusCatalogoViaAlterar = mlbsChecados
    .filter(mlb => mlbs[mlb] && mlbs[mlb].viaAlterar)
    .map(mlb => ({ mlb, ...mlbs[mlb].viaAlterar }));

  return { todosMlbsSincronizados: todosMlbs, mlbs, statusCatalogoViaAlterar, divergenciaContagemBotoes, anomaliaClassificacaoDetectada };
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
  abrirAlterarPorMlb,
  extrairOpcoesConcorrencia,
  extrairBadgeConcorrenciaColapsada,
  esperarTextoEstabilizar,
  tentarBuscarMlb,
  rolarPagina,
  esperarElementoComCalma,
  CAMPANHAS,
};

if (require.main === module) {
(async () => {
  let browser;
  let resultados = lerJsonSeguro(ARQUIVO_SAIDA, {});

  // Filtro de campanha (14/08/2026, pedido real do Felipe): permite rodar o pipeline
  // contra 1 campanha so (`node pipeline-pausados-campanha-completo.js "[ML] [NOME]"`)
  // em vez das 7 de uma vez -- primeiro teste real do fluxo completo (varrer campanha ->
  // achar pausados -> analisar cada um) numa campanha real, sem duplicar a logica de
  // varredura numa copia separada (reusa exatamente o codigo ja validado).
  // Quando um filtro e passado, ativa automaticamente o MODO CAUTELOSO: qualquer
  // erro/anomalia num produto INTERROMPE a execucao inteira pra revisao manual, em vez
  // de logar e continuar pro proximo produto (comportamento padrao, pensado pra lotes
  // grandes onde 1 produto com problema nao deve travar os outros 90+).
  const campanhaFiltro = process.argv[2] || null;
  const CAMPANHAS_A_RODAR = campanhaFiltro ? CAMPANHAS.filter(c => c.nome === campanhaFiltro) : CAMPANHAS;
  const modoCauteloso = !!campanhaFiltro;
  if (campanhaFiltro && CAMPANHAS_A_RODAR.length === 0) {
    console.error(`Campanha "${campanhaFiltro}" não encontrada. Disponíveis:\n${CAMPANHAS.map(c => `  - ${c.nome}`).join('\n')}`);
    process.exit(1);
  }
  if (modoCauteloso) console.log(`⚠️ MODO CAUTELOSO ativo (campanha única: "${campanhaFiltro}") — qualquer erro/anomalia interrompe a execução inteira.`);

  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let pageAnuncios = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await esperarTextoEstabilizar(pageAnuncios);

    for (const campanha of CAMPANHAS_A_RODAR) {
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
          // Correcao real (17/08/2026, achado ao vivo -- produto "Smart Tv 32 Philco Roku
          // Tv Dolby Áudio Hdr10 P32crb"): o titulo do produto se repete 1x por LINHA da
          // tabela de variacoes do drawer (coluna "Título da variação"). Pra titulos longos
          // essa repeticao vem truncada (nao bate exato), entao lastIndexOf(tituloProduto)
          // sempre achava so o cabecalho do drawer (unica ocorrencia exata) -- mas pra um
          // titulo curto o suficiente pra NAO truncar na linha, lastIndexOf achava a ULTIMA
          // linha da tabela em vez do cabecalho, cortando o texto depois de todos os MLBs
          // (sobrava so o rodape da pagina, 0 MLBs encontrados). Ancorar em "Título da
          // variação" (cabecalho da coluna, aparece 1x so, logo antes das linhas) e
          // confiavel independente do tamanho do titulo -- fallback pro comportamento antigo
          // se esse marcador nao aparecer por algum motivo.
          const idxCabecalhoTabela = textoDrawer.indexOf('Título da variação');
          const idxTituloDrawer = idxCabecalhoTabela !== -1 ? idxCabecalhoTabela : textoDrawer.lastIndexOf(tituloProduto);
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

            // Correcao real (16/08/2026, confirmado pelo Felipe com screenshot real):
            // a trava original (13/08/2026) parava o pipeline inteiro (process.exit(1))
            // toda vez que uma SKU tinha 3+ MLBs de catalogo confirmados, achando que era
            // um cenario nunca validado. Caso real confirmado: SKU CHTMINI-BIV (2 Classico
            // + 1 Premium, MLBs 5247646674/5247671694/4658272945) -- Felipe validou ao vivo
            // que os 3 status batem certinho com a pagina real. Nao e bug, e um cenario
            // real e valido (ex: 2 anuncios Classico concorrendo entre si). Rebaixado de
            // parada total pra aviso informativo -- nao bloqueia mais o processamento dos
            // proximos produtos da campanha.
            const qtdCatalogoConfirmado = Object.values(analise.mlbs).filter(d => d.statusCatalogo).length;
            if (qtdCatalogoConfirmado >= 3) {
              console.log(`  ⚠️ SKU ${sku} com ${qtdCatalogoConfirmado} MLBs de catálogo confirmados (cenário válido, ex: 2 anúncios Clássico concorrendo entre si) -- seguindo normalmente.`);
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
          resultados[chaveCampanha][chaveProduto] = { titulo: tituloProduto, erro: errProduto.message };
          fs.writeFileSync(ARQUIVO_SAIDA, JSON.stringify(resultados, null, 2));
          if (modoCauteloso) {
            console.log(`\n🛑 MODO CAUTELOSO: erro/anomalia no produto "${tituloProduto}" — parando a execução inteira pra revisão manual.`);
            console.log(`Erro: ${errProduto.message}`);
            throw errProduto; // propaga pro catch geral, interrompe tudo
          }
          console.log(`  ERRO no produto "${tituloProduto}": ${errProduto.message}`);
          // Mesmo em erro, tentar fechar qualquer drawer que tenha ficado aberto
          await pageCampanha.keyboard.press('Escape').catch(() => {});
          await pageCampanha.waitForTimeout(600);
        }
      }

      // Em modo cauteloso, o Felipe pediu pra deixar a aba da campanha aberta ao final
      // (junto com Anúncios e a aba de publicidade) -- não fechar aqui.
      if (!modoCauteloso) {
        await pageCampanha.close();
      }
    }

    console.log('\n\n########## TODAS AS CAMPANHAS PROCESSADAS ##########');
  } catch (err) {
    console.error('ERRO GERAL:', err.message, err.stack);
  } finally {
    if (browser) {
      if (modoCauteloso) {
        // Gerenciamento de abas pedido pelo Felipe (14/08/2026): ao final do modo
        // cauteloso, deixar SOMENTE 3 abas abertas -- Anúncios, a campanha filtrada, e
        // qualquer aba de "publicidade" (painel geral de Ads) já existente. Fecha
        // qualquer outra aba, inclusive campanhas de outras execuções e leaks de sessões
        // anteriores (openBackgroundPage sem fechar em erro -- ver .aiox/itens-em-aberto.md).
        // NUNCA chama browser.close() aqui -- isso mataria o processo do Chrome inteiro
        // (não é um "fechar aba", é fechar o browser todo via CDP), o que fecharia as
        // 3 abas que o Felipe pediu pra manter.
        try {
          const context = browser.contexts()[0];
          const urlsOutrasCampanhas = CAMPANHAS
            .filter(c => c.nome !== campanhaFiltro)
            .map(c => c.url);
          for (const p of context.pages()) {
            const url = p.url();
            const ehAnuncios = url.includes('vendedores.mercadolivre.com.br/anuncios');
            const ehCampanhaAlvo = CAMPANHAS_A_RODAR[0] && url.includes(CAMPANHAS_A_RODAR[0].url.split('?')[0]);
            const ehOutraCampanha = urlsOutrasCampanhas.some(u => url.includes(u.split('?')[0]));
            const ehAds = url.includes('ads.mercadolivre.com.br');
            const mantemComoPublicidade = ehAds && !ehCampanhaAlvo && !ehOutraCampanha;
            if (!ehAnuncios && !ehCampanhaAlvo && !mantemComoPublicidade) {
              await p.close().catch(() => {});
            }
          }
        } catch (errFechar) {
          console.log(`Aviso: falha ao limpar abas extras: ${errFechar.message}`);
        }
        // minimizeChrome() e sincrona (execSync), nao retorna Promise -- nao encadear .catch().
        try { minimizeChrome(); } catch {}
      } else {
        await minimizeChrome();
        await browser.close();
      }
    }
  }
  process.exit(0);
})();
}
