// v3 -- corrige o Erro 3 apontado pelo Felipe: Depósito/FULL/Qualidade/Experiência/Status
// do Produto eram colunas UNICAS compartilhadas entre o lado Classico e o lado Premium de
// uma mesma linha (usava so 1 MLB de referencia, sempre priorizando o Classico, pra linha
// inteira) -- perdendo o dado real do outro lado quando os 2 divergem (caso real
// confirmado: SKU PAF15B-220V, FULL Classico=40 vs FULL Premium=47, mostrava so 40).
// Agora essas 5 colunas viram 10 (Classico + Premium cada), mesmo padrao que "Catálogo
// Clássico"/"Catálogo Premium" ja usam -- cada lado mostra seu proprio dado real, nada
// se perde. Erro 1 (multiplos MLBs por condicao, corrigido na v2) continua intacto.
const ExcelJS = require('exceljs');
const path = require('path');

const ARQUIVO_EXCEL = 'C:\\Downloads\\Pausados em Campanha - Karzen.xlsx';
const RUNTIME = 'C:\\Users\\Felipe Augusto\\projeto00\\packages\\karzen\\.aiox-runtime\\';

function normalizarNumeroOuTraco(valor) {
  if (!valor) return '-';
  if (/^sem estoque$/i.test(valor)) return '-';
  const m = String(valor).match(/^([\d.]+)\s*un\.?$/);
  if (m) return m[1].replace(/\./g, '');
  return valor;
}
function normalizarQualExp(valor) {
  if (!valor || valor === '--') return '-';
  const n = parseInt(valor, 10);
  if (isNaN(n)) return '-';
  return n <= 65 ? String(n) : '-';
}

function listarCatalogoPorCondicao(mlbs) {
  const classicos = [];
  const premiums = [];
  for (const [mlbId, dados] of Object.entries(mlbs)) {
    if (dados.statusCatalogo && dados.condicao) {
      const alvo = dados.condicao === 'Clássico' ? classicos : premiums;
      alvo.push({ mlbId, status: dados.statusCatalogo });
    }
  }
  return { classicos, premiums };
}

// Correcao real (16/08/2026, Erro 3): antes recebia 1 "dadosRef" unico pra linha inteira.
// Agora pega os dados de deposito/full/qualidade/experiencia/status direto do MLB
// Classico (c) e do MLB Premium (p) PAREADOS NESTA LINHA, separadamente -- sem escolher
// "qual representa a linha" nunca mais.
function linhasDaSku({ campanha, titulo, sku, mlbs, statusNaCampanha }) {
  const { classicos, premiums } = listarCatalogoPorCondicao(mlbs);
  const n = Math.max(classicos.length, premiums.length, 1);
  const linhas = [];
  for (let i = 0; i < n; i++) {
    const c = classicos[i];
    const p = premiums[i];
    const dc = c ? (mlbs[c.mlbId] || {}) : {};
    const dp = p ? (mlbs[p.mlbId] || {}) : {};
    linhas.push([
      campanha,
      titulo,
      sku,
      c ? `#${c.mlbId}` : '-',
      c ? c.status : '-',
      p ? `#${p.mlbId}` : '-',
      p ? p.status : '-',
      normalizarNumeroOuTraco(dc.deposito),
      normalizarNumeroOuTraco(dp.deposito),
      normalizarNumeroOuTraco(dc.full),
      normalizarNumeroOuTraco(dp.full),
      normalizarQualExp(dc.qualidade),
      normalizarQualExp(dp.qualidade),
      normalizarQualExp(dc.experiencia),
      normalizarQualExp(dp.experiencia),
      dc.statusProduto || '-',
      dp.statusProduto || '-',
      statusNaCampanha,
    ]);
  }
  return linhas;
}

(async () => {
  // ── 1. Montar os grupos dos 6 SKUs standalone (sem mesclagem de Campanha/Titulo) ──
  const taiff = require(path.join(RUNTIME, 'taiff-curves-analise-completa.json'));
  const wl4000 = require(path.join(RUNTIME, 'wl4000-analise-completa.json'));
  const prosb = require(path.join(RUNTIME, 'prosb3000-analise.json'));
  const fontesSkus = [taiff, wl4000, { 'PROSB-3000': prosb }];

  const gruposSkusStandalone = [];
  for (const fonte of fontesSkus) {
    for (const [sku, analise] of Object.entries(fonte)) {
      const linhas = linhasDaSku({
        campanha: '-',
        titulo: '-',
        sku,
        mlbs: analise.mlbs,
        statusNaCampanha: '-',
      });
      gruposSkusStandalone.push({ linhas, mesclarAC: false, subgruposSku: [{ linhaInicio: 0, linhaFim: linhas.length - 1 }] });
    }
  }

  // ── 2. Montar os grupos dos 13 produtos da campanha ──
  const campanhaResultado = require(path.join(RUNTIME, 'pausados-campanha-resultado.json'));
  const NOME_CAMPANHA = '[ML] [BAIXA PERFORMANCE]';
  const produtos = campanhaResultado[NOME_CAMPANHA];

  const gruposCampanha = [];
  for (const [tituloProduto, dadosProduto] of Object.entries(produtos)) {
    const linhas = [];
    const subgruposSku = [];
    for (const [sku, skuInfo] of Object.entries(dadosProduto.skus || {})) {
      const mlbsDetalhe = skuInfo.mlbsDetalhe || {};
      const linhasDestaSku = linhasDaSku({
        campanha: NOME_CAMPANHA,
        titulo: tituloProduto,
        sku,
        mlbs: mlbsDetalhe,
        statusNaCampanha: 'Pausado',
      });
      const linhaInicio = linhas.length;
      linhas.push(...linhasDestaSku);
      const linhaFim = linhas.length - 1;
      if (linhaFim > linhaInicio) subgruposSku.push({ linhaInicio, linhaFim });
    }
    if (linhas.length === 0) continue;
    gruposCampanha.push({ linhas, mesclarAC: linhas.length > 1, subgruposSku });
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARQUIVO_EXCEL);
  const ws = wb.getWorksheet('Teste 1');

  // ── 3. Atualizar cabecalho (linha 3): 5 colunas unicas -> 10 colunas Classico/Premium.
  //       Copia o estilo da celula original pras 2 novas que a substituem.
  const HEADER_ROW = 3;
  function clonarEstilo(origem, destino) {
    destino.font = origem.font;
    destino.alignment = origem.alignment;
    destino.fill = origem.fill;
    destino.border = origem.border;
  }
  const mapaHeadersAntigos = {
    15: ['Depósito Clássico', 'Depósito Premium'],
    17: ['FULL Clássico', 'FULL Premium'],
    19: ['Qualidade Clássico', 'Qualidade Premium'],
    21: ['Experiência Clássico', 'Experiência Premium'],
    23: ['Status Clássico', 'Status Premium'],
  };
  // Le e guarda o estilo/valor de cada header antigo ANTES de sobrescrever (senao a
  // celula de origem de uma coluna pode ja ter sido sobrescrita pela anterior).
  const estilosAntigos = {};
  for (const colAntiga of Object.keys(mapaHeadersAntigos)) {
    estilosAntigos[colAntiga] = ws.getCell(HEADER_ROW, Number(colAntiga));
  }
  const celulaStatusCampanhaAntiga = ws.getCell(HEADER_ROW, 25);
  const valorStatusCampanha = celulaStatusCampanhaAntiga.value;
  const estiloStatusCampanha = { font: celulaStatusCampanhaAntiga.font, alignment: celulaStatusCampanhaAntiga.alignment, fill: celulaStatusCampanhaAntiga.fill, border: celulaStatusCampanhaAntiga.border };

  let colDestino = 15;
  for (const colAntiga of Object.keys(mapaHeadersAntigos)) {
    const [nomeClassico, nomePremium] = mapaHeadersAntigos[colAntiga];
    const origem = estilosAntigos[colAntiga];
    const cClassico = ws.getCell(HEADER_ROW, colDestino);
    const cPremium = ws.getCell(HEADER_ROW, colDestino + 2);
    cClassico.value = nomeClassico;
    cPremium.value = nomePremium;
    clonarEstilo(origem, cClassico);
    clonarEstilo(origem, cPremium);
    colDestino += 4;
  }
  // "Status na Campanha" muda de coluna 25 pra 35.
  const cStatusCampanhaNova = ws.getCell(HEADER_ROW, 35);
  cStatusCampanhaNova.value = valorStatusCampanha;
  cStatusCampanhaNova.font = estiloStatusCampanha.font;
  cStatusCampanhaNova.alignment = estiloStatusCampanha.alignment;
  cStatusCampanhaNova.fill = estiloStatusCampanha.fill;
  cStatusCampanhaNova.border = estiloStatusCampanha.border;
  // Limpa a celula 25 antiga (agora vazia, ja que Status Clássico ocupa ela).
  // (celula 25 ja foi sobrescrita por "Status Clássico" no loop acima -- nada a fazer)

  // ── 4. Limpar dados de linhas 5+ (agora ate coluna 36, cobrindo as 18 colunas de dado) ──
  const mergesAntigos = [...ws.model.merges].filter(m => /^(A|C|E)\d+:(A|C|E)\d+$/.test(m));
  for (const range of mergesAntigos) ws.unMergeCells(range);
  for (let r = 5; r <= ws.rowCount; r++) {
    for (let c = 1; c <= 36; c++) {
      ws.getCell(r, c).value = null;
    }
  }

  const todosOsGrupos = [...gruposSkusStandalone, ...gruposCampanha];
  const colunasDado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];

  let linhaAtual = 5;
  const mesclasAC = [];
  const mesclasSku = [];
  for (const grupo of todosOsGrupos) {
    const linhaInicioGrupo = linhaAtual;
    grupo.linhas.forEach((valores) => {
      colunasDado.forEach((col, i) => {
        const cell = ws.getCell(linhaAtual, col);
        cell.value = valores[i];
        cell.font = { size: 11, name: 'Calibri', family: 2, scheme: 'minor' };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      });
      linhaAtual++;
    });
    const linhaFimGrupo = linhaAtual - 1;

    for (const sg of grupo.subgruposSku) {
      const lIni = linhaInicioGrupo + sg.linhaInicio;
      const lFim = linhaInicioGrupo + sg.linhaFim;
      if (lFim > lIni) mesclasSku.push(`E${lIni}:E${lFim}`);
    }

    if (grupo.mesclarAC && linhaFimGrupo > linhaInicioGrupo) {
      mesclasAC.push(`A${linhaInicioGrupo}:A${linhaFimGrupo}`);
      mesclasAC.push(`C${linhaInicioGrupo}:C${linhaFimGrupo}`);
    }
    linhaAtual++;
  }

  for (const range of [...mesclasAC, ...mesclasSku]) {
    ws.mergeCells(range);
  }

  await wb.xlsx.writeFile(ARQUIVO_EXCEL);
  console.log(`Escrito com sucesso. Grupos: ${todosOsGrupos.length}. Ultima linha usada: ${linhaAtual - 2}.`);
  console.log('Mesclas A/C:', mesclasAC.length, JSON.stringify(mesclasAC));
  console.log('Mesclas SKU (coluna E):', mesclasSku.length, JSON.stringify(mesclasSku));
})().catch(err => { console.error('ERRO:', err.message, err.stack); process.exit(1); });
