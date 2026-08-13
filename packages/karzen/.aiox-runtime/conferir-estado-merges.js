const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA';

(async () => {
  let browser;
  try {
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges_25col.json'), 'utf8'));
    const gruposMultiSku = meta.posGrupos.filter(g => g.fim > g.inicio);
    console.log(`Grupos multi-SKU a checar: ${gruposMultiSku.length}`);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages().find(p => p.url().includes(URL_SHEET));
    if (!page) throw new Error('Aba do Sheets nao encontrada');
    await esperarPlanilhaCarregar(page, 20000);

    const nameBox = page.locator('#t-name-box');

    // Checar o banner primeiro
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('C1', { delay: 40 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const valorBanner = await nameBox.inputValue();
    console.log(`Banner (A1:Y1): ${valorBanner === 'C1' ? 'NAO mesclado' : 'MESCLADO (Name Box=' + valorBanner + ')'}`);

    const resultados = [];
    for (const g of gruposMultiSku) {
      // testar se coluna A esta mesclada: ir pra linha do meio/fim do grupo e ver se volta pra linha inicio
      const linhaTeste = g.inicio + 2; // uma linha depois da primeira (dentro do grupo se mesclado)
      await nameBox.click({ timeout: 5000 });
      await page.waitForTimeout(120);
      await page.keyboard.type(`A${linhaTeste}`, { delay: 30 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(350);
      const valorA = await nameBox.inputValue();
      const mescladoA = valorA !== `A${linhaTeste}`;

      await nameBox.click({ timeout: 5000 });
      await page.waitForTimeout(120);
      await page.keyboard.type(`C${linhaTeste}`, { delay: 30 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(350);
      const valorC = await nameBox.inputValue();
      const mescladoC = valorC !== `C${linhaTeste}`;

      resultados.push({ inicio: g.inicio, fim: g.fim, mescladoA, mescladoC });
      console.log(`  Grupo ${g.inicio}-${g.fim}: colA=${mescladoA ? 'OK' : 'FALTA'}  colC=${mescladoC ? 'OK' : 'FALTA'}`);
    }

    fs.writeFileSync(path.resolve(__dirname, '_estado_merges_check.json'), JSON.stringify(resultados, null, 2));
    console.log('\nSalvo em _estado_merges_check.json');

    await browser.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
