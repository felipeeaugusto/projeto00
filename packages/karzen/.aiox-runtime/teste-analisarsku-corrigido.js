// Teste isolado (so leitura, nao escreve planilha) do analisarSku() reescrito, contra
// o gabarito manual validado com o Felipe: SKU WW2-220V.
// Gabarito esperado:
//   #4639741851 Classico GANHANDO (explicito)
//   #4653317905 Premium PERDENDO (via preco -- Opcao 2 bate com R$726,56)
//   #4653317901 Premium PAI (descartar)
//   #6680169332 Classico PAI (descartar)
const path = require('path');
const { chromium } = require('playwright');
const { analisarSku, URL_ANUNCIOS } = require(path.resolve(__dirname, 'pipeline-pausados-campanha-completo.js'));
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const GABARITO = {
  '4639741851': { condicao: 'Clássico', statusCatalogo: 'GANHANDO' },
  '4653317905': { condicao: 'Premium', statusCatalogo: 'PERDENDO' },
  '4653317901': { condicao: 'Premium', statusCatalogo: null }, // pai
  '6680169332': { condicao: 'Clássico', statusCatalogo: null }, // pai
};

(async () => {
  let browser;
  let pageAnuncios;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);

    const resultado = await analisarSku(pageAnuncios, context, 'WW2-220V');
    console.log('=== todosMlbsSincronizados ===');
    console.log(resultado.todosMlbsSincronizados);
    console.log('\n=== mlbs (detalhado) ===');
    console.log(JSON.stringify(resultado.mlbs, null, 2));

    console.log('\n\n=== COMPARACAO COM GABARITO ===');
    let tudoBateu = true;
    for (const [mlb, esperado] of Object.entries(GABARITO)) {
      const real = resultado.mlbs[mlb];
      if (!real) { console.log(`MLB ${mlb}: NAO ENCONTRADO NO RESULTADO -- FALHA`); tudoBateu = false; continue; }
      const condOk = real.condicao === esperado.condicao;
      const statusOk = real.statusCatalogo === esperado.statusCatalogo;
      const ok = condOk && statusOk;
      if (!ok) tudoBateu = false;
      console.log(`MLB ${mlb}: condicao=${real.condicao} (esperado ${esperado.condicao}, ${condOk ? 'OK' : 'FALHA'}) | statusCatalogo=${real.statusCatalogo} (esperado ${esperado.statusCatalogo}, ${statusOk ? 'OK' : 'FALHA'})`);
    }
    console.log(`\n${tudoBateu ? '✅ TODOS OS 4 MLBs BATERAM COM O GABARITO' : '❌ ALGUM MLB NAO BATEU -- VER DETALHES ACIMA'}`);

    await pageAnuncios.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (pageAnuncios) await pageAnuncios.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
