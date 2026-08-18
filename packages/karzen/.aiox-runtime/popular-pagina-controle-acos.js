// Popula a pagina nova " ML CONTROLE ACOS" com os dados da campanha
// [ML] [CONTROLE ACOS], seguindo a MESMA organizacao visual da "Teste 1"
// (colunas, alturas, espacamentos, mesclagem) -- mesma logica ja validada
// (linhaDaSku/listarCatalogoPorCondicao) usada em popular-pagina-ava-performance.js,
// so trocando as 3 constantes de aba/campanha.
const ExcelJS = require('exceljs');
const path = require('path');

const ARQUIVO_EXCEL = 'C:\\Downloads\\Pausados em Campanha - Karzen.xlsx';
const RUNTIME = 'C:\\Users\\Felipe Augusto\\projeto00\\packages\\karzen\\.aiox-runtime\\';
const NOME_ABA_ORIGEM = 'Teste 1';
const NOME_ABA_DESTINO = ' ML CONTROLE ACOS';
const NOME_CAMPANHA = '[ML] [CONTROLE ACOS]';

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
  const campanhaResultado = require(path.join(RUNTIME, 'pausados-campanha-resultado.json'));
  const produtos = campanhaResultado[NOME_CAMPANHA];
  if (!produtos) throw new Error(`Campanha "${NOME_CAMPANHA}" nao encontrada no JSON`);

  const gruposCampanha = [];
  let produtosSemSku = [];
  for (const [tituloProduto, dadosProduto] of Object.entries(produtos)) {
    if (dadosProduto.erro) { console.log(`  [PULADO -- erro] ${tituloProduto}: ${dadosProduto.erro}`); continue; }
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
    if (linhas.length === 0) { produtosSemSku.push(tituloProduto); continue; }
    gruposCampanha.push({ linhas, mesclarAC: linhas.length > 1, subgruposSku });
  }
  console.log(`Produtos com dado: ${gruposCampanha.length} | Sem SKU (pulados, ficam pra depois): ${produtosSemSku.length}`, produtosSemSku);

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARQUIVO_EXCEL);
  const wsOrigem = wb.getWorksheet(NOME_ABA_ORIGEM);
  const wsDestino = wb.getWorksheet(NOME_ABA_DESTINO);
  if (!wsOrigem) throw new Error(`Aba origem "${NOME_ABA_ORIGEM}" nao encontrada`);
  if (!wsDestino) throw new Error(`Aba destino "${NOME_ABA_DESTINO}" nao encontrada`);

  // ── 1. Copiar larguras de coluna (1-36) da Teste 1 ──
  for (let c = 1; c <= 36; c++) {
    const colOrigem = wsOrigem.getColumn(c);
    if (colOrigem && colOrigem.width !== undefined) {
      wsDestino.getColumn(c).width = colOrigem.width;
    }
  }

  // ── 2. Copiar alturas das linhas 1-4 (banner + espacador + header + espacador) ──
  for (let r = 1; r <= 4; r++) {
    const hOrigem = wsOrigem.getRow(r).height;
    if (hOrigem !== undefined) wsDestino.getRow(r).height = hOrigem;
  }

  // ── 3. Copiar view (zoom, grid) ──
  wsDestino.views = JSON.parse(JSON.stringify(wsOrigem.views));

  // ── 4. Copiar header (linha 3) valor + estilo, coluna a coluna ──
  for (let c = 1; c <= 36; c++) {
    const cOrigem = wsOrigem.getCell(3, c);
    const cDestino = wsDestino.getCell(3, c);
    cDestino.value = cOrigem.value;
    cDestino.font = cOrigem.font;
    cDestino.alignment = cOrigem.alignment;
    cDestino.fill = cOrigem.fill;
    cDestino.border = cOrigem.border;
  }

  // ── 5. Escrever os dados a partir da linha 5, mesmo padrao "dado(s) + 1 espacador" ──
  const colunasDado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
  const estiloDadoRef = wsOrigem.getCell(5, 5); // celula de dado de referencia (SKU, linha 5 Teste 1)
  const estiloFonteDado = estiloDadoRef.font;
  const estiloAlinhamentoDado = estiloDadoRef.alignment;

  let linhaAtual = 5;
  const mesclasAC = [];
  const mesclasSku = [];
  for (const grupo of gruposCampanha) {
    const linhaInicioGrupo = linhaAtual;
    grupo.linhas.forEach((valores) => {
      colunasDado.forEach((col, i) => {
        const cell = wsDestino.getCell(linhaAtual, col);
        cell.value = valores[i];
        cell.font = estiloFonteDado;
        cell.alignment = estiloAlinhamentoDado;
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
    linhaAtual++; // linha espacadora entre grupos
  }

  for (const range of [...mesclasAC, ...mesclasSku]) {
    wsDestino.mergeCells(range);
  }

  await wb.xlsx.writeFile(ARQUIVO_EXCEL);
  console.log(`\nEscrito com sucesso na aba "${NOME_ABA_DESTINO}". Grupos: ${gruposCampanha.length}. Ultima linha usada: ${linhaAtual - 2}.`);
  console.log('Mesclas A/C:', mesclasAC.length);
  console.log('Mesclas SKU (coluna E):', mesclasSku.length);
})().catch((err) => { console.error('ERRO:', err.message, err.stack); process.exit(1); });
