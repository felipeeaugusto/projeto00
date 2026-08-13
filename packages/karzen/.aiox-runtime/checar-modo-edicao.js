const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    // Procurar o seletor de modo (Edicao/Sugestao/Visualizacao) -- geralmente um botao/menu
    // perto do canto superior direito com texto "Edicao", "Sugerindo" ou "Visualizando"
    const candidatos = await page.locator('text=/Ediç[aã]o|Sugerindo|Visualizando|Editing|Suggesting|Viewing/i').all();
    console.log(`Elementos com texto de modo encontrados: ${candidatos.length}`);
    for (const el of candidatos) {
      const texto = await el.innerText().catch(() => null);
      const visible = await el.isVisible().catch(() => false);
      console.log(`  texto="${texto}" visible=${visible}`);
    }

    // Tambem checar se ha algum aviso "somente leitura" ou "protegido"
    const bodyText = await page.locator('body').innerText();
    console.log('\nContem "protegid"?', bodyText.toLowerCase().includes('protegid'));
    console.log('Contem "somente leitura"?', bodyText.toLowerCase().includes('somente leitura'));
    console.log('Contem "sugerindo"?', bodyText.toLowerCase().includes('sugerindo'));
    console.log('Contem "visualizando"?', bodyText.toLowerCase().includes('visualizando'));
    console.log('Contem "modo"?', bodyText.toLowerCase().includes('modo'));

    // Mostrar um trecho perto de onde aparece "Ediç" se houver
    const idx = bodyText.search(/Ediç[aã]o|Sugerindo|Visualizando/i);
    if (idx !== -1) {
      console.log('\nContexto encontrado:', bodyText.slice(Math.max(0, idx - 50), idx + 100));
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
