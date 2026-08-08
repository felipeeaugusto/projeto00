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
  return page.evaluate(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (e) {
      return 'ERRO_CLIPBOARD: ' + e.message;
    }
  });
}

// Espera a Name Box ficar habilitada (Sheets mantem ela disabled enquanto ainda
// esta carregando/inicializando a planilha logo apos abrir a aba).
async function esperarPlanilhaCarregar(page, timeoutMs = 15000) {
  await page.locator('#t-name-box:not([disabled])').waitFor({ timeout: timeoutMs });
}

async function irParaCelula(page, celula) {
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

module.exports = {
  esperarPlanilhaCarregar,
  irParaCelula,
  escreverCelula,
  lerCelula,
  limparCelula,
};
