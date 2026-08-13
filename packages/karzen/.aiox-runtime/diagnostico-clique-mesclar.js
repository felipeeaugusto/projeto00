const { chromium } = require('playwright');
const path = require('path');
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages().find(p => p.url().includes(URL_SHEET));
    if (!page) throw new Error('Aba do Sheets nao encontrada');
    await esperarPlanilhaCarregar(page, 20000);

    await irParaCelula(page, 'A1:Y1');
    await page.waitForTimeout(300);

    const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
    const countMenuFormatar = await page.locator('#docs-format-menu, [aria-label="Formatar"]').count();
    console.log('Quantos elementos batem com o seletor do menu Formatar:', countMenuFormatar);

    await menuFormatar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    const itensMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' });
    const countItens = await itensMesclar.count();
    console.log('Quantos itens ".goog-menuitem" com texto "Mesclar células":', countItens);

    for (let i = 0; i < countItens; i++) {
      const el = itensMesclar.nth(i);
      const visible = await el.isVisible();
      const disabled = await el.getAttribute('aria-disabled');
      const id = await el.getAttribute('id');
      console.log(`  [${i}] id=${id} visible=${visible} aria-disabled=${disabled}`);
    }

    // Clicar no primeiro visivel e habilitado
    let clicado = false;
    for (let i = 0; i < countItens; i++) {
      const el = itensMesclar.nth(i);
      const visible = await el.isVisible();
      const disabled = await el.getAttribute('aria-disabled');
      if (visible && disabled !== 'true') {
        console.log(`Clicando no item [${i}]...`);
        await el.click({ timeout: 5000 });
        clicado = true;
        break;
      }
    }
    console.log('Algum item clicado?', clicado);
    await page.waitForTimeout(800);

    // Checar estado da selecao logo em seguida (sem navegar antes)
    const nameBoxValorAntes = await page.locator('#t-name-box').inputValue();
    console.log('Name Box logo apos o clique (sem navegar):', nameBoxValorAntes);

    // Agora testar navegando pra C1
    const nameBox = page.locator('#t-name-box');
    await nameBox.click({ timeout: 5000 });
    await page.waitForTimeout(150);
    await page.keyboard.type('C1', { delay: 30 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const valorDepoisC1 = await nameBox.inputValue();
    console.log('Name Box apos navegar pra C1:', valorDepoisC1, '(mesclado de verdade se != "C1")');

    await browser.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    try { await minimizeChrome(); } catch (e) {}
  }
  process.exit(0);
})();
