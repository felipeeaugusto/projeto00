#!/usr/bin/env node
/**
 * publisher.js — Publisher Agent Script
 * Squad Dr. Julia Resende
 *
 * Usage:
 *   node publisher.js <path/to/publish-config.json>
 *
 * publish-config.json (preenchido por copy-agent + julia-chief):
 * {
 *   "pngs": ["slide-01.png", "slide-02.png", ...],  // relative to config dir
 *   "caption": "legenda com #hashtags",              // copy-agent
 *   "pilar": "parentalidade",                        // julia-chief
 *   "formato": "carrossel",                          // julia-chief ("carrossel" | "post_unico")
 *   "briefing_ref": "Briefing #2 — 2026-03-23"      // julia-chief
 * }
 *
 * Heurísticas implementadas:
 *   PB001 — Verificar token antes de publicar
 *   PB002 — Não publicar duplicado
 *   PB003 — Instagram + Facebook simultâneo
 *   PB004 — Retry em falha (max 3x, aguarda 30s)
 *   PB005 — Logar tudo em data/publicacoes.jsonl
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const https  = require('https');
const crypto = require('crypto');
const { URL } = require('url');

// ──────────────────────────────────────────────────────────────────────────────
// YAML parser mínimo para publisher-secrets.yaml
// ──────────────────────────────────────────────────────────────────────────────

function parseYamlSecrets(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const result = {};
  let section = null;

  for (const raw of lines) {
    // Strip inline comments (not inside quotes)
    const line = raw.replace(/\s+#(?![^"]*").*$/, '').trimEnd();
    if (!line.trim()) continue;

    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    if (indent === 0) {
      const m = trimmed.match(/^([a-zA-Z_]+):\s*(.*)$/);
      if (!m) continue;
      section = m[1];
      const val = m[2].replace(/^["']|["']$/g, '').trim();
      result[section] = val !== '' ? val : {};
    } else if (indent === 2 && section && typeof result[section] === 'object') {
      const m = trimmed.match(/^([a-zA-Z_]+):\s*(.*)$/);
      if (!m) continue;
      result[section][m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return result;
}

// ──────────────────────────────────────────────────────────────────────────────
// HTTP helpers
// ──────────────────────────────────────────────────────────────────────────────

function httpsPost(urlStr, headers, bodyBuffer) {
  return new Promise((resolve, reject) => {
    const u   = new URL(urlStr);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: { ...headers, 'Content-Length': bodyBuffer.length },
      },
      res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString();
          let body;
          try { body = JSON.parse(raw); } catch { body = raw; }
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );
    req.on('error', reject);
    req.write(bodyBuffer);
    req.end();
  });
}

function httpsGet(urlStr) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    https
      .get({ hostname: u.hostname, path: u.pathname + u.search }, res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          let body;
          try { body = JSON.parse(Buffer.concat(chunks).toString()); } catch { body = {}; }
          resolve({ statusCode: res.statusCode, body });
        });
      })
      .on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ──────────────────────────────────────────────────────────────────────────────
// Cloudinary
// ──────────────────────────────────────────────────────────────────────────────

function cloudinarySign(params, apiSecret) {
  const str = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(str + apiSecret).digest('hex');
}

async function uploadToCloudinary(pngPath, cloudinary) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = cloudinarySign({ timestamp }, cloudinary.api_secret);
  const boundary  = `----CloudBoundary${Date.now().toString(16)}`;
  const CRLF      = '\r\n';
  const file      = fs.readFileSync(pngPath);
  const filename  = path.basename(pngPath);

  const fields = [
    ['api_key',   cloudinary.api_key],
    ['timestamp', timestamp],
    ['signature', signature],
  ];

  const parts = [];
  for (const [name, value] of fields) {
    parts.push(Buffer.from(
      `--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}` +
      `${value}${CRLF}`
    ));
  }
  parts.push(Buffer.from(
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="file"; filename="${filename}"${CRLF}` +
    `Content-Type: image/png${CRLF}${CRLF}`
  ));
  parts.push(file);
  parts.push(Buffer.from(`${CRLF}--${boundary}--${CRLF}`));

  const body = Buffer.concat(parts);
  const url  = `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/image/upload`;

  const res = await httpsPost(url, {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  }, body);

  if (res.statusCode !== 200 || !res.body.secure_url) {
    throw new Error(`Cloudinary upload falhou (${res.statusCode}): ${JSON.stringify(res.body)}`);
  }
  return { url: res.body.secure_url, publicId: res.body.public_id };
}

async function deleteFromCloudinary(publicId, cloudinary) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = cloudinarySign({ public_id: publicId, timestamp }, cloudinary.api_secret);
  const body = Buffer.from(new URLSearchParams({
    public_id: publicId,
    api_key:   cloudinary.api_key,
    timestamp,
    signature,
  }).toString());
  const url = `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/image/destroy`;
  const res = await httpsPost(url, { 'Content-Type': 'application/x-www-form-urlencoded' }, body);
  if (res.body.result !== 'ok') {
    console.warn(`  ⚠️  Cloudinary delete (${publicId}): ${JSON.stringify(res.body)}`);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Meta Graph API
// ──────────────────────────────────────────────────────────────────────────────

const META_BASE = 'https://graph.facebook.com/v19.0';

function metaPost(endpoint, params) {
  const body = Buffer.from(new URLSearchParams(params).toString());
  return httpsPost(`${META_BASE}${endpoint}`, {
    'Content-Type': 'application/x-www-form-urlencoded',
  }, body);
}

/** PB004 — Retry em falha transitória */
async function metaPostWithRetry(endpoint, params, label) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await metaPost(endpoint, params);
    if (res.statusCode === 429 || res.statusCode >= 500) {
      console.log(`  ⏳ ${label}: erro ${res.statusCode}, aguardando 30s (tentativa ${attempt}/3)...`);
      await sleep(30000);
      continue;
    }
    return res;
  }
  throw new Error(`${label}: falhou após 3 tentativas`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Heurísticas
// ──────────────────────────────────────────────────────────────────────────────

/** PB001 — Verificar token antes de publicar */
async function checkToken(token) {
  const res = await httpsGet(`${META_BASE}/me?access_token=${encodeURIComponent(token)}`);
  if (res.statusCode !== 200 || res.body.error) {
    const err = res.body.error || res.body;
    throw new Error(
      `Token inválido ou expirado (código ${err.code || res.statusCode}).\n` +
      `  → Abra developers.facebook.com → Graph API Explorer → gere novo token\n` +
      `  → Atualize squads/dr-julia-resende/config/publisher-secrets.yaml`
    );
  }
}

/** PB002 — Não publicar duplicado */
function checkDuplicate(pngBasenames, logPath) {
  if (!fs.existsSync(logPath)) return false;
  const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (!Array.isArray(entry.png_paths)) continue;
      const logged = entry.png_paths.map(p => path.basename(p));
      if (pngBasenames.every(b => logged.includes(b))) return true;
    } catch { /* linha malformada — ignorar */ }
  }
  return false;
}

/** PB005 — Logar publicação */
function logPublication(entry, logPath) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
}

// ──────────────────────────────────────────────────────────────────────────────
// Fluxos de publicação
// ──────────────────────────────────────────────────────────────────────────────

async function publishCarrossel(pngPaths, caption, secrets) {
  const { meta, cloudinary } = secrets;
  const uploads = [];

  // 1. Upload todos os slides
  console.log(`\n📤 Upload de ${pngPaths.length} slides → Cloudinary...`);
  for (const p of pngPaths) {
    process.stdout.write(`  ↑ ${path.basename(p)}... `);
    const up = await uploadToCloudinary(p, cloudinary);
    uploads.push(up);
    console.log('✓');
  }

  // 2. Criar container por slide (carousel items)
  console.log('\n📸 Criando containers Instagram...');
  const containerIds = [];
  for (let i = 0; i < uploads.length; i++) {
    const res = await metaPostWithRetry(
      `/${meta.ig_user_id}/media`,
      { image_url: uploads[i].url, is_carousel_item: 'true', access_token: meta.ig_access_token },
      `container slide ${i + 1}`
    );
    if (!res.body.id) throw new Error(`Falha ao criar container slide ${i + 1}: ${JSON.stringify(res.body)}`);
    containerIds.push(res.body.id);
    console.log(`  ✓ slide ${i + 1} → container ${res.body.id}`);
  }

  // 3. Criar container pai do carrossel
  console.log('\n🎠 Criando container pai...');
  const parentRes = await metaPostWithRetry(
    `/${meta.ig_user_id}/media`,
    {
      media_type: 'CAROUSEL',
      children:   containerIds.join(','),
      caption,
      access_token: meta.ig_access_token,
    },
    'container pai'
  );
  if (!parentRes.body.id) throw new Error(`Falha ao criar container pai: ${JSON.stringify(parentRes.body)}`);
  console.log(`  ✓ container pai: ${parentRes.body.id}`);

  // 4. Publicar carrossel
  console.log('\n🚀 Publicando carrossel no Instagram...');
  const publishRes = await metaPostWithRetry(
    `/${meta.ig_user_id}/media_publish`,
    { creation_id: parentRes.body.id, access_token: meta.ig_access_token },
    'media_publish'
  );
  if (!publishRes.body.id) throw new Error(`Falha ao publicar: ${JSON.stringify(publishRes.body)}`);
  const igPostId = publishRes.body.id;
  console.log(`  ✅ Instagram post ID: ${igPostId}`);

  // PB003 — Facebook simultâneo (usa capa = primeiro slide)
  console.log('\n📘 Publicando no Facebook...');
  const fbRes = await metaPostWithRetry(
    `/${meta.page_id}/photos`,
    { url: uploads[0].url, message: caption, access_token: meta.page_access_token },
    'Facebook post'
  );
  let fbPostId = '(falhou)';
  if (fbRes.body.error) {
    console.warn(`  ⚠️  Facebook falhou: ${fbRes.body.error.message}`);
  } else {
    fbPostId = fbRes.body.post_id || fbRes.body.id;
    console.log(`  ✅ Facebook post ID: ${fbPostId}`);
  }

  // 5. Limpar Cloudinary
  console.log('\n🧹 Limpando Cloudinary...');
  for (const up of uploads) {
    await deleteFromCloudinary(up.publicId, cloudinary);
    process.stdout.write('  ✓ ');
  }
  console.log();

  return { igPostId, fbPostId };
}

async function publishPostUnico(pngPath, caption, secrets) {
  const { meta, cloudinary } = secrets;

  console.log('\n📤 Upload → Cloudinary...');
  const up = await uploadToCloudinary(pngPath, cloudinary);
  console.log(`  ✓ ${up.url}`);

  console.log('\n📸 Criando container Instagram...');
  const containerRes = await metaPostWithRetry(
    `/${meta.ig_user_id}/media`,
    { image_url: up.url, caption, access_token: meta.ig_access_token },
    'IG container'
  );
  if (!containerRes.body.id) throw new Error(`Falha ao criar container: ${JSON.stringify(containerRes.body)}`);

  console.log('\n🚀 Publicando no Instagram...');
  const publishRes = await metaPostWithRetry(
    `/${meta.ig_user_id}/media_publish`,
    { creation_id: containerRes.body.id, access_token: meta.ig_access_token },
    'media_publish'
  );
  if (!publishRes.body.id) throw new Error(`Falha ao publicar: ${JSON.stringify(publishRes.body)}`);
  const igPostId = publishRes.body.id;
  console.log(`  ✅ Instagram post ID: ${igPostId}`);

  // PB003 — Facebook simultâneo
  console.log('\n📘 Publicando no Facebook...');
  const fbRes = await metaPostWithRetry(
    `/${meta.page_id}/photos`,
    { url: up.url, message: caption, access_token: meta.page_access_token },
    'Facebook post'
  );
  let fbPostId = '(falhou)';
  if (fbRes.body.error) {
    console.warn(`  ⚠️  Facebook falhou: ${fbRes.body.error.message}`);
  } else {
    fbPostId = fbRes.body.post_id || fbRes.body.id;
    console.log(`  ✅ Facebook post ID: ${fbPostId}`);
  }

  // Limpar Cloudinary
  console.log('\n🧹 Limpando Cloudinary...');
  await deleteFromCloudinary(up.publicId, cloudinary);
  console.log('  ✓');

  return { igPostId, fbPostId };
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error('Uso: node publisher.js <path/to/publish-config.json>');
    console.error('');
    console.error('Exemplo:');
    console.error('  node squads/dr-julia-resende/assets/publisher.js \\');
    console.error('       squads/dr-julia-resende/carrossel-03/publish-config.json');
    process.exit(1);
  }

  const configDir = path.dirname(path.resolve(configPath));
  const config    = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Validações básicas
  if (!Array.isArray(config.pngs) || config.pngs.length === 0) {
    throw new Error('publish-config.json: campo "pngs" é obrigatório e não pode estar vazio.');
  }
  if (!config.caption || !config.caption.trim()) {
    throw new Error('VETO: legenda (caption) vazia — copy-agent precisa preencher antes de publicar.');
  }

  // Resolver caminhos dos PNGs
  const pngPaths = config.pngs.map(p => path.resolve(configDir, p));
  for (const p of pngPaths) {
    if (!fs.existsSync(p)) {
      throw new Error(`VETO: PNG não encontrado: ${p}`);
    }
  }

  // Carregar secrets
  const secretsPath = path.resolve(__dirname, '../config/publisher-secrets.yaml');
  if (!fs.existsSync(secretsPath)) {
    throw new Error(`Arquivo de credenciais não encontrado: ${secretsPath}`);
  }
  const secrets = parseYamlSecrets(secretsPath);

  // Caminho do log
  const logPath = path.resolve(__dirname, '../data/publicacoes.jsonl');

  const formato = config.formato || (pngPaths.length > 1 ? 'carrossel' : 'post_unico');

  console.log('📡 publisher-agent — iniciando');
  console.log(`   Formato  : ${formato}`);
  console.log(`   Slides   : ${pngPaths.length}`);
  console.log(`   Pilar    : ${config.pilar || '(não informado)'}`);
  console.log(`   Briefing : ${config.briefing_ref || '(não informado)'}`);

  // PB001 — Verificar token
  process.stdout.write('\n🔑 Verificando token Instagram... ');
  await checkToken(secrets.meta.ig_access_token);
  console.log('✓ válido');

  // PB002 — Verificar duplicado
  const basenames = pngPaths.map(p => path.basename(p));
  if (checkDuplicate(basenames, logPath)) {
    throw new Error('VETO: post duplicado — estes PNGs já foram publicados. Ver data/publicacoes.jsonl.');
  }

  let igPostId, fbPostId;
  let status = 'publicado';
  let erroMsg;

  try {
    if (formato === 'carrossel' || pngPaths.length > 1) {
      ({ igPostId, fbPostId } = await publishCarrossel(pngPaths, config.caption, secrets));
    } else {
      ({ igPostId, fbPostId } = await publishPostUnico(pngPaths[0], config.caption, secrets));
    }
  } catch (err) {
    status  = 'falha';
    erroMsg = err.message;
    console.error(`\n❌ Publicação falhou: ${err.message}`);
  }

  // PB005 — Logar tudo (sucesso ou falha)
  const logEntry = {
    data:              new Date().toISOString(),
    tipo:              'feed',
    formato,
    pilar:             config.pilar || '',
    instagram_post_id: igPostId || null,
    facebook_post_id:  fbPostId || null,
    png_paths:         pngPaths.map(p =>
      path.relative(path.resolve(__dirname, '../../..'), p).replace(/\\/g, '/')
    ),
    briefing_ref:      config.briefing_ref || '',
    status,
    ...(erroMsg ? { erro: erroMsg } : {}),
  };
  logPublication(logEntry, logPath);
  console.log(`\n📁 Log atualizado: data/publicacoes.jsonl`);

  if (status === 'falha') process.exit(1);

  console.log('\n✅ Publicação concluída!\n');
  console.log(`   Instagram : post ID ${igPostId}`);
  console.log(`   Facebook  : post ID ${fbPostId}`);
  console.log(`   Log       : data/publicacoes.jsonl\n`);
}

main().catch(err => {
  console.error('\n❌ Erro inesperado:', err.message);
  process.exit(1);
});
