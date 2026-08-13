const { chromium } = require('playwright');
const path = require('path');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const pages = context.pages();

    const paginasSheet = pages.filter(p => p.url().includes(URL_SHEET));
    console.log(`Abas do Sheets encontradas: ${paginasSheet.length}`);

    // Tambem fechar a aba orfa do Mercado Livre de uma execucao anterior, e about:blank/newtab extras
    const paginasOrfas = pages.filter(p => {
      const u = p.url();
      return u.includes('vendedores.mercadolivre.com.br/anuncios?page=1&sort=DEFAULT&search=4657115829')
        || u === 'chrome://newtab/' || u === 'about:blank';
    });
    console.log(`Abas orfas extras encontradas: ${paginasOrfas.length}`);

    if (paginasSheet.length > 1) {
      // Manter a ULTIMA (mais recente = a que estava em uso no travamento)
      const manter = paginasSheet[paginasSheet.length - 1];
      const fechar = paginasSheet.slice(0, -1);
      console.log(`Fechando ${fechar.length} abas duplicadas do Sheets, mantendo 1...`);
      for (const p of fechar) {
        await p.close().catch(e => console.log('  erro ao fechar uma aba:', e.message));
      }
      console.log('Abas duplicadas do Sheets fechadas.');
    }

    for (const p of paginasOrfas) {
      await p.close().catch(e => console.log('  erro ao fechar aba orfa:', e.message));
    }
    console.log('Abas orfas fechadas.');

    const contextAtualizado = browser.contexts()[0];
    const restantes = contextAtualizado.pages();
    console.log(`\nAbas restantes: ${restantes.length}`);
    restantes.forEach(p => console.log('  -', p.url().slice(0, 90)));

    await browser.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
