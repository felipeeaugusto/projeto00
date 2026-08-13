// So leitura -- abre "Alterar" do MLB #6936159960 (o outro da Sanduicheira Panini,
// SKU SPANK-R-220V) pra confirmar se ele mostra ou nao "COMPETINDO" + a secao
// "Concorrencia no Mercado Livre", validando se e mesmo o anuncio pai. Nao escreve nada.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'SPANK-R-220V';
const MLB_ALVO = '6936159960';

(async () => {
  let browser;
  let pageAnuncios;
  let pageAlterar;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    pageAnuncios = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!pageAnuncios) pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);

    const campo = pageAnuncios.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU_TESTE);
    await pageAnuncios.keyboard.press('Enter');
    await pageAnuncios.waitForTimeout(3000);

    // Achar o link "Alterar" do MLB alvo (3 pontinhos -> Alterar -> pegar href, abrir em aba nova)
    const elMlb = pageAnuncios.locator(`text=#${MLB_ALVO}`).first();
    const linhaCard = elMlb.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
    const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
    await botao3pontos.click();
    await pageAnuncios.waitForTimeout(600);
    const linkAlterar = pageAnuncios.locator('a', { hasText: 'Alterar' }).first();
    const href = await linkAlterar.getAttribute('href');
    console.log('href do Alterar:', href);
    await pageAnuncios.keyboard.press('Escape');
    await pageAnuncios.waitForTimeout(300);

    if (!href) throw new Error('Nao achou o link Alterar pra esse MLB');
    const urlCompleta = href.startsWith('http') ? href : `https://vendedores.mercadolivre.com.br${href}`;
    pageAlterar = await openBackgroundPage(browser, context, urlCompleta);
    await pageAlterar.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    await pageAlterar.waitForTimeout(2500);

    const texto = await pageAlterar.locator('body').innerText();
    const temCompetindo = texto.includes('COMPETINDO');
    const idxConc = texto.indexOf('Concorrência no Mercado Livre');
    const temSecaoConcorrencia = idxConc !== -1;
    const blocoConc = temSecaoConcorrencia ? texto.slice(idxConc, idxConc + 400) : '(secao nao existe)';

    console.log('\n=== RESULTADO PARA MLB', MLB_ALVO, '===');
    console.log('Tem "COMPETINDO"?', temCompetindo);
    console.log('Tem secao "Concorrencia no Mercado Livre"?', temSecaoConcorrencia);
    console.log('Trecho da secao (se existir):\n', blocoConc);

    // Tambem mostrar o titulo do anuncio e o status/banner pra contexto
    const idxTitulo = texto.indexOf('Prateado') !== -1 ? texto.indexOf('Prateado') : -1;
    console.log('\nPrimeiros 400 caracteres da pagina (contexto geral):\n', texto.slice(0, 400));

  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (pageAlterar) await pageAlterar.close().catch(() => {});
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
