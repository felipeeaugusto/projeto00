const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

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
    console.log('Aba nova, planilha recarregada do zero.\n');

    // INICIO: banner + cabecalho
    console.log('=== INICIO ===');
    for (const cel of ['A1', 'C1', 'A3', 'C3', 'E3', 'G3', 'I3']) {
      console.log(`  ${cel}: [${await lerCelula(page, cel)}]`);
    }
    const mergeBanner = await page.locator('#t-name-box').inputValue().catch(() => null);

    // MEIO: Sanduicheira Panini (7-11) e Air fryer Britania (51-53)
    console.log('\n=== MEIO — Sanduicheira Kian Panini (linhas 7-11) ===');
    for (const cel of ['A7', 'C7', 'E7', 'G7', 'I7', 'E9', 'I9', 'E11']) {
      console.log(`  ${cel}: [${await lerCelula(page, cel)}]`);
    }
    console.log('\n=== MEIO — Air fryer Britânia (linhas 51-53) ===');
    for (const cel of ['A51', 'C51', 'E51', 'G51', 'I51', 'K51', 'E53']) {
      console.log(`  ${cel}: [${await lerCelula(page, cel)}]`);
    }

    // FIM: ultimo produto
    console.log('\n=== FIM (linha 103, Aspirador Kian 3 em 1) ===');
    for (const cel of ['A103', 'C103', 'E103', 'G103', 'I103']) {
      console.log(`  ${cel}: [${await lerCelula(page, cel)}]`);
    }

    // Confirmar merges via Name Box (celula filha volta pra celula lider)
    console.log('\n=== CONFIRMACAO DE MERGES (Name Box) ===');
    const nameBox = page.locator('#t-name-box');
    const testes = ['C1', 'A9', 'C9', 'A53', 'A85', 'C85', 'A101', 'C101'];
    for (const cel of testes) {
      await nameBox.click({ timeout: 5000 });
      await page.waitForTimeout(120);
      await page.keyboard.type(cel, { delay: 25 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      const valor = await nameBox.inputValue();
      console.log(`  ${cel} -> Name Box mostra: ${valor} (mesclado: ${valor !== cel})`);
    }

    console.log('\nValidacao concluida.');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
