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
    const tsv = fs.readFileSync(path.resolve(__dirname, '_sheets_bloco.tsv'), 'utf8');
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges.json'), 'utf8'));
    console.log(`Bloco carregado: ultima linha ${meta.ultimaLinha}, ${meta.posGrupos.length} grupos pra mesclar`);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    setClipboardArquivo(tsv);
    await irParaCelula(page, 'A1');
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(2500);
    console.log('Bloco colado.');

    // Conferencia rapida pos-colagem
    for (const cel of ['A1', 'A3', 'C3', 'A5', 'C7', 'E7']) {
      const v = await lerCelula(page, cel);
      console.log(`  ${cel}: [${v}]`);
    }

    await page.close();
    console.log('OK -- dados colados. Mesclagens ficam pra proxima etapa.');
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
