const path = require('path');
const { chromium } = require('playwright');
const { analisarSku, URL_ANUNCIOS } = require(path.resolve(__dirname, 'pipeline-pausados-campanha-completo.js'));

const SKUS = ['MCT-25MM-BIV', 'MCT-19MM-BIV', 'MCT-32MM-BIV'];

(async () => {
  let browser;
  let pageAnuncios;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    // Correcao (16/08/2026): url().includes(...) generico bate tambem em abas de detalhe
    // profundas deixadas abertas de investigacoes anteriores na mesma sessao -- precisa
    // bater exatamente na aba de LISTAGEM (URL_ANUNCIOS). Ver BLOCO 0-AA.
    pageAnuncios = context.pages().find(p => p.url() === URL_ANUNCIOS);
    if (!pageAnuncios) { console.log('Aba de anuncios nao encontrada'); process.exit(1); }

    const resultados = {};
    for (const sku of SKUS) {
      console.log(`\n\n########## SKU ${sku} ##########`);
      const analise = await analisarSku(pageAnuncios, context, sku);
      console.log(JSON.stringify(analise, null, 2));
      resultados[sku] = analise;
    }

    require('fs').writeFileSync(path.resolve(__dirname, 'taiff-curves-analise-completa.json'), JSON.stringify(resultados, null, 2));
    console.log('\n\nSalvo em taiff-curves-analise-completa.json');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    // Nao minimiza/fecha aqui de proposito -- Felipe pediu pra manter so as 3 abas ativas
  }
  process.exit(0);
})();
