// Teste direcionado pra correcao de 16/08/2026 (limite adicional de "Selecionar
// anúncio\n{titulo}\n{titulo}" no blocoMlb). Reprocessa SKU CHTMINI-BIV isolada e
// confere o trio de MLBs que travou o pipeline (produto 13/13, task bipo5dirk).
const path = require('path');
const { chromium } = require('playwright');
const { analisarSku } = require(path.resolve(__dirname, 'pipeline-pausados-campanha-completo.js'));

// Correcao 16/08/2026: a expectativa "RESTRITO PARA GANHAR" pro 5247646674 estava
// ERRADA -- vinha de scripts de diagnostico contaminados (seletor de busca genérico
// pegando o campo errado). O valor real, confirmado por 3 fontes independentes
// (pipeline original, este teste com o pipeline corrigido, e screenshots reais do
// Felipe), e GANHANDO.
const ESPERADO = {
  '5247646674': 'GANHANDO',
  '5247671694': 'PERDENDO',             // ja confirmado pelo Felipe hoje -- nao pode regredir
  '4658272945': null,                    // ainda nao verificado de forma independente -- so reportar
};

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const pageAnuncios = context.pages().find(p => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!pageAnuncios) { console.log('Aba de anuncios nao encontrada'); process.exit(1); }

    console.log('Analisando SKU CHTMINI-BIV (6 MLBs, trio de catalogo confirmado)...');
    const analise = await analisarSku(pageAnuncios, context, 'CHTMINI-BIV');
    console.log(JSON.stringify(analise, null, 2));

    require('fs').writeFileSync(path.resolve(__dirname, 'chtmini-3-catalogos-resultado.json'), JSON.stringify(analise, null, 2));

    console.log('\n\n===== CONFERENCIA DO TRIO =====');
    let algumaFalha = false;
    for (const [mlb, esperado] of Object.entries(ESPERADO)) {
      const dado = analise.mlbs[mlb];
      const real = dado ? dado.statusCatalogo : 'MLB NAO ENCONTRADO';
      if (esperado === null) {
        console.log(`MLB ${mlb}: statusCatalogo=${real} (sem expectativa previa -- so reportando, verificar manualmente se parecer estranho)`);
      } else {
        const ok = real === esperado;
        if (!ok) algumaFalha = true;
        console.log(`MLB ${mlb}: statusCatalogo=${real} | esperado=${esperado} | ${ok ? 'OK' : '❌ DIVERGENTE'}`);
      }
    }
    console.log(algumaFalha ? '\n❌ HÁ DIVERGÊNCIA -- NÃO considerar a correção validada.' : '\n✅ Trio bate com o esperado (exceto o MLB sem expectativa previa, que so foi reportado).');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  }
  process.exit(0);
})();
