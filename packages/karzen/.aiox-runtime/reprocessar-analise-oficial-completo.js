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

const METODO_VERSAO = '2026-08-18-v1';

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_ADS = 'https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads';
// Confirmado no documento (Passo B, 11/08/2026): placeholder exato, prefixo "MLB" obrigatório.
const SELETOR_BUSCA_ADS = 'input[placeholder="Procurar por # ou título"]';

const ARQUIVO_FONTE = 'C:\\Downloads\\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx';
const ABA_FONTE = 'SEM CAMPANHA';
const COL_ITEM_ID = 3;

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

// Passo A.2 (Título de catálogo) + Passo B (Status em Ads) -- upgrade da versão antiga
// (pipeline-lote-25-91.js, buscarTituloEStatusComPolling) trocando polling com tempo fixo
// por esperarTextoEstabilizar, conforme REGRA GERAL OBRIGATÓRIA do documento.
async function buscarTituloEStatusEmAds(pageAds, mlb) {
  const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
  if (await fecharDrawer.count() > 0) {
    await fecharDrawer.first().click().catch(() => {});
  }
  const campo = pageAds.locator(SELETOR_BUSCA_ADS).first();
  await campo.click();
  await campo.fill('');
  await campo.fill(`MLB${mlb}`);
  await pageAds.keyboard.press('Enter');

  const texto = await esperarTextoEstabilizar(pageAds, {
    validarConteudo: (t) => t.includes('CATÁLOGO') || t.includes('Sem Campanha'),
  });

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

async function processarLinha(pageAnuncios, pageAds, context, itemId, linha) {
  const sku = await acharSkuDoMlb(pageAnuncios, itemId);
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
  const { titulo, statusAds } = await buscarTituloEStatusEmAds(pageAds, mlbReferencia);

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

    let pageAnuncios = context.pages().find((p) => /mercadolivre\.com\.br\/anuncios#/.test(p.url()));
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    let pageAds = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br'));
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);

    let processadosNestaRodada = 0;
    for (const item of itens) {
      const chave = `linha-${item.row}`;
      const existente = resultados[chave];
      if (existente && existente.metodoVersao === METODO_VERSAO) {
        console.log(`[linha ${item.row}] já processada com o método atual -- pulando`);
        continue;
      }

      console.log(`\n=== LINHA ${item.row} (Item ID ${item.itemId}) ===`);
      try {
        const r = await processarLinha(pageAnuncios, pageAds, context, item.itemId, item.row);
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
  } catch (err) {
    console.error('ERRO GERAL:', err.message);
  } finally {
    if (browser) await browser.close();
  }
  process.exit(0);
}

main();
