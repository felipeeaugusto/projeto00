const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, mesclarRange, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function validarMerge(page, celulaFilha) {
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
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges_25col.json'), 'utf8'));
    const gruposMultiSku = meta.posGrupos.filter(g => g.fim > g.inicio);
    console.log(`Grupos a mesclar: ${gruposMultiSku.length}`);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    console.log('Planilha carregada.');

    // Banner
    await mesclarRange(page, 'A1:Y1');
    const bannerOk = await validarMerge(page, 'C1');
    console.log(`Banner A1:Y1 -- mesclado de verdade: ${bannerOk}`);
    if (!bannerOk) throw new Error('Banner nao mesclou -- parar e investigar');

    const falhas = [];
    let count = 0;
    for (const g of gruposMultiSku) {
      const linhaTeste = g.inicio + 2;
      await mesclarRange(page, `A${g.inicio}:A${g.fim}`);
      const okA = await validarMerge(page, `A${linhaTeste}`);
      await mesclarRange(page, `C${g.inicio}:C${g.fim}`);
      const okC = await validarMerge(page, `C${linhaTeste}`);
      count++;
      console.log(`  Grupo ${g.inicio}-${g.fim}: colA=${okA ? 'OK' : 'FALHOU'} colC=${okC ? 'OK' : 'FALHOU'}  (${count}/${gruposMultiSku.length})`);
      if (!okA || !okC) falhas.push({ inicio: g.inicio, fim: g.fim, okA, okC });
    }

    console.log(`\nConcluido. Falhas: ${falhas.length}`);
    if (falhas.length > 0) {
      console.log(JSON.stringify(falhas, null, 2));
      throw new Error(`${falhas.length} grupos falharam -- ver detalhes acima`);
    }

    console.log('\nTODOS OS MERGES CONFIRMADOS COM SUCESSO.');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
