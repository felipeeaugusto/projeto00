const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function mesclar(page, range) {
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
  await menuFormatar.click({ timeout: 5000 });
  await page.waitForTimeout(350);
  const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
  await itemMesclar.click({ timeout: 5000 });
  await page.waitForTimeout(350);
}

(async () => {
  let browser;
  try {
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges.json'), 'utf8'));
    const gruposMultiSku = meta.posGrupos.filter(g => g.fim > g.inicio);
    console.log(`Grupos que precisam mesclar: ${gruposMultiSku.length} de ${meta.posGrupos.length}`);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    // Mesclar o banner primeiro (linha 1, colunas A:M -- 13 colunas)
    await mesclar(page, 'A1:M1');
    console.log('Banner mesclado.');

    let count = 0;
    for (const g of gruposMultiSku) {
      await mesclar(page, `A${g.inicio}:A${g.fim}`);
      await mesclar(page, `B${g.inicio}:B${g.fim}`);
      count++;
      if (count % 5 === 0) console.log(`  ${count}/${gruposMultiSku.length} grupos mesclados...`);
    }
    console.log(`Todos os ${count} grupos mesclados.`);

    // Verificacao de amostra
    for (const cel of ['A1', 'A7', 'A9', 'A11', 'B7', 'B9']) {
      const v = await lerCelula(page, cel);
      console.log(`  ${cel}: [${v}]`);
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
