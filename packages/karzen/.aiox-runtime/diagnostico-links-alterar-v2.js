// Diagnostico v2: acha TODO elemento visivel com texto "Alterar" (qualquer tag),
// nao so <a>. Depois testa clicar nele e ver pra onde navega de verdade.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-220V';
const MLB_TESTE = '4653317905';

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1200);

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await rolarPagina(page, 12);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const elExato = page.getByText(`#${MLB_TESTE}`, { exact: true }).first();
    const linhaCard = elExato.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').last();
    const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
    await botao3pontos.click();
    await page.waitForTimeout(1000);

    // Qualquer elemento visivel, qualquer tag, com texto EXATO "Alterar"
    const candidatos = page.getByText('Alterar', { exact: true });
    const qtd = await candidatos.count();
    console.log(`Total de elementos com texto exato "Alterar": ${qtd}`);
    for (let i = 0; i < qtd; i++) {
      const el = candidatos.nth(i);
      const visivel = await el.isVisible().catch(() => false);
      const tag = await el.evaluate(e => e.tagName).catch(() => '?');
      const href = await el.getAttribute('href').catch(() => null);
      const box = await el.boundingBox().catch(() => null);
      console.log(`[${i}] tag=${tag} visivel=${visivel} href=${href} box=${JSON.stringify(box)}`);
    }

    // Clicar no primeiro visivel e ver pra onde a pagina vai (nova aba ou navegacao)
    const visiveisIdx = [];
    for (let i = 0; i < qtd; i++) {
      if (await candidatos.nth(i).isVisible().catch(() => false)) visiveisIdx.push(i);
    }
    console.log('Indices visiveis:', visiveisIdx);

    if (visiveisIdx.length > 0) {
      const alvo = candidatos.nth(visiveisIdx[0]);
      const [novaPagina] = await Promise.all([
        context.waitForEvent('page', { timeout: 8000 }).catch(() => null),
        alvo.click(),
      ]);
      await page.waitForTimeout(2000);
      if (novaPagina) {
        await novaPagina.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
        console.log('Abriu NOVA aba, URL:', novaPagina.url());
        await novaPagina.close();
      } else {
        console.log('Nao abriu nova aba. URL da pagina atual agora:', page.url());
      }
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (page) await page.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
