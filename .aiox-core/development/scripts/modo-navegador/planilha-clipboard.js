// Modulo de referencia pra ler/escrever celulas do Google Sheets via Modo Navegador,
// sem API do Google (Felipe recusou por medo de cobrança) e sem screenshot (bug real
// documentado: screenshot depois de colar/mesclar travava de forma imprevisivel,
// as vezes 10+ minutos, as vezes travava de vez -- ver sessao de 05/08/2026).
//
// Validado em 08/08/2026: escrita e leitura testadas separadamente numa aba nova e
// limpa, com sucesso total (valor lido bateu exatamente com o valor escrito).
//
// LICAO CRITICA: NUNCA reusar uma aba da planilha que ja acumulou varias tentativas
// (inclusive com erro) -- o estado interno do Sheets fica inconsistente e qualquer
// navegacao pela Name Box passa a falhar com "O nome dado ao intervalo e invalido",
// mesmo pra um endereco de celula perfeitamente valido. Sempre abrir uma aba NOVA
// antes de uma sequencia de operacoes na planilha.

const { execSync } = require('child_process');

function setClipboard(value) {
  const escaped = String(value).replace(/"/g, '""');
  execSync(`powershell -NoProfile -Command "Set-Clipboard -Value \\"${escaped}\\""`, { stdio: 'pipe' });
}

async function readClipboard(page) {
  const resultado = await page.evaluate(async () => {
    try {
      return { ok: true, valor: await navigator.clipboard.readText() };
    } catch (e) {
      return { ok: false, erro: e.message };
    }
  });
  if (!resultado.ok) {
    throw new Error(`Falha ao ler clipboard: ${resultado.erro}`);
  }
  return resultado.valor;
}

// Espera a Name Box ficar habilitada (Sheets mantem ela disabled enquanto ainda
// esta carregando/inicializando a planilha logo apos abrir a aba). Seguro chamar
// toda vez -- se ja estiver habilitada, o waitFor retorna na hora.
async function esperarPlanilhaCarregar(page, timeoutMs = 15000) {
  await page.locator('#t-name-box:not([disabled])').waitFor({ timeout: timeoutMs });
}

async function irParaCelula(page, celula) {
  await esperarPlanilhaCarregar(page);
  const nameBox = page.locator('#t-name-box');
  await nameBox.click({ timeout: 5000 });
  await page.waitForTimeout(200);
  await page.keyboard.type(celula, { delay: 50 });
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);

  const bodyText = await page.locator('body').innerText();
  if (bodyText.includes('Ocorreu um erro')) {
    const okButton = page.locator('button:has-text("OK")').first();
    if (await okButton.count() > 0) await okButton.click();
    throw new Error(
      `Erro ao navegar pra célula ${celula} — provável estado sujo da aba (ver lição crítica no topo do arquivo). Abrir aba nova.`
    );
  }
}

async function escreverCelula(page, celula, valor) {
  setClipboard(valor);
  await irParaCelula(page, celula);
  await page.keyboard.press('Control+v');
  await page.waitForTimeout(800);
}

async function lerCelula(page, celula) {
  await irParaCelula(page, celula);
  await page.keyboard.press('Control+c');
  await page.waitForTimeout(500);
  const valor = await readClipboard(page);
  return valor.replace(/\r?\n$/, ''); // remove quebra de linha final que o Sheets sempre inclui
}

async function limparCelula(page, celula) {
  await irParaCelula(page, celula);
  await page.keyboard.press('Delete');
  await page.waitForTimeout(400);
}

// Escreve varias colunas de uma vez a partir de uma celula inicial (ex: "A50"),
// juntando os valores com tab -- o Sheets expande automaticamente pras colunas
// seguintes ao colar um texto com tab. Cada valor NAO pode conter tab nem quebra
// de linha (isso deslocaria o alinhamento das colunas) -- validado abaixo, lanca
// erro em vez de colar errado silenciosamente.
async function escreverLinha(page, celulaInicial, valores) {
  valores.forEach((v, i) => {
    const texto = String(v);
    if (/[\t\n\r]/.test(texto)) {
      throw new Error(
        `escreverLinha: valor na posição ${i} contém tab ou quebra de linha, o que deslocaria as colunas seguintes: ${JSON.stringify(texto)}`
      );
    }
  });
  const linha = valores.map((v) => String(v)).join('\t');
  await escreverCelula(page, celulaInicial, linha);
}

// Mescla um range de celulas (ex: "A1:Y1"). Requer 2 cliques, nao 1 -- descoberto em
// 13/08/2026 depois de horas de investigacao (Chrome degradado, abas duplicadas, aba
// suja, clique por coordenada real -- nenhuma dessas hipoteses era a causa real):
// o item "Mesclar celulas" do menu Formatar ABRE UM SUBMENU sozinho ao ser clicado
// (nao precisa de hover). O clique nele so ABRE o submenu -- a acao de mesclar de
// verdade fica no item filho "Mesclar todas" (nao "Mesclar tudo", nome errado usado
// nas primeiras tentativas, que fazia o codigo nunca achar o item certo). Um script
// que clica so no item pai "parece" funcionar (nenhum erro, nenhum timeout) mas nao
// mescla nada -- silencioso, sem aviso nenhum.
async function mesclarRange(page, range) {
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  const menuFormatar = page.locator('#docs-format-menu, [aria-label="Formatar"]').first();
  await menuFormatar.click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const itemMesclar = page.locator('.goog-menuitem', { hasText: 'Mesclar células' }).first();
  await itemMesclar.click({ timeout: 5000 }); // abre o submenu, nao mescla ainda
  await page.waitForTimeout(400);
  const mesclarTodas = page.locator('.goog-menuitem').filter({ hasText: /^Mesclar todas$/ }).first();
  await mesclarTodas.click({ timeout: 5000 }); // AQUI mescla de verdade
  await page.waitForTimeout(500);
}

// Desfaz mesclagem de um range. "Ctrl+\\" (Limpar formatacao) e mais confiavel que o
// submenu "Mesclar celulas > Desfazer mesclagem" -- esse submenu especifico nunca
// respondeu de forma confiavel a hover/click automatizado nesta configuracao (aba
// em background dentro de janela minimizada), mesmo com bringToFront().
async function desfazerMesclagem(page, range) {
  await irParaCelula(page, range);
  await page.waitForTimeout(200);
  await page.keyboard.press('Control+\\');
  await page.waitForTimeout(400);
}

module.exports = {
  esperarPlanilhaCarregar,
  irParaCelula,
  escreverCelula,
  escreverLinha,
  lerCelula,
  limparCelula,
  mesclarRange,
  desfazerMesclagem,
};
