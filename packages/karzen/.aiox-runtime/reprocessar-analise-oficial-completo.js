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

const METODO_VERSAO = '2026-08-18-v1';

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
async function buscarTituloEStatusEmAds(pageAds, mlb) {
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

  async function buscarUmaVez() {
    const campo = pageAds.locator(SELETOR_BUSCA_ADS).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(`MLB${mlb}`);
    await pageAds.keyboard.press('Enter');
    return esperarTextoEstabilizar(pageAds, {
      validarConteudo: (t) => (t.includes('CATÁLOGO') || t.includes('Sem Campanha')) && t !== textoAntes,
    });
  }

  let texto = await buscarUmaVez();
  if (texto === textoAntes) {
    texto = await buscarUmaVez(); // re-busca do zero, uma vez -- mesmo padrão de analisarSku
  }

  // Mesma filosofia já usada no resto do pipeline (caso AOC21-30HM, dupla-leitura
  // divergente): sem confirmação real de que o texto é fresco, não inventa um resultado
  // -- fica marcado como não confiável em vez de silenciosamente errado.
  if (texto === textoAntes || !(texto.includes('CATÁLOGO') || texto.includes('Sem Campanha'))) {
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

// Regra "Ativo primeiro" (documento, 12/08/2026): quando Clássico e Premium têm
// statusProduto diferente, o Ativo entra primeiro na célula (quebra de linha) --
// afeta MLB's, Depósito, FULL e Status do Produto juntos, mantendo correspondência
// posição-a-posição entre as colunas.
function montarCascata(registro) {
  const c = registro.a2 && registro.a2['Clássico'];
  const p = registro.a2 && registro.a2['Premium'];
  const itens = [];
  if (c) itens.push(c);
  if (p) itens.push(p);
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
  const linhasValidas = Object.values(resultados).filter((r) => r.sku);

  function escreverAba(nomeAba, colunas, filtro) {
    const ws = wb.getWorksheet(nomeAba);
    if (!ws) throw new Error(`Aba "${nomeAba}" não encontrada no Analise Oficial.xlsx`);

    let ultimaLinha = 0;
    ws.eachRow((row, num) => { ultimaLinha = num; });
    for (let r = 4; r <= Math.max(ultimaLinha, 4); r++) {
      for (let c = 1; c <= 20; c++) ws.getCell(r, c).value = null;
    }

    const linhasFiltradas = linhasValidas.filter(filtro);
    let linhaAtual = 4;
    for (const registro of linhasFiltradas) {
      const itens = montarCascata(registro);
      const mlbsTexto = celulaMultiLinha(itens, 'mlb', (m) => `#${m}`);
      const depositoTexto = celulaMultiLinha(itens, 'deposito', normalizarNumeroOuTraco);
      const fullTexto = celulaMultiLinha(itens, 'full', normalizarNumeroOuTraco);
      const statusProdutoTexto = celulaMultiLinha(itens, 'statusProduto');

      let col = 1;
      ws.getCell(linhaAtual, col).value = registro.sku; col += 2;
      ws.getCell(linhaAtual, col).value = mlbsTexto; col += 2;
      ws.getCell(linhaAtual, col).value = registro.tituloCatalogo || '-'; col += 2;
      ws.getCell(linhaAtual, col).value = depositoTexto; col += 2;
      ws.getCell(linhaAtual, col).value = fullTexto; col += 2;
      if (colunas === 7) {
        ws.getCell(linhaAtual, col).value = statusProdutoTexto; col += 2;
        ws.getCell(linhaAtual, col).value = registro.statusAds || '-'; col += 2;
      }
      linhaAtual++;
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

  const { todosMlbsSincronizados, mlbs } = await analisarSku(pageAnuncios, context, sku);
  const { classicos, premiums } = listarCatalogoPorCondicao(mlbs);
  const classico = classicos[0] || null;
  const premium = premiums[0] || null;

  if (!classico && !premium) {
    return {
      linha,
      itemId,
      sku,
      todosMlbsSincronizados,
      catalogoConfirmado: null,
      erro: 'NENHUM_MLB_DE_CATALOGO_CONFIRMADO',
      metodoVersao: METODO_VERSAO,
      processadoEm: new Date().toISOString(),
    };
  }

  const mlbReferencia = classico ? classico.mlbId : premium.mlbId;
  const { titulo, statusAds, erro: erroAds } = await buscarTituloEStatusEmAds(pageAds, mlbReferencia);

  const dc = classico ? mlbs[classico.mlbId] : null;
  const dp = premium ? mlbs[premium.mlbId] : null;

  return {
    linha,
    itemId,
    sku,
    todosMlbsSincronizados,
    catalogoConfirmado: {
      Clássico: classico ? classico.mlbId : null,
      Premium: premium ? premium.mlbId : null,
    },
    a2: {
      Clássico: dc ? { mlb: classico.mlbId, full: dc.full, deposito: dc.deposito, statusProduto: dc.statusProduto, statusCatalogo: dc.statusCatalogo } : null,
      Premium: dp ? { mlb: premium.mlbId, full: dp.full, deposito: dp.deposito, statusProduto: dp.statusProduto, statusCatalogo: dp.statusCatalogo } : null,
    },
    tituloCatalogo: titulo,
    statusAds,
    ...(erroAds ? { erro: erroAds } : {}),
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
      } catch (errLinha) {
        resultados[chave] = {
          linha: item.row,
          itemId: item.itemId,
          erro: `EXCECAO: ${errLinha.message}`,
          metodoVersao: METODO_VERSAO,
          processadoEm: new Date().toISOString(),
        };
        salvarJson(ARQUIVO_JSON, resultados);
        console.log(`  -> ERRO: ${errLinha.message}`);
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
  }
  process.exit(0);
}

main();
