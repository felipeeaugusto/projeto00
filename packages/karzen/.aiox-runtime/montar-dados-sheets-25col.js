// Mesma logica do montar-dados-sheets.js, mas agora com 25 colunas intercaladas
// (dado-espacador), identico a estrutura ja validada no Excel local.
const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pausados-campanha-resultado.json'), 'utf8'));

const TOTAL_COLS = 25; // 13 colunas de dado (posicoes impares 1,3,...,25) + 12 espacadoras

function linhaVazia() {
  return new Array(TOTAL_COLS).fill('');
}

// posicoes de dado (1-indexed): 1,3,5,7,9,11,13,15,17,19,21,23,25
const POS = [1,3,5,7,9,11,13,15,17,19,21,23,25];

function setDado(row, idx, valor) {
  row[POS[idx] - 1] = valor;
}

const grupos = [];
for (const [campanha, produtos] of Object.entries(dados)) {
  for (const [titulo, info] of Object.entries(produtos)) {
    if (info.erro) continue;
    const skus = info.skus || {};
    const linhasSku = [];
    for (const [sku, d] of Object.entries(skus)) {
      let statusClassico = '-';
      let statusPremium = '-';
      if (d.catalogoClassico && d.mlbsDetalhe[d.catalogoClassico]) {
        statusClassico = d.mlbsDetalhe[d.catalogoClassico].statusCatalogo || '-';
      }
      if (d.catalogoPremium && d.mlbsDetalhe[d.catalogoPremium]) {
        statusPremium = d.mlbsDetalhe[d.catalogoPremium].statusCatalogo || '-';
      }
      linhasSku.push({
        sku: d.sku,
        catalogoClassico: d.catalogoClassico ? `#${d.catalogoClassico}` : '-',
        statusClassico,
        catalogoPremium: d.catalogoPremium ? `#${d.catalogoPremium}` : '-',
        statusPremium,
        deposito: d.deposito,
        full: d.full,
        qualidade: d.qualidade,
        experiencia: d.experiencia,
        statusProduto: d.statusProduto,
      });
    }
    if (linhasSku.length === 0) continue;
    grupos.push({ campanha, titulo, linhas: linhasSku });
  }
}

const totalSkus = grupos.reduce((acc, g) => acc + g.linhas.length, 0);
console.error(`Grupos: ${grupos.length} | Total SKUs: ${totalSkus}`);

const linhasGrid = [];
// Linha 1: banner (so na 1a coluna, mesclagem cobre tudo depois)
const linhaBanner = linhaVazia();
linhaBanner[0] = '⚠ Dados em validação — aguardando confirmação final';
linhasGrid.push(linhaBanner);
linhasGrid.push(linhaVazia()); // linha 2 espacador

// Linha 3: cabecalho
const linhaCabecalho = linhaVazia();
const nomesColunas = [
  'Campanha', 'Título na Campanha', 'SKU', 'Catálogo Clássico', 'Status Catálogo Clássico',
  'Catálogo Premium', 'Status Catálogo Premium', 'Depósito (un)', 'FULL (un)',
  'Qualidade do anúncio', 'Experiência', 'Status do Produto', 'Status na Campanha',
];
nomesColunas.forEach((nome, i) => setDado(linhaCabecalho, i, nome));
linhasGrid.push(linhaCabecalho);
linhasGrid.push(linhaVazia()); // linha 4 espacador

const posGrupos = [];
let linhaAtual = 5;
for (const grupo of grupos) {
  const linhaInicio = linhaAtual;
  let primeira = true;
  for (const item of grupo.linhas) {
    const row = linhaVazia();
    if (primeira) {
      setDado(row, 0, grupo.campanha);
      setDado(row, 1, grupo.titulo);
    }
    setDado(row, 2, item.sku);
    setDado(row, 3, item.catalogoClassico);
    setDado(row, 4, item.statusClassico);
    setDado(row, 5, item.catalogoPremium);
    setDado(row, 6, item.statusPremium);
    setDado(row, 7, item.deposito);
    setDado(row, 8, item.full);
    setDado(row, 9, item.qualidade);
    setDado(row, 10, item.experiencia);
    setDado(row, 11, item.statusProduto);
    setDado(row, 12, 'Pausado');
    linhasGrid.push(row);
    linhasGrid.push(linhaVazia());
    linhaAtual += 2;
    primeira = false;
  }
  const linhaFim = linhaAtual - 2;
  posGrupos.push({ inicio: linhaInicio, fim: linhaFim });
}

const ultimaLinha = 4 + totalSkus * 2;
console.error(`Ultima linha do grid: ${ultimaLinha} (linhasGrid.length=${linhasGrid.length})`);

const tsv = linhasGrid.map(row => row.join('\t')).join('\n');
fs.writeFileSync(path.resolve(__dirname, '_sheets_bloco_25col.tsv'), tsv, { encoding: 'utf8' });
fs.writeFileSync(path.resolve(__dirname, '_sheets_merges_25col.json'), JSON.stringify({ ultimaLinha, posGrupos }, null, 2));
console.error('Arquivos gerados: _sheets_bloco_25col.tsv, _sheets_merges_25col.json');
