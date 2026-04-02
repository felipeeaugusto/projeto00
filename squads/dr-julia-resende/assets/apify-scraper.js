/**
 * apify-scraper.js — Coleta Instagram via Apify REST API (sem MCP)
 * Lê perfis ativos de perfis-referencia.yaml em tempo real.
 *
 * Uso:
 *   node apify-scraper.js            → coleta completa (produção)
 *   node apify-scraper.js --dry-run  → mostra perfis que seriam coletados, não chama API
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');
const yaml  = require('js-yaml');

// ─── Paths ─────────────────────────────────────────────────────────────────
const ROOT          = path.join(__dirname, '..');
const SECRETS_PATH  = path.join(ROOT, 'config/publisher-secrets.yaml');
const PERFIS_PATH   = path.join(ROOT, 'data/perfis-referencia.yaml');
const OUTPUT_DIR    = path.join(ROOT, 'data/mineracao/posts_brutos');

// ─── Config ─────────────────────────────────────────────────────────────────
const secrets       = yaml.load(fs.readFileSync(SECRETS_PATH, 'utf8'));
const APIFY_TOKEN   = secrets.apify.api_token;
const ACTOR_ID      = 'apify~instagram-scraper'; // instagram-scraper suporta directUrls
const TODAY         = new Date().toISOString().split('T')[0];
const OUTPUT_PATH   = path.join(OUTPUT_DIR, `coleta-${TODAY}.json`);
const POSTS_PER_PROFILE = 50;
const DRY_RUN       = process.argv.includes('--dry-run');

// ─── Carregar perfis ativos do YAML ────────────────────────────────────────
function carregarPerfisAtivos() {
  const data = yaml.load(fs.readFileSync(PERFIS_PATH, 'utf8'));
  const perfis = [];

  for (const camadaKey of Object.keys(data)) {
    const camada = data[camadaKey];
    if (!camada.perfis) continue;
    for (const p of camada.perfis) {
      if (p.status && p.status.startsWith('ATIVO')) {
        perfis.push({
          username:   p.username,
          seguidores: p.seguidores_aprox || null,
          camada:     camadaKey,
        });
      }
    }
  }
  return perfis;
}

// ─── Thresholds ─────────────────────────────────────────────────────────────
function getTier(seguidores) {
  if (!seguidores) return 'pequeno';
  if (seguidores >= 1000000) return 'grande';
  if (seguidores >= 100000)  return 'medio';
  return 'pequeno';
}

const THRESHOLDS = {
  grande:  { reel: { likes: 5000, comments: 100 }, carrossel: { likes: 3000, comments: 50  }, imagem: { likes: 2000, comments: 30 } },
  medio:   { reel: { likes: 1500, comments: 30  }, carrossel: { likes:  800, comments: 15  }, imagem: { likes:  500, comments: 10 } },
  pequeno: { reel: { likes:  500, comments: 10  }, carrossel: { likes:  200, comments:  5  }, imagem: { likes:  100, comments:  3 } },
};

function mapTipo(type) {
  if (!type) return 'imagem';
  const t = type.toLowerCase();
  if (t === 'video' || t === 'reel' || t === 'igtv') return 'reel';
  if (t === 'sidecar' || t === 'carousel' || t === 'carrossel') return 'carrossel';
  return 'imagem';
}

function passaThreshold(post, tier) {
  const tipo      = mapTipo(post.type);
  const threshold = THRESHOLDS[tier][tipo] || THRESHOLDS[tier].imagem;
  return (post.likesCount || 0) >= threshold.likes &&
         (post.commentsCount || 0) >= threshold.comments;
}

// ─── SC003: Deduplicação — carrega URLs já coletadas ────────────────────────
function carregarUrlsExistentes() {
  const urlsExistentes = new Set();
  if (!fs.existsSync(OUTPUT_DIR)) return urlsExistentes;

  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (!file.endsWith('.json') || file === path.basename(OUTPUT_PATH)) continue;
    try {
      const coleta = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf8'));
      if (Array.isArray(coleta.posts)) {
        for (const post of coleta.posts) {
          if (post.url) urlsExistentes.add(post.url);
        }
      }
    } catch (_) { /* arquivo corrompido — ignorar */ }
  }
  return urlsExistentes;
}

// ─── HTTP helper ────────────────────────────────────────────────────────────
function apifyRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.apify.com',
      port: 443,
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${APIFY_TOKEN}`,
        'Content-Type':  'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── SC004: Retry com back-off ───────────────────────────────────────────────
async function apifyRequestWithRetry(method, endpoint, body, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await apifyRequest(method, endpoint, body);
    if (res.status === 429) {
      console.log(`\n⏳ Rate limit (429) — aguardando 60s... [tentativa ${attempt}/${maxRetries}]`);
      await sleep(60000);
      continue;
    }
    return res;
  }
  throw new Error('Rate limit persistiu após 3 tentativas');
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const PERFIS = carregarPerfisAtivos();
  console.log(`\n🔭 Scout Agent — apify-scraper.js`);
  console.log(`📅 Data: ${TODAY}`);
  console.log(`📋 Perfis ATIVOS carregados do YAML: ${PERFIS.length}`);

  if (DRY_RUN) {
    console.log('\n─── DRY RUN — nenhuma chamada à API será feita ───\n');
    PERFIS.forEach((p, i) => {
      const tier = getTier(p.seguidores);
      const seg  = p.seguidores ? p.seguidores.toLocaleString() : '?';
      console.log(`  ${String(i + 1).padStart(2)}. @${p.username.padEnd(30)} [${tier.padEnd(7)}] ${seg} seg — ${p.camada}`);
    });
    console.log(`\n✅ Dry run concluído. ${PERFIS.length} perfis seriam coletados.`);
    console.log(`   Output seria salvo em: ${OUTPUT_PATH}`);
    return;
  }

  // ── Produção ──────────────────────────────────────────────────────────────
  const urlsExistentes = carregarUrlsExistentes();
  console.log(`📦 URLs já coletadas (dedup SC003): ${urlsExistentes.size}\n`);

  const directUrls = PERFIS.map(p => `https://www.instagram.com/${p.username}/`);

  // 1. Iniciar Actor
  console.log('▶️  Iniciando Actor no Apify...');
  const startRes = await apifyRequestWithRetry('POST',
    `/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    {
      directUrls,
      resultsType:   'posts',
      resultsLimit:  POSTS_PER_PROFILE,
      addParentData: false,
    }
  );

  if (startRes.status !== 201) {
    console.error('❌ Erro ao iniciar Actor:', JSON.stringify(startRes.body, null, 2));
    process.exit(1);
  }

  const runId     = startRes.body.data.id;
  const datasetId = startRes.body.data.defaultDatasetId;
  console.log(`✅ Run iniciado: ${runId}`);
  console.log(`📦 Dataset: ${datasetId}\n`);

  // 2. Aguardar conclusão (poll a cada 30s, máx 80 tentativas ~40min)
  let status   = 'RUNNING';
  let attempts = 0;
  const MAX_POLL = 80;

  while ((status === 'RUNNING' || status === 'READY') && attempts < MAX_POLL) {
    attempts++;
    await sleep(30000);
    const statusRes = await apifyRequest('GET', `/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    status = statusRes.body.data?.status || 'UNKNOWN';
    const stats = statusRes.body.data?.stats || {};
    process.stdout.write(`\r⏳ [${attempts}] Status: ${status} | Items: ${stats.outputItemCount || 0}     `);
  }

  if (attempts >= MAX_POLL) {
    console.log('\n⚠️  Timeout (40min) — salvando o que coletou até agora...');
  } else {
    console.log(`\n\n✅ Run finalizado: ${status}`);
  }

  // 3. Baixar resultados
  console.log('📥 Baixando posts...');
  const itemsRes = await apifyRequestWithRetry('GET',
    `/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=3000`
  );
  const todosPosts = itemsRes.body;

  if (!Array.isArray(todosPosts) || todosPosts.length === 0) {
    console.error('❌ Nenhum post retornado. Verifique o Actor no painel Apify.');
    process.exit(1);
  }

  console.log(`📊 Posts brutos recebidos: ${todosPosts.length}`);

  // 4. Enriquecer + filtrar
  const perfisMap = Object.fromEntries(PERFIS.map(p => [p.username, p]));
  const postsFiltrados = [];
  let duplicados = 0;

  for (const post of todosPosts) {
    const username  = post.ownerUsername || '';
    const perfilInfo = perfisMap[username] || { seguidores: null };
    const tier      = getTier(perfilInfo.seguidores);
    const tipo      = mapTipo(post.type);
    const url       = post.url || (post.shortCode ? `https://www.instagram.com/p/${post.shortCode}/` : '');

    // SC003: deduplicação
    if (url && urlsExistentes.has(url)) {
      duplicados++;
      continue;
    }

    if (passaThreshold(post, tier)) {
      postsFiltrados.push({
        url,
        tipo,
        likes:           post.likesCount    || 0,
        comments:        post.commentsCount || 0,
        shares:          post.sharesCount   || null,
        saves:           post.savesCount    || null,
        caption:         post.caption       || '',
        hashtags:        Array.isArray(post.hashtags) ? post.hashtags : [],
        data_publicacao: post.timestamp     || null,
        perfil_origem:   username,
      });
    }
  }

  // 5. Metadata
  const perfisSucesso = [...new Set(todosPosts.map(p => p.ownerUsername).filter(Boolean))].length;
  const output = {
    metadata: {
      data_coleta:     new Date().toISOString(),
      perfis_tentados: PERFIS.length,
      perfis_sucesso:  perfisSucesso,
      posts_coletados: todosPosts.length,
      posts_filtrados: postsFiltrados.length,
      duplicados_removidos: duplicados,
      run_id:          runId,
    },
    posts: postsFiltrados,
  };

  // 6. Salvar
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');

  // 7. Relatório
  console.log('\n──────────────────────────────────────');
  console.log(`🔭 Coleta mensal — ${TODAY}`);
  console.log(`\nPerfis tentados:  ${PERFIS.length}`);
  console.log(`Perfis com posts: ${perfisSucesso}`);
  console.log(`Posts brutos:     ${todosPosts.length}`);
  console.log(`Duplicados:       ${duplicados}`);
  console.log(`Após filtro:      ${postsFiltrados.length} posts`);
  console.log(`\n📁 Salvo em: ${OUTPUT_PATH}`);

  // Perfis sem posts
  const perfisSucessoSet = new Set(todosPosts.map(p => p.ownerUsername).filter(Boolean));
  const perfisFalha = PERFIS.filter(p => !perfisSucessoSet.has(p.username));
  if (perfisFalha.length > 0) {
    console.log(`\n⚠️  Falhas — ${perfisFalha.length} perfis sem posts:`);
    perfisFalha.forEach(p => console.log(`  - @${p.username}`));
  }

  // SC002: cobertura mínima
  if (perfisSucesso < 15) {
    console.log('\n🚨 SC002: Cobertura baixa! Menos de 15 perfis coletados.');
    console.log('   → Alertar analyst-agent-mineracao sobre cobertura reduzida');
  }

  // Handoff (veto conditions do scout-agent)
  if (postsFiltrados.length === 0) {
    console.log('\n⛔ VETO: 0 posts filtrados — NÃO chamar analyst-agent-mineracao');
    process.exit(1);
  } else {
    console.log('\n→ Handoff para analyst-agent-mineracao ✅');
    console.log(`  Arquivo: ${OUTPUT_PATH}`);
  }
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
