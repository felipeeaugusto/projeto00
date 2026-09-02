/**
 * FASE 2 / passo 2.1-2.3 — Extração do esqueleto da sessão inteira, do .jsonl.
 *
 * Determinístico, sem LLM. Lê o .jsonl LINHA A LINHA desde o início (não
 * emenda cima de extrações incrementais anteriores — essas (extrair.js,
 * extrair2.js, extrair3.js, no scratchpad) começavam cada uma de onde a
 * anterior parou, sem prova de que os pedaços se encaixavam sem buraco.
 * Esta versão relê tudo do zero e prova cobertura 100%.
 *
 * Inclui as SESSÕES COMPACTADAS (pedido explícito do Felipe, FASE 2.3):
 * cada `compact_boundary` é marcado, e o resumo real (que vive na mensagem
 * SEGUINTE ao marcador, tipo "user", injetada pelo Claude Code) é extraído
 * por completo, não truncado.
 *
 * Entrada: o .jsonl da sessão ativa (passado por argv[2]; default = a sessão atual)
 * Saídas:  .aiox/mapeamento/esqueleto.md   — legível, cronológico
 *          .aiox/mapeamento/esqueleto.json — estruturado
 *
 * Uso: node .aiox/mapeamento/extrair-esqueleto-sessao.js [caminho-do-jsonl]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const AQUI = __dirname;
const JSONL_PADRAO = 'C:/Users/Felipe Augusto/.claude/projects/C--Users-Felipe-Augusto-projeto00-packages-karzen/89427cf3-3008-4569-921c-46fa10410132.jsonl';
const JSONL = process.argv[2] || JSONL_PADRAO;
const SAIDA_MD = path.join(AQUI, 'esqueleto.md');
const SAIDA_JSON = path.join(AQUI, 'esqueleto.json');

// Tipos puramente de bookkeeping da ferramenta — nunca têm conteúdo de conversa.
const TIPOS_IGNORADOS = new Set([
  'mode', 'permission-mode', 'file-history-snapshot', 'attachment',
  'last-prompt', 'ai-title', 'file-history-delta', 'queue-operation',
]);
// Subtipos de "system" que são só telemetria, sem conteúdo relevante pro mapeamento.
const SUBTIPOS_SYSTEM_IGNORADOS = new Set(['turn_duration', 'scheduled_task_fire']);

const CAP_USER = 1500;
const CAP_ASSISTANT = 500;
// SEM CORTE nos resumos (Felipe, 02/09/2026): "Não é QUASE TUDO, EU QUERO TUDO!" —
// resumo de compactação e away_summary nunca são cortados, custe o tamanho que custar.
const CAP_COMPACT_SUMMARY = Infinity;
const CAP_AWAY_SUMMARY = Infinity;

function textoDeContentBlocks(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  // Só texto — tool_use/tool_result são mecânicos, não entram no esqueleto de conversa.
  return content.filter(b => b && b.type === 'text').map(b => b.text).join('\n');
}

function corta(s, max) {
  if (!s) return '';
  const limpo = String(s).trim();
  return limpo.length > max ? limpo.slice(0, max) + `… (+${limpo.length - max} chars)` : limpo;
}

async function main() {
  const t0 = Date.now();
  const rl = readline.createInterface({
    input: fs.createReadStream(JSONL, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  const entradas = [];
  let linhasTotais = 0;
  let linhasVazias = 0;
  let errosParse = 0;
  const contagemPorTipo = {};
  let aguardandoResumoDeCompactacao = false;
  let numeroCompactacao = 0;

  for await (const linha of rl) {
    linhasTotais++;
    if (!linha.trim()) { linhasVazias++; continue; }

    let o;
    try {
      o = JSON.parse(linha);
    } catch {
      errosParse++;
      continue;
    }

    const tipo = o.type || '(sem tipo)';
    contagemPorTipo[tipo] = (contagemPorTipo[tipo] || 0) + 1;

    // A mensagem logo APÓS um compact_boundary é o resumo real da compactação.
    if (aguardandoResumoDeCompactacao && tipo === 'user') {
      const texto = textoDeContentBlocks(o.message && o.message.content);
      entradas.push({
        ln: linhasTotais,
        tipo: 'RESUMO_COMPACTACAO',
        ts: o.timestamp,
        numero: numeroCompactacao,
        texto: corta(texto, CAP_COMPACT_SUMMARY),
      });
      aguardandoResumoDeCompactacao = false;
      continue;
    }
    aguardandoResumoDeCompactacao = false;

    if (TIPOS_IGNORADOS.has(tipo)) continue;

    if (tipo === 'system') {
      if (o.subtype === 'compact_boundary') {
        numeroCompactacao++;
        aguardandoResumoDeCompactacao = true;
        entradas.push({
          ln: linhasTotais,
          tipo: 'COMPACT_BOUNDARY',
          ts: o.timestamp,
          numero: numeroCompactacao,
          texto: `Compactação #${numeroCompactacao} — preTokens=${o.compactMetadata?.preTokens} postTokens=${o.compactMetadata?.postTokens} droppedAcumulado=${o.compactMetadata?.cumulativeDroppedTokens}`,
        });
      } else if (o.subtype === 'away_summary') {
        entradas.push({
          ln: linhasTotais,
          tipo: 'AWAY_SUMMARY',
          ts: o.timestamp,
          texto: corta(o.content, CAP_AWAY_SUMMARY),
        });
      } else if (!SUBTIPOS_SYSTEM_IGNORADOS.has(o.subtype)) {
        // subtipo desconhecido, não ignorado explicitamente — preserva por segurança
        entradas.push({
          ln: linhasTotais,
          tipo: `SYSTEM_${o.subtype || 'DESCONHECIDO'}`,
          ts: o.timestamp,
          texto: corta(o.content || JSON.stringify(o).slice(0, 300), CAP_AWAY_SUMMARY),
        });
      }
      continue;
    }

    if (tipo === 'user') {
      const texto = textoDeContentBlocks(o.message && o.message.content);
      if (!texto.trim()) continue; // user turn só com tool_result, sem texto novo do Felipe
      entradas.push({ ln: linhasTotais, tipo: 'FELIPE', ts: o.timestamp, texto: corta(texto, CAP_USER) });
      continue;
    }

    if (tipo === 'assistant') {
      const texto = textoDeContentBlocks(o.message && o.message.content);
      if (!texto.trim()) continue; // turno só com tool_use, sem texto — ferramenta, não fala
      entradas.push({ ln: linhasTotais, tipo: 'ASSISTENTE', ts: o.timestamp, texto: corta(texto, CAP_ASSISTANT) });
      continue;
    }
    // outros tipos não previstos: ignorados silenciosamente, mas contados em contagemPorTipo acima
  }

  // ---- verificação de cobertura ----
  const somaTipos = Object.values(contagemPorTipo).reduce((a, b) => a + b, 0);
  const cobertura = {
    linhasNoArquivo: linhasTotais,
    linhasVazias,
    errosParse,
    linhasComTipoReconhecido: somaTipos,
    linhasNaoContabilizadas: linhasTotais - linhasVazias - errosParse - somaTipos,
  };

  // ---- grava JSON ----
  fs.writeFileSync(SAIDA_JSON, JSON.stringify({
    geradoEm: new Date().toISOString(),
    fonteJsonl: JSONL,
    cobertura,
    contagemPorTipoOriginal: contagemPorTipo,
    totalEntradasExtraidas: entradas.length,
    compactacoesEncontradas: numeroCompactacao,
    entradas,
  }, null, 2), 'utf8');

  // ---- grava MD ----
  const out = [];
  out.push('# Esqueleto da sessão — FASE 2 / passos 2.1-2.3');
  out.push('');
  out.push(`> Gerado em ${new Date().toISOString()} por `+'`.aiox/mapeamento/extrair-esqueleto-sessao.js`'+' — leitura completa desde a linha 1, sem emendar extrações incrementais anteriores.');
  out.push('');
  out.push('## Cobertura (prova de que nada foi pulado)');
  out.push('');
  out.push('| Métrica | Valor |');
  out.push('|---|---|');
  out.push(`| Linhas no .jsonl | **${cobertura.linhasNoArquivo.toLocaleString('pt-BR')}** |`);
  out.push(`| Linhas vazias | ${cobertura.linhasVazias} |`);
  out.push(`| Erros de parse | ${cobertura.errosParse} |`);
  out.push(`| Linhas com tipo reconhecido | ${cobertura.linhasComTipoReconhecido.toLocaleString('pt-BR')} |`);
  out.push(`| **Linhas não contabilizadas (deveria ser 0)** | **${cobertura.linhasNaoContabilizadas}** |`);
  out.push(`| Entradas extraídas pro esqueleto | ${entradas.length.toLocaleString('pt-BR')} |`);
  out.push(`| Compactações encontradas | **${numeroCompactacao}** |`);
  out.push('');
  out.push('| Tipo original (jsonl) | Ocorrências |');
  out.push('|---|---|');
  for (const [t, n] of Object.entries(contagemPorTipo).sort((a, b) => b[1] - a[1])) {
    out.push(`| \`${t}\` | ${n.toLocaleString('pt-BR')} |`);
  }
  out.push('');
  out.push('---');
  out.push('');
  out.push('## Linha do tempo');
  out.push('');
  for (const e of entradas) {
    const marcador = e.tipo === 'FELIPE' ? '👤' : e.tipo === 'ASSISTENTE' ? '🤖' : e.tipo === 'COMPACT_BOUNDARY' ? '🗜️' : e.tipo === 'RESUMO_COMPACTACAO' ? '📋' : e.tipo === 'AWAY_SUMMARY' ? '💤' : '⚙️';
    out.push(`### ${marcador} ${e.tipo} — linha ${e.ln} — ${e.ts || '(sem timestamp)'}`);
    out.push('');
    out.push(e.texto || '*(vazio)*');
    out.push('');
  }

  fs.writeFileSync(SAIDA_MD, out.join('\n'), 'utf8');

  console.log(`linhas no .jsonl:          ${cobertura.linhasNoArquivo}`);
  console.log(`vazias:                    ${cobertura.linhasVazias}`);
  console.log(`erros de parse:            ${cobertura.errosParse}`);
  console.log(`com tipo reconhecido:      ${cobertura.linhasComTipoReconhecido}`);
  console.log(`NAO CONTABILIZADAS:        ${cobertura.linhasNaoContabilizadas} ${cobertura.linhasNaoContabilizadas === 0 ? '✅' : '❌ INVESTIGAR'}`);
  console.log(`entradas no esqueleto:     ${entradas.length}`);
  console.log(`compactacoes encontradas:  ${numeroCompactacao}`);
  console.log(`esqueleto.md:              ${(fs.statSync(SAIDA_MD).size / 1024).toFixed(0)} KB`);
  console.log(`esqueleto.json:            ${(fs.statSync(SAIDA_JSON).size / 1024).toFixed(0)} KB`);
  console.log(`tempo:                     ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch(e => { console.error(e); process.exit(1); });
