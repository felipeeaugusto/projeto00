// Teste isolado do bug corrigido: reprocessa SO a Sanduicheira Kian Panini Linea Eletro
// (3 SKUs ja conhecidos) e confere contra o que o Felipe ja validou manualmente,
// ANTES de arriscar o rerun completo de ~52 minutos nas 7 campanhas.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { analisarSku, URL_ANUNCIOS } = require('./pipeline-pausados-campanha-completo.js');

const SKUS_TESTE = [
  { sku: 'SPANK-R-127V', esperado: { statusCatalogo: 'PERDENDO' } },
  { sku: 'SPANK-R-220V', esperado: { statusCatalogo: null, statusProduto: 'Pausado' } },
  { sku: 'SPANK-127V', esperado: { statusCatalogo: 'GANHANDO' } },
];

(async () => {
  let browser;
  let pageAnuncios;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    pageAnuncios = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);

    let todosBateram = true;

    for (const teste of SKUS_TESTE) {
      console.log(`\n=== Testando SKU: ${teste.sku} ===`);
      const analise = await analisarSku(pageAnuncios, context, teste.sku);
      console.log('MLBs sincronizados:', analise.todosMlbsSincronizados);

      for (const [mlb, dados] of Object.entries(analise.mlbs)) {
        console.log(`  MLB ${mlb}: condicao=${dados.condicao} statusCatalogo=${dados.statusCatalogo} statusProduto=${dados.statusProduto} deposito=${dados.deposito} full=${dados.full}`);
      }

      // Pegar o status do MLB de catalogo confirmado (Classico ou Premium, o primeiro encontrado)
      const catalogo = { Classico: null, Premium: null };
      for (const [mlbId, dados] of Object.entries(analise.mlbs)) {
        if (dados.statusCatalogo && dados.condicao) {
          const chave = dados.condicao === 'Clássico' ? 'Classico' : 'Premium';
          if (!catalogo[chave]) catalogo[chave] = mlbId;
        }
      }
      const mlbRef = catalogo.Classico || catalogo.Premium || analise.todosMlbsSincronizados[0];
      const dadosRef = analise.mlbs[mlbRef] || {};

      const statusEncontrado = dadosRef.statusCatalogo || null;
      const statusProdutoEncontrado = dadosRef.statusProduto || null;

      console.log(`  >> Status catalogo (MLB referencia ${mlbRef}): ${statusEncontrado}`);
      console.log(`  >> Status produto: ${statusProdutoEncontrado}`);
      console.log(`  >> Esperado:`, JSON.stringify(teste.esperado));

      let bateu = true;
      if ('statusCatalogo' in teste.esperado && teste.esperado.statusCatalogo !== statusEncontrado) bateu = false;
      if ('statusProduto' in teste.esperado && teste.esperado.statusProduto !== statusProdutoEncontrado) bateu = false;

      console.log(`  >> RESULTADO: ${bateu ? 'BATEU' : 'NAO BATEU'}`);
      if (!bateu) todosBateram = false;
    }

    console.log(`\n\n>>>>> TESTE GERAL: ${todosBateram ? 'TODOS OS 3 SKUS BATERAM -- PODE PROSSEGUIR PRO RERUN COMPLETO' : 'FALHOU -- NAO PROSSEGUIR, INVESTIGAR ANTES'} <<<<<`);
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
