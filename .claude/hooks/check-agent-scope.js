#!/usr/bin/env node
/**
 * check-agent-scope.js — Enforcement de escopo de agentes AIOX
 *
 * Lógica: WHITELIST — apenas os agentes abaixo podem usar Edit/Write.
 * Qualquer outro agente (existente ou futuro) é bloqueado automaticamente.
 *
 * Agentes que PODEM editar arquivos:
 *   - aiox-master (escopo universal)
 *   - dev         (implementação de código)
 *   - devops      (operações git/CI)
 */

const fs   = require('fs');
const path = require('path');

// ─── Whitelist: APENAS esses agentes podem usar Edit/Write ─────────────────
const CAN_EDIT = ['aiox-master', 'dev', 'devops'];

// ─── Agente correto para cada agente bloqueado ──────────────────────────────
const CORRECT_AGENT = {
  'analyst':          '@dev — editar arquivos de código/config',
  'hormozi-audit':    '@dev — implementar HTML/CSS/JS',
  'hormozi-copy':     '@dev — implementar copy no HTML',
  'hormozi-offers':   '@dev — implementar ofertas no HTML',
  'pm':               '@dev — implementar código',
  'po':               '@dev — implementar código',
  'sm':               '@dev — implementar código',
  'architect':        '@dev — implementar decisões de arquitetura',
  'qa':               '@dev — aplicar correções identificadas',
  'ux-design-expert': '@dev — implementar design no código',
  'data-engineer':    '@dev — implementar DDL/migrations',
};

// ─── Ler agente ativo ───────────────────────────────────────────────────────
const AGENT_FILE = path.join(__dirname, '..', '.current-agent');
let currentAgent = '';
try {
  currentAgent = fs.readFileSync(AGENT_FILE, 'utf8').trim().toLowerCase();
} catch (e) {
  // Arquivo não existe = sem agente ativo = permite (base Claude / @aiox-master)
  process.exit(0);
}

// Agente na whitelist → permite sem verificar
if (!currentAgent || CAN_EDIT.includes(currentAgent)) {
  process.exit(0);
}

// ─── Ler tool name do stdin (Claude Code passa JSON via stdin) ──────────────
let rawInput = '';
process.stdin.on('data', chunk => rawInput += chunk);
process.stdin.on('end', () => {
  let toolName = '';
  try {
    const data = JSON.parse(rawInput);
    toolName = (data.tool_name || data.name || '').toLowerCase();
  } catch (e) {
    process.exit(0);
  }

  const isEditTool = ['edit', 'write', 'notebookedit'].includes(toolName);

  if (isEditTool) {
    const correct = CORRECT_AGENT[currentAgent] || '@dev ou @aiox-master';

    process.stderr.write('\n');
    process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.stderr.write(`❌  BLOQUEADO — violação de escopo detectada\n`);
    process.stderr.write(`\n`);
    process.stderr.write(`   Agente atual : @${currentAgent}\n`);
    process.stderr.write(`   Tool usada   : ${toolName}\n`);
    process.stderr.write(`   Agente certo : ${correct}\n`);
    process.stderr.write(`\n`);
    process.stderr.write(`⚡  Ativando agente correto e reexecutando...\n`);
    process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.stderr.write('\n');

    process.exit(1); // Bloqueia
  }

  process.exit(0); // Permite
});
