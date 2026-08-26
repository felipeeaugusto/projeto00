// Reprocessamento completo (2-737) da planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx"
// contra o método validado de 17-18/08/2026, regenerando as 2 abas do Analise Oficial.xlsx.
// Mapeado pelo @analyst (*elicit) + confirmado pelo Felipe em 18/08/2026.
//
// Reaproveita (nunca reimplementa) a lógica já validada de Passo A/A.1 do
// pipeline-pausados-campanha-completo.js (BLOCO 0-AA do CLAUDE.md): acharSkuDoMlb,
// analisarSku (search+scroll+ID Family+catálogo via Alterar com dupla-leitura),
// normalizarNumeroOuTraco.
//
// Passo A.2 (Título de catálogo) + Passo B (Status em Ads) são específicos deste
// documento (mapeamento-skus-ads-catalogo-mercadolivre.md) -- não existem no pipeline
// de campanha -- implementados aqui usando esperarTextoEstabilizar (nunca tempo fixo),
// upgrade da versão antiga (pipeline-lote-25-91.js, 12/08/2026, que usava polling com
// waitForTimeout fixo -- não atende mais a REGRA GERAL OBRIGATÓRIA do documento atual).
//
// Retomável do zero: cada registro do JSON acumulado é marcado com METODO_VERSAO -- ao
// reiniciar, SKUs já processados com a versão atual são pulados (evita duplicar/perder
// tempo), qualquer interrupção (token, sessão ML, PC, Chrome) permite retomar depois.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const {
  acharSkuDoMlb,
  analisarSku,
  normalizarNumeroOuTraco,
  esperarTextoEstabilizar,
} = require('./pipeline-pausados-campanha-completo.js');
const { openBackgroundPage } = require(
  path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js')
);
const { acharAbaAnuncios, acharAbaAdsPatrocinados } = require(
  path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/achar-abas-mercadolivre.js')
);

const METODO_VERSAO = '2026-08-24-v4';

// Trava de execução única (Felipe + @analyst via *elicit, 19/08/2026 -- CLAUDE.md
// BLOCO 0-U, Regra 4): impede 2 cópias deste script rodarem ao mesmo tempo contra a
// mesma aba do Modo Navegador. Incidente real que gerou esta trava: um job em
// background "double-backgrounded" (& manual + run_in_background juntos) ficou órfão
// e invisível pra ferramenta; ao relançar achando que tinha morrido, 2 cópias rodaram
// em paralelo e corromperam pelo menos 4 linhas silenciosamente (sem erro visível).
const ARQUIVO_LOCK_EXECUCAO = path.resolve(__dirname, '.reprocessar.lock');

function adquirirLock() {
  if (fs.existsSync(ARQUIVO_LOCK_EXECUCAO)) {
    const pidAntigo = parseInt(fs.readFileSync(ARQUIVO_LOCK_EXECUCAO, 'utf8').trim(), 10);
    let aindaVivo = false;
    if (pidAntigo) {
      try { process.kill(pidAntigo, 0); aindaVivo = true; } catch (e) { aindaVivo = false; }
    }
    if (aindaVivo) {
      console.error(`ERRO: já existe uma instância deste script rodando (PID ${pidAntigo}). Abortando pra evitar corrida/corrupção de dados.`);
      process.exit(1);
    }
    console.log(`Lock antigo encontrado (PID ${pidAntigo || '?'}, não está mais vivo) -- removendo e continuando.`);
  }
  fs.writeFileSync(ARQUIVO_LOCK_EXECUCAO, String(process.pid));
}

function liberarLock() {
  try { fs.unlinkSync(ARQUIVO_LOCK_EXECUCAO); } catch (e) {}
}

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_ADS = 'https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads';
// Confirmado no documento (Passo B, 11/08/2026): placeholder exato, prefixo "MLB" obrigatório.
const SELETOR_BUSCA_ADS = 'input[placeholder="Procurar por # ou título"]';

const ARQUIVO_FONTE = 'C:\\Downloads\\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx';
const ABA_FONTE = 'SEM CAMPANHA';
const COL_ITEM_ID = 3;

const ARQUIVO_ANALISE_OFICIAL = 'C:\\Downloads\\Analise Oficial.xlsx';
const ABA_PRIORIDADE = 'Prioridade - Fora de Ads';
const ABA_COMPLETO = 'Mapeamento Completo da Planilha';

const ARQUIVO_JSON = path.resolve(__dirname, 'analise-oficial-completo.json');

function lerJsonSeguro(caminho, padrao) {
  if (!fs.existsSync(caminho)) return padrao;
  try {
    let texto = fs.readFileSync(caminho, 'utf8');
    if (texto.charCodeAt(0) === 0xFEFF) texto = texto.slice(1);
    return JSON.parse(texto);
  } catch {
    return padrao;
  }
}

function salvarJson(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf8');
}

// Reaproveitamento de MLB já conhecido (item 2 do plano original, 18/08/2026): monta um
// índice reverso MLB -> SKU a partir dos lotes antigos já processados (11-12/08/2026),
// pra pular acharSkuDoMlb (Passo A: descobrir o SKU a partir do Item ID) quando o Item ID
// já é um MLB conhecido de algum SKU. Não pula analisarSku (Passo A.1) -- ele sempre faz
// sua própria busca por SKU, mais completa (rolagem exaustiva, ID Family), então o dado
// de catálogo em si nunca vem "velho" do lote antigo, só o mapeamento SKU<->MLB.
function carregarMlbsConhecidos() {
  const indice = new Map(); // itemId (string) -> sku
  const arquivosArray = ['lote-05-24.json']; // formato array [{itemId, sku, ...}]
  const arquivosPorSku = ['lote-completo-final.json']; // formato objeto { sku: { todosMlbsSincronizados: [...] } }

  for (const nome of arquivosArray) {
    const caminho = path.resolve(__dirname, nome);
    const dados = lerJsonSeguro(caminho, null);
    if (!Array.isArray(dados)) continue;
    for (const item of dados) {
      if (item.itemId && item.sku) indice.set(String(item.itemId), item.sku);
    }
  }

  for (const nome of arquivosPorSku) {
    const caminho = path.resolve(__dirname, nome);
    const dados = lerJsonSeguro(caminho, null);
    if (!dados || typeof dados !== 'object') continue;
    for (const [sku, registro] of Object.entries(dados)) {
      const mlbs = registro.todosMlbsSincronizados || [];
      for (const mlb of mlbs) indice.set(String(mlb), sku);
    }
  }

  return indice;
}

// Passo A.2 (Título de catálogo) + Passo B (Status em Ads) -- upgrade da versão antiga
// (pipeline-lote-25-91.js, buscarTituloEStatusComPolling) trocando polling com tempo fixo
// por esperarTextoEstabilizar, conforme REGRA GERAL OBRIGATÓRIA do documento.
// Correção real (24/08/2026, achada na reverificação da regra COMPETINDO): um elemento
// da própria interface do Mercado Livre (`.ml-ads-toolbar`) pode ficar fisicamente
// cobrindo o campo de busca da aba de Ads, travando toda busca seguinte com timeout de
// clique (30s cada) -- confirmado ao vivo: persistente até a aba ser recarregada, causa
// exata de por que apareceu não confirmada.
//
// Correção real (24/08/2026, achada no TESTE FUNCIONAL deste próprio fix, antes de virar
// código definitivo -- 2 tentativas erradas antes de acertar): a 1ª versão comparava
// bounding boxes (posição/tamanho da toolbar vs do campo) -- deu FALSO POSITIVO na aba
// atual, que não estava travada. A 2ª versão trocou pra `elementFromPoint` + `closest`,
// mas TAMBÉM deu falso positivo -- o campo de busca provavelmente fica estruturalmente
// DENTRO do container `.ml-ads-toolbar` mesmo no estado normal (não bloqueado), então
// `closest('.ml-ads-toolbar')` bate sempre, bloqueado ou não. Correção final: em vez de
// tentar adivinhar com geometria ou estrutura do DOM, reusar a própria checagem de
// clicabilidade real do Playwright -- um clique de teste com timeout curto. Se falhar
// especificamente com "intercepts pointer events" (a mesma mensagem do erro original em
// produção), SÓ AÍ recarrega. Qualquer outro tipo de falha (elemento não existe, etc.)
// não recarrega -- deixa o fluxo normal de buscarUmaVez lidar com isso do jeito usual.
async function destravarToolbarSeNecessario(pageAds) {
  const campo = pageAds.locator(SELETOR_BUSCA_ADS).first();
  try {
    await campo.click({ timeout: 3000 });
  } catch (e) {
    if (/intercepts pointer events/.test(e.message)) {
      console.log('  ⚠️ Campo de busca em Ads bloqueado (intercepts pointer events) -- recarregando a aba antes de continuar.');
      await pageAds.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
      await esperarTextoEstabilizar(pageAds);
    }
  }
}

async function tentarBuscarTituloEStatusEmAds(pageAds, mlb) {
  await destravarToolbarSeNecessario(pageAds);
  // Correção real (18/08/2026, achada no piloto 145-170): a página de Ads é reusada pra
  // TODA a rodada (nunca aberta de novo por MLB) -- sem exigir que o texto tenha MUDADO
  // do estado anterior, esperarTextoEstabilizar podia aceitar o resultado da busca
  // ANTERIOR (que também contém "CATÁLOGO") como se fosse o resultado da busca atual,
  // se a nova busca ainda não tivesse atualizado o DOM na hora da checagem. Mesma classe
  // de bug já documentada em analisarSku/acharSkuDoMlb (exigir que o termo buscado
  // apareça) -- aqui não dá pra exigir o MLB buscado literalmente (o bloco CATÁLOGO pode
  // mostrar um #MLB diferente do buscado, comportamento normal documentado no Passo A.2),
  // então a defesa é exigir que o texto tenha mudado do estado imediatamente anterior.
  // Confirmado real: 3 de 4 linhas do piloto (145, 146, 148) saíram com tituloCatalogo
  // null por causa disso; a 147 saiu certa por coincidência de timing.
  const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) {
    await fecharDrawer.first().click().catch(() => {});
  }

  const textoAntes = await pageAds.locator('body').innerText().catch(() => '');

  async function buscarUmaVez(baseline) {
    const campo = pageAds.locator(SELETOR_BUSCA_ADS).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(`MLB${mlb}`);
    await pageAds.keyboard.press('Enter');
    // Correção real (25/08/2026, achada nas linhas 9/29/31/33/34/35 -- Felipe pegou "-"
    // no Título de Catálogo/Status em Ads na Planilha, @dev investigou ao vivo reproduzindo
    // a lógica exata de produção): o orçamento padrão de esperarTextoEstabilizar (8
    // tentativas x 1000ms = 8000ms) fica na margem exata pra essas páginas -- medido ao
    // vivo, a 1a tentativa levou de 4980ms a 9076ms pros 6 casos reais, já ULTRAPASSANDO o
    // teto nominal num deles. Não é bug de lógica (a busca em si funciona), é orçamento de
    // tempo insuficiente pra páginas que demoram mais a estabilizar. maxTentativas: 16 dá
    // margem de 2x o pior caso observado, só nesta função (esperarTextoEstabilizar
    // genérico, usado por ~15 outras chamadas no pipeline, continua com o padrão de 8 --
    // nenhuma outra chamada fica mais lenta por causa disso).
    return esperarTextoEstabilizar(pageAds, {
      maxTentativas: 16,
      validarConteudo: (t) => (t.includes('CATÁLOGO') || t.includes('Sem Campanha')) && t !== baseline,
    });
  }

  let texto = await buscarUmaVez(textoAntes);
  let baselineUsado = textoAntes;

  if (texto === baselineUsado) {
    // Correção real (24/08/2026, achada no SKU HQ-100CFX-127V/linha-49 -- causa raiz
    // investigada pelo @dev, solução proposta pelo Felipe, validada ao vivo ponta a ponta
    // pelo @dev antes de codar): textoAntes nunca é atualizado entre as 2 tentativas --
    // se o resultado fresco e correto coincidir textualmente com o que já estava na tela
    // (ex: mesmo MLB buscado 2x seguidas, ou "Sem Campanha" idêntico entre MLBs diferentes),
    // o retry contra o MESMO baseline NUNCA teria como confirmar, em nenhuma tentativa.
    // Correção: limpar o campo e confirmar vazio (Enter) -- volta pra tela padrão/sem
    // filtro da aba de Ads, estruturalmente diferente de qualquer resultado de MLB
    // específico (confirmado ao vivo: uma listagem com vários produtos nunca é igual, como
    // texto inteiro, a um resultado filtrado de 1 MLB só) -- usa essa tela como novo
    // baseline, garantindo que a 2ª tentativa não pode falhar pelo mesmo motivo.
    const campoLimpar = pageAds.locator(SELETOR_BUSCA_ADS).first();
    await campoLimpar.click();
    await campoLimpar.fill('');
    await pageAds.keyboard.press('Enter');
    baselineUsado = await esperarTextoEstabilizar(pageAds);
    texto = await buscarUmaVez(baselineUsado);
  }

  // Mesma filosofia já usada no resto do pipeline (caso AOC21-30HM, dupla-leitura
  // divergente): sem confirmação real de que o texto é fresco, não inventa um resultado
  // -- fica marcado como não confiável em vez de silenciosamente errado.
  if (texto === baselineUsado || !(texto.includes('CATÁLOGO') || texto.includes('Sem Campanha'))) {
    return { titulo: null, statusAds: null, erro: 'busca_em_ads_nao_confirmada_texto_desatualizado' };
  }

  const idxCat = texto.indexOf('CATÁLOGO');
  const idxSemCampanha = texto.indexOf('Sem Campanha');

  let titulo = null;
  if (idxCat !== -1) {
    const linhasCat = texto.slice(idxCat, idxCat + 300).split('\n').map((l) => l.trim()).filter(Boolean);
    const idxOrig = linhasCat.findIndex((l) => l.includes('ORIGEM'));
    titulo = idxOrig !== -1 ? linhasCat[idxOrig + 1] : null;
  }

  let statusAds;
  if (idxSemCampanha !== -1 && (idxCat === -1 || Math.abs(idxSemCampanha - idxCat) < 500)) {
    statusAds = 'Sem Campanha';
  } else {
    const temPausado = await pageAds.evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'));
      return els.some(
        (el) => el.children.length === 0 && el.textContent.trim() === 'PAUSADO' && el.offsetParent !== null
      );
    });
    statusAds = temPausado ? 'Pausada' : 'Ativa';
  }

  return { titulo, statusAds };
}

async function buscarTituloEStatusEmAds(pageAds, mlb) {
  // Correção real (26/08/2026, achada na linha 31/GTW20INOX-127V -- @dev investigou via
  // 5 Whys a pedido do Felipe): mesmo com o orçamento de 16 tentativas (fix de 25/08), a
  // busca ainda falhou 1x num lote real, mas passou de primeira (3045ms) quando reexecutada
  // isolada logo em seguida -- tempo muito abaixo do teto, sugerindo não é "lento", é
  // resíduo de estado da busca ANTERIOR do mesmo lote (textoAntes capturado antes da página
  // assentar de verdade), não reproduzível testando 1 MLB sozinho e frio. Em vez de caçar a
  // causa exata (rede vs resíduo -- os dois são plausíveis e uma tentativa nova do zero
  // resolve qualquer um dos dois), a correção replica exatamente o que resolveu ao vivo:
  // tentar a função inteira de novo, do zero (novo textoAntes, nova busca), 1 única vez
  // extra. Se a 2ª tentativa também falhar, mantém o erro -- rede de segurança existente
  // (reprocessamento na próxima rodada) continua intacta, nunca inventa dado.
  const primeira = await tentarBuscarTituloEStatusEmAds(pageAds, mlb);
  if (primeira.erro !== 'busca_em_ads_nao_confirmada_texto_desatualizado') {
    return primeira;
  }
  console.log(`  ⚠️ Busca em Ads não confirmou na 1ª tentativa (MLB ${mlb}) -- tentando mais 1 vez, do zero.`);
  return tentarBuscarTituloEStatusEmAds(pageAds, mlb);
}

// Mesma lógica de popular-teste1-v3.js (listarCatalogoPorCondicao) -- helper puro de
// agrupamento de dado, sem interação de página, não é "seletor/lógica de busca" no
// sentido da regra BLOCO 0-AA (essa regra é sobre automação de browser).
function listarCatalogoPorCondicao(mlbs) {
  const classicos = [];
  const premiums = [];
  for (const [mlbId, dados] of Object.entries(mlbs)) {
    if (dados.statusCatalogo && dados.condicao) {
      const alvo = dados.condicao === 'Clássico' ? classicos : premiums;
      alvo.push({ mlbId, status: dados.statusCatalogo, dados });
    }
  }
  return { classicos, premiums };
}

// Escrita real no Analise Oficial.xlsx (item 1 do plano, 18/08/2026 -- até aqui o
// script só salvava no JSON, nunca escrevia na planilha de verdade). Regenera as 2
// abas por completo a partir do JSON acumulado, nunca patch célula a célula.

// Regra "Ativo primeiro" (documento, 12/08/2026): quando os 2 itens da cascata têm
// statusProduto diferente, o Ativo entra primeiro na célula (quebra de linha) --
// afeta MLB's, Depósito, FULL e Status do Produto juntos, mantendo correspondência
// posição-a-posição entre as colunas.
//
// Regra "até 2 MLBs de catálogo, com fallback pro mesmo tipo" (Felipe, 19/08/2026,
// avaliada pelo @analyst via *elicit): `a2` deixou de ser sempre {Clássico, Premium}
// -- quando um dos 2 tipos não existe pro SKU, os 2 primeiros MLBs do tipo que existe
// entram juntos (nunca mais que 2 no total). Isso quebra a premissa de "1 chave por
// tipo", então `a2` passa a ser uma LISTA de até 2 itens (cada um já carrega sua
// própria `condicao`). Compatibilidade: entradas antigas do JSON (já processadas antes
// deste fix, ainda no formato {Clássico, Premium}) continuam lidas normalmente aqui --
// só as reprocessadas passam a vir no formato novo.
function montarCascata(registro) {
  let itens;
  if (Array.isArray(registro.a2)) {
    itens = registro.a2.filter(Boolean);
  } else {
    const c = registro.a2 && registro.a2['Clássico'];
    const p = registro.a2 && registro.a2['Premium'];
    itens = [];
    if (c) itens.push(c);
    if (p) itens.push(p);
  }
  if (itens.length === 2 && itens[0].statusProduto !== itens[1].statusProduto) {
    itens.sort((a, b) => (a.statusProduto === 'Ativo' ? 0 : 1) - (b.statusProduto === 'Ativo' ? 0 : 1));
  }
  return itens;
}

function celulaMultiLinha(itens, campo, transformar) {
  if (itens.length === 0) return '-';
  const valores = itens.map((it) => (transformar ? transformar(it[campo]) : (it[campo] || '-')));
  const unicos = [...new Set(valores)];
  return unicos.length === 1 ? unicos[0] : valores.join('\n');
}

async function regenerarAbasExcel(resultados) {
  const ExcelJS = require('exceljs');
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARQUIVO_ANALISE_OFICIAL);

  // Correção real (18/08/2026, achada no teste de escrita): "Mapeamento Completo da
  // Planilha" precisa de TODOS os SKUs mapeados, sem exceção (Passo D do documento) --
  // inclusive o caso raro de nenhum MLB de catálogo confirmado (Passo A.2, "-" nos
  // campos). Filtrar por catalogoConfirmado aqui excluía esses SKUs por engano (caso
  // real: CEARAN-BW-MAX, linha 151, sem disputa de catálogo genuína). O filtro por
  // catálogo confirmado fica só dentro de cada `escreverAba` (via `filtro`), não aqui.
  //
  // Correção real (22/08/2026, achada pelo Felipe na validação manual -- avaliada pelo
  // @analyst via *elicit): o mesmo SKU pode aparecer em VÁRIAS linhas da planilha fonte
  // (múltiplos Item IDs apontando pro mesmo catálogo) -- sem agrupar por SKU antes de
  // escrever, cada linha fonte virava uma linha separada na saída, duplicando o SKU
  // visualmente e, pior, podendo mostrar "-" numa das cópias quando aquela linha fonte
  // específica deu erro de confirmação (mesmo já existindo uma cópia limpa do mesmo SKU
  // vinda de outra linha fonte). Caso real confirmado: P-20-BIV, PRODT-1270,
  // CXBEATBOX-2000 (linha 153/163 tinha título correto, linha 159/165/48 do mesmo SKU
  // deu erro e ficou "-" na planilha). Corrigido agrupando por SKU: prefere sempre um
  // registro sem erro sobre um com erro; entre os sem erro, prefere o mais recente
  // (processadoEm) -- reflete o estado mais atual do Mercado Livre. Se todas as
  // ocorrências do SKU tiverem erro, mantém a mais recente mesmo assim (continua visível
  // como pendente, nunca desaparece silenciosamente).
  function escolherMelhorRegistro(a, b) {
    const aErro = !!a.erro;
    const bErro = !!b.erro;
    if (aErro !== bErro) return aErro ? b : a;
    return new Date(b.processadoEm) > new Date(a.processadoEm) ? b : a;
  }

  function agruparPorSkuCanonico(registros) {
    const porSku = new Map();
    for (const r of registros) {
      const atual = porSku.get(r.sku);
      porSku.set(r.sku, atual ? escolherMelhorRegistro(atual, r) : r);
    }
    return [...porSku.values()];
  }

  const linhasValidas = agruparPorSkuCanonico(Object.values(resultados).filter((r) => r.sku));

  // Formatação visual (18/08/2026, pedido do Felipe) -- seguir o mesmo padrão já
  // validado na "Pausados em Campanha - Karzen.xlsx": largura de coluna proporcional
  // ao conteúdo típico (nunca corta texto), célula de dado sempre com wrapText, e uma
  // linha em branco separando cada bloco (aqui, cada SKU = 1 linha = 1 bloco, já que
  // esta planilha não tem o agrupamento multi-linha por produto que a Pausados tem).
  const LARGURAS = {
    [ABA_PRIORIDADE]: [18, 18, 50, 14, 14],
    [ABA_COMPLETO]: [18, 18, 50, 14, 14, 20, 24],
  };

  function aplicarLargurasColuna(ws, larguras) {
    let col = 1;
    for (const largura of larguras) {
      ws.getColumn(col).width = largura;
      col += 2; // pula a coluna espaçadora
    }
  }

  // Preservação da "zona do usuário" (Felipe + @analyst via *elicit, 22/08/2026):
  // colunas depois do último espaçador de dado nunca foram pensadas como território do
  // script -- são livres pro Felipe anotar (ex: "ok" de validação manual). A limpeza
  // abaixo (colunas 1-20) sempre tratou essas colunas como próprias, apagando qualquer
  // anotação em toda regeneração. Corrigido: lê tudo que existe na zona do usuário ANTES
  // de limpar, guardando por SKU (nunca por número de linha -- a posição pode mudar
  // entre regenerações, inclusive por causa do fix de deduplicação acima), e reescreve
  // de volta depois que a linha do SKU correspondente for escrita. Genérico: protege
  // QUALQUER coluna na zona livre, não só uma coluna fixa -- o início da zona é derivado
  // do próprio array de LARGURAS (nunca hardcoded).
  function lerZonaDoUsuario(ws, colunaInicio, ultimaLinha) {
    const porSku = new Map();
    for (let r = 4; r <= ultimaLinha; r++) {
      const sku = ws.getCell(r, 1).value;
      if (!sku) continue;
      const anotacoes = {};
      for (let c = colunaInicio; c <= 20; c++) {
        const v = ws.getCell(r, c).value;
        if (v !== null && v !== undefined && String(v).trim() !== '') anotacoes[c] = v;
      }
      if (Object.keys(anotacoes).length > 0) porSku.set(String(sku), anotacoes);
    }
    return porSku;
  }

  function escreverAba(nomeAba, colunas, filtro) {
    const ws = wb.getWorksheet(nomeAba);
    if (!ws) throw new Error(`Aba "${nomeAba}" não encontrada no Analise Oficial.xlsx`);

    aplicarLargurasColuna(ws, LARGURAS[nomeAba]);

    const linhasFiltradas = linhasValidas.filter(filtro);

    // Limpa um intervalo generoso (cobre tanto o conteúdo antigo quanto o novo, que
    // agora ocupa ~2x mais linhas por causa das linhas em branco separadoras).
    let ultimaLinha = 0;
    ws.eachRow((row, num) => { ultimaLinha = num; });

    const colunaZonaUsuario = LARGURAS[nomeAba].length * 2 + 1;
    const anotacoesPorSku = lerZonaDoUsuario(ws, colunaZonaUsuario, ultimaLinha);

    const limiteLimpeza = Math.max(ultimaLinha, 4 + linhasFiltradas.length * 2 + 10);
    for (let r = 4; r <= limiteLimpeza; r++) {
      for (let c = 1; c <= 20; c++) ws.getCell(r, c).value = null;
      ws.getRow(r).height = undefined; // volta pra altura automática (auto-fit do Excel)
    }

    let linhaAtual = 4;
    for (const registro of linhasFiltradas) {
      const itens = montarCascata(registro);
      const mlbsTexto = celulaMultiLinha(itens, 'mlb', (m) => `#${m}`);
      const depositoTexto = celulaMultiLinha(itens, 'deposito', normalizarNumeroOuTraco);
      const fullTexto = celulaMultiLinha(itens, 'full', normalizarNumeroOuTraco);
      const statusProdutoTexto = celulaMultiLinha(itens, 'statusProduto');

      const valoresLinha = [
        registro.sku,
        mlbsTexto,
        registro.tituloCatalogo || '-',
        depositoTexto,
        fullTexto,
        ...(colunas === 7 ? [statusProdutoTexto, registro.statusAds || '-'] : []),
      ];

      // Fix de altura de linha (Felipe achou, 19/08/2026): `ws.getRow(r).height = undefined`
      // (linha 276) NÃO faz o Excel autoajustar a altura pra células com wrapText de
      // verdade -- ele mantém a altura padrão de 1 linha só, escondendo a 2ª linha de
      // qualquer célula com "\n" (ex: PSC3500-127V, MLB's = "#123\n#456") até o usuário
      // aumentar a altura manualmente. O dado sempre esteve certo no arquivo -- só a
      // exibição ficava cortada. Corrigido: calcula o maior número de linhas entre todos
      // os valores desta linha e define a altura explicitamente (15pt por linha, padrão
      // de linha única do Excel com fonte 11pt).
      let maxLinhas = 1;
      for (const valor of valoresLinha) {
        const nLinhas = String(valor).split('\n').length;
        if (nLinhas > maxLinhas) maxLinhas = nLinhas;
      }

      let col = 1;
      for (const valor of valoresLinha) {
        const cel = ws.getCell(linhaAtual, col);
        cel.value = valor;
        cel.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        col += 2;
      }
      if (maxLinhas > 1) ws.getRow(linhaAtual).height = maxLinhas * 15;

      const anotacoesDoSku = anotacoesPorSku.get(String(registro.sku));
      if (anotacoesDoSku) {
        for (const [colStr, valor] of Object.entries(anotacoesDoSku)) {
          ws.getCell(linhaAtual, Number(colStr)).value = valor;
        }
      }

      linhaAtual += 2; // pula 1 linha em branco (separador visual entre blocos/SKUs)
    }
    return linhasFiltradas.length;
  }

  const nPrioridade = escreverAba(ABA_PRIORIDADE, 5, (r) => r.statusAds === 'Sem Campanha');
  const nCompleto = escreverAba(ABA_COMPLETO, 7, () => true);

  await wb.xlsx.writeFile(ARQUIVO_ANALISE_OFICIAL);
  return { nPrioridade, nCompleto };
}

async function processarLinha(pageAnuncios, pageAds, context, itemId, linha, mlbsConhecidos) {
  let sku = mlbsConhecidos.get(itemId) || null;
  if (sku) {
    console.log(`  [reaproveitado] Item ID ${itemId} já conhecido como SKU ${sku} -- pulando Passo A`);
  } else {
    sku = await acharSkuDoMlb(pageAnuncios, itemId);
  }
  if (!sku) {
    return { linha, itemId, erro: 'ANUNCIO_NAO_ENCONTRADO', metodoVersao: METODO_VERSAO, processadoEm: new Date().toISOString() };
  }

  const { todosMlbsSincronizados, mlbs, divergenciaContagemBotoes, anomaliaClassificacaoDetectada } = await analisarSku(pageAnuncios, context, sku);
  // Correção real (22/08/2026, achada pelo Felipe no SKU P-JU-03 -- avaliada pelo
  // @analyst via *elicit): a divergência de contagem de botões (sinal já existente em
  // analisarSku, antes só um console.log descartado) agora vira um erro de verdade --
  // entra na regra já validada de "linha com erro é sempre reprocessada".
  const erroCaptura = divergenciaContagemBotoes ? 'divergencia_contagem_botoes_possivel_captura_incompleta' : null;
  const { classicos, premiums } = listarCatalogoPorCondicao(mlbs);

  // Regra confirmada pelo Felipe (19/08/2026), avaliada pelo @analyst via *elicit:
  // até 2 MLBs de catálogo por SKU, nunca mais -- prioridade 1 Clássico + 1 Premium
  // (os primeiros encontrados); se um dos 2 tipos não existir, completa com os 2
  // primeiros do tipo que existir; se só existir 1 MLB de catálogo no total, mostra
  // só esse 1; se não existir nenhum, "-" (mantém o erro NENHUM_MLB_DE_CATALOGO_CONFIRMADO).
  let selecionados;
  if (classicos.length > 0 && premiums.length > 0) {
    selecionados = [classicos[0], premiums[0]];
  } else if (classicos.length > 0) {
    selecionados = classicos.slice(0, 2);
  } else if (premiums.length > 0) {
    selecionados = premiums.slice(0, 2);
  } else {
    selecionados = [];
  }

  if (selecionados.length === 0) {
    return {
      linha,
      itemId,
      sku,
      todosMlbsSincronizados,
      catalogoConfirmado: [],
      erro: anomaliaClassificacaoDetectada ? anomaliaClassificacaoDetectada.tipo : (erroCaptura || 'NENHUM_MLB_DE_CATALOGO_CONFIRMADO'),
      metodoVersao: METODO_VERSAO,
      processadoEm: new Date().toISOString(),
      ...(anomaliaClassificacaoDetectada ? { anomaliaClassificacaoDetectada } : {}),
    };
  }

  const mlbReferencia = selecionados[0].mlbId;
  const { titulo, statusAds, erro: erroAds } = await buscarTituloEStatusEmAds(pageAds, mlbReferencia);

  const a2 = selecionados.map((sel) => {
    const d = mlbs[sel.mlbId];
    return { mlb: sel.mlbId, condicao: d.condicao, full: d.full, deposito: d.deposito, statusProduto: d.statusProduto, statusCatalogo: d.statusCatalogo };
  });

  return {
    linha,
    itemId,
    sku,
    todosMlbsSincronizados,
    catalogoConfirmado: selecionados.map((sel) => ({ mlb: sel.mlbId, condicao: mlbs[sel.mlbId].condicao })),
    a2,
    tituloCatalogo: titulo,
    statusAds,
    // anomaliaClassificacaoDetectada tem prioridade sobre os outros erros -- garante que a
    // linha SEMPRE fica com `erro` setado quando isso acontece (mesmo se catalogoConfirmado
    // tiver sido preenchido por outro MLB do mesmo SKU), senão a regra de "linha com erro
    // é sempre reprocessada" não pegaria essa linha numa rodada futura.
    ...(anomaliaClassificacaoDetectada
      ? { erro: anomaliaClassificacaoDetectada.tipo, anomaliaClassificacaoDetectada }
      : erroCaptura ? { erro: erroCaptura } : erroAds ? { erro: erroAds } : {}),
    metodoVersao: METODO_VERSAO,
    processadoEm: new Date().toISOString(),
  };
}

async function main() {
  const linhaInicio = parseInt(process.argv[2], 10);
  const linhaFim = parseInt(process.argv[3], 10);
  if (!linhaInicio || !linhaFim) {
    console.error('Uso: node reprocessar-analise-oficial-completo.js <linhaInicio> <linhaFim>');
    process.exit(1);
  }

  adquirirLock();

  const ExcelJS = require('exceljs');
  const wbFonte = new ExcelJS.Workbook();
  await wbFonte.xlsx.readFile(ARQUIVO_FONTE);
  const wsFonte = wbFonte.getWorksheet(ABA_FONTE);

  const resultados = lerJsonSeguro(ARQUIVO_JSON, {});
  const mlbsConhecidos = carregarMlbsConhecidos();
  console.log(`MLBs conhecidos de lotes antigos (reaproveitamento): ${mlbsConhecidos.size}`);

  const itens = [];
  for (let r = linhaInicio; r <= linhaFim; r++) {
    const itemId = String(wsFonte.getCell(r, COL_ITEM_ID).value || '').trim();
    if (!itemId) continue;
    itens.push({ row: r, itemId });
  }

  console.log(`Total de linhas no intervalo ${linhaInicio}-${linhaFim}: ${itens.length}`);

  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    // Correção real (18/08/2026, achado no piloto BLOCO 0-AA): matcher de aba nunca
    // mais reescrito inline aqui -- sempre reusar o módulo compartilhado
    // achar-abas-mercadolivre.js (ver CLAUDE.md, hook check-selector-reuse.js v4).
    let pageAnuncios = acharAbaAnuncios(context);
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    let pageAds = acharAbaAdsPatrocinados(context);
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);

    let processadosNestaRodada = 0;
    // Freio de segurança (24/08/2026, achado pela auditoria após o incidente do
    // .ml-ads-toolbar -- 14 linhas seguidas bateram no mesmo timeout de clique antes de
    // alguém perceber): se a MESMA exceção se repetir 2 vezes seguidas, algo estrutural
    // está errado (aba travada, elemento sumiu, etc.) -- continuar tentando linha após
    // linha só desperdiça tempo (30s+ cada) e multiplica o problema. Classifica por
    // `errLinha.message.split('\n')[0]` (1ª linha da mensagem) -- confirmado suficiente
    // pro caso real (mesma frase exata "locator.click: Timeout 30000ms exceeded." em
    // todas as 14 falhas).
    let excecoesSeguidas = 0;
    let ultimoTipoExcecao = null;
    for (const item of itens) {
      const chave = `linha-${item.row}`;
      const existente = resultados[chave];
      // Só pula se processado com o método atual E sem nenhum erro registrado -- uma
      // linha com `erro` (mesmo "definitivo" tipo ANUNCIO_NAO_ENCONTRADO) é reprocessada
      // de novo, nunca aceita como "feita" silenciosamente. Achado real (18/08/2026,
      // piloto 145-170): sem essa checagem extra, linhas com tituloCatalogo/statusAds
      // corrompidos por busca desatualizada (ver buscarTituloEStatusEmAds) ficariam
      // presas como "já processadas" pra sempre, mesmo depois do bug corrigido.
      if (existente && existente.metodoVersao === METODO_VERSAO && !existente.erro) {
        console.log(`[linha ${item.row}] já processada com o método atual -- pulando`);
        continue;
      }

      console.log(`\n=== LINHA ${item.row} (Item ID ${item.itemId}) ===`);
      try {
        const r = await processarLinha(pageAnuncios, pageAds, context, item.itemId, item.row, mlbsConhecidos);
        resultados[chave] = r;
        salvarJson(ARQUIVO_JSON, resultados);
        console.log(`  -> SKU: ${r.sku || '(não encontrado)'} | erro: ${r.erro || 'nenhum'}`);
        excecoesSeguidas = 0;
        ultimoTipoExcecao = null;
        // Correção real (24/08/2026, pedido explícito do Felipe, generalizada em seguida --
        // ver .aiox/itens-em-aberto.md, princípio "anomalia de classificação nunca mapeada
        // -> parar o lote"): qualquer anomalia de CLASSIFICAÇÃO (não erro técnico
        // transitório) não pode só ficar registrada -- precisa PARAR o lote inteiro aqui,
        // nunca continuar processando outras linhas enquanto não for validada pelo Felipe.
        // Checagem genérica (`r.anomaliaClassificacaoDetectada`), não amarrada a um `tipo`
        // específico -- qualquer anomalia futura desse tipo reusa este mesmo mecanismo sem
        // precisar mexer neste loop de novo. O resultado já foi salvo no JSON acima (não
        // perde nada), só a continuação do loop é que trava.
        if (r.anomaliaClassificacaoDetectada) {
          console.log(`\n⛔ ANOMALIA DE CLASSIFICAÇÃO NUNCA MAPEADA ENCONTRADA -- parando o lote inteiro.`);
          console.log(`   Tipo: ${r.anomaliaClassificacaoDetectada.tipo}`);
          console.log(`   SKU: ${r.anomaliaClassificacaoDetectada.sku} | MLB: ${r.anomaliaClassificacaoDetectada.mlb}`);
          console.log(`   Linha ${item.row} já salva no JSON com esse erro -- nenhuma linha depois desta foi processada.`);
          processadosNestaRodada++;
          break;
        }
      } catch (errLinha) {
        // Correção real (24/08/2026, achada pela auditoria após o incidente do
        // .ml-ads-toolbar travado): este catch sobrescrevia o registro inteiro da linha,
        // apagando sku/catalogoConfirmado/tituloCatalogo etc. que já estavam corretos de
        // uma rodada anterior -- pra QUALQUER exceção, não só a do toolbar. Correção:
        // preservar o registro anterior (se existir) e só atualizar os campos de erro --
        // nunca perder dado bom por causa de uma falha técnica transitória. A linha
        // continua entrando na regra de "erro sempre reprocessado" de qualquer forma.
        resultados[chave] = {
          ...(resultados[chave] || {}),
          linha: item.row,
          itemId: item.itemId,
          erro: `EXCECAO: ${errLinha.message}`,
          metodoVersao: METODO_VERSAO,
          processadoEm: new Date().toISOString(),
        };
        salvarJson(ARQUIVO_JSON, resultados);
        console.log(`  -> ERRO: ${errLinha.message}`);

        const tipoExcecao = errLinha.message.split('\n')[0];
        excecoesSeguidas = tipoExcecao === ultimoTipoExcecao ? excecoesSeguidas + 1 : 1;
        ultimoTipoExcecao = tipoExcecao;
        if (excecoesSeguidas >= 2) {
          console.log(`\n⛔ FREIO DE SEGURANÇA: 2 linhas seguidas falharam com a mesma exceção -- parando o lote inteiro.`);
          console.log(`   Exceção: "${tipoExcecao}"`);
          processadosNestaRodada++;
          break;
        }
      }
      processadosNestaRodada++;
    }

    console.log(`\nConcluído. ${processadosNestaRodada} linhas processadas nesta rodada.`);

    // Escrita real no Analise Oficial.xlsx (item 1, 18/08/2026) -- regenera as 2 abas
    // do zero a partir do JSON acumulado inteiro (não só as linhas desta rodada),
    // sempre com backup e confirmação de arquivo fechado antes.
    const lockFile = path.join(path.dirname(ARQUIVO_ANALISE_OFICIAL), '~$' + path.basename(ARQUIVO_ANALISE_OFICIAL));
    if (fs.existsSync(lockFile)) {
      console.log('\n⚠️ Analise Oficial.xlsx está aberto no Excel -- feche o arquivo antes de escrever. Pulando a escrita nesta rodada.');
    } else {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(path.dirname(ARQUIVO_ANALISE_OFICIAL), `BACKUP-antes-reprocessamento-completo-${ts}.xlsx`);
      fs.copyFileSync(ARQUIVO_ANALISE_OFICIAL, backupPath);
      console.log(`\nBackup criado: ${backupPath}`);

      const { nPrioridade, nCompleto } = await regenerarAbasExcel(resultados);
      console.log(`Analise Oficial.xlsx regenerado -- "Prioridade - Fora de Ads": ${nPrioridade} linhas | "Mapeamento Completo da Planilha": ${nCompleto} linhas.`);
    }
  } catch (err) {
    console.error('ERRO GERAL:', err.message);
  } finally {
    if (browser) await browser.close();
    liberarLock();
  }
  process.exit(0);
}

main();
