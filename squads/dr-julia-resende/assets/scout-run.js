/**
 * scout-run.js — Coleta completa dos 30 perfis via Apify REST API
 * Roda independente de Docker/MCP
 * Output: squads/dr-julia-resende/data/mineracao/posts_brutos/coleta-YYYY-MM-DD.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────────
// Token lido do publisher-secrets.yaml (nunca commitar o token diretamente)
const fs2 = require('fs');
const yaml = require('js-yaml');
const secretsPath = path.join(__dirname, '../config/publisher-secrets.yaml');
const secrets = yaml.load(fs2.readFileSync(secretsPath, 'utf8'));
const APIFY_TOKEN = secrets.apify.api_token;
const ACTOR_ID    = 'apify~instagram-scraper';
const TODAY       = new Date().toISOString().split('T')[0];
const OUTPUT_PATH = path.join(__dirname, `../data/mineracao/posts_brutos/coleta-${TODAY}.json`);
const POSTS_PER_PROFILE = 20;

// ─── Perfis ativos (29 — maternidadepratica INATIVA) ──────────────────────
const PERFIS = [
  // Camada 1 — Nicho
  { username: 'maternidadereal',          seguidores: 377206,  camada: 1 },
  { username: 'academialendaria',         seguidores: null,    camada: 1 },
  { username: 'maedemenino_oficial',      seguidores: null,    camada: 1 },
  { username: 'institutoneurosaber',      seguidores: null,    camada: 1 },
  { username: 'draanaluizasilveira',      seguidores: null,    camada: 1 },
  { username: 'pedagogajaquelineribeiro', seguidores: null,    camada: 1 },
  { username: 'camilaferreirapsico',      seguidores: null,    camada: 1 },
  { username: 'drrenatadomingues',        seguidores: null,    camada: 1 },
  { username: 'eusoumaedetea',            seguidores: null,    camada: 1 },
  // Camada 2 — Criadores
  { username: 'pedrosobral',              seguidores: null,    camada: 2 },
  { username: 'finclass_grupoprimo',      seguidores: null,    camada: 2 },
  { username: 'bruno_perini',             seguidores: null,    camada: 2 },
  { username: 'kleberpayam',              seguidores: null,    camada: 2 },
  { username: 'lucasinutile',             seguidores: null,    camada: 2 },
  { username: 'camilaportella_',          seguidores: null,    camada: 2 },
  { username: 'rodrigocampos.mkt',        seguidores: null,    camada: 2 },
  { username: 'nataliabittencourt',       seguidores: null,    camada: 2 },
  { username: 'rafaelfeio',              seguidores: null,    camada: 2 },
  { username: 'vivianmelo.conteudo',      seguidores: null,    camada: 2 },
  // Camada 3 — Referências visuais
  { username: 'oalanicolas',              seguidores: 2100000, camada: 3 },
  { username: 'drauziovarella',           seguidores: null,    camada: 3 },
  { username: 'tuliofarias',              seguidores: null,    camada: 3 },
  { username: 'leandrodesouza',           seguidores: null,    camada: 3 },
  { username: 'taispadilha',              seguidores: null,    camada: 3 },
  { username: 'camila_coutinho',          seguidores: null,    camada: 3 },
  { username: 'brazilianteacher',         seguidores: null,    camada: 3 },
  { username: 'viihmoraes',               seguidores: null,    camada: 3 },
  { username: 'juromanos',                seguidores: null,    camada: 3 },
  { username: 'dani_hyodo',               seguidores: null,    camada: 3 },
  { username: 'kerolaynasciimento',       seguidores: null,    camada: 3 },
];

// ─── Thresholds por tamanho ────────────────────────────────────────────────
function getTier(seguidores) {
  if (!seguidores) return 'pequeno'; // default conservador para perfis desconhecidos
  if (seguidores >= 1000000) return 'grande';
  if (seguidores >= 100000)  return 'medio';
  return 'pequeno';
}

const THRESHOLDS = {
  grande:  { reel: { likes: 5000, comments: 100 }, carrossel: { likes: 3000, comments: 50 }, imagem: { likes: 2000, comments: 30 } },
  medio:   { reel: { likes: 1500, comments: 30  }, carrossel: { likes:  800, comments: 15 }, imagem: { likes:  500, comments: 10 } },
  pequeno: { reel: { likes:  500, comments: 10  }, carrossel: { likes:  200, comments:  5 }, imagem: { likes:  100, comments:  3 } },
};

function passaThreshold(post, tier) {
  const t = THRESHOLDS[tier];
  const tipo = mapTipo(post.type);
  const threshold = t[tipo] || t.imagem;
  return (post.likesCount || 0) >= threshold.likes && (post.commentsCount || 0) >= threshold.comments;
}

function mapTipo(type) {
  if (!type) return 'imagem';
  const t = type.toLowerCase();
  if (t === 'video' || t === 'reel') return 'reel';
  if (t === 'sidecar' || t === 'carousel') return 'carrossel';
  return 'imagem';
}

// ─── Helpers HTTP ──────────────────────────────────────────────────────────
function apifyRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.apify.com',
      port: 443,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${APIFY_TOKEN}`,
        'Content-Type': 'application/json',
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

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🔭 Scout Agent — Coleta completa ${TODAY}`);
  console.log(`📋 Perfis: ${PERFIS.length} ativos\n`);

  const directUrls = PERFIS.map(p => `https://www.instagram.com/${p.username}/`);

  // 1. Iniciar run
  console.log('▶️  Iniciando Actor no Apify...');
  const startRes = await apifyRequest('POST', `/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`, {
    directUrls,
    resultsType: 'posts',
    resultsLimit: POSTS_PER_PROFILE,
    addParentData: false,
  });

  if (startRes.status !== 201) {
    console.error('❌ Erro ao iniciar Actor:', JSON.stringify(startRes.body, null, 2));
    process.exit(1);
  }

  const runId     = startRes.body.data.id;
  const datasetId = startRes.body.data.defaultDatasetId;
  console.log(`✅ Run iniciado: ${runId}`);
  console.log(`📦 Dataset: ${datasetId}\n`);

  // 2. Aguardar conclusão (poll a cada 30s)
  let status = 'RUNNING';
  let attempts = 0;
  const MAX_ATTEMPTS = 80; // ~40 min máximo

  while (status === 'RUNNING' || status === 'READY') {
    attempts++;
    await sleep(30000);
    const statusRes = await apifyRequest('GET', `/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    status = statusRes.body.data?.status || 'UNKNOWN';
    const stats = statusRes.body.data?.stats || {};
    process.stdout.write(`\r⏳ [${attempts}] Status: ${status} | Items: ${stats.outputItemCount || 0}     `);

    if (attempts >= MAX_ATTEMPTS) {
      console.log('\n⚠️  Timeout — salvando o que coletou até agora...');
      break;
    }
  }

  console.log(`\n\n✅ Run finalizado com status: ${status}`);

  // 3. Baixar resultados
  console.log('📥 Baixando posts...');
  const itemsRes = await apifyRequest('GET', `/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=2000`);
  const todosPostes = itemsRes.body;

  if (!Array.isArray(todosPostes) || todosPostes.length === 0) {
    console.error('❌ Nenhum post retornado. Verifique o Actor no painel Apify.');
    process.exit(1);
  }

  console.log(`📊 Posts brutos: ${todosPostes.length}`);

  // 4. Enriquecer com dados do perfil e aplicar thresholds
  const perfisMap = Object.fromEntries(PERFIS.map(p => [p.username, p]));
  const postsFiltrados = [];
  const postsBrutos    = [];

  for (const post of todosPostes) {
    const username = post.ownerUsername || '';
    const perfilInfo = perfisMap[username] || { seguidores: null };
    const tier = getTier(perfilInfo.seguidores);
    const tipo = mapTipo(post.type);

    const enriched = {
      url:             post.url || `https://www.instagram.com/p/${post.shortCode}/`,
      tipo,
      likes:           post.likesCount    || 0,
      comments:        post.commentsCount || 0,
      shares:          null,
      saves:           null,
      caption:         post.caption       || '',
      hashtags:        post.hashtags      || [],
      data_publicacao: post.timestamp     || null,
      perfil_origem:   username,
      tier,
    };

    postsBrutos.push(enriched);
    if (passaThreshold(post, tier)) {
      postsFiltrados.push(enriched);
    }
  }

  // 5. Montar output com metadata
  const perfisSucesso = [...new Set(postsBrutos.map(p => p.perfil_origem))].length;
  const output = {
    metadata: {
      data_coleta:       new Date().toISOString(),
      perfis_tentados:   PERFIS.length,
      perfis_sucesso:    perfisSucesso,
      posts_coletados:   postsBrutos.length,
      posts_filtrados:   postsFiltrados.length,
      run_id:            runId,
    },
    posts: postsFiltrados,
  };

  // 6. Salvar
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');

  // 7. Relatório final
  console.log('\n─────────────────────────────────────');
  console.log(`🔭 Coleta semanal — ${TODAY}`);
  console.log(`\nPerfis coletados: ${perfisSucesso}/${PERFIS.length}`);
  console.log(`Posts brutos:     ${postsBrutos.length}`);
  console.log(`Após filtro:      ${postsFiltrados.length} posts`);
  console.log(`\n📁 Salvo em: ${OUTPUT_PATH}`);

  // Perfis que não apareceram nos resultados
  const perfisSucessoSet = new Set(postsBrutos.map(p => p.perfil_origem));
  const perfisFalha = PERFIS.filter(p => !perfisSucessoSet.has(p.username));
  if (perfisFalha.length > 0) {
    console.log(`\n⚠️  Falhas (${perfisFalha.length} perfis sem posts):`);
    perfisFalha.forEach(p => console.log(`  - @${p.username}`));
  }

  // SC002: alerta cobertura baixa
  if (perfisSucesso < 15) {
    console.log('\n🚨 SC002: Cobertura baixa! Menos de 15 perfis coletados.');
    console.log('   → Alertar analyst-agent-mineracao');
  }

  if (postsFiltrados.length > 0) {
    console.log('\n→ Handoff para analyst-agent-mineracao ✅');
  } else {
    console.log('\n⛔ VETO: 0 posts filtrados — não chamar analyst-agent');
  }
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
