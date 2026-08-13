const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function checarMerge(page, celulaFilha) {
  const nameBox = page.locator('#t-name-box');
  await nameBox.click({ timeout: 5000 });
  await page.waitForTimeout(150);
  await page.keyboard.type(celulaFilha, { delay: 30 });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const valor = await nameBox.inputValue();
  return valor !== celulaFilha;
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    console.log('Planilha carregada.');

    await irParaCelula(page, 'V520:X522');
    await page.waitForTimeout(300);

    // Abrir menu Formatar via clique real de coordenada tambem, pra manter consistencia
    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    const boxMenu = await menuFormatar.boundingBox();
    console.log('BoundingBox menu Formatar:', JSON.stringify(boxMenu));
    await page.mouse.move(boxMenu.x + boxMenu.width / 2, boxMenu.y + boxMenu.height / 2);
    await page.waitForTimeout(100);
    await page.mouse.down();
    await page.waitForTimeout(80);
    await page.mouse.up();
    await page.waitForTimeout(500);

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    const boxItem = await itemMesclar.boundingBox();
    console.log('BoundingBox item Mesclar celulas:', JSON.stringify(boxItem));

    if (!boxItem) throw new Error('Item Mesclar celulas nao tem boundingBox -- menu pode nao ter aberto');

    // Clique real via coordenada, com mousedown/mouseup separados e delay realista
    await page.mouse.move(boxItem.x + boxItem.width / 2, boxItem.y + boxItem.height / 2, { steps: 3 });
    await page.waitForTimeout(150);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.up();
    await page.waitForTimeout(800);

    const mesclou = await checarMerge(page, 'W521');
    console.log(`RESULTADO (clique por coordenada real): mesclou de verdade? ${mesclou}`);

    // Limpar
    await irParaCelula(page, 'V520:X522');
    await page.waitForTimeout(200);
    await page.keyboard.press('Control+\\');
    await page.waitForTimeout(300);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);

    console.log(`\n>>> TESTE ${mesclou ? 'PASSOU' : 'FALHOU'} <<<`);
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
