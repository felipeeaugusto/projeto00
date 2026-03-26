#!/usr/bin/env node
/**
 * check-agent-scope.js — Enforcement de escopo de agentes AIOX
 * Bloqueia Edit/Write quando agente não tem permissão para editar arquivos.
 * Roda via PreToolUse hook no settings.json antes de qualquer chamada de ferramenta.
 */

const fs = require('fs');
const path = require('path');

// Agentes que NÃO podem usar Edit nem Write
const EDIT_BLOCKED = [
  'analyst',
  'hormozi-audit',
  'hormozi-copy',
  'hormozi-offers',
  'pm',
  'po',
  'sm',
  'architect',
  'qa',
  'ux-design-expert',
  'data-engineer',
];

// Agente correto para cada agente bloqueado
const CORRECT_AGENT = {
  'analyst':         '@dev — para editar arquivos de código/config',
  'hormozi-audit':   '@dev — para implementar HTML/CSS/JS',
  'hormozi-copy':    '@dev — para implementar copy no HTML',
  'hormozi-offers':  '@dev — para implementar ofertas no HTML',
  'pm':              '@dev — para implementar código',
  'po':              '@dev — para implementar código',
  'sm':              '@dev — para implementar código',
  'architect':       '@dev — para implementar decisões de arquitetura',
  'qa':              '@dev — para aplicar correções identificadas',
  'ux-design-expert':'@dev — para implementar design no código',
  'data-engineer':   '@dev — para implementar DDL/migrations',
};

// Ler agente ativo
const AGENT_FILE = path.join(__dirname, '..', '.current-agent');
let currentAgent = '';
try {
  currentAgent = fs.readFileSync(AGENT_FILE, 'utf8').trim().toLowerCase();
} catch (e) {
  // Arquivo não existe = @aiox-master ou base Claude = sem restrição
  process.exit(0);
}

// @aiox-master e @dev podem fazer tudo
if (!currentAgent || currentAgent === 'aiox-master' || currentAgent === 'dev' || currentAgent === 'devops') {
  process.exit(0);
}

// Ler tool name do stdin (Claude Code passa JSON via stdin)
let rawInput = '';
process.stdin.on('data', chunk => rawInput += chunk);
process.stdin.on('end', () => {
  let toolName = '';
  try {
    const data = JSON.parse(rawInput);
    toolName = (data.tool_name || data.name || '').toLowerCase();
  } catch (e) {
    process.exit(0); // Não conseguiu parsear — deixa passar
  }

  const isEditTool = toolName === 'edit' || toolName === 'write' || toolName === 'notebookedit';

  if (isEditTool && EDIT_BLOCKED.includes(currentAgent)) {
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

    process.exit(1); // Bloqueia a tool call
  }

  process.exit(0); // Permite
});
