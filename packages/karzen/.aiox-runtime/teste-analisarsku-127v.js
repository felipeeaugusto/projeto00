// Segundo teste isolado: SKU WW2-127V. Gabarito manual validado:
//   #6796950300 Classico PERDENDO (explicito)
//   #6796952512 Premium PERDENDO (explicito)
//   #6796916178 Classico PAI (descartar)
//   #6796918550 Premium PAI (descartar)
const path = require('path');
const { chromium } = require('playwright');
const { analisarSku, URL_ANUNCIOS } = require(path.resolve(__dirname, 'pipeline-pausados-campanha-completo.js'));
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const GABARITO = {
  '6796950300': { condicao: 'Clássico', catalogo: true },
  '6796952512': { condicao: 'Premium', catalogo: true },
  '6796916178': { condicao: 'Clássico', catalogo: false },
  '6796918550': { condicao: 'Premium', catalogo: false },
};

(async () => {
  let browser;
  let pageAnuncios;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);

    const resultado = await analisarSku(pageAnuncios, context, 'WW2-127V');
    console.log(JSON.stringify(resultado.mlbs, null, 2));

    console.log('\n=== COMPARACAO ===');
    let ok = true;
    for (const [mlb, esperado] of Object.entries(GABARITO)) {
      const real = resultado.mlbs[mlb];
      if (!real) { console.log(`MLB ${mlb}: NAO ENCONTRADO`); ok = false; continue; }
      const ehCatalogo = !!real.statusCatalogo;
      const condOk = real.condicao === esperado.condicao;
      const catOk = ehCatalogo === esperado.catalogo;
      if (!condOk || !catOk) ok = false;
      console.log(`MLB ${mlb}: condicao=${real.condicao} (${condOk?'OK':'FALHA'}) | catalogo=${ehCatalogo} esperado=${esperado.catalogo} (${catOk?'OK':'FALHA'}) | statusCatalogo=${real.statusCatalogo}`);
    }
    console.log(ok ? '\n✅ TUDO BATEU' : '\n❌ ALGO FALHOU');

    await pageAnuncios.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (pageAnuncios) await pageAnuncios.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
