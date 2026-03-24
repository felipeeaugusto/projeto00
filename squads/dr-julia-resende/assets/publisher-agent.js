/**
 * publisher-agent.js — Publica carrossel ou post único no Instagram + Facebook
 *
 * Uso:
 *   node publisher-agent.js --pasta carrossel-02 --legenda "texto do post"
 *   node publisher-agent.js --pasta carrossel-02 --arquivo-legenda legenda.txt
 *
 * Pré-requisito: compositor-agent.js já rodou e gerou manifesto.json na pasta
 * Credenciais:   config/publisher-secrets.yaml
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

// ─── Carregar credenciais ────────────────────────────────────────────────────
const yaml = require('js-yaml');
const secretsPath = path.join(__dirname, '../config/publisher-secrets.yaml');

if (!fs.existsSync(secretsPath)) {
  console.error('❌ publisher-secrets.yaml não encontrado em config/');
  console.error('   Crie o arquivo com as credenciais antes de publicar.');
  process.exit(1);
}

const secrets = yaml.load(fs.readFileSync(secretsPath, 'utf8'));

if (secrets.meta.ig_access_token === 'PREENCHER' || secrets.cloudinary.api_key === 'PREENCHER') {
  console.error('❌ Credenciais não preenchidas em publisher-secrets.yaml');
  console.error('   Preencha ig_access_token, page_access_token, cloudinary api_key e api_secret');
  process.exit(1);
}

const { ig_user_id, ig_access_token, page_id, page_access_token } = secrets.meta;
const { cloud_name, api_key: cl_api_key, api_secret: cl_api_secret } = secrets.cloudinary;
const API = 'https://graph.facebook.com/v19.0';

// ─── Args ────────────────────────────────────────────────────────────────────
const args         = process.argv.slice(2);
const pastaIdx     = args.indexOf('--pasta');
const legendaIdx   = args.indexOf('--legenda');
const arquivoIdx   = args.indexOf('--arquivo-legenda');
const soFacebook   = args.includes('--so-facebook');

const pasta        = pastaIdx    !== -1 ? args[pastaIdx + 1]    : null;
const legendaInline = legendaIdx  !== -1 ? args[legendaIdx + 1]  : null;
const legendaArq   = arquivoIdx  !== -1 ? args[arquivoIdx + 1]  : null;

if (!pasta) {
  console.error('❌ Uso: node publisher-agent.js --pasta <nome> --legenda "texto"');
  console.error('   Flag opcional: --so-facebook (publica só no Facebook, pula Instagram)');
  process.exit(1);
}

const BASE = path.resolve(__dirname, '..', pasta);
const manifestoPath = path.join(BASE, 'manifesto.json');

if (!fs.existsSync(manifestoPath)) {
  console.error(`❌ manifesto.json não encontrado em ${BASE}`);
  console.error('   Rode o compositor-agent primeiro: node compositor-agent.js --pasta ' + pasta);
  process.exit(1);
}

const manifesto = JSON.parse(fs.readFileSync(manifestoPath, 'utf8'));
let legenda = legendaInline
  || (legendaArq && fs.existsSync(path.join(BASE, legendaArq)) ? fs.readFileSync(path.join(BASE, legendaArq), 'utf8').trim() : null)
  || (fs.existsSync(path.join(BASE, 'legenda.txt')) ? fs.readFileSync(path.join(BASE, 'legenda.txt'), 'utf8').trim() : null);

if (!legenda) {
  console.error('❌ Legenda não encontrada. Use --legenda "texto" ou crie legenda.txt na pasta.');
  process.exit(1);
}

const LOG_PATH = path.join(__dirname, '../data/publicacoes.jsonl');

// ─── Helpers HTTP ────────────────────────────────────────────────────────────
function httpPost(url, params) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams(params).toString();
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { resolve({ raw: data }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Cloudinary Upload ───────────────────────────────────────────────────────
function cloudinaryUpload(pngPath) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${cl_api_secret}`)
      .digest('hex');

    const boundary = '----FormBoundary' + Date.now();
    const fileData = fs.readFileSync(pngPath);
    const fileName = path.basename(pngPath);

    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: image/png\r\n\r\n`),
      fileData,
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n${cl_api_key}`),
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n${timestamp}`),
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="signature"\r\n\r\n${signature}`),
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${cloud_name}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('Cloudinary parse error: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function cloudinaryDelete(publicId) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${cl_api_secret}`)
    .digest('hex');

  return httpPost(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
    public_id: publicId,
    api_key: cl_api_key,
    timestamp,
    signature
  });
}

// ─── Verificar token ─────────────────────────────────────────────────────────
function verificarToken() {
  return new Promise((resolve, reject) => {
    const url = `${API}/me?access_token=${ig_access_token}`;
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// ─── Logar publicação ────────────────────────────────────────────────────────
function logar(entrada) {
  fs.appendFileSync(LOG_PATH, JSON.stringify(entrada) + '\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n📡 publisher-agent iniciando...\n');

  // 1. Verificar token
  console.log('   🔑 Verificando token Instagram...');
  const tokenCheck = await verificarToken();
  if (tokenCheck.error) {
    console.error(`\n❌ Token inválido ou expirado: ${tokenCheck.error.message}`);
    console.error('   → Renovar token em developers.facebook.com');
    console.error('   → Atualizar ig_access_token em config/publisher-secrets.yaml');
    process.exit(1);
  }
  console.log(`   ✅ Token válido — conta: ${tokenCheck.name || tokenCheck.id}`);

  const slides = manifesto.slides;
  const publicIds = [];
  const slideUrls = [];

  // 2. Upload de cada slide para Cloudinary
  console.log(`\n   ☁️  Fazendo upload de ${slides.length} slide(s) para Cloudinary...`);
  for (const slide of slides) {
    const result = await cloudinaryUpload(slide.caminho);
    if (!result.secure_url) {
      console.error(`\n❌ Erro no upload do Cloudinary: ${JSON.stringify(result)}`);
      process.exit(1);
    }
    slideUrls.push(result.secure_url);
    publicIds.push(result.public_id);
    console.log(`   ✅ ${slide.nome} → ${result.secure_url}`);
  }

  let igPostId = null;
  let fbPostId = null;

  if (soFacebook) {
    console.log('\n   ⏭️  --so-facebook ativo — pulando Instagram');
  } else if (slides.length === 1) {
    // ─── Post único ─────────────────────────────────────────────────────────
    console.log('\n   📸 Publicando post único no Instagram...');
    const container = await httpPost(`${API}/${ig_user_id}/media`, {
      image_url: slideUrls[0],
      caption: legenda,
      access_token: ig_access_token
    });
    if (!container.id) {
      console.error('❌ Erro ao criar container:', JSON.stringify(container));
      process.exit(1);
    }
    const publish = await httpPost(`${API}/${ig_user_id}/media_publish`, {
      creation_id: container.id,
      access_token: ig_access_token
    });
    igPostId = publish.id;
    console.log(`   ✅ Instagram publicado — ID: ${igPostId}`);

  } else {
    // ─── Carrossel ──────────────────────────────────────────────────────────
    console.log(`\n   📸 Criando ${slides.length} containers de carrossel no Instagram...`);
    const childIds = [];
    for (const url of slideUrls) {
      const c = await httpPost(`${API}/${ig_user_id}/media`, {
        image_url: url,
        is_carousel_item: 'true',
        access_token: ig_access_token
      });
      if (!c.id) {
        console.error('❌ Erro ao criar container filho:', JSON.stringify(c));
        process.exit(1);
      }
      childIds.push(c.id);
      console.log(`   ✅ Container filho criado: ${c.id}`);
    }

    console.log('\n   📸 Criando container pai do carrossel...');
    const parent = await httpPost(`${API}/${ig_user_id}/media`, {
      media_type: 'CAROUSEL',
      children: childIds.join(','),
      caption: legenda,
      access_token: ig_access_token
    });
    if (!parent.id) {
      console.error('❌ Erro ao criar container pai:', JSON.stringify(parent));
      process.exit(1);
    }

    console.log('\n   📸 Publicando carrossel...');
    const publish = await httpPost(`${API}/${ig_user_id}/media_publish`, {
      creation_id: parent.id,
      access_token: ig_access_token
    });
    igPostId = publish.id;
    console.log(`   ✅ Instagram publicado — ID: ${igPostId}`);
  }

  // ─── Facebook ──────────────────────────────────────────────────────────────
  console.log('\n   📘 Publicando no Facebook...');
  if (slideUrls.length === 1) {
    // Post único — endpoint direto
    const fb = await httpPost(`${API}/${page_id}/photos`, {
      url: slideUrls[0],
      message: legenda,
      access_token: page_access_token
    });
    fbPostId = fb.post_id || fb.id;
  } else {
    // Álbum (carrossel) — upload individual não publicado + feed com attached_media
    console.log(`   📸 Fazendo upload de ${slideUrls.length} fotos não publicadas no Facebook...`);
    const fbPhotoIds = [];
    for (const url of slideUrls) {
      const photo = await httpPost(`${API}/${page_id}/photos`, {
        url,
        published: 'false',
        access_token: page_access_token
      });
      if (!photo.id) {
        console.warn(`   ⚠️  Falha ao fazer upload de foto FB: ${JSON.stringify(photo)}`);
      } else {
        fbPhotoIds.push(photo.id);
        console.log(`   ✅ Foto FB carregada: ${photo.id}`);
      }
    }
    if (fbPhotoIds.length > 0) {
      const feedParams = {
        message: legenda,
        access_token: page_access_token
      };
      fbPhotoIds.forEach((id, i) => {
        feedParams[`attached_media[${i}]`] = JSON.stringify({ media_fbid: id });
      });
      const feed = await httpPost(`${API}/${page_id}/feed`, feedParams);
      fbPostId = feed.id;
    }
  }
  if (fbPostId) {
    console.log(`   ✅ Facebook publicado — ID: ${fbPostId}`);
  } else {
    console.warn(`   ⚠️  Facebook falhou`);
  }

  // ─── Limpar Cloudinary ──────────────────────────────────────────────────────
  console.log('\n   🧹 Removendo imagens temporárias do Cloudinary...');
  for (const pid of publicIds) {
    await cloudinaryDelete(pid);
    console.log(`   ✅ Deletado: ${pid}`);
  }

  // ─── Log ────────────────────────────────────────────────────────────────────
  const entrada = {
    data: new Date().toISOString(),
    pasta,
    tipo: slides.length > 1 ? 'carrossel' : 'post_unico',
    slides: slides.length,
    instagram_post_id: igPostId,
    facebook_post_id: fbPostId,
    status: 'publicado'
  };
  logar(entrada);

  console.log('\n✅ publisher-agent concluído!');
  console.log(`   Instagram: ${igPostId}`);
  console.log(`   Facebook:  ${fbPostId}`);
  console.log(`   Log atualizado: data/publicacoes.jsonl\n`);
})();
