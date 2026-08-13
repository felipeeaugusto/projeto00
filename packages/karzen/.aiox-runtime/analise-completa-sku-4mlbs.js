// Analise completa e isolada de TODOS os MLBs do SKU AP-40-R-127V (4 MLBs, 2 cards).
// So leitura -- nao escreve nada. Ignora completamente "Sincronizado com" pra qualquer logica.
const { chromium } = require('playwright');
const path = require('path');
const { openBackgroundPage } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js'));
const { minimizeChrome } = require(path.resolve(__dirname, '../../../.aiox-core/development/scripts/modo-navegador/minimize-chrome.js'));

const URL_ANUNCIOS = 'https://vendedores.mercadolivre.com.br/anuncios#menu-user';
const SELETOR_BUSCA = 'input[placeholder="Buscar por título, código ou SKU"]';
const SKU_TESTE = 'AP-40-R-127V';

async function rolarPagina(page, vezes = 12) {
  for (let i = 0; i < vezes; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
}

// Abre "Alterar" clicando na linha cuja PROPRIA celula de MLB bate EXATO com o numero
// (nao "contem" -- exato, pra nunca pegar uma mencao tipo "Sincronizado com #X, #Y")
async function abrirAlterarExato(page, context, mlb) {
  const elExato = page.getByText(`#${mlb}`, { exact: true }).first();
  const count = await elExato.count();
  if (count === 0) return { erro: 'elemento exato nao encontrado' };
  const linhaCard = elExato.locator('xpath=ancestor::div[contains(@class,"sll-list-grid-row__main-row")]').first();
  const botao3pontos = linhaCard.locator('button[aria-label="Ações secundárias"]').first();
  if (await botao3pontos.count() === 0) return { erro: 'botao 3 pontinhos nao encontrado' };
  await botao3pontos.click();
  await page.waitForTimeout(600);
  const linkAlterar = page.locator('a', { hasText: 'Alterar' }).first();
  const href = await linkAlterar.getAttribute('href').catch(() => null);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  if (!href) return { erro: 'href nao encontrado' };
  const urlCompleta = href.startsWith('http') ? href : `https://vendedores.mercadolivre.com.br${href}`;
  const pageAlterar = await openBackgroundPage(browser_context_browser(context), context, urlCompleta);
  await pageAlterar.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
  await pageAlterar.waitForTimeout(2500);
  const textoAlt = await pageAlterar.locator('body').innerText();
  const itemIdMatch = urlCompleta.match(/itemId=MLB(\d+)/);
  const itemIdReal = itemIdMatch ? itemIdMatch[1] : null;
  const temCompetindo = textoAlt.includes('COMPETINDO');
  const idxConc = textoAlt.indexOf('Concorrência no Mercado Livre');
  const temSecaoConcorrencia = idxConc !== -1;
  const trechoConc = temSecaoConcorrencia ? textoAlt.slice(idxConc, idxConc + 300) : null;
  await pageAlterar.close();
  return { itemIdReal, temCompetindo, temSecaoConcorrencia, trechoConc };
}

function browser_context_browser(context) { return context.browser(); }

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages().find((p) => p.url().includes('vendedores.mercadolivre.com.br/anuncios'));
    if (!page) page = await openBackgroundPage(browser, context, URL_ANUNCIOS);
    await page.waitForTimeout(1500);

    const campo = page.locator(SELETOR_BUSCA).first();
    await campo.click();
    await campo.fill('');
    await campo.fill(SKU_TESTE);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await rolarPagina(page, 12);
    await page.mouse.wheel(0, -20000);
    await page.waitForTimeout(500);

    const texto = await page.locator('body').innerText();
    const idxFiltrar = texto.indexOf('Filtrar e ordenar');
    const bloco = texto.slice(idxFiltrar, idxFiltrar + 3000);

    // Dados ja extraidos manualmente da estrutura (2 cards, 2 MLBs cada, ordem = ordem das linhas)
    const mlbsInfo = {
      '4302286661': { condicao: 'Premium', preco: 'R$ 279,90 (promo R$ 198,51)', vocêRecebe: 'R$ 143,10', qualidade: '67 (3 objetivos)', experiencia: '75 (Com problemas)', statusListagem: 'PERDENDO', deposito: '1.709 un.', full: '-' },
      '4302299093': { condicao: 'Clássico', preco: 'R$ 245,56 (promo R$ 185,22)', vocêRecebe: 'R$ 141,20', qualidade: '67 (3 objetivos)', experiencia: '75 (Com problemas)', statusListagem: 'PERDENDO', deposito: '1.709 un.', full: '-' },
      '4302337503': { condicao: 'Clássico', preco: 'R$ 245,56 (promo R$ 185,22)', vocêRecebe: '-', qualidade: '76 (2 objetivos)', experiencia: '75 (Com problemas)', statusListagem: 'Ofereça envios no mesmo dia (nao e G/P/C)', deposito: '1.709 un.', full: '-' },
      '4302409451': { condicao: 'Premium', preco: 'R$ 279,90 (promo R$ 198,51)', vocêRecebe: '-', qualidade: '76 (2 objetivos)', experiencia: '75 (Com problemas)', statusListagem: 'Ofereça envios no mesmo dia (nao e G/P/C)', deposito: '1.709 un.', full: '-' },
    };

    console.log('=== Confirmando via listagem (ja capturado) ===');
    console.log(JSON.stringify(mlbsInfo, null, 2));

    // Pra quem NAO tem G/P/C explicito na listagem, checar via Alterar individualmente
    const paraChecar = Object.entries(mlbsInfo).filter(([mlb, info]) => !/^(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO)/.test(info.statusListagem));
    console.log(`\n=== MLBs que precisam checagem via Alterar (sem G/P/C explicito): ${paraChecar.map(p => p[0]).join(', ')} ===`);

    const resultadoAlterar = {};
    for (const [mlb] of paraChecar) {
      console.log(`\nChecando MLB ${mlb} via Alterar...`);
      const r = await abrirAlterarExato(page, context, mlb);
      console.log(JSON.stringify(r, null, 2));
      resultadoAlterar[mlb] = r;
    }

    console.log('\n\n=== RESULTADO FINAL: CATALOGO OU PAI ===');
    for (const [mlb, info] of Object.entries(mlbsInfo)) {
      let ehCatalogo, motivo;
      if (/^(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO)/.test(info.statusListagem)) {
        ehCatalogo = true;
        motivo = `explicito na listagem: ${info.statusListagem}`;
      } else {
        const r = resultadoAlterar[mlb];
        if (r && r.temCompetindo && r.temSecaoConcorrencia) {
          ehCatalogo = true;
          motivo = `COMPETINDO + Concorrencia existe (itemId real: ${r.itemIdReal})`;
        } else {
          ehCatalogo = false;
          motivo = r ? `sem COMPETINDO/Concorrencia (itemId real: ${r.itemIdReal})` : 'erro na checagem';
        }
      }
      console.log(`MLB ${mlb} (${info.condicao}): ${ehCatalogo ? 'CATALOGO' : 'PAI (descartar)'} -- ${motivo}`);
    }

    await page.close();
  } catch (err) {
    console.error('ERRO:', err.message, err.stack);
  } finally {
    if (browser) { await minimizeChrome(); await browser.close(); }
  }
  process.exit(0);
})();
