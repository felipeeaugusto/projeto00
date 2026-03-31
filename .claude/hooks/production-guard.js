#!/usr/bin/env node
/**
 * production-guard.js — Bloqueio técnico de execução em produção
 *
 * PROBLEMA QUE RESOLVE:
 *   @dev rodou publisher.js em produção durante "teste" — publicou carrossel-03
 *   no Instagram e Facebook com legenda não aprovada. Causado por delegação sem
 *   fronteira explícita de produção.
 *
 * SOLUÇÃO (2 camadas):
 *   1. Este hook — enforcement técnico: bloqueia execução de scripts de produção
 *      se o agente ativo não tiver permissão explícita.
 *   2. BLOCO 0-P no CLAUDE.md — exige template de delegação com campo PRODUÇÃO.
 *
 * SCRIPTS PROTEGIDOS (qualquer agente exceto os autorizados é bloqueado):
 *   - publisher.js  → apenas publisher-agent pode rodar
 *   - (expansível: adicionar outros scripts de produção aqui)
 *
 * AGENTES AUTORIZADOS POR SCRIPT:
 *   publisher.js → ['publisher-agent', 'aiox-master']
 *   (aiox-master pode rodar em contexto de debug com justificativa explícita)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Mapa: padrão de script → agentes autorizados ──────────────────────────
const PRODUCTION_SCRIPTS = [
  {
    pattern: /publisher\.js/,
    label:   'publisher.js (publicação Instagram + Facebook)',
    allowed: ['publisher-agent', 'aiox-master'],
  },
];

// ─── Ler agente ativo ───────────────────────────────────────────────────────
const AGENT_FILE = path.join(__dirname, '..', '.current-agent');
let currentAgent = '';
try {
  currentAgent = fs.readFileSync(AGENT_FILE, 'utf8').trim().toLowerCase();
} catch {
  // Sem agente ativo = base Claude / sessão limpa = permite
  process.exit(0);
}

// ─── Ler tool input do stdin ────────────────────────────────────────────────
let rawInput = '';
process.stdin.on('data', chunk => (rawInput += chunk));
process.stdin.on('end', () => {
  let toolName = '';
  let command  = '';

  try {
    const data = JSON.parse(rawInput);
    toolName   = (data.tool_name || data.name || '').toLowerCase();
    command    = data.input?.command || data.command || '';
  } catch {
    process.exit(0);
  }

  // Só inspeciona comandos Bash
  if (toolName !== 'bash') {
    process.exit(0);
  }

  // Verificar cada script protegido
  for (const rule of PRODUCTION_SCRIPTS) {
    if (rule.pattern.test(command)) {
      if (rule.allowed.includes(currentAgent)) {
        // Agente autorizado — permite
        process.exit(0);
      }

      // ── BLOQUEADO ──────────────────────────────────────────────────────────
      process.stderr.write('\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      process.stderr.write('🔴  PRODUÇÃO BLOQUEADA — production-guard.js\n');
      process.stderr.write('\n');
      process.stderr.write(`   Script detectado : ${rule.label}\n`);
      process.stderr.write(`   Agente atual     : @${currentAgent}\n`);
      process.stderr.write(`   Agentes autorizados: ${rule.allowed.map(a => '@' + a).join(', ')}\n`);
      process.stderr.write('\n');
      process.stderr.write('   Este script toca contas reais (Instagram + Facebook).\n');
      process.stderr.write('   Só publisher-agent pode executá-lo, após:\n');
      process.stderr.write('   1. copy-agent escrever a legenda\n');
      process.stderr.write('   2. julia-chief aprovar o conteúdo\n');
      process.stderr.write('   3. Felipe confirmar a publicação\n');
      process.stderr.write('\n');
      process.stderr.write('   Para publicar: chame o publisher-agent explicitamente.\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      process.stderr.write('\n');

      process.exit(1); // Bloqueia
    }
  }

  // Nenhum script protegido detectado — permite
  process.exit(0);
});
