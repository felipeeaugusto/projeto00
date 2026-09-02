/**
 * FASE 1 / passo 1.3 (NOVO MÉTODO — pós E87) — Varredura determinística, sem LLM.
 *
 * Problema que este script resolve: ler 586.668 linhas com sub-agentes de IA
 * custou ~435.000 tokens para 1 arquivo de 19.677 linhas (E87). O motivo é que
 * um agente único acumula no próprio contexto cada trecho que já leu — quanto
 * maior o arquivo, mais caro cada linha nova fica.
 *
 * Este script faz a MESMA cobertura (lê literalmente cada linha de cada
 * arquivo do índice — 100%, sem amostragem) mas sem nenhuma chamada de IA.
 * Só os trechos que batem em algum padrão conhecido (órfão, TODO, duplicata,
 * contradição, veto/gate, etc.) são separados numa lista curta — essa lista
 * é o único material que precisa de leitura por IA depois.
 *
 * Entrada:  .aiox/leitura/indice.json (gerado pelo passo 1.1)
 * Saídas:   .aiox/leitura/candidatos.md   — lista agrupada por categoria, com contexto
 *           .aiox/leitura/candidatos.json — mesma coisa, estruturado
 *
 * Uso: node .aiox/leitura/buscar-padroes.js
 */

const fs = require('fs');
const path = require('path');

const AQUI = __dirname;
const RAIZ = path.resolve(AQUI, '..', '..');
const INDICE = path.join(AQUI, 'indice.json');
const SAIDA_MD = path.join(AQUI, 'candidatos.md');
const SAIDA_JSON = path.join(AQUI, 'candidatos.json');

const CONTEXTO_LINHAS = 2; // linhas antes/depois de cada achado, pra dar contexto sem reler o arquivo inteiro
const MAX_POR_ARQUIVO_CATEGORIA = 40; // teto por (arquivo, categoria) — evita 1 arquivo dominar a saída
const DISTANCIA_AGRUPAMENTO = 6; // matches da MESMA categoria a até 6 linhas um do outro = mesma entidade/bloco, agrupar em 1 achado

if (!fs.existsSync(INDICE)) {
  console.error('indice.json não encontrado. Rode antes: node .aiox/leitura/gerar-indice.js');
  process.exit(1);
}

// Categorias e padrões — cada linha do framework é testada contra todos.
// Baseado nos achados E66-E87 já registrados (órfão foi o que mais apareceu
// no teste da fatia 01) + categorias gerais de qualidade/risco de código.
const CATEGORIAS = [
  {
    id: 'ORFAO',
    label: '🧟 Órfão / não usado',
    regex: /\b(usedBy:\s*\[\s*\]|lifecycle:\s*orphan|dependencies:\s*\[\s*\])/i,
    // Restrito a arquivos de dados estruturados: em .js o mesmo texto ("usedBy: []")
    // aparece como valor-padrão de código comum, não como metadado real do registro.
    somenteExtensoes: ['yaml', 'yml', 'json'],
    // SEM teto — depois de agrupar por entidade (usedBy+dependencies+lifecycle da
    // mesma entidade viram 1 só), o número real caiu de 878 linhas pra ~570
    // entidades. Um teto de 40 aqui cortava 93% — foi exatamente o que escondeu
    // 8 dos 9 achados reais do teste da fatia 01. Sem teto = nada fica pra trás.
    tetoProprio: Infinity,
  },
  {
    id: 'INACABADO',
    label: '🚧 Inacabado / placeholder',
    regex: /\b(TODO|FIXME|XXX|HACK|placeholder|stub|not implemented|não implementado|nao implementado)\b/i,
  },
  {
    id: 'DEPRECATED',
    label: '⚠️ Descontinuado / quebrado',
    // "CRITICAL" removido — é convenção de escrita do próprio framework
    // ("CRITICAL: Read THIS ENTIRE FILE..."), não indicador de defeito.
    // Confirmado: 571 de 642 ocorrências (89%) eram só essa palavra.
    regex: /\b(DEPRECATED|descontinuad[oa]|BROKEN|quebrad[oa]|obsolete|obsolet[oa])\b/,
  },
  {
    id: 'DUPLICATA',
    label: '👯 Possível duplicata',
    // "already exists"/"já existe" removidos — amostra mostrou só checagem
    // rotineira de arquivo/config já existente, nada a ver com funcionalidade
    // duplicada (o problema real da BLOCO 0-AA).
    regex: /\b(duplicat[ae]d?|duplicad[oa]|redundant|redundante)\b/i,
  },
  {
    id: 'CONTRADICAO',
    label: '🔀 Contradição / conflito',
    regex: /\b(contradiction|contradiz|conflito|conflicts? with|inconsistent|inconsistente)\b/i,
  },
  {
    id: 'GATE_VETO',
    label: '🚦 Veto / gate / circuit breaker',
    regex: /\b(veto|VETO|circuit.?breaker|circuitBreaker|\bHALT\b|halt_condition)\b/,
    // Não é ruído — é vocabulário legítimo do desenho, só que repetitivo
    // demais (1.311 ocorrências) pra mostrar contexto de cada uma.
    tetoProprio: 5,
  },
  {
    id: 'ESTADO_WORKFLOW',
    label: '🗂️ Estado de workflow / artefato',
    regex: /\b(current_step_index|artifacts_created|workflow.?state|target_context|status:\s*(active|paused|completed|aborted))\b/i,
  },
];

const indice = JSON.parse(fs.readFileSync(INDICE, 'utf8'));
const arquivos = indice.arquivos; // [{arquivo, linhas, bytes, ext, ...}]

/** Acha o "rótulo" de um grupo de matches: sobe a partir de `antesDe` procurando
 * a chave YAML/heading mais próxima com MENOS indentação que as linhas do grupo
 * (ou seja, o "dono" do bloco — nome da entidade, seção, função). Heurística
 * genérica, funciona pra YAML (`nome-entidade:`), Markdown (`## Título`) e
 * blocos JS indentados. Sem match em até 20 linhas acima → sem rótulo. */
function acharRotulo(linhas, antesDe, indentacaoMatch) {
  const LIMITE_BUSCA = 20;
  for (let i = antesDe - 1; i >= 0 && antesDe - i <= LIMITE_BUSCA; i--) {
    const l = linhas[i];
    if (!l.trim()) continue;
    const indent = l.length - l.trimStart().length;
    if (indent >= indentacaoMatch) continue; // não é "dono" do bloco, é irmão/primo
    const chaveYaml = /^\s*([\w.-]+):\s*$/.exec(l);
    if (chaveYaml) return chaveYaml[1];
    const headingMd = /^#{1,4}\s+(.+)$/.exec(l);
    if (headingMd) return headingMd[1].trim().slice(0, 80);
    const declJs = /^\s*(?:class|function|const|let)\s+([\w$]+)/.exec(l);
    if (declJs) return declJs[1];
    return l.trim().slice(0, 80); // fallback: qualquer linha-pai não vazia, com indentação menor
  }
  return null;
}

const t0 = Date.now();
let linhasEscaneadas = 0;
let arquivosComErro = 0;
const achados = []; // {arquivo, linha, categoria, rotulo, texto, contexto: [...]}
const contadorPorArquivoCategoria = new Map(); // "arquivo|categoria" -> nº de GRUPOS (entidades), não linhas cruas
const contadorGlobalPorCategoria = new Map(); // idem, agregado — é a contagem real de "coisas", não de linhas

for (const registro of arquivos) {
  const caminhoAbs = path.join(RAIZ, registro.arquivo);
  let texto;
  try {
    texto = fs.readFileSync(caminhoAbs, 'utf8');
  } catch {
    arquivosComErro++;
    continue;
  }
  const linhas = texto.split('\n');
  linhasEscaneadas += linhas.length;
  const extensaoArquivo = (registro.arquivo.split('.').pop() || '').toLowerCase();

  for (const cat of CATEGORIAS) {
    if (cat.somenteExtensoes && !cat.somenteExtensoes.includes(extensaoArquivo)) continue;

    // Passo 1: todas as linhas que batem, sem truncar ainda — o teto vale por GRUPO, não por linha crua.
    const linhasQueBatem = [];
    for (let i = 0; i < linhas.length; i++) {
      if (cat.regex.test(linhas[i])) linhasQueBatem.push(i);
    }
    if (linhasQueBatem.length === 0) continue;

    // Passo 2: agrupa linhas próximas (mesma entidade/bloco) — evita contar
    // usedBy/dependencies/lifecycle da MESMA entidade como 3 achados distintos.
    const grupos = [];
    let atual = [linhasQueBatem[0]];
    for (let k = 1; k < linhasQueBatem.length; k++) {
      if (linhasQueBatem[k] - atual[atual.length - 1] <= DISTANCIA_AGRUPAMENTO) atual.push(linhasQueBatem[k]);
      else { grupos.push(atual); atual = [linhasQueBatem[k]]; }
    }
    grupos.push(atual);

    const chave = `${registro.arquivo}|${cat.id}`;
    contadorPorArquivoCategoria.set(chave, grupos.length);
    contadorGlobalPorCategoria.set(cat.id, (contadorGlobalPorCategoria.get(cat.id) || 0) + grupos.length);

    const teto = cat.tetoProprio || MAX_POR_ARQUIVO_CATEGORIA;
    for (const grupo of grupos.slice(0, teto)) {
      const primeiraLinha = grupo[0];
      const ultimaLinha = grupo[grupo.length - 1];
      const indentPrimeira = linhas[primeiraLinha].length - linhas[primeiraLinha].trimStart().length;
      const rotulo = acharRotulo(linhas, primeiraLinha, indentPrimeira);

      const inicio = Math.max(0, primeiraLinha - CONTEXTO_LINHAS);
      const fim = Math.min(linhas.length, ultimaLinha + CONTEXTO_LINHAS + 1);
      achados.push({
        arquivo: registro.arquivo,
        linha: primeiraLinha + 1,
        categoria: cat.id,
        rotulo,
        texto: linhas[primeiraLinha].trim().slice(0, 200),
        contexto: linhas.slice(inicio, fim).map((l, idx) => ({
          n: inicio + idx + 1,
          texto: l.slice(0, 200),
          alvo: grupo.includes(inicio + idx),
        })),
      });
    }
  }
}

// truncamentos por (arquivo, categoria) que passaram do teto — cada categoria pode ter seu próprio teto
const tetoPorCategoria = new Map(CATEGORIAS.map(c => [c.id, c.tetoProprio || MAX_POR_ARQUIVO_CATEGORIA]));
const truncados = [...contadorPorArquivoCategoria.entries()]
  .filter(([chave, n]) => n > tetoPorCategoria.get(chave.split('|')[1]))
  .map(([chave, n]) => {
    const [arquivo, categoria] = chave.split('|');
    return { arquivo, categoria, total: n, mostrados: tetoPorCategoria.get(categoria) };
  });

const totalMatches = [...contadorGlobalPorCategoria.values()].reduce((a, b) => a + b, 0);
const percentualFlagged = ((achados.length / linhasEscaneadas) * 100).toFixed(3);

// ---- grava JSON ----
fs.writeFileSync(SAIDA_JSON, JSON.stringify({
  geradoEm: new Date().toISOString(),
  cobertura: { arquivosNoIndice: arquivos.length, arquivosComErro, linhasEscaneadas },
  totais: { matchesTotais: totalMatches, linhasGravadasComContexto: achados.length, categorias: Object.fromEntries(contadorGlobalPorCategoria) },
  truncados,
  achados,
}, null, 2), 'utf8');

// ---- grava MD (o que o Atlas vai realmente ler) ----
const out = [];
out.push('# Candidatos — varredura determinística (sem IA), FASE 1 / passo 1.3');
out.push('');
out.push(`> Gerado em ${new Date().toISOString()} por `+'`.aiox/leitura/buscar-padroes.js`'+' — 100% das linhas do índice foram escaneadas, custo de token: zero.');
out.push('');
out.push('## Cobertura (prova de que nada foi pulado)');
out.push('');
out.push('| Métrica | Valor |');
out.push('|---|---|');
out.push(`| Arquivos no índice | ${arquivos.length} |`);
out.push(`| Arquivos com erro de leitura | ${arquivosComErro} |`);
out.push(`| **Linhas escaneadas** | **${linhasEscaneadas.toLocaleString('pt-BR')}** |`);
out.push(`| Trechos sinalizados (matches) | ${totalMatches.toLocaleString('pt-BR')} |`);
out.push(`| % das linhas que geraram sinal | ${percentualFlagged}% |`);
out.push('');
out.push('## Contagem por categoria');
out.push('');
out.push('| Categoria | Ocorrências |');
out.push('|---|---|');
for (const cat of CATEGORIAS) {
  out.push(`| ${cat.label} | ${(contadorGlobalPorCategoria.get(cat.id) || 0).toLocaleString('pt-BR')} |`);
}
out.push('');
if (truncados.length) {
  out.push(`⚠️ **${truncados.length} combinações (arquivo, categoria) passaram do teto de ${MAX_POR_ARQUIVO_CATEGORIA} e foram truncadas** — a contagem acima é exata, mas o contexto detalhado abaixo mostra só os primeiros ${MAX_POR_ARQUIVO_CATEGORIA} de cada.`);
  out.push('');
}
out.push('---');
out.push('');

// agrupar achados por categoria pra leitura
const porCategoria = new Map();
for (const a of achados) {
  if (!porCategoria.has(a.categoria)) porCategoria.set(a.categoria, []);
  porCategoria.get(a.categoria).push(a);
}

for (const cat of CATEGORIAS) {
  const lista = porCategoria.get(cat.id) || [];
  if (lista.length === 0) continue;
  out.push(`## ${cat.label} (${lista.length} trechos com contexto, ${contadorGlobalPorCategoria.get(cat.id)} ocorrências totais)`);
  out.push('');
  for (const a of lista) {
    out.push(`### ${a.arquivo}:${a.linha}`);
    out.push('```');
    for (const c of a.contexto) {
      out.push(`${c.alvo ? '>>' : '  '} ${c.n}: ${c.texto}`);
    }
    out.push('```');
    if (a.rotulo) out.push(`*(bloco/entidade: \`${a.rotulo}\`)*`);
    out.push('');
  }
}

fs.writeFileSync(SAIDA_MD, out.join('\n'), 'utf8');

console.log(`arquivos no índice:     ${arquivos.length}`);
console.log(`arquivos com erro:      ${arquivosComErro}`);
console.log(`linhas escaneadas:      ${linhasEscaneadas.toLocaleString('pt-BR')}`);
console.log(`trechos sinalizados:    ${totalMatches.toLocaleString('pt-BR')} (${percentualFlagged}% das linhas)`);
console.log(`combinações truncadas:  ${truncados.length}`);
console.log('--- por categoria ---');
for (const cat of CATEGORIAS) console.log(`  ${cat.label}: ${(contadorGlobalPorCategoria.get(cat.id) || 0).toLocaleString('pt-BR')}`);
console.log(`candidatos.md:   ${(fs.statSync(SAIDA_MD).size / 1024).toFixed(0)} KB`);
console.log(`candidatos.json: ${(fs.statSync(SAIDA_JSON).size / 1024).toFixed(0)} KB`);
console.log(`tempo:           ${((Date.now() - t0) / 1000).toFixed(1)}s`);
