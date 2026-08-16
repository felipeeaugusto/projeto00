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
 * MECANISMO (evento PreToolUse, matcher Write|Edit):
 *   Antes de um Write/Edit ser aplicado, este hook olha o conteúdo que está sendo
 *   escrito. Se o conteúdo declara um seletor de busca/input "solto" (ex:
 *   `input[placeholder`, `input[type="search"`) SEM nenhuma referência a
 *   `SELETOR_BUSCA` ou a um `require(...)` de um pipeline de produção já validado
 *   — nem no trecho novo, nem no arquivo em disco (pro caso de Edit incremental) —
 *   bloqueia (exit 1) e pede pro agente importar/reusar em vez de reimplementar.
 *
 * IMPORTANTE — calibração 2 (16/08/2026, achado do @analyst via *elicit):
 *   a 1ª versão só detectava seletor no formato de atributo (`input[placeholder...`,
 *   `input[type="search"...`). Testado ao vivo pelo Atlas: um script usando o MESMO
 *   campo errado por CLASSE CSS (`.nav-header-sellers-search__input`, exatamente a
 *   classe já documentada em mapeamento-skus-ads-catalogo-mercadolivre.md) passava
 *   batido, sem ser bloqueado. Corrigido com `CLASSE_CAMPO_ERRADO_PATTERN` -- um
 *   padrão específico e literal pra essa classe já conhecida como errada (não uma
 *   generalização pra "qualquer seletor CSS", que geraria falso positivo em código
 *   sem relação nenhuma com essa automação).
 *   Re-testado contra os 4 cenários originais + o cenário novo da classe CSS -- os
 *   5 continuam se comportando como esperado (ver PASSO 3 da validação).
 *
 *   Decisão consciente, não implementada: `page.getByPlaceholder(...)` (método
 *   semântico do Playwright) também acharia o campo sem usar `input[placeholder`,
 *   mas cobrir isso de forma genérica arriscaria falso positivo em scripts de
 *   automação de OUTROS sites/projetos que nada têm a ver com Mercado Livre (esse
 *   hook roda pra qualquer `.js` do repo, não só Karzen). Não existe regex que cubra
 *   toda a superfície de seletores possíveis do Playwright (getByRole, getByTestId,
 *   XPath, seletor montado por concatenação de string, etc.) -- esse hook é uma
 *   camada de defesa contra o padrão de erro já visto na prática, não uma garantia
 *   absoluta. Mesma filosofia já documentada no PRINCÍPIO do CLAUDE.md (antes da
 *   BLOCO 0-K): reforço técnico complementa a regra escrita, não a substitui.
 */

'use strict';

const fs = require('fs');

// ─── Padrão de seletor de busca/input declarado "solto" no texto (atributo) ─
const SELETOR_SOLTO_PATTERN = /input\[\s*(type\s*=\s*["']search["']|placeholder)/i;

// ─── Classe CSS do campo ERRADO já documentado (mesmo campo, sintaxe diferente) ─
const CLASSE_CAMPO_ERRADO_PATTERN = /nav-header-sellers-search__input/i;

// ─── Sinal de que o script é automação de browser (Playwright) ─────────────
const PLAYWRIGHT_PATTERN = /\.locator\(|page\.locator|chromium\.connectOverCDP/i;

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

  const declaraSeletorSuspeito = SELETOR_SOLTO_PATTERN.test(novoTrecho) || CLASSE_CAMPO_ERRADO_PATTERN.test(novoTrecho);

  if (!PLAYWRIGHT_PATTERN.test(novoTrecho) || !declaraSeletorSuspeito) {
    process.exit(0); // não é automação de browser, ou não declara seletor de busca/input suspeito
  }

  if (REUSO_VALIDADO_PATTERN.test(novoTrecho)) {
    process.exit(0); // já referencia SELETOR_BUSCA/pipeline no próprio trecho novo -- ok
  }

  // Edit incremental: o arquivo em disco (antes desta edição) pode já ter a
  // referência em outro trecho -- não bloquear nesse caso.
  if (toolName === 'edit' && fs.existsSync(filePath)) {
    try {
      const conteudoAtual = fs.readFileSync(filePath, 'utf8');
      if (REUSO_VALIDADO_PATTERN.test(conteudoAtual)) {
        process.exit(0);
      }
    } catch {
      // erro de leitura -- segue pro bloqueio normal, não falha aberto aqui
      // (diferente de erro de parse do stdin, que é infra; aqui já sabemos que
      // o trecho novo tem seletor solto e é playwright, então mantém cautela)
    }
  }

  process.stderr.write(
    'BLOCO 0-AA: este script declara um seletor de busca/input solto ' +
    '(ex: input[placeholder..., input[type="search"..., ou a classe nav-header-sellers-search__input) ' +
    'sem referenciar SELETOR_BUSCA ' +
    'nem importar um pipeline de produção já validado (ex: pipeline-pausados-campanha-completo.js). ' +
    'Antes de continuar: verifique se já existe um pipeline validado pro mesmo site/tela e ' +
    'importe/reuse a constante/função existente em vez de reimplementar o seletor do zero. ' +
    'Se não existir pipeline equivalente, documente o seletor validado no doc de processo ' +
    'correspondente (ver BLOCO 0-AB) antes de considerar a tarefa concluída.'
  );
  process.exit(1); // bloqueia o Write/Edit
});
