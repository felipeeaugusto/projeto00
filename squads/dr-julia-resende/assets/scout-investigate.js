/**
 * scout-investigate.js — Investigar 17 perfis sem retorno
 * Usa instagram-profile-scraper para checar status de cada perfil
 */

const https = require('https');

// Token lido do publisher-secrets.yaml (nunca commitar o token diretamente)
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const secretsPath = path.join(__dirname, '../config/publisher-secrets.yaml');
const secrets = yaml.load(fs.readFileSync(secretsPath, 'utf8'));
const APIFY_TOKEN = secrets.apify.api_token;
const ACTOR_ID    = 'apify~instagram-profile-scraper';

const PERFIS_FALHA = [
  'institutoneurosaber', 'draanaluizasilveira', 'camilaferreirapsico',
  'drrenatadomingues', 'eusoumaedetea', 'kleberpayam', 'lucasinutile',
  'rodrigocampos.mkt', 'nataliabittencourt', 'rafaelfeio',
  'vivianmelo.conteudo', 'drauziovarella', 'taispadilha', 'brazilianteacher',
  'viihmoraes', 'dani_hyodo', 'kerolaynasciimento',
];

function apifyRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.apify.com', port: 443, path, method,
      headers: {
        'Authorization': `Bearer ${APIFY_TOKEN}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
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

async function main() {
  console.log(`\n🔍 Investigando ${PERFIS_FALHA.length} perfis sem retorno...\n`);

  const usernames = PERFIS_FALHA;

  const startRes = await apifyRequest('POST', `/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`, {
    usernames,
  });

  if (startRes.status !== 201) {
    console.error('❌ Erro ao iniciar Actor:', JSON.stringify(startRes.body, null, 2));
    process.exit(1);
  }

  const runId     = startRes.body.data.id;
  const datasetId = startRes.body.data.defaultDatasetId;
  console.log(`✅ Run iniciado: ${runId}\n`);

  let status = 'RUNNING';
  let attempts = 0;
  while (status === 'RUNNING' || status === 'READY') {
    attempts++;
    await sleep(15000);
    const r = await apifyRequest('GET', `/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    status = r.body.data?.status || 'UNKNOWN';
    process.stdout.write(`\r⏳ [${attempts}] Status: ${status}     `);
    if (attempts > 40) { console.log('\n⚠️  Timeout'); break; }
  }

  console.log(`\n\n📥 Baixando resultados...\n`);
  const itemsRes = await apifyRequest('GET', `/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=100`);
  const perfis = itemsRes.body;

  if (!Array.isArray(perfis) || perfis.length === 0) {
    console.log('❌ Nenhum dado retornado. Actor pode não suportar este input.');
    process.exit(1);
  }

  // Resultado por perfil
  const encontrados = new Set(perfis.map(p => p.username));
  const naoEncontrados = PERFIS_FALHA.filter(u => !encontrados.has(u));

  console.log('─────────────────────────────────────────────────');
  console.log('📊 DIAGNÓSTICO DOS 17 PERFIS\n');

  for (const p of perfis) {
    const privado  = p.isPrivate ? '🔒 PRIVADO' : '🌐 público';
    const verified = p.verified  ? ' ✔️'         : '';
    const seguidor = p.followersCount != null ? `${p.followersCount.toLocaleString()} seguidores` : 'seguidores desconhecidos';
    const posts    = p.postsCount != null     ? `${p.postsCount} posts`    : '? posts';
    console.log(`@${p.username}${verified}`);
    console.log(`  ${privado} | ${seguidor} | ${posts}`);
    console.log('');
  }

  if (naoEncontrados.length > 0) {
    console.log('❌ Perfis NÃO encontrados (conta inexistente ou nome errado):');
    naoEncontrados.forEach(u => console.log(`  - @${u}`));
  }
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
