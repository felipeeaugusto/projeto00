/**
 * FASE 1 / passo 1.1 — Extração estrutural dos arquivos do framework.
 *
 * Determinístico, sem LLM. Varre .aiox-core/ e squads/, e para cada arquivo
 * extrai o esqueleto (headings do md, chaves do yaml, exports/classes do js).
 *
 * Saídas:
 *   .aiox/leitura/indice.md    — legível, agrupado por pasta
 *   .aiox/leitura/indice.json  — insumo do passo 1.2 (divisão em fatias)
 *
 * Uso: node .aiox/leitura/gerar-indice.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const SAIDA_MD = path.join(__dirname, 'indice.md');
const SAIDA_JSON = path.join(__dirname, 'indice.json');

const ALVOS = ['.aiox-core', path.join('squads', 'squad-creator-pro'), path.join('squads', 'squad-creator')];
const IGNORAR_DIR = new Set(['node_modules', '.git', '.cache', 'dist', 'build', 'coverage', '.next']);
// Extensões com conteúdo de framework legível. Excluídas de propósito: .pyc (bytecode
// compilado), .gitkeep/.gitignore (marcadores vazios), .svg (não é texto estrutural).
const EXTENSOES = new Set([
  '.md', '.yaml', '.yml', '.js', '.cjs', '.mjs', '.json', '.jsonl',
  '.py', '.sh', '.ps1', '.cmd', '.sql', '.hbs', '.css', '.jsx', '.tsx',
  '.template', '.tmpl', '.txt', '.csv', '.html',
]);

const MAX_ITENS_ESTRUTURA = 30;
const MAX_LEN_ITEM = 110;

function listarArquivos(dir, acc = []) {
  let entradas;
  try {
    entradas = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc; // pasta ilegível: ignora em vez de derrubar a varredura inteira
  }
  for (const e of entradas) {
    const completo = path.join(dir, e.name);
    if (e.isSymbolicLink()) continue; // evita loop infinito por link circular
    if (e.isDirectory()) {
      if (IGNORAR_DIR.has(e.name)) continue;
      listarArquivos(completo, acc);
    } else if (e.isFile() && EXTENSOES.has(path.extname(e.name).toLowerCase())) {
      acc.push(completo);
    }
  }
  return acc;
}

function corta(s) {
  const limpo = String(s).replace(/\s+/g, ' ').trim();
  return limpo.length > MAX_LEN_ITEM ? limpo.slice(0, MAX_LEN_ITEM - 1) + '…' : limpo;
}

function estruturaMarkdown(linhas) {
  const itens = [];
  let emFence = false;
  for (const l of linhas) {
    if (/^\s*(```|~~~)/.test(l)) { emFence = !emFence; continue; }
    if (emFence) continue; // "# comentário" dentro de bloco de código não é heading
    const m = /^(#{1,4})\s+(.+)$/.exec(l);
    if (m) itens.push(`${'  '.repeat(m[1].length - 1)}${m[1]} ${corta(m[2])}`);
  }
  return itens;
}

function estruturaYaml(linhas) {
  const itens = [];
  let emBloco = false;
  for (const l of linhas) {
    if (/^\s*#/.test(l) || !l.trim()) continue;
    // pula conteúdo de bloco literal (|, >) que não é chave
    if (emBloco && /^\s{2,}/.test(l)) continue;
    emBloco = /[|>][-+]?\s*$/.test(l);
    const m0 = /^([A-Za-z0-9_.-]+):/.exec(l);
    if (m0) { itens.push(m0[1] + ':'); continue; }
    const m1 = /^\s{2}([A-Za-z0-9_.-]+):/.exec(l);
    if (m1) itens.push('  ' + m1[1] + ':');
  }
  return itens;
}

function estruturaJs(linhas) {
  const itens = [];
  for (const l of linhas) {
    let m;
    if ((m = /^\s*class\s+([A-Za-z0-9_$]+)/.exec(l))) itens.push(`class ${m[1]}`);
    else if ((m = /^\s*(?:async\s+)?function\s+([A-Za-z0-9_$]+)/.exec(l))) itens.push(`fn ${m[1]}()`);
    else if ((m = /^\s*(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?\(/.exec(l))) itens.push(`fn ${m[1]}()`);
    else if ((m = /^\s*module\.exports\s*=\s*(.*)$/.exec(l))) itens.push(`exports = ${corta(m[1])}`);
    else if ((m = /^\s*exports\.([A-Za-z0-9_$]+)/.exec(l))) itens.push(`exports.${m[1]}`);
  }
  return itens;
}

function estruturaPy(linhas) {
  const itens = [];
  for (const l of linhas) {
    let m;
    if ((m = /^\s*class\s+([A-Za-z0-9_]+)/.exec(l))) itens.push(`class ${m[1]}`);
    else if ((m = /^\s*(?:async\s+)?def\s+([A-Za-z0-9_]+)/.exec(l))) itens.push(`def ${m[1]}()`);
  }
  return itens;
}

function estruturaScript(linhas) {
  const itens = [];
  for (const l of linhas) {
    let m;
    if ((m = /^\s*(?:function\s+([A-Za-z0-9_-]+)|([A-Za-z0-9_-]+)\s*\(\)\s*\{)/.exec(l))) itens.push(`fn ${m[1] || m[2]}()`);
    else if ((m = /^\s*#\s*(={3,}|-{3,})?\s*([A-Z][A-Za-z0-9 _-]{3,60})\s*\1?\s*$/.exec(l))) itens.push(`# ${corta(m[2])}`);
  }
  return itens;
}

function estruturaJson(texto) {
  try {
    const o = JSON.parse(texto);
    if (o && typeof o === 'object' && !Array.isArray(o)) return Object.keys(o).map(k => `${k}:`);
    return [Array.isArray(o) ? `array[${o.length}]` : typeof o];
  } catch {
    return ['(json inválido)'];
  }
}

function analisar(arquivo) {
  const rel = path.relative(RAIZ, arquivo).split(path.sep).join('/');
  let texto;
  try {
    texto = fs.readFileSync(arquivo, 'utf8');
  } catch (e) {
    return { arquivo: rel, linhas: 0, bytes: 0, estrutura: [], erro: e.code || 'ERRO_LEITURA' };
  }
  // Conta quebras de linha reais (igual wc -l), não segmentos do split — um arquivo
  // sem \n final não pode aparecer com +1 linha fantasma.
  const linhas = (texto.match(/\n/g) || []).length;
  const ext = path.extname(arquivo).toLowerCase();
  let estrutura;
  if (ext === '.md') estrutura = estruturaMarkdown(texto.split('\n'));
  else if (ext === '.yaml' || ext === '.yml') estrutura = estruturaYaml(texto.split('\n'));
  else if (ext === '.json' || ext === '.jsonl') estrutura = estruturaJson(texto);
  else if (ext === '.js' || ext === '.cjs' || ext === '.mjs' || ext === '.jsx' || ext === '.tsx') estrutura = estruturaJs(texto.split('\n'));
  else if (ext === '.py') estrutura = estruturaPy(texto.split('\n'));
  else if (ext === '.sh' || ext === '.ps1' || ext === '.cmd') estrutura = estruturaScript(texto.split('\n'));
  else estrutura = []; // .css, .sql, .hbs, .html, .txt, .csv, .template, .tmpl — sem esqueleto extraível, conta só linhas

  const total = estrutura.length;
  if (total > MAX_ITENS_ESTRUTURA) {
    estrutura = estrutura.slice(0, MAX_ITENS_ESTRUTURA);
    estrutura.push(`… (+${total - MAX_ITENS_ESTRUTURA} itens)`);
  }
  return { arquivo: rel, linhas, bytes: Buffer.byteLength(texto, 'utf8'), ext, estrutura, itensEstrutura: total };
}

// ---- execução ----
const t0 = Date.now();
const registros = [];
const faltando = [];

for (const alvo of ALVOS) {
  const dir = path.join(RAIZ, alvo);
  if (!fs.existsSync(dir)) { faltando.push(alvo); continue; }
  for (const f of listarArquivos(dir)) registros.push(analisar(f));
}

registros.sort((a, b) => a.arquivo.localeCompare(b.arquivo));

const totalLinhas = registros.reduce((s, r) => s + r.linhas, 0);
const comErro = registros.filter(r => r.erro);

// agrupar por pasta (2 níveis)
const porPasta = new Map();
for (const r of registros) {
  const p = r.arquivo.split('/').slice(0, 3).join('/');
  if (!porPasta.has(p)) porPasta.set(p, []);
  porPasta.get(p).push(r);
}

const out = [];
out.push('# Índice estrutural do framework — FASE 1 / passo 1.1');
out.push('');
out.push(`> Gerado em ${new Date().toISOString()} por \`.aiox/leitura/gerar-indice.js\` — determinístico, sem LLM.`);
out.push('> Cada arquivo aparece com sua contagem de linhas e o esqueleto extraído (headings, chaves, exports).');
out.push('');
out.push('## Totais');
out.push('');
out.push('| Métrica | Valor |');
out.push('|---|---|');
out.push(`| Arquivos | **${registros.length}** |`);
out.push(`| Linhas | **${totalLinhas.toLocaleString('pt-BR')}** |`);
out.push(`| Pastas (2 níveis) | ${porPasta.size} |`);
out.push(`| Erros de leitura | ${comErro.length} |`);
out.push(`| Alvos ausentes | ${faltando.length ? faltando.join(', ') : 'nenhum'} |`);
out.push('');

const porExt = new Map();
for (const r of registros) {
  const k = r.ext || '?';
  const v = porExt.get(k) || { n: 0, linhas: 0 };
  v.n++; v.linhas += r.linhas;
  porExt.set(k, v);
}
out.push('| Extensão | Arquivos | Linhas |');
out.push('|---|---|---|');
for (const [k, v] of [...porExt].sort((a, b) => b[1].linhas - a[1].linhas)) {
  out.push(`| \`${k}\` | ${v.n} | ${v.linhas.toLocaleString('pt-BR')} |`);
}
out.push('');
out.push('---');
out.push('');

for (const [pasta, arqs] of [...porPasta].sort((a, b) => a[0].localeCompare(b[0]))) {
  const l = arqs.reduce((s, r) => s + r.linhas, 0);
  out.push(`## \`${pasta}/\` — ${arqs.length} arquivos · ${l.toLocaleString('pt-BR')} linhas`);
  out.push('');
  for (const r of arqs.sort((a, b) => b.linhas - a.linhas)) {
    out.push(`### \`${r.arquivo}\` — ${r.linhas} linhas`);
    if (r.erro) { out.push(`- ⚠️ erro: ${r.erro}`); out.push(''); continue; }
    if (r.estrutura.length === 0) out.push('- *(sem estrutura extraível)*');
    else for (const it of r.estrutura) out.push(`- ${it}`);
    out.push('');
  }
}

fs.writeFileSync(SAIDA_MD, out.join('\n'), 'utf8');
fs.writeFileSync(SAIDA_JSON, JSON.stringify({
  geradoEm: new Date().toISOString(),
  raiz: RAIZ,
  alvos: ALVOS,
  totais: { arquivos: registros.length, linhas: totalLinhas, erros: comErro.length },
  arquivos: registros.map(r => ({ arquivo: r.arquivo, linhas: r.linhas, bytes: r.bytes, ext: r.ext, itensEstrutura: r.itensEstrutura })),
}, null, 2), 'utf8');

console.log(`arquivos:      ${registros.length}`);
console.log(`linhas:        ${totalLinhas}`);
console.log(`erros leitura: ${comErro.length}`);
if (faltando.length) console.log(`ALVOS AUSENTES: ${faltando.join(', ')}`);
console.log(`indice.md:     ${(fs.statSync(SAIDA_MD).size / 1024).toFixed(0)} KB`);
console.log(`indice.json:   ${(fs.statSync(SAIDA_JSON).size / 1024).toFixed(0)} KB`);
console.log(`tempo:         ${((Date.now() - t0) / 1000).toFixed(1)}s`);
