const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código o SKU"]';
const SELETOR_BUSCA2 = 'input[placeholder="Buscar por título, código ou SKU"]';
const MLB = '4719874527'; // MPN-01-BF-127V Classico, ja confirmado funcional hoje

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    let campo = page.locator(SELETOR_BUSCA2).first();
    console.log('Selector2 encontrado?', await campo.count());
    if (await campo.count() === 0) campo = page.locator(SELETOR_BUSCA).first();
    console.log('Selector1 encontrado?', await page.locator(SELETOR_BUSCA).count());

    const fecharDrawer = page.locator('button[aria-label="Cerrar"]');
    if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await page.waitForTimeout(500); }

    await campo.click();
    await campo.fill('');
    await campo.fill(MLB);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    let texto = await page.locator('body').innerText();
    const idxContador = texto.search(/\d+\s+an[uú]ncios?/);
    console.log('Contador de anuncios apos busca:', idxContador !== -1 ? texto.slice(idxContador, idxContador+20) : '(nao achou)');
    console.log('Qualidade ocorrencias:', (texto.match(/Qualidade/gi) || []).length);
    console.log('Experiencia ocorrencias:', (texto.match(/Experi[eê]ncia/gi) || []).length);

    const idxHeader = texto.indexOf('Status e recomendações');
    console.log('\n--- Do header da tabela ate 2500 chars depois ---');
    console.log(texto.slice(idxHeader, idxHeader + 2500));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
