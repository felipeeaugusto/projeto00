const { chromium } = require('playwright');
const path = require('path');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages().find(p => p.url().includes(URL_SHEET));
    if (!page) throw new Error('Aba do Sheets nao encontrada');
    await esperarPlanilhaCarregar(page, 20000);

    for (const cel of ['A1', 'A3', 'C3', 'E3', 'A7', 'C7', 'E7', 'C9', 'A103', 'C103']) {
      const v = await lerCelula(page, cel);
      console.log(`${cel}: [${v}]`);
    }

    await browser.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
