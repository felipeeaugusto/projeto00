const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const PRIMEIRO_MLB = '4754046783';

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    let page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(2000);

    const fecharDrawer = page.locator('button[aria-label="Cerrar"]');
    if (await fecharDrawer.count() > 0) { await fecharDrawer.first().click().catch(() => {}); await page.waitForTimeout(500); }

    console.log('=== PASSO 1: buscar o primeiro MLB (', PRIMEIRO_MLB, ') pra achar o SKU ===');
    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(PRIMEIRO_MLB);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    let texto = await page.locator('body').innerText();
    const idxSku = texto.indexOf('SKU ');
    let sku = null;
    if (idxSku !== -1) {
      const m = texto.slice(idxSku, idxSku + 60).match(/SKU\s+(\S+)/);
      sku = m ? m[1] : null;
    }
    console.log('SKU encontrado:', sku);

    if (!sku) {
      console.log('SKU nao encontrado -- parando aqui.');
      return;
    }

    console.log('\n=== PASSO 2: rebuscar pelo SKU, rolar a pagina inteira ===');
    await campo.click();
    await campo.fill('');
    await campo.fill(sku);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    for (let i = 0; i < 10; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(450); }
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    texto = await page.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const idxRodape = texto.indexOf('Você recebeu');
    const bloco = texto.slice(idxFiltrar, idxRodape !== -1 ? idxRodape : idxFiltrar + 10000);

    const todosMlbs = [...new Set((bloco.match(/#\d{7,11}/g) || []).map(m => m.replace('#','')))];
    console.log('Todos os MLBs sincronizados (Passo A):', todosMlbs.join(', '));

    console.log('\n=== PASSO 3: dados de cada MLB (Deposito/FULL/Status/Qualidade/Experiencia) ===');
    for (const mlb of todosMlbs) {
      const idxMlb = bloco.indexOf(`#${mlb}`);
      const blocoMlb = bloco.slice(idxMlb, idxMlb + 2200);
      const fullMatch = blocoMlb.match(/Full:\s*\n\s*([^\n]+)/);
      const depMatch = blocoMlb.match(/Depósito:\s*\n\s*([^\n]+)/);
      const inativo = /Inativo sem estoque/.test(blocoMlb);
      const statusMatch = blocoMlb.match(/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/i);
      const condMatch = blocoMlb.match(/\b(Clássico|Premium)\b/);
      console.log(`\n  MLB ${mlb}:`);
      console.log(`    Full: ${fullMatch ? fullMatch[1].trim() : '(nao achado)'}`);
      console.log(`    Depósito: ${depMatch ? depMatch[1].trim() : '(nao achado)'}`);
      console.log(`    Status do Produto: ${inativo ? 'Pausado' : 'Ativo'}`);
      console.log(`    Condição: ${condMatch ? condMatch[1] : '(nao achado)'}`);
      console.log(`    Status catálogo: ${statusMatch ? statusMatch[1] : '(nenhum G/P/C/R)'}`);
      console.log(`    --- bloco cru (pra achar Qualidade/Experiencia na mao) ---`);
      console.log(blocoMlb.split('\n').map(l=>l.trim()).filter(Boolean).join(' | '));
    }

    console.log('\n\nRESULTADO FINAL:');
    console.log(JSON.stringify({ primeiroMlb: PRIMEIRO_MLB, sku, todosMlbsSincronizados: todosMlbs }, null, 2));
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
