const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

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
    console.log('Planilha carregada em Chrome novo.');

    // Teste 1: escrever texto de teste na area isolada (V510:X512), dentro da extensao real
    // (A:Z1000, ja confirmado nesta sessao), mas longe dos dados reais (A1:Y104)
    await irParaCelula(page, 'V510');
    await page.waitForTimeout(200);
    await page.keyboard.type('teste isolado', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);

    // Teste 2: tentar mesclar V510:X512
    await irParaCelula(page, 'V510:X512');
    await page.waitForTimeout(300);
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);
    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.click({ timeout: 5000 });
    await page.waitForTimeout(800);

    // Validar de verdade
    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('W511', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const valorNaBox = await nameBox.inputValue();
    const mesclouDeVerdade = valorNaBox !== 'W511';
    console.log(`RESULTADO DO TESTE: mesclou de verdade? ${mesclouDeVerdade} (Name Box mostrou: "${valorNaBox}")`);

    // Limpar a area de teste, independente do resultado
    await irParaCelula(page, 'V510:X512');
    await page.waitForTimeout(200);
    await page.keyboard.press('Control+\\'); // limpa formatacao (inclui merge se tiver aplicado)
    await page.waitForTimeout(300);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);
    console.log('Area de teste limpa.');

    console.log(`\n>>> TESTE ${mesclouDeVerdade ? 'PASSOU' : 'FALHOU'} <<<`);
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
