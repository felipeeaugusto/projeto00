// Extrator corrigido (12/08/2026): separa por opcao de venda real (cada uma termina
// em "Pausar anuncio"), associa MLB->condicao->status, e so aceita GANHANDO/PERDENDO/
// COMPARTILHANDO como status de catalogo valido -- nao usa mais "Ativa/Inativa".

function extrairOpcoesDeCatalogo(blocoTexto, skuAlvo) {
  // Divide o bloco inteiro em "cards" usando "SKU <valor>" como ancora de inicio de cada um,
  // e o proprio numero de MLBs (linhas #digitos logo antes do SKU) como delimitador.
  const linhas = blocoTexto.split('\n').map((l) => l.trim());
  const cardsInfo = [];
  for (let i = 0; i < linhas.length; i++) {
    if (/^SKU\s+/i.test(linhas[i])) {
      const sku = linhas[i].replace(/^SKU\s+/i, '').trim();
      let j = i - 1;
      const mlbs = [];
      while (j >= 0 && /^#\d{7,11}$/.test(linhas[j])) { mlbs.unshift(linhas[j].replace('#','')); j--; }
      if (mlbs.length === 0) continue; // linha "SKU X" duplicada (sem MLBs logo acima) -- nao e um card novo
      cardsInfo.push({ sku, mlbs, inicioLinha: i });
    }
  }

  const resultados = []; // { mlb, condicao, status, statusTexto }
  for (let c = 0; c < cardsInfo.length; c++) {
    const card = cardsInfo[c];
    if (card.sku !== skuAlvo) continue;
    const fimLinha = c + 1 < cardsInfo.length ? cardsInfo[c+1].inicioLinha - 4 : linhas.length;
    const textoCard = linhas.slice(card.inicioLinha, fimLinha).join('\n');

    // Cada opcao de venda termina em "Pausar anúncio"
    const opcoesTexto = textoCard.split('Pausar anúncio');
    let mlbIdx = 0;
    for (const opcaoTexto of opcoesTexto) {
      const condMatch = opcaoTexto.match(/\b(Clássico|Premium)\b/);
      if (!condMatch) continue;
      const condicao = condMatch[1];
      // "Restrito para ganhar" tambem conta como MLB de catalogo confirmado -- so significa
      // que a Experiencia de compra do vendedor (ex: 30) esta baixa demais pra disputar
      // catalogo com outros vendedores, nao que o MLB deixou de ser catalogo (12/08/2026).
      const gpcMatch = opcaoTexto.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/i);
      const status = gpcMatch ? gpcMatch[1].toUpperCase() : null;
      const mlb = card.mlbs[mlbIdx] || null;
      resultados.push({ mlb, condicao, status });
      mlbIdx++;
    }
  }
  return resultados;
}

module.exports = { extrairOpcoesDeCatalogo };

// Teste standalone se rodado direto
if (require.main === module) {
  const { chromium } = require('playwright');
  const path = require('path');
  const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
  const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

  const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
  const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
  const SKU = 'HQ-264CVEFFX-127V';

  (async () => {
    let browser;
    try {
      browser = await chromium.connectOverCDP('http://localhost:9222');
      const context = browser.contexts()[0];
      let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
      if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
      await page.waitForTimeout(1000);

      const campo = page.locator(SELETOR_BUSCA).first();
      await campo.click();
      await campo.fill('');
      await campo.fill(SKU);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000);

      const texto = await page.locator('body').innerText();
      const idxFiltrar = texto.indexOf('Filtrar e ordenar');
      const idxRodape = texto.indexOf('Você recebeu');
      const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 5000);

      const resultados = extrairOpcoesDeCatalogo(bloco, SKU);
      console.log(JSON.stringify(resultados, null, 2));
    } catch (err) {
      console.error('ERRO:', err.message);
    } finally {
      if (browser) {
        await minimizeChrome();
        await browser.close();
      }
    }
    process.exit(0);
  })();
}
