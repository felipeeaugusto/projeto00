// Continuacao do pipeline: A.2 (Titulo/Deposito/FULL/Status) + B (Ads) + C (colorir tudo).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_ADS = 'https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads';
const SELETOR_BUSCA_ANUNCIOS = 'input[placeholder="Buscar por título, código ou SKU"]';
const SELETOR_BUSCA_ADS = 'input[placeholder="Procurar por # ou título"]';

const dados = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pipeline-teste-resultado.json'), 'utf8'));
const SKU = dados.sku;
const MLB_CLASSICO = dados.catalogoConfirmado['Clássico'];
const MLB_PREMIUM = dados.catalogoConfirmado['Premium'];

(async () => {
  let browser;
  const resultado = { ...dados, a2: {}, statusAds: null };
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    // PASSO A.2 -- Deposito/FULL/Status do Produto, da aba Anuncios (ja buscada por SKU)
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    const campo = page.locator(SELETOR_BUSCA_ANUNCIOS).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2800);
    const textoAnuncios = await page.locator('body').innerText();

    for (const [rotulo, mlb] of [['Clássico', MLB_CLASSICO], ['Premium', MLB_PREMIUM]]) {
      if (!mlb) continue;
      const idx = textoAnuncios.indexOf(`#${mlb}`);
      const bloco = textoAnuncios.slice(idx, idx + 700);
      const fullMatch = bloco.match(/Full:\s*\n\s*([^\n]+)/);
      const depositoMatch = bloco.match(/Depósito:\s*\n\s*([^\n]+)/);
      const inativoMatch = /Inativo sem estoque/.test(bloco);
      resultado.a2[rotulo] = {
        mlb,
        full: fullMatch ? fullMatch[1].trim() : null,
        deposito: depositoMatch ? depositoMatch[1].trim() : null,
        statusProduto: inativoMatch ? 'Pausado' : 'Ativo',
      };
      console.log(`A.2 [${rotulo}] MLB ${mlb}: Full=${resultado.a2[rotulo].full} | Depósito=${resultado.a2[rotulo].deposito} | Status=${resultado.a2[rotulo].statusProduto}`);
    }

    // Titulo de catalogo -- aba Anuncios Patrocinados, buscar qualquer um dos MLBs confirmados
    let pageAds = context.pages().find((p) => p.url().includes('ads.mercadolivre.com.br'));
    if (!pageAds) pageAds = await openBackgroundPage(browser, context, URL_ADS);
    await pageAds.waitForTimeout(1000);
    const fecharDrawer = pageAds.locator('button[aria-label="Cerrar"]');
    if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await pageAds.waitForTimeout(400); }

    const mlbParaTitulo = MLB_CLASSICO || MLB_PREMIUM;
    const campoAds = pageAds.locator(SELETOR_BUSCA_ADS).first();
    await campoAds.click();
    await campoAds.fill('');
    await campoAds.fill(`MLB${mlbParaTitulo}`);
    await pageAds.keyboard.press('Enter');
    await pageAds.waitForTimeout(3000);
    const textoAds = await pageAds.locator('body').innerText();
    const idxCat = textoAds.indexOf('CATÁLOGO');
    const blocoCat = textoAds.slice(idxCat, idxCat + 300);
    const linhasCat = blocoCat.split('\n').map(l => l.trim()).filter(Boolean);
    const idxOrigem = linhasCat.findIndex(l => l.includes('ORIGEM'));
    const tituloCatalogo = idxOrigem !== -1 ? linhasCat[idxOrigem + 1] : null;
    resultado.tituloCatalogo = tituloCatalogo;
    console.log('Título de catálogo:', tituloCatalogo);

    // PASSO B -- status em Ads (Campanha / PAUSADO)
    const idxSemCampanha = textoAds.indexOf('Sem Campanha');
    let statusAds;
    if (idxSemCampanha !== -1 && Math.abs(idxSemCampanha - idxCat) < 500) {
      statusAds = 'Sem Campanha';
    } else {
      const temPausado = await pageAds.evaluate(() => {
        const els = Array.from(document.querySelectorAll('*'));
        return els.some(el => el.children.length === 0 && el.textContent.trim() === 'PAUSADO' && el.offsetParent !== null);
      });
      statusAds = temPausado ? 'Pausada' : 'Ativa';
    }
    resultado.statusAds = statusAds;
    console.log('Passo B -- Status em Ads:', statusAds);

    fs.writeFileSync(path.resolve(__dirname, 'pipeline-teste-resultado.json'), JSON.stringify(resultado, null, 2));
    console.log('\nSalvo.');
  } catch (err) {
    console.error('ERRO GERAL:', err.message, err.stack);
  } finally {
    if (browser) {
      await minimizeChrome();
      await browser.close();
    }
  }
  process.exit(0);
})();
