// Diagnostico: abre o dropdown do MLB #4653317905 (SKU WW2-220V) e lista TODOS os
// links "Alterar" existentes na pagina nesse momento, com href e se estao visiveis,
// pra descobrir qual e o certo. So leitura.
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

    const todosLinks = page.locator('a', { hasText: 'Alterar' });
    const qtd = await todosLinks.count();
    console.log(`Total de links com texto "Alterar" na pagina agora: ${qtd}`);
    for (let i = 0; i < qtd; i++) {
      const el = todosLinks.nth(i);
      const href = await el.getAttribute('href').catch(() => null);
      const visivel = await el.isVisible().catch(() => false);
      const texto = await el.innerText().catch(() => '');
      const box = await el.boundingBox().catch(() => null);
      console.log(`[${i}] visivel=${visivel} texto="${texto}" href=${href} box=${JSON.stringify(box)}`);
    }

    await page.keyboard.press('Escape');
    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
    if (page) await page.close().catch(() => {});
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
