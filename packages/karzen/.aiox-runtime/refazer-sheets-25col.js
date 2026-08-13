const { chromium } = require('playwright');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));
const { esperarPlanilhaCarregar, irParaCelula, lerCelula } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js'));

const URL_SHEET = 'https://docs.google.com/spreadsheets/d/1J3EhUJdUlgU-KaEZhCGRmOUf3enhFOB_7xKsznyl_lA/edit?gid=0#gid=0';

function setClipboardArquivo(valor) {
  const tmpFile = path.resolve(__dirname, '_clip_tmp2.txt');
  fs.writeFileSync(tmpFile, valor, { encoding: 'utf8' });
  execSync(`powershell -NoProfile -Command "Get-Content -Raw -Encoding UTF8 '${tmpFile}' | Set-Clipboard"`, { stdio: 'pipe' });
}

async function abrirMenuFormatar(page) {
  const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
  await menuFormatar.click({ timeout: 5000 });
  await page.waitForTimeout(350);
}

async function desfazerMesclagem(page, range) {
  // "Limpar formatacao" (Ctrl+\) trata mesclagem como atributo de formatacao --
  // desfaz de forma confiavel, diferente do submenu "Mesclar celulas > Desfazer
  // mesclagem" que nao responde a hover/click automatizado nesta aba em background.
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  await page.keyboard.press('Control+\\');
  await page.waitForTimeout(400);
}

async function mesclar(page, range) {
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  await abrirMenuFormatar(page);
  const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
  await itemMesclar.click({ timeout: 5000 });
  await page.waitForTimeout(300);
}

(async () => {
  let browser;
  try {
    const tsv = fs.readFileSync(path.resolve(__dirname, '_sheets_bloco_25col.tsv'), 'utf8');
    const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges_25col.json'), 'utf8'));
    const gruposMultiSku = meta.posGrupos.filter(g => g.fim > g.inicio);
    console.log(`Ultima linha: ${meta.ultimaLinha} | Grupos multi-SKU: ${gruposMultiSku.length}`);

    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = await openBackgroundPage(browser, context, URL_SHEET);
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await esperarPlanilhaCarregar(page, 20000);

    // 1) Desfazer merges existentes (banner + os 10 grupos, na estrutura antiga de 13 colunas)
    console.log('Desfazendo mesclagens antigas...');
    await desfazerMesclagem(page, 'A1:M1');
    // grupos antigos usavam colunas A e B (estrutura de 13 colunas sem espacador)
    const metaAntigo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '_sheets_merges.json'), 'utf8'));
    for (const g of metaAntigo.posGrupos.filter(x => x.fim > x.inicio)) {
      await desfazerMesclagem(page, `A${g.inicio}:A${g.fim}`);
      await desfazerMesclagem(page, `B${g.inicio}:B${g.fim}`);
    }
    console.log('Mesclagens antigas desfeitas.');

    // 2) Limpar toda a area de dados antiga (A1:M104) antes de escrever a nova estrutura
    await irParaCelula(page, 'A1:Y104');
    await page.keyboard.press('Delete');
    await page.waitForTimeout(500);
    console.log('Area limpa.');

    // 3) Colar o novo bloco de 25 colunas
    setClipboardArquivo(tsv);
    await irParaCelula(page, 'A1');
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(2500);
    console.log('Bloco de 25 colunas colado.');

    // 4) Mesclar banner (A1:Y1) e grupos (colunas A e C agora)
    await mesclar(page, 'A1:Y1');
    let count = 0;
    for (const g of gruposMultiSku) {
      await mesclar(page, `A${g.inicio}:A${g.fim}`);
      await mesclar(page, `C${g.inicio}:C${g.fim}`);
      count++;
      if (count % 5 === 0) console.log(`  ${count}/${gruposMultiSku.length} grupos mesclados...`);
    }
    console.log(`Todos os ${count} grupos mesclados.`);

    // Verificacao de amostra
    for (const cel of ['A1', 'A3', 'C3', 'E3', 'A7', 'C7', 'E7', 'A9']) {
      const v = await lerCelula(page, cel);
      console.log(`  ${cel}: [${v}]`);
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
