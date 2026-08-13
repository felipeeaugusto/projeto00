// Valida o padrao de Qualidade/Experiencia contra varios MLBs ja conhecidos hoje,
// escolhidos de proposito com estados diferentes (Ativo/Pausado, Ganhando/Perdendo/etc).
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';

const CANDIDATOS = [
  { sku: 'TVSAM-43', mlb: '6712897822', esperado: 'Pausado (deposito sem estoque)' },
  { sku: 'HQ-264CVEFFX-127V', mlb: '4734441301', esperado: 'Ativo, PERDENDO' },
  { sku: 'BB-PLUS', mlb: '6729960374', esperado: 'Pausado, status diferente do Premium' },
  { sku: 'IMPC-G3110', mlb: '4560946507', esperado: 'Ativo' },
];

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    for (const c of CANDIDATOS) {
      console.log(`\n=== ${c.sku} (MLB ${c.mlb}) -- esperado: ${c.esperado} ===`);
      const fecharDrawer = page.locator('button[aria-label="Cerrar"]');
      if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await page.waitForTimeout(400); }

      const campo = page.locator(SELETOR_BUSCA).first();
      await campo.click();
      await campo.fill('');
      await campo.fill(c.mlb);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2800);

      const texto = await page.locator('body').innerText();
      const idxMlb = texto.indexOf(`#${c.mlb}`);
      if (idxMlb === -1) { console.log('  MLB nao encontrado no texto da pagina'); continue; }
      const bloco = texto.slice(idxMlb, idxMlb + 1500);

      // Pega o trecho entre o fim do bloco Sincronizado/Deposito/preco e o botao (Pausar OU Reativar)
      let idxBotao = bloco.indexOf('Pausar anúncio');
      let nomeBotao = 'Pausar anúncio';
      if (idxBotao === -1) { idxBotao = bloco.indexOf('Reativar anúncio'); nomeBotao = 'Reativar anúncio'; }
      const antesDoBotao = idxBotao !== -1 ? bloco.slice(0, idxBotao) : bloco.slice(0, 900);
      const linhas = antesDoBotao.split('\n').map(l => l.trim()).filter(Boolean);
      console.log(`  Ancora usada: "${nomeBotao}" (achada: ${idxBotao !== -1})`);
      console.log('  Ultimas 18 linhas antes da ancora:');
      console.log('  ' + linhas.slice(-18).join('\n  '));
    }
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
