const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

// Testar na campanha BAIXA PERFORMANCE -- mais provavel ter produtos pausados de verdade
const URL_CAMPANHA = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358247429/dashboard?navigate_to=mercado_ads';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_CAMPANHA);

    let texto = '';
    for (let t = 0; t < 8; t++) {
      await page.waitForTimeout(1500);
      texto = await page.locator('body').innerText();
      if (texto.length > 500) break;
    }
    for (let t = 0; t < 6; t++) { await page.mouse.wheel(0, 1000); await page.waitForTimeout(600); }

    // Inspecionar todos os elementos clicaveis perto do texto "Pausados"
    const candidatos = await page.locator('*').evaluateAll((els) =>
      els.filter((el) => el.textContent && el.textContent.trim() === 'Pausados' && el.children.length === 0)
         .map((el) => ({ tag: el.tagName, classe: el.className, role: el.getAttribute('role'), ariaSelected: el.getAttribute('aria-selected') }))
    );
    console.log('--- Elementos com texto exato "Pausados" ---');
    console.log(JSON.stringify(candidatos, null, 2));

    const botao = page.locator('*', { hasText: /^Pausados$/ }).last();
    const count = await page.locator('text="Pausados"').count();
    console.log('Contagem de elementos com texto Pausados:', count);

    // Clicar no elemento exato de texto "Pausados"
    const el = page.getByText('Pausados', { exact: true }).first();
    if (await el.count() > 0) {
      await el.click();
      console.log('Clicou em Pausados (exact match)');
      await page.waitForTimeout(3000);
    }

    const textoDepois = await page.locator('body').innerText();
    const idxContador = textoDepois.indexOf('anúncios patrocinados');
    console.log('\n--- Contador apos clique ---');
    console.log(textoDepois.slice(Math.max(0, idxContador-100), idxContador+100));
    console.log('\nURL apos clique:', page.url());
    console.log('PAUSADO count:', (textoDepois.match(/PAUSADO/gi) || []).length);

    const idxPausado = textoDepois.indexOf('PAUSADO');
    console.log('\n--- Contexto ao redor do 1o PAUSADO (400 antes, 200 depois) ---');
    console.log(textoDepois.slice(Math.max(0, idxPausado - 400), idxPausado + 200));

    console.log('\n\n--- SKU aparece nessa lista? ---');
    console.log('Ocorrencias de "SKU ":', (textoDepois.match(/SKU\s+\S+/g) || []).length);
    const idxSku = textoDepois.indexOf('SKU ');
    if (idxSku !== -1) console.log(textoDepois.slice(Math.max(0,idxSku-200), idxSku+100));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
