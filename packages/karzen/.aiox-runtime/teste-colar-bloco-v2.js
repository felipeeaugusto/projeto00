const { chromium } = require('playwright');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

function setClipboardArquivo(valor) {
  const tmpFile = path.resolve(__dirname, '_clip_tmp.txt');
  fs.writeFileSync(tmpFile, valor, { encoding: 'utf8' });
  execSync(`powershell -NoProfile -Command "Get-Content -Raw -Encoding UTF8 '${tmpFile}' | Set-Clipboard"`, { stdio: 'pipe' });
}

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    // Descobrir extensao real da planilha via Ctrl+End
    await page.locator('#t-name-box').click({ timeout: 5000 });
    await page.waitForTimeout(200);
    await page.keyboard.type('A1', { delay: 50 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    await page.keyboard.press('Control+End');
    await page.waitForTimeout(500);
    const nameBoxValor = await page.locator('#t-name-box').inputValue().catch(() => null);
    console.log('Extensao atual da planilha (Ctrl+End):', nameBoxValor);

    // Testar colar bloco numa celula segura, dentro do range A1:Z1000 padrao
    const bloco = [
      ['teste1', 'teste2', 'teste3'],
      ['linhaB1', 'linhaB2', 'linhaB3'],
    ].map(row => row.join('\t')).join('\n');

    setClipboardArquivo(bloco);
    await irParaCelula(page, 'V50');
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(1000);

    for (const cel of ['V50', 'W50', 'X50', 'V51', 'W51', 'X51']) {
      const v = await lerCelula(page, cel);
      console.log(`${cel}: [${v}]`);
    }

    await irParaCelula(page, 'V50:X51');
    await page.keyboard.press('Delete');
    await page.waitForTimeout(400);

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
