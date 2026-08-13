const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

// Os 4 MLBs do drawer ainda nao identificados (2 ja confirmados como SPANK-R-127V)
const MLBS_RESTANTES = ['6936159966', '6929634636', '6936159960', '4753918477'];

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(2000);

    const skusJaVistos = {};

    for (const mlb of MLBS_RESTANTES) {
      console.log(`\n=== MLB ${mlb} ===`);
      const fecharDrawer = page.locator('button[aria-label="Cerrar"]');
      if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await page.waitForTimeout(400); }

      const campo = page.locator(SELETOR_BUSCA).first();
      await campo.click();
      await campo.fill('');
      await campo.fill(mlb);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2800);

      const texto = await page.locator('body').innerText();
      const idxSku = texto.indexOf('SKU ');
      if (idxSku === -1) { console.log('  SKU nao encontrado (busca direta falhou)'); continue; }
      const m = texto.slice(idxSku, idxSku + 60).match(/SKU\s+(\S+)/);
      const sku = m ? m[1] : null;
      console.log('  SKU:', sku);

      if (sku && skusJaVistos[sku]) {
        console.log(`  (SKU ${sku} ja identificado antes, via MLB ${skusJaVistos[sku]})`);
        continue;
      }
      if (sku) skusJaVistos[sku] = mlb;

      const idxMlb = texto.indexOf(`#${mlb}`);
      const bloco = texto.slice(idxMlb, idxMlb + 400);
      const sincMatch = bloco.match(/Sincronizado com (#\d+(?:,\s*#\d+)*)/);
      console.log('  Sincronizado com:', sincMatch ? sincMatch[1] : '(nenhum -- unico MLB desse SKU)');
    }

    console.log('\n\nRESUMO -- SKUs unicos encontrados:', JSON.stringify(skusJaVistos, null, 2));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
