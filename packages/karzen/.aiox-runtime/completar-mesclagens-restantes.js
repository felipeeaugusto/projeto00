const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, mesclarRange } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA';

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
    // Ja confirmados na tentativa anterior: os primeiros 6 (7-11, 31-33, 47-49, 51-53, 63-65, 69-71)
    const restantes = gruposMultiSku.slice(6);
    console.log(`Grupos restantes a mesclar: ${restantes.length}`, restantes.map(g => `${g.inicio}-${g.fim}`));

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    // Fechar a aba travada da tentativa anterior
    const paginaVelha = context.pages().find(p => p.url().includes(URL_SHEET));
    if (paginaVelha) {
      console.log('Fechando aba travada da tentativa anterior...');
      await paginaVelha.close().catch(() => {});
    }

    page = await openBackgroundPage(browser, context, URL_SHEET + '/edit?gid=0#gid=0');
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    console.log('Aba nova aberta e carregada.');

    const falhas = [];
    let count = 0;
    for (const g of restantes) {
      const linhaTeste = g.inicio + 2;
      await mesclarRange(page, `A${g.inicio}:A${g.fim}`);
      const okA = await validarMerge(page, `A${linhaTeste}`);
      await mesclarRange(page, `C${g.inicio}:C${g.fim}`);
      const okC = await validarMerge(page, `C${linhaTeste}`);
      count++;
      console.log(`  Grupo ${g.inicio}-${g.fim}: colA=${okA ? 'OK' : 'FALHOU'} colC=${okC ? 'OK' : 'FALHOU'}  (${count}/${restantes.length})`);
      if (!okA || !okC) falhas.push({ inicio: g.inicio, fim: g.fim, okA, okC });
    }

    console.log(`\nConcluido. Falhas: ${falhas.length}`);
    if (falhas.length > 0) {
      console.log(JSON.stringify(falhas, null, 2));
      throw new Error(`${falhas.length} grupos falharam`);
    }
    console.log('\nTODOS OS GRUPOS RESTANTES CONFIRMADOS COM SUCESSO.');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
