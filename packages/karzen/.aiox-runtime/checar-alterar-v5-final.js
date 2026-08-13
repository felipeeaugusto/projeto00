// v5: usa indice posicional do botao (comprovado certo via screenshot) + varias
// estrategias de locator pro item "Alterar" pra achar qual funciona, testa e clica.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'WW2-220V';
const INDICE = 1;
const MLB_ESPERADO = '4653317905';

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

    const todosBotoes = page.locator('button[aria-label="Ações secundárias"]');
    const botaoAlvo = todosBotoes.nth(INDICE);
    await botaoAlvo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await botaoAlvo.click();
    await page.waitForTimeout(1200);

    await page.screenshot({ path: path.resolve(__dirname, 'v5-antes-estrategias.png'), fullPage: false });
    console.log('Screenshot antes das estrategias salvo.');

    // Testar varias estrategias
    const estrategias = {
      'text= exato (quotes)': page.locator('text="Alterar"'),
      'getByText exact': page.getByText('Alterar', { exact: true }),
      'getByRole menuitem': page.getByRole('menuitem', { name: 'Alterar' }),
      'getByRole link': page.getByRole('link', { name: 'Alterar', exact: true }),
      'getByRole button': page.getByRole('button', { name: 'Alterar', exact: true }),
      'css *:has-text exato': page.locator('*').filter({ hasText: /^Alterar$/ }),
    };
    for (const [nome, loc] of Object.entries(estrategias)) {
      const c = await loc.count().catch((e) => `erro:${e.message}`);
      console.log(`Estrategia "${nome}": ${c}`);
    }

    // Usar a que deu certo: css *:has-text exato, ultimo elemento (mais especifico)
    const candidato = page.locator('*').filter({ hasText: /^Alterar$/ }).last();
    const qtd = await candidato.count();
    if (qtd === 0) {
      console.log('NENHUMA estrategia funcionou. Abortando.');
      await page.keyboard.press('Escape');
      await page.close();
      if (browser) { await minimizeChrome(); await browser.close(); }
      process.exit(0);
    }

    const [novaPagina] = await Promise.all([
      context.waitForEvent('page', { timeout: 8000 }).catch(() => null),
      candidato.click(),
    ]);
    await page.waitForTimeout(1500);

    let urlFinal, pageAlterar = null;
    if (novaPagina) {
      await novaPagina.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
      await novaPagina.waitForTimeout(1500);
      urlFinal = novaPagina.url();
      pageAlterar = novaPagina;
    } else {
      urlFinal = page.url();
    }
    console.log('URL final apos clicar Alterar:', urlFinal);

    const itemIdMatch = urlFinal.match(/item_id=MLB(\d+)/i) || urlFinal.match(/itemId=MLB(\d+)/i);
    const itemIdNaUrl = itemIdMatch ? itemIdMatch[1] : null;
    console.log('itemId na URL:', itemIdNaUrl, '-- esperado:', MLB_ESPERADO, '-- bate?', itemIdNaUrl === MLB_ESPERADO);

    if (pageAlterar) {
      const textoAlt = await pageAlterar.locator('body').innerText();
      console.log('temCompetindo:', textoAlt.includes('COMPETINDO'));
      console.log('temConcorrencia:', textoAlt.indexOf('Concorrência no Mercado Livre') !== -1);
      await pageAlterar.close();
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
