/**
 * FASE 1 / passo 1.2 — Divide os arquivos do indice.json em N fatias por pasta,
 * sem sobreposição, balanceadas por linha, pra alimentar os sub-agentes do passo 1.3.
 *
 * Determinístico, sem LLM.
 *
 * Estratégia:
 *   1. Parte dos 3 diretórios-raiz (.aiox-core, squad-creator-pro, squad-creator).
 *   2. Recursivamente quebra qualquer grupo maior que MAX_GRUPO_LINHAS em subpastas —
 *      nunca quebra um arquivo, sempre por fronteira de pasta.
 *   3. Bin-packing guloso: cada grupo inteiro (nunca dividido) vai pra fatia mais vazia.
 *   4. Verifica no final: soma das fatias == indice.json, cada arquivo em exatamente 1 fatia.
 *
 * Saídas:
 *   .aiox/leitura/fatias.json                    — manifesto completo
 *   .aiox/leitura/fatias.md                       — legível, pra conferência
 *   .aiox/leitura/fatias/{NN}-arquivos.txt        — lista de arquivos por fatia (1 por linha)
 *
 * Uso: node .aiox/leitura/gerar-fatias.js [targetLinhasPorFatia]
 */

const fs = require('fs');
const path = require('path');

const AQUI = __dirname;
const INDICE = path.join(AQUI, 'indice.json');
const SAIDA_JSON = path.join(AQUI, 'fatias.json');
const SAIDA_MD = path.join(AQUI, 'fatias.md');
const DIR_LISTAS = path.join(AQUI, 'fatias');

const MAX_GRUPO_LINHAS = 12000; // nenhum grupo de pasta ultrapassa isso antes de virar candidato a fatia
const TARGET_LINHAS_POR_FATIA = Number(process.argv[2]) || 18000;
const MIN_FATIAS = 8;
const MAX_FATIAS = 45;

if (!fs.existsSync(INDICE)) {
  console.error('indice.json não encontrado. Rode antes: node .aiox/leitura/gerar-indice.js');
  process.exit(1);
}

const indice = JSON.parse(fs.readFileSync(INDICE, 'utf8'));
const arquivos = indice.arquivos; // [{arquivo, linhas, bytes, ext, itensEstrutura}]

const RAIZES = ['.aiox-core', 'squads/squad-creator-pro', 'squads/squad-creator'];

function agruparPorRaiz(raiz) {
  return arquivos.filter(a => a.arquivo === raiz || a.arquivo.startsWith(raiz + '/'));
}

function somaLinhas(lista) {
  return lista.reduce((s, f) => s + f.linhas, 0);
}

/** Quebra recursivamente um conjunto de arquivos sob `label` em grupos <= MAX_GRUPO_LINHAS. */
function construirGrupos(lista, label) {
  const total = somaLinhas(lista);
  if (total <= MAX_GRUPO_LINHAS) return [{ label, arquivos: lista, linhas: total }];

  const baldes = new Map(); // proximo segmento de path -> arquivos
  for (const f of lista) {
    const resto = f.arquivo.slice(label.length).replace(/^\//, '');
    const partes = resto.split('/');
    const chave = partes.length > 1 ? partes[0] : '(raiz)';
    if (!baldes.has(chave)) baldes.set(chave, []);
    baldes.get(chave).push(f);
  }

  // Não dá mais pra quebrar por SUBPASTA (é um diretório "achatado", só arquivos soltos).
  // Ainda assim pode estar grande demais pra 1 fatia — nesse caso quebra por ARQUIVO,
  // mantendo "sem sobreposição" (cada arquivo cai em exatamente 1 pedaço).
  if (baldes.size <= 1) {
    if (total <= MAX_GRUPO_LINHAS) return [{ label, arquivos: lista, linhas: total }];
    return quebrarPorArquivo(lista, label);
  }

  let grupos = [];
  for (const [chave, arqs] of baldes) {
    const novoLabel = chave === '(raiz)' ? label : `${label}/${chave}`;
    grupos = grupos.concat(construirGrupos(arqs, novoLabel));
  }
  return grupos;
}

/** Fallback pra diretório achatado (sem subpasta) maior que o teto: bin-packing por arquivo. */
function quebrarPorArquivo(lista, label) {
  const total = somaLinhas(lista);
  const nParte = Math.max(2, Math.ceil(total / MAX_GRUPO_LINHAS));
  const partes = Array.from({ length: nParte }, () => ({ arquivos: [], linhas: 0 }));
  const ordenados = [...lista].sort((a, b) => b.linhas - a.linhas);
  for (const f of ordenados) {
    let alvo = partes[0];
    for (const p of partes) if (p.linhas < alvo.linhas) alvo = p;
    alvo.arquivos.push(f);
    alvo.linhas += f.linhas;
  }
  return partes
    .filter(p => p.arquivos.length > 0)
    .map((p, i) => ({ label: `${label} (parte ${i + 1}/${nParte})`, arquivos: p.arquivos, linhas: p.linhas }));
}

// ---- 1. construir grupos por pasta ----
let grupos = [];
const raizesFaltando = [];
for (const raiz of RAIZES) {
  const lista = agruparPorRaiz(raiz);
  if (lista.length === 0) { raizesFaltando.push(raiz); continue; }
  grupos = grupos.concat(construirGrupos(lista, raiz));
}

// ---- 2. determinar N e empacotar (first-fit no balde mais vazio) ----
const totalLinhas = somaLinhas(arquivos);
let numFatias = Math.round(totalLinhas / TARGET_LINHAS_POR_FATIA);
numFatias = Math.max(MIN_FATIAS, Math.min(MAX_FATIAS, numFatias, grupos.length));

const fatias = Array.from({ length: numFatias }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  grupos: [],
  arquivos: [],
  linhas: 0,
}));

const gruposOrdenados = [...grupos].sort((a, b) => b.linhas - a.linhas);
for (const g of gruposOrdenados) {
  // balde com menor total atual recebe o próximo grupo (guloso, minimiza desbalanceamento)
  let alvo = fatias[0];
  for (const f of fatias) if (f.linhas < alvo.linhas) alvo = f;
  alvo.grupos.push({ label: g.label, arquivos: g.arquivos.length, linhas: g.linhas });
  alvo.arquivos.push(...g.arquivos.map(a => a.arquivo));
  alvo.linhas += g.linhas;
}

// ---- 3. verificação de integridade — sem isso o passo 1.2 não pode ser considerado pronto ----
const todosNasFatias = fatias.flatMap(f => f.arquivos);
const setFatias = new Set(todosNasFatias);
const setIndice = new Set(arquivos.map(a => a.arquivo));

const duplicados = todosNasFatias.length !== setFatias.size;
const faltandoNasFatias = [...setIndice].filter(a => !setFatias.has(a));
const sobrandoNasFatias = [...setFatias].filter(a => !setIndice.has(a));
const linhasFatias = fatias.reduce((s, f) => s + f.linhas, 0);

const integro =
  !duplicados &&
  faltandoNasFatias.length === 0 &&
  sobrandoNasFatias.length === 0 &&
  linhasFatias === totalLinhas &&
  todosNasFatias.length === arquivos.length;

if (!integro) {
  console.error('❌ FALHA DE INTEGRIDADE — não gerando saída.');
  console.error({ duplicados, faltando: faltandoNasFatias.length, sobrando: sobrandoNasFatias.length, linhasFatias, totalLinhas });
  if (faltandoNasFatias.length) console.error('faltando:', faltandoNasFatias.slice(0, 10));
  if (sobrandoNasFatias.length) console.error('sobrando:', sobrandoNasFatias.slice(0, 10));
  process.exit(1);
}

// ---- 4. gravar saídas ----
fs.mkdirSync(DIR_LISTAS, { recursive: true });
for (const f of fatias) {
  fs.writeFileSync(path.join(DIR_LISTAS, `${f.id}-arquivos.txt`), f.arquivos.join('\n') + '\n', 'utf8');
}

fs.writeFileSync(SAIDA_JSON, JSON.stringify({
  geradoEm: new Date().toISOString(),
  totalArquivos: arquivos.length,
  totalLinhas,
  numFatias: fatias.length,
  targetLinhasPorFatia: TARGET_LINHAS_POR_FATIA,
  maxGrupoLinhas: MAX_GRUPO_LINHAS,
  integro: true,
  fatias: fatias.map(f => ({ id: f.id, arquivos: f.arquivos.length, linhas: f.linhas, grupos: f.grupos })),
}, null, 2), 'utf8');

const md = [];
md.push('# Fatias de leitura — FASE 1 / passo 1.2');
md.push('');
md.push(`> Gerado em ${new Date().toISOString()} por \`.aiox/leitura/gerar-fatias.js\` — determinístico, sem LLM.`);
md.push(`> Verificação de integridade: ✅ ${arquivos.length} arquivos / ${totalLinhas.toLocaleString('pt-BR')} linhas — cada um em exatamente 1 fatia, nenhum duplicado, nenhum faltando.`);
md.push('');
md.push(`**Fatias:** ${fatias.length} · **alvo por fatia:** ~${TARGET_LINHAS_POR_FATIA.toLocaleString('pt-BR')} linhas · **teto por grupo de pasta:** ${MAX_GRUPO_LINHAS.toLocaleString('pt-BR')} linhas`);
md.push('');
md.push('| Fatia | Arquivos | Linhas | Pastas |');
md.push('|---|---|---|---|');
for (const f of fatias) {
  const pastas = f.grupos.map(g => g.label).join(', ');
  md.push(`| **${f.id}** | ${f.arquivos.length} | ${f.linhas.toLocaleString('pt-BR')} | ${pastas} |`);
}
md.push('');
const linhasArr = fatias.map(f => f.linhas);
md.push(`**Balanceamento:** menor fatia ${Math.min(...linhasArr).toLocaleString('pt-BR')} linhas · maior ${Math.max(...linhasArr).toLocaleString('pt-BR')} linhas · média ${Math.round(totalLinhas / fatias.length).toLocaleString('pt-BR')} linhas`);
if (raizesFaltando.length) md.push(`\n⚠️ raízes ausentes: ${raizesFaltando.join(', ')}`);

fs.writeFileSync(SAIDA_MD, md.join('\n'), 'utf8');

console.log(`✅ integridade OK: ${arquivos.length} arquivos / ${totalLinhas.toLocaleString('pt-BR')} linhas, 100% cobertos`);
console.log(`fatias:        ${fatias.length}`);
console.log(`min / max:     ${Math.min(...linhasArr).toLocaleString('pt-BR')} / ${Math.max(...linhasArr).toLocaleString('pt-BR')} linhas`);
console.log(`fatias.json:   ${(fs.statSync(SAIDA_JSON).size / 1024).toFixed(0)} KB`);
console.log(`fatias.md:     ${(fs.statSync(SAIDA_MD).size / 1024).toFixed(0)} KB`);
console.log(`listas em:     ${path.relative(process.cwd(), DIR_LISTAS)}/`);
