const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const URL_PUBLICIDADE = 'https://ads.mercadolivre.com.br/product-ads/admin/campaigns?fe-rollout-version=v2&advertiser_id=168073&account_id=178661&navigate_to=mercado_ads&from=ads-manager&status=A';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const abasAntigas = context.pages();
    console.log(`Abas antigas encontradas: ${abasAntigas.length}`);

    // Abrir as 2 abas novas PRIMEIRO -- nunca deixar o Chrome com 0 abas
    const pageAnuncios = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await pageAnuncios.waitForTimeout(1500);
    console.log('Aba de Anuncios aberta:', pageAnuncios.url());

    const pagePublicidade = await openBackgroundPage(browser, context, URL_PUBLICIDADE);
    await pagePublicidade.waitForTimeout(1500);
    console.log('Aba de Publicidade aberta:', pagePublicidade.url());

    // So agora fechar as antigas
    for (const p of abasAntigas) {
      await p.close().catch(() => {});
    }
    console.log('Abas antigas fechadas.');

    await browser.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
