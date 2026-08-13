const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

async function aplicarWrap(page, colunaRange) {
  await irParaCelula(page, colunaRange);
  await page.waitForTimeout(300);
  const wrapBtn = page.locator('[aria-label*="Ajuste de texto"]').first();
  await wrapBtn.click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const ajustar = page.locator('[aria-label="Ajustar"]').first();
  await ajustar.click({ timeout: 5000 });
  await page.waitForTimeout(500);
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);
    console.log('Planilha carregada.');

    // 1) Wrap na coluna A inteira (Campanha)
    await aplicarWrap(page, 'A1:A104');
    console.log('Wrap aplicado na coluna A (Campanha).');

    // 2) Wrap na coluna C inteira (Titulo na Campanha)
    await aplicarWrap(page, 'C1:C104');
    console.log('Wrap aplicado na coluna C (Titulo na Campanha).');

    // 3) Banner: negrito + alinhamento
    await irParaCelula(page, 'A1');
    await page.waitForTimeout(300);
    await page.keyboard.press('Control+b');
    await page.waitForTimeout(400);
    console.log('Negrito aplicado no banner.');

    // Tentar alinhamento horizontal centralizado
    try {
      const alignH = page.locator('[aria-label*="linhamento horizontal"]').first();
      if (await alignH.count() > 0) {
        await alignH.click({ timeout: 3000 });
        await page.waitForTimeout(400);
        const centro = page.locator('[aria-label="Centralizar"]').first();
        if (await centro.count() > 0) {
          await centro.click({ timeout: 3000 });
          console.log('Alinhamento horizontal centralizado aplicado.');
        } else {
          console.log('Opcao Centralizar (horizontal) nao encontrada -- pulando.');
          await page.keyboard.press('Escape');
        }
      } else {
        console.log('Botao de alinhamento horizontal nao encontrado -- pulando.');
      }
    } catch (e) {
      console.log('Alinhamento horizontal falhou, pulando:', e.message);
    }

    await page.waitForTimeout(300);

    // Tentar alinhamento vertical centralizado
    try {
      const alignV = page.locator('[aria-label*="linhamento vertical"]').first();
      if (await alignV.count() > 0) {
        await alignV.click({ timeout: 3000 });
        await page.waitForTimeout(400);
        const meio = page.locator('[aria-label="Centralizar verticalmente"]').first();
        if (await meio.count() > 0) {
          await meio.click({ timeout: 3000 });
          console.log('Alinhamento vertical centralizado aplicado.');
        } else {
          console.log('Opcao centralizar (vertical) nao encontrada -- pulando.');
          await page.keyboard.press('Escape');
        }
      } else {
        console.log('Botao de alinhamento vertical nao encontrado -- pulando.');
      }
    } catch (e) {
      console.log('Alinhamento vertical falhou, pulando:', e.message);
    }

    console.log('\nCONCLUIDO -- formatacao essencial aplicada (wrap A e C, negrito banner, alinhamento se disponivel).');

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) await browser.close().catch(() => {});
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
