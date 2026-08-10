#!/usr/bin/env node
/**
 * check-handoff-audit.js — Enforcement técnico da BLOCO 0-K
 *
 * PROBLEMA QUE RESOLVE:
 *   A BLOCO 0-K ("auditar antes de oferecer handoff pra outro agente") dependia só de
 *   autopercepção do agente — mesmo defeito estrutural que a BLOCO 0-F tinha antes de
 *   virar BLOCO 0-Y. Confirmado em produção (10/08/2026): um agente chegou a uma frase
 *   de distância de oferecer handoff sem ter auditado nada.
 *
 * MECANISMO (evento Stop):
 *   Depois que o agente termina de gerar uma resposta, este hook lê a última mensagem.
 *   Se ela contém um padrão de oferta de handoff ("quer que eu chame...") SEM a linha
 *   de auditoria no formato exigido pela BLOCO 0-K, bloqueia o fim do turno (exit 2) e
 *   devolve instrução pro agente completar a auditoria antes de realmente parar.
 *
 * IMPORTANTE — ainda não testado em produção (ver BLOCO 0-K, item 7 da convergência):
 *   os padrões de regex abaixo são a primeira versão — precisam ser testados contra
 *   mensagens reais antes de considerar isso 100% calibrado (risco de falso positivo).
 */

'use strict';

const fs = require('fs');

// ─── Padrões de oferta de handoff (case-insensitive) ────────────────────────
const HANDOFF_PATTERN = /quer que eu (chame|acione|convoque)|posso (chamar|acionar) o @?[\w-]+/i;

// ─── Padrão exigido pela BLOCO 0-K (linha de auditoria) ─────────────────────
const AUDIT_LINE_PATTERN = /auditoria:.*itens[- ]em[- ]aberto/i;

let rawInput = '';
process.stdin.on('data', chunk => (rawInput += chunk));
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(rawInput);
  } catch {
    process.exit(0); // não conseguiu ler input -- não bloqueia (fail-open na infra)
  }

  // Evita loop infinito -- se este hook já bloqueou este turno, não bloqueia de novo
  if (data.stop_hook_active) {
    process.exit(0);
  }

  const transcriptPath = data.transcript_path;
  if (!transcriptPath || !fs.existsSync(transcriptPath)) {
    process.exit(0);
  }

  let lastAssistantText = '';
  try {
    const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
    // Percorre de trás pra frente procurando a última mensagem do assistant
    for (let i = lines.length - 1; i >= 0; i--) {
      let entry;
      try {
        entry = JSON.parse(lines[i]);
      } catch {
        continue;
      }
      const msg = entry.message;
      if (msg && msg.role === 'assistant' && Array.isArray(msg.content)) {
        lastAssistantText = msg.content
          .filter(block => block.type === 'text')
          .map(block => block.text)
          .join('\n');
        break;
      }
    }
  } catch {
    process.exit(0); // erro de leitura -- fail-open na infra
  }

  if (!lastAssistantText) {
    process.exit(0);
  }

  // Só considera oferta de handoff se: (a) a mensagem termina em "?" -- ofertas reais
  // são sempre a pergunta final -- E (b) o padrão aparece perto do final (últimos 250
  // caracteres). Reduz falso positivo de menções/citações no meio do texto (ex: "ontem
  // eu perguntei 'quer que eu chame...' e você disse sim"), que não terminam em "?".
  const trimmed = lastAssistantText.trim();
  const endsAsQuestion = trimmed.endsWith('?');
  const tail = trimmed.slice(-250);

  const offersHandoff = endsAsQuestion && HANDOFF_PATTERN.test(tail);
  const hasAuditLine = AUDIT_LINE_PATTERN.test(lastAssistantText);

  if (offersHandoff && !hasAuditLine) {
    process.stderr.write(
      'BLOCO 0-K: esta resposta oferece handoff para outro agente ("quer que eu chame...") ' +
      'sem a linha de auditoria obrigatória. Antes de finalizar, adicione uma linha no formato ' +
      'exato: "🔍 Auditoria: lista checada, N itens em aberto (referência: .aiox/itens-em-aberto.md)" ' +
      '— leia .aiox/itens-em-aberto.md primeiro para saber o N real.'
    );
    process.exit(2); // bloqueia o fim do turno
  }

  process.exit(0);
});
