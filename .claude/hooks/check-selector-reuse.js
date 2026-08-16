#!/usr/bin/env node
/**
 * check-selector-reuse.js — Enforcement técnico da BLOCO 0-AA
 *
 * PROBLEMA QUE RESOLVE:
 *   A BLOCO 0-AA ("nunca reimplementar seletor/lógica de automação já validada em
 *   produção") depende só de autopercepção do agente — mesmo defeito estrutural que
 *   a BLOCO 0-K tinha antes do check-handoff-audit.js. Confirmado em produção
 *   (16/08/2026): o @dev escreveu vários scripts de diagnóstico ad-hoc durante uma
 *   investigação ao vivo, reimplementando o seletor de busca do Mercado Livre do zero
 *   (`input[type="search"], input[placeholder*="Buscar"]`) em vez de importar
 *   `SELETOR_BUSCA` do pipeline já validado (`pipeline-pausados-campanha-completo.js`).
 *   O seletor genérico bateu no campo de busca ERRADO da tela, gerando dado
 *   contaminado que pareceu confirmar um bug que nunca existiu — horas de
 *   investigação perdidas.
 *
 * HISTÓRICO DE CALIBRAÇÃO — por que a abordagem mudou (16/08/2026):
 *   v1: detectava só `input[placeholder...`/`input[type="search"...` (sintaxe de
 *   atributo). O @analyst achou, testando ao vivo, que um seletor por CLASSE CSS
 *   (`.nav-header-sellers-search__input`, o mesmo campo errado) escapava.
 *   v2: adicionou um padrão literal só pra essa classe. O @analyst achou de novo,
 *   testando ao vivo, que `page.getByPlaceholder(...)` — o método SEMÂNTICO do
 *   Playwright, forma idiomática/recomendada hoje em dia — também escapava. Padrão
 *   confirmado: cada correção tapava 1 sintaxe específica, sempre haveria uma nova
 *   forma de escrever o mesmo seletor que escaparia da detecção (getByRole,
 *   getByTestId, XPath, string concatenada, etc.) — sem mudar a estrutura do
 *   problema.
 *   v3 (atual): inverte a lógica. Em vez de detectar PRESENÇA de um padrão de
 *   seletor ruim específico, detecta AUSÊNCIA de reuso (`SELETOR_BUSCA`/pipeline
 *   validado) num arquivo que (a) claramente interage com a tela de Anúncios do
 *   Mercado Livre E (b) mostra sinal de que vai preencher/buscar um campo (não
 *   importa a sintaxe usada). Isso cobre qualquer forma atual ou futura de escrever
 *   o seletor errado, porque o critério não é "como foi escrito", é "não reusou o
 *   que já é validado".
 *
 * MECANISMO (evento PreToolUse, matcher Write|Edit):
 *   1. Só considera arquivo `.js`.
 *   2. Monta um texto combinado (trecho novo sendo escrito + conteúdo atual do
 *      arquivo em disco, se for Edit) -- pra não perder contexto que já existe no
 *      arquivo mas não está no trecho novo (ex: import da URL no topo do arquivo).
 *   3. CONTEXTO: esse texto combinado referencia a tela de Anúncios do Mercado
 *      Livre (URL literal ou constante `URL_ANUNCIOS`), OU o arquivo está fisicamente
 *      em `packages/karzen/.aiox-runtime/` E usa `chromium.connectOverCDP`?
 *   4. SINAL DE BUSCA: o TRECHO NOVO (não o arquivo inteiro -- só bloqueia quando é
 *      a mudança atual que introduz isso) usa `.fill(`, `.type(` ou
 *      `getByPlaceholder(` -- sinais de que vai preencher/localizar um campo de
 *      busca, qualquer que seja a sintaxe do seletor em si?
 *   5. REUSO: o texto combinado já referencia `SELETOR_BUSCA` ou importa o pipeline
 *      validado (`pipeline-pausados-campanha-completo.js`)?
 *   6. SE contexto E sinal de busca E NÃO reuso → bloqueia (exit 1).
 *
 * POR QUE `.locator(`/`page.locator`/`getByRole(` sozinhos NÃO contam como "sinal
 * de busca": um script pode legitimamente usar `.locator(...)` pra clicar num botão
 * já visível (ex: "Pausar anúncio") ou tirar screenshot, sem nunca buscar/preencher
 * nada -- bloquear esse caso seria falso positivo real (risco que o próprio
 * @analyst apontou). Restringir a `.fill(`/`.type(`/`getByPlaceholder(` mantém o
 * foco em "vai preencher um campo", que é o cenário real do incidente.
 *
 * LIMITE CONHECIDO, ainda assim: isso não é garantia absoluta (nenhum hook baseado
 * em heurística é). Um script que preenche o campo via alguma técnica totalmente
 * fora do radar (ex: `page.keyboard.type(...)` sem nenhum `.fill(`/`.type(` de
 * elemento, ou manipulação direta de DOM via `page.evaluate`) ainda escaparia.
 * Mesma filosofia já documentada no PRINCÍPIO do CLAUDE.md (antes da BLOCO 0-K):
 * reforço técnico complementa a regra escrita, não a substitui.
 */

'use strict';

const fs = require('fs');

// ─── Sinal de que o arquivo interage com a tela de Anúncios do Mercado Livre ─
const URL_ANUNCIOS_PATTERN = /vendedores\.mercadolivre\.com\.br\/anuncios|URL_ANUNCIOS/i;
const CONNECT_CDP_PATTERN = /chromium\.connectOverCDP/i;
const CAMINHO_KARZEN_RUNTIME_PATTERN = /packages[\\/]karzen[\\/]\.aiox-runtime/i;

// ─── Sinal de que o TRECHO NOVO vai preencher/localizar um campo de busca ────
const SINAL_BUSCA_PATTERN = /\.fill\(|\.type\(|getByPlaceholder\(/i;

// ─── Sinal de que o script reusa algo já validado, em vez de reimplementar ──
const REUSO_VALIDADO_PATTERN = /SELETOR_BUSCA|require\([^)]*pipeline-pausados-campanha-completo/i;

let rawInput = '';
process.stdin.on('data', chunk => (rawInput += chunk));
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(rawInput);
  } catch {
    process.exit(0); // não conseguiu ler input -- não bloqueia (fail-open na infra)
  }

  const toolName = (data.tool_name || data.name || '').toLowerCase();
  if (toolName !== 'write' && toolName !== 'edit') {
    process.exit(0);
  }

  const toolInput = data.tool_input || {};
  const filePath = toolInput.file_path || '';

  if (!filePath.endsWith('.js')) {
    process.exit(0);
  }

  // Trecho novo sendo escrito (Write: conteúdo inteiro; Edit: só o pedaço trocado)
  const novoTrecho = toolName === 'write' ? (toolInput.content || '') : (toolInput.new_string || '');

  // Conteúdo atual do arquivo em disco (relevante pra Edit incremental -- o
  // contexto/reuso pode estar em outra parte do arquivo, não no trecho novo)
  let conteudoDisco = '';
  if (toolName === 'edit' && fs.existsSync(filePath)) {
    try {
      conteudoDisco = fs.readFileSync(filePath, 'utf8');
    } catch {
      // erro de leitura -- segue sem o conteúdo do disco, não falha aberto aqui
    }
  }

  const textoContexto = novoTrecho + '\n' + conteudoDisco;

  const contextoAnuncios =
    URL_ANUNCIOS_PATTERN.test(textoContexto) ||
    (CAMINHO_KARZEN_RUNTIME_PATTERN.test(filePath) && CONNECT_CDP_PATTERN.test(textoContexto));

  if (!contextoAnuncios) {
    process.exit(0); // não é automação da tela de Anúncios do Mercado Livre
  }

  if (!SINAL_BUSCA_PATTERN.test(novoTrecho)) {
    process.exit(0); // o trecho novo não introduz preenchimento/busca de campo
  }

  if (REUSO_VALIDADO_PATTERN.test(textoContexto)) {
    process.exit(0); // já referencia SELETOR_BUSCA/pipeline validado -- ok
  }

  process.stderr.write(
    'BLOCO 0-AA: este script interage com a tela de Anúncios do Mercado Livre e ' +
    'preenche/localiza um campo (.fill(/.type(/getByPlaceholder() sem referenciar ' +
    'SELETOR_BUSCA nem importar o pipeline de produção já validado ' +
    '(pipeline-pausados-campanha-completo.js). Antes de continuar: importe/reuse a ' +
    'constante/função existente em vez de reimplementar o seletor do zero, seja qual ' +
    'for a sintaxe (atributo, classe, getByPlaceholder, getByRole, etc.). Se não ' +
    'existir pipeline equivalente pro que você está automatizando, documente o ' +
    'seletor validado no doc de processo correspondente (ver BLOCO 0-AB) antes de ' +
    'considerar a tarefa concluída.'
  );
  process.exit(1); // bloqueia o Write/Edit
});
