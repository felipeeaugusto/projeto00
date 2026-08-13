const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function mesclarEValidar(page, range, celulaTeste) {
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
  await menuFormatar.click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
  await itemMesclar.click({ timeout: 5000 });
  await page.waitForTimeout(500);

  const nameBox = page.locator('#t-name-box');
  await nameBox.click({ timeout: 5000 });
  await page.waitForTimeout(150);
  await page.keyboard.type(celulaTeste, { delay: 30 });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const valorNaBox = await nameBox.inputValue();
  return valorNaBox !== celulaTeste;
}

(async () => {
  let browser;
  let page;
  try {
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges_25col.json'), 'utf8'));
    const gruposMultiSku = meta.posGrupos.filter(g => g.fim > g.inicio);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    // Fechar a aba veterana antes de abrir uma nova (evita acumular)
    const paginaVelha = context.pages().find(p => p.url().includes(URL_SHEET.split('/edit')[0]));
    if (paginaVelha) {
      console.log('Fechando aba veterana...');
      await paginaVelha.close().catch(() => {});
    }

    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    console.log('Aba nova aberta e carregada.');

    const bannerOk = await mesclarEValidar(page, 'A1:Y1', 'C1');
    console.log(`Banner -- mesclado de verdade: ${bannerOk}`);
    if (!bannerOk) throw new Error('Banner ainda nao mesclou nem em aba nova -- precisa investigar mais a fundo');

    const falhas = [];
    let count = 0;
    for (const g of gruposMultiSku) {
      const linhaTeste = g.inicio + 2;
      const okA = await mesclarEValidar(page, `A${g.inicio}:A${g.fim}`, `A${linhaTeste}`);
      const okC = await mesclarEValidar(page, `C${g.inicio}:C${g.fim}`, `C${linhaTeste}`);
      count++;
      console.log(`  Grupo ${g.inicio}-${g.fim}: colA=${okA ? 'OK' : 'FALHOU'} colC=${okC ? 'OK' : 'FALHOU'}  (${count}/${gruposMultiSku.length})`);
      if (!okA || !okC) falhas.push({ inicio: g.inicio, fim: g.fim, okA, okC });
    }

    console.log(`\nConcluido. Falhas: ${falhas.length}`);
    if (falhas.length > 0) console.log(JSON.stringify(falhas, null, 2));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
