// Monta o bloco de dados (TSV) igual a estrutura ja validada no Excel local:
// banner (linha1) + espacador + cabecalho (linha3) + espacador + dados (linha5+)
// com espacadores entre cada SKU (inclusive do mesmo produto).
const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pausados-campanha-resultado.json'), 'utf8'));

const NUM_COLS = 13;

function linhaVazia() {
  return new Array(NUM_COLS).fill('');
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
// Linha 1: banner
linhasGrid.push(['⚠ Dados em validação — aguardando confirmação final', ...new Array(NUM_COLS - 1).fill('')]);
// Linha 2: espacador
linhasGrid.push(linhaVazia());
// Linha 3: cabecalho
linhasGrid.push([
  'Campanha', 'Título na Campanha', 'SKU', 'Catálogo Clássico', 'Status Catálogo Clássico',
  'Catálogo Premium', 'Status Catálogo Premium', 'Depósito (un)', 'FULL (un)',
  'Qualidade do anúncio', 'Experiência', 'Status do Produto', 'Status na Campanha',
]);
// Linha 4: espacador
linhasGrid.push(linhaVazia());

// Registrar posicoes dos grupos (linha inicial/final, base 1 = linha 1 do grid)
const posGrupos = [];
let linhaAtual = 5; // 1-indexed, correspondendo a A5 na planilha
for (const grupo of grupos) {
  const linhaInicio = linhaAtual;
  let primeira = true;
  for (const item of grupo.linhas) {
    const row = linhaVazia();
    row[0] = primeira ? grupo.campanha : '';
    row[1] = primeira ? grupo.titulo : '';
    row[2] = item.sku;
    row[3] = item.catalogoClassico;
    row[4] = item.statusClassico;
    row[5] = item.catalogoPremium;
    row[6] = item.statusPremium;
    row[7] = item.deposito;
    row[8] = item.full;
    row[9] = item.qualidade;
    row[10] = item.experiencia;
    row[11] = item.statusProduto;
    row[12] = 'Pausado';
    linhasGrid.push(row);
    linhasGrid.push(linhaVazia()); // espacador
    linhaAtual += 2;
    primeira = false;
  }
  const linhaFim = linhaAtual - 2;
  posGrupos.push({ inicio: linhaInicio, fim: linhaFim });
}

const ultimaLinha = 4 + totalSkus * 2;
console.error(`Ultima linha do grid: ${ultimaLinha} (linhasGrid.length=${linhasGrid.length})`);

const tsv = linhasGrid.map(row => row.join('\t')).join('\n');
fs.writeFileSync(path.resolve(__dirname, '_sheets_bloco.tsv'), tsv, { encoding: 'utf8' });
fs.writeFileSync(path.resolve(__dirname, '_sheets_merges.json'), JSON.stringify({ ultimaLinha, posGrupos }, null, 2));
console.error('Arquivos gerados: _sheets_bloco.tsv, _sheets_merges.json');
