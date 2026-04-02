/**
 * run-analyst-mineracao.js — Analyst Agent (Mineração) 1.0
 * Método Subido de Mineração 1.0 (adaptado Pedro Sobral)
 * Heurísticas: AN001, AN002, AN003, AN004
 *
 * Input:  data/mineracao/posts_brutos/coleta-YYYY-MM-DD.json
 * Output: data/mineracao/posts_analisados/analise-YYYY-MM-DD.json
 *
 * Uso: node run-analyst-mineracao.js [data]
 * Ex:  node run-analyst-mineracao.js 2026-04-02
 */

const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT      = path.join(__dirname, '..');
const TODAY     = process.argv[2] || new Date().toISOString().split('T')[0];
const INPUT     = path.join(ROOT, `data/mineracao/posts_brutos/coleta-${TODAY}.json`);
const OUTPUT_DIR = path.join(ROOT, 'data/mineracao/posts_analisados');
const OUTPUT    = path.join(OUTPUT_DIR, `analise-${TODAY}.json`);
const PERFIS_PATH = path.join(ROOT, 'data/perfis-referencia.yaml');

// ─── Carregar seguidores do YAML ──────────────────────────────────────────────
function carregarSeguidores() {
  const data = yaml.load(fs.readFileSync(PERFIS_PATH, 'utf8'));
  const map  = {};
  for (const camadaKey of Object.keys(data)) {
    const camada = data[camadaKey];
    if (!camada.perfis) continue;
    for (const p of camada.perfis) {
      map[p.username] = p.seguidores_aprox || null;
    }
  }
  return map;
}

// ─── AN003: Hook extraído ──────────────────────────────────────────────────────
function extrairHook(caption) {
  if (!caption || caption.trim().length < 5) return '[sem hook textual — visual only]';
  const lines = caption.split('\n').map(l => l.trim()).filter(l => l.length > 3);
  return lines[0] || '[sem hook textual — visual only]';
}

// ─── Estrutura narrativa ───────────────────────────────────────────────────────
function detectarEstrutura(caption) {
  if (!caption) return 'problema → agitação → solução';
  const c = caption.toLowerCase();

  // Mito / Verdade
  if (/mito|mentira|falso|verdade que|não é verdade/.test(c))
    return 'mito → verdade';

  // Dado chocante
  if (/\d+%|\d+ de cada|\bsabia que\b|pesquisa|estudo|dado|estatística|segundo a/.test(c))
    return 'dado chocante → contexto → ação';

  // Lista / checklist
  if (/\n\s*[-•✓✅\d]\s/.test(caption) || /passo [a-z0-9]|dica [0-9]|[0-9]\./i.test(c))
    return 'lista / checklist';

  // Pergunta → resposta
  if (/^[^.!]*\?/.test(caption.trim()) || /você (já|sabia|sabe|sentiu|consegue)/i.test(c))
    return 'pergunta → resposta';

  // História pessoal
  if (/\beu (era|fui|estava|aprendi|descobri|passei|vivia|decidi)\b|\bminha história\b|\bmeu (filho|bebê|marido)\b/i.test(c))
    return 'história pessoal → lição';

  // Padrão padrão
  return 'problema → agitação → solução';
}

// ─── AN001: Pilar ──────────────────────────────────────────────────────────────
function classificarPilar(caption, tipo) {
  if (!caption) return 'Entretenimento';
  const c = caption.toLowerCase();

  // CTA — oferta ou link
  if (/link na bio|acesse|compre|adquira|inscreva-se|garanta|clique|desconto|oferta|acesso/i.test(c))
    return 'CTA';

  // Prova Social — depoimento / resultado
  if (/depoimento|resultado|transformação|consegui|alcancei|mudou minha|antes e depois|prova|aprovado/i.test(c))
    return 'Prova Social';

  // Educativo — dados, dicas, informação
  if (/\d+%|\bpor que\b|como fazer|o que é|dica|aprenda|sabia que|estudo|pesquisa|conselho|entenda|descubra/i.test(c))
    return 'Educativo';

  // Emocional — relato pessoal, emoção
  if (/saudade|chorei|amor|orgulho|gratidão|medo|ansiedade|cansada|força|coragem|sentimento|emoção|família/i.test(c))
    return 'Emocional';

  // Reels sem legenda tendem a ser Entretenimento
  if (tipo === 'reel' && caption.length < 80) return 'Entretenimento';

  return 'Entretenimento';
}

// ─── Gatilho emocional ────────────────────────────────────────────────────────
function detectarGatilho(caption, pilar) {
  if (!caption) return 'curiosidade';
  const c = caption.toLowerCase();

  if (/não perca|última chance|urgente|agora|hoje|acaba|encerra|limited|escasso/i.test(c))
    return 'urgência';
  if (/especialista|expert|anos de experiência|dra|dr\.|médico|cientista|estudo|comprovado/i.test(c))
    return 'autoridade';
  if (/juntos|comunidade|grupo|como você|como nós|mães|mulheres|família/i.test(c))
    return 'pertencimento';
  if (/você é|sou mãe|somos|identidade|quem sou|meu jeito|minha vida/i.test(c))
    return 'identidade';
  if (/vai conseguir|pode mudar|ainda dá tempo|esperança|possível|acredite|vai melhorar/i.test(c))
    return 'esperança';
  if (/medo|perda|risco|atenção|cuidado|perigoso|erros|não faça/i.test(c))
    return 'medo de perder';

  // Default por pilar
  if (pilar === 'Educativo') return 'curiosidade';
  if (pilar === 'Emocional') return 'identidade';
  if (pilar === 'Prova Social') return 'esperança';
  if (pilar === 'CTA') return 'urgência';
  return 'curiosidade';
}

// ─── Assunto central ──────────────────────────────────────────────────────────
function extrairAssunto(caption, perfil, tipo) {
  if (!caption || caption.trim().length < 5) {
    return `Conteúdo visual — @${perfil} (${tipo})`;
  }
  const lines = caption.split('\n').map(l => l.trim()).filter(l => l.length > 5);
  // Usar as primeiras 2 linhas como assunto
  const texto = lines.slice(0, 2).join(' ').replace(/[✨💛🔗#@]/g, '').trim();
  if (texto.length > 120) return texto.substring(0, 117) + '...';
  return texto || `Conteúdo de @${perfil}`;
}

// ─── AN004: Taxa de engajamento ───────────────────────────────────────────────
function calcularEngajamento(likes, comments, seguidores) {
  if (!seguidores || seguidores <= 0) return null;
  return parseFloat(((likes + comments) / seguidores * 100).toFixed(4));
}

// ─── AN002: Ângulo de adaptação ───────────────────────────────────────────────
function detectarAngulo(caption, perfil) {
  if (!caption) return 'baixa relevância';
  const c = caption.toLowerCase();

  // Sono / descanso
  if (/sono|dorme|dormir|descanso|insônia|cansada|noite|bebê|rotina da noite/i.test(c))
    return 'sono infantil';

  // Maternidade direta
  if (/mãe|maternidade|gestante|gravidez|amamentação|filho|bebê|criança|mamar/i.test(c))
    return 'maternidade real';

  // Rotina / organização
  if (/rotina|organização|planejamento|agenda|dia a dia|hábito|produtividade|manhã/i.test(c))
    return 'rotina familiar';

  // Desenvolvimento infantil
  if (/desenvolvimento|aprendizado|estimulação|escola|educação infantil|comportamento|pediatra/i.test(c))
    return 'desenvolvimento infantil';

  // Saúde mental
  if (/ansiedade|saúde mental|autocuidado|bem-estar|equilíbrio|burnout|estresse|terapia/i.test(c))
    return 'saúde mental da mãe';

  // Organização do lar
  if (/casa|lar|organizar|limpeza|cozinha|família|marido|parceiro/i.test(c))
    return 'organização do lar';

  return 'baixa relevância';
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log(`\n🧠 analyst-agent-mineracao — Método Subido 1.0`);
  console.log(`📅 Data: ${TODAY}`);
  console.log(`📥 Input: ${INPUT}\n`);

  if (!fs.existsSync(INPUT)) {
    console.error(`❌ Arquivo não encontrado: ${INPUT}`);
    process.exit(1);
  }

  const coleta     = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const posts      = coleta.posts;
  const seguidores = carregarSeguidores();

  console.log(`📊 Posts para analisar: ${posts.length}`);
  console.log(`👥 Perfis com seguidores conhecidos: ${Object.values(seguidores).filter(Boolean).length}/${Object.keys(seguidores).length}\n`);

  const postsAnalisados = [];
  const errros          = [];

  // Contadores para metadata
  const distribPilares = { educativo: 0, emocional: 0, prova_social: 0, cta: 0, entretenimento: 0 };
  const contGatilhos   = {};
  const contEstruturas = {};
  const contAngulos    = {};

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    try {
      const caption  = post.caption || '';
      const perfil   = post.perfil_origem || '';
      const tipo     = post.tipo || 'imagem';
      const likes    = post.likes    || 0;
      const comments = post.comments || 0;
      const seg      = seguidores[perfil] || null;

      const hook        = extrairHook(caption);
      const estrutura   = detectarEstrutura(caption);
      const formato     = tipo; // mapeado diretamente
      const pilar       = classificarPilar(caption, tipo);
      const gatilho     = detectarGatilho(caption, pilar);
      const assunto     = extrairAssunto(caption, perfil, tipo);
      const taxa        = calcularEngajamento(likes, comments, seg);
      const angulo      = detectarAngulo(caption, perfil);

      // Contagens
      const pilarKey = pilar.toLowerCase().replace(' ', '_').replace(' social', '_social');
      if (pilarKey in distribPilares) distribPilares[pilarKey]++;
      else distribPilares.entretenimento++;

      contGatilhos[gatilho]   = (contGatilhos[gatilho]   || 0) + 1;
      contEstruturas[estrutura] = (contEstruturas[estrutura] || 0) + 1;
      contAngulos[angulo]       = (contAngulos[angulo]       || 0) + 1;

      postsAnalisados.push({
        url:                post.url,
        tipo:               post.tipo,
        likes,
        comments,
        caption:            caption.substring(0, 300), // truncar para output limpo
        perfil_origem:      perfil,
        data_publicacao:    post.data_publicacao,
        hook_extraido:      hook,
        estrutura_narrativa: estrutura,
        formato,
        pilar,
        gatilho_emocional:  gatilho,
        assunto,
        taxa_engajamento:   taxa,
        angulo_adaptacao:   angulo,
      });

      if ((i + 1) % 50 === 0) {
        process.stdout.write(`\r✅ Analisados: ${i + 1}/${posts.length}`);
      }
    } catch (err) {
      errros.push({ index: i, url: post.url, erro: err.message });
    }
  }

  console.log(`\n\n✅ Análise concluída: ${postsAnalisados.length} posts`);
  if (errros.length > 0) console.log(`⚠️  Erros: ${errros.length}`);

  // Top gatilhos e estruturas (ordenados)
  const topGatilhos   = Object.entries(contGatilhos).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`);
  const topEstruturas = Object.entries(contEstruturas).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`);
  const topAngulos    = Object.entries(contAngulos).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`);

  const total = postsAnalisados.length;
  const output = {
    metadata: {
      data_analise:           new Date().toISOString(),
      posts_analisados_total: total,
      distribuicao_pilares: {
        educativo:    distribPilares.educativo,
        emocional:    distribPilares.emocional,
        prova_social: distribPilares.prova_social,
        cta:          distribPilares.cta,
        entretenimento: distribPilares.entretenimento,
      },
      distribuicao_pilares_pct: {
        educativo:    `${((distribPilares.educativo / total) * 100).toFixed(1)}%`,
        emocional:    `${((distribPilares.emocional / total) * 100).toFixed(1)}%`,
        prova_social: `${((distribPilares.prova_social / total) * 100).toFixed(1)}%`,
        cta:          `${((distribPilares.cta / total) * 100).toFixed(1)}%`,
        entretenimento: `${((distribPilares.entretenimento / total) * 100).toFixed(1)}%`,
      },
      top_gatilhos:   topGatilhos,
      top_estruturas: topEstruturas,
      top_angulos_adaptacao: topAngulos,
      erros:          errros.length,
    },
    posts_analisados: postsAnalisados,
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8');

  console.log('\n──────────────────────────────────────────────────────');
  console.log(`🧠 Análise completa — ${TODAY}`);
  console.log(`\nPosts analisados: ${total}`);
  console.log(`\nDistribuição por pilar:`);
  console.log(`  Educativo:    ${distribPilares.educativo} (${((distribPilares.educativo/total)*100).toFixed(1)}%)`);
  console.log(`  Emocional:    ${distribPilares.emocional} (${((distribPilares.emocional/total)*100).toFixed(1)}%)`);
  console.log(`  Prova Social: ${distribPilares.prova_social} (${((distribPilares.prova_social/total)*100).toFixed(1)}%)`);
  console.log(`  CTA:          ${distribPilares.cta} (${((distribPilares.cta/total)*100).toFixed(1)}%)`);
  console.log(`  Entretenimento: ${distribPilares.entretenimento} (${((distribPilares.entretenimento/total)*100).toFixed(1)}%)`);
  console.log(`\nTop gatilhos:   ${topGatilhos.slice(0,4).join(' | ')}`);
  console.log(`Top estruturas: ${topEstruturas.slice(0,3).join(' | ')}`);
  console.log(`Top ângulos:    ${topAngulos.slice(0,4).join(' | ')}`);
  console.log(`\n📁 Salvo em: ${OUTPUT}`);
  console.log('\n→ Handoff para briefing-agent ✅');
}

main();
