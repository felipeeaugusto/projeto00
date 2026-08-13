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

    await irParaCelula(page, 'V530:X532');
    await page.waitForTimeout(300);

    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
    await itemMesclar.click({ timeout: 5000 });
    console.log('Clicou no item "Mesclar células". Verificando se submenu ficou aberto...');
    await page.waitForTimeout(700);

    // Verificar TODOS os itens de menu visiveis agora (nao so os que tem "mescl" no texto)
    const todosVisiveis = [];
    const todosItens = page.locator('.goog-menuitem');
    const total = await todosItens.count();
    for (let i = 0; i < total; i++) {
      const el = todosItens.nth(i);
      if (await el.isVisible().catch(() => false)) {
        const texto = await el.innerText().catch(() => '');
        todosVisiveis.push(texto);
      }
    }
    console.log(`Itens de menu VISIVEIS agora (${todosVisiveis.length}):`, JSON.stringify(todosVisiveis));

    // Se "Mesclar tudo" estiver visivel, clicar nele agora
    const mesclarTudo = page.locator('.goog-menuitem', { hasText: 'Mesclar tudo' }).first();
    if (await mesclarTudo.count() > 0 && await mesclarTudo.isVisible()) {
      console.log('Item "Mesclar tudo" esta visivel -- clicando nele agora...');
      await mesclarTudo.click({ timeout: 5000 });
      await page.waitForTimeout(800);
    } else {
      console.log('Item "Mesclar tudo" NAO esta visivel.');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
    }

    // Validar
    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('W531', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const valor = await nameBox.inputValue();
    console.log(`RESULTADO: mesclou de verdade? ${valor !== 'W531'} (Name Box: "${valor}")`);

    // Limpar
    await irParaCelula(page, 'V530:X532');
    await page.waitForTimeout(200);
    await page.keyboard.press('Control+\\');
    await page.waitForTimeout(300);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
