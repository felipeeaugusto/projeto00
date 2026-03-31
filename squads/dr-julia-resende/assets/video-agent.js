#!/usr/bin/env node
/**
 * video-agent.js — Video Agent Script
 * Squad Dr. Julia Resende
 *
 * Usage:
 *   node video-agent.js <roteiro>              # Ex: node video-agent.js 01
 *   node video-agent.js <roteiro> --dry-run    # Valida sem chamar APIs reais
 *
 * Pipeline (4 etapas — video-agent.md):
 *   1. Receber roteiro aprovado → validar contagem de palavras
 *   2. ElevenLabs TTS → gerar MP3 com voz clonada da Dra. Julia
 *   3. Google Veo3 → gerar MP4 9:16 1080x1920 com áudio sincronizado
 *   4. Aguardar aprovação manual de Felipe
 *
 * Heurísticas implementadas:
 *   H001 — Roteiro > 200 palavras → PARAR, pedir encurtar ao hormozi-copy
 *   H002 — Áudio estimado > 65s → ALERTAR (limite Reels)
 *   H003 — Erro 401/403 → PARAR IMEDIATAMENTE
 *   H004 — Veo3 safety policy → PARAR, reportar mensagem exata
 *   H005 — Aprovação → exibir comando para publisher-agent
 *   H006 — Reprovação de voz → ajustar voice_settings e regerar
 *   H007 — Processar 1 roteiro por vez (pipeline sequencial)
 *   H008 — Nomenclatura: video-YYYY-MM-DD-{roteiro_id}.mp4
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const https  = require('https');
const crypto = require('crypto');
const { URL } = require('url');

// ─── Paths ────────────────────────────────────────────────────────────────────

const SQUAD_DIR     = path.resolve(__dirname, '..');
const SECRETS_PATH  = path.join(SQUAD_DIR, 'config', 'publisher-secrets.yaml');
const ROTEIROS_PATH = path.join(SQUAD_DIR, 'output', 'roteiros-video-2026-03-28.md');
const OUTPUT_DIR    = path.join(SQUAD_DIR, 'output', 'videos');
const LOG_PATH      = path.join(SQUAD_DIR, 'data', 'videos.jsonl');

// ─── YAML parser mínimo (mesmo padrão do publisher.js) ───────────────────────

function parseYamlSecrets(filePath) {
  const lines  = fs.readFileSync(filePath, 'utf8').split('\n');
  const result = {};
  let section  = null;

  function extractValue(raw) {
    const trimmed = raw.trim();
    // Quoted value: extract content between first pair of matching quotes
    const quotedMatch = trimmed.match(/^["']([^"']*)["']/);
    if (quotedMatch) return quotedMatch[1];
    // Unquoted: strip trailing inline comment (  # ...)
    return trimmed.replace(/\s{2,}#.*$/, '').trim();
  }

  for (const raw of lines) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indent  = raw.length - raw.trimStart().length;
    const trimmed = raw.trim();

    if (indent === 0) {
      const m = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
      if (!m) continue;
      section = m[1];
      const val = extractValue(m[2]);
      result[section] = val !== '' ? val : {};
    } else if (indent === 2 && section && typeof result[section] === 'object') {
      const m = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
      if (!m) continue;
      result[section][m[1]] = extractValue(m[2]);
    }
  }
  return result;
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

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
          const buf = Buffer.concat(chunks);
          let body;
          try { body = JSON.parse(buf.toString()); } catch { body = buf; }
          resolve({ statusCode: res.statusCode, headers: res.headers, body });
        });
      }
    );
    req.on('error', reject);
    req.write(bodyBuffer);
    req.end();
  });
}

function httpsGet(urlStr, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    https
      .get(
        { hostname: u.hostname, path: u.pathname + u.search, headers: extraHeaders },
        res => {
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => {
            const buf = Buffer.concat(chunks);
            let body;
            try { body = JSON.parse(buf.toString()); } catch { body = buf; }
            resolve({ statusCode: res.statusCode, body });
          });
        }
      )
      .on('error', reject);
  });
}

function httpsDownload(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const u    = new URL(urlStr);
    const file = fs.createWriteStream(destPath);
    https
      .get({ hostname: u.hostname, path: u.pathname + u.search }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          return httpsDownload(res.headers.location, destPath).then(resolve).catch(reject);
        }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Slug generator ───────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40)
    .replace(/-+$/, '');
}

// ─── Roteiro parser ───────────────────────────────────────────────────────────

/**
 * Lê o arquivo de roteiros e extrai a versão @hormozi-copy do roteiro indicado.
 * Retorna: { text, wordCount, estimatedDurationSec, roteiroId, hookText }
 */
function parseRoteiro(roteiroNum) {
  const raw = fs.readFileSync(ROTEIROS_PATH, 'utf8');
  const lines = raw.split('\n');

  // Localizar seção "## Roteiro XX"
  const roteiroHeader = `## Roteiro ${roteiroNum}`;
  let roteiroStart = -1;
  let roteiroEnd   = lines.length;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(roteiroHeader)) {
      roteiroStart = i;
    } else if (roteiroStart >= 0 && i > roteiroStart && lines[i].match(/^## Roteiro \d+/)) {
      roteiroEnd = i;
      break;
    }
  }

  if (roteiroStart < 0) {
    throw new Error(`Roteiro ${roteiroNum} não encontrado em ${ROTEIROS_PATH}`);
  }

  const roteiroLines = lines.slice(roteiroStart, roteiroEnd);

  // Localizar subsecção "@hormozi-copy"
  let copyStart = -1;
  let copyEnd   = roteiroLines.length;

  for (let i = 0; i < roteiroLines.length; i++) {
    if (roteiroLines[i].includes('@hormozi-copy')) {
      copyStart = i;
    } else if (copyStart >= 0 && i > copyStart && roteiroLines[i].startsWith('## Roteiro')) {
      copyEnd = i;
      break;
    }
  }

  if (copyStart < 0) {
    throw new Error(`Versão @hormozi-copy não encontrada no Roteiro ${roteiroNum}`);
  }

  const copyLines = roteiroLines.slice(copyStart, copyEnd);

  // Extrair blockquotes (linhas que começam com "> ")
  const textParts = [];
  let hookText = '';

  for (const line of copyLines) {
    const m = line.match(/^>\s+"?(.+?)"?\s*$/);
    if (m) {
      const content = m[1].trim().replace(/^"|"$/g, '');
      if (!hookText && content) hookText = content; // primeira blockquote = hook
      textParts.push(content);
    }
  }

  if (textParts.length === 0) {
    throw new Error(`Nenhum texto encontrado na versão @hormozi-copy do Roteiro ${roteiroNum}`);
  }

  const text     = textParts.join('\n\n');
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // ~150 palavras = 60 segundos (baseado em video-agent.md)
  const estimatedDurationSec = Math.round((wordCount / 150) * 60);

  // H008 — roteiro_id: slug do hook
  const roteiroId = slugify(hookText) || `roteiro-${roteiroNum}`;

  return { text, wordCount, estimatedDurationSec, roteiroId, hookText };
}

// ─── ElevenLabs — Geração de áudio ───────────────────────────────────────────

/**
 * Chama ElevenLabs TTS e salva MP3.
 * H003 — Erro 401/403 → PARAR IMEDIATAMENTE.
 */
async function generateAudio(text, voiceId, apiKey, outputPath, dryRun) {
  if (dryRun) {
    console.log(`  [DRY-RUN] ElevenLabs seria chamado com voice_id=${voiceId}`);
    console.log(`  [DRY-RUN] Saída simulada: ${outputPath}`);
    return;
  }

  const body = Buffer.from(JSON.stringify({
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability:         0.5,
      similarity_boost:  0.85,
      style:             0.2,
      use_speaker_boost: true,
    },
  }));

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  const res = await httpsPost(endpoint, {
    'xi-api-key':   apiKey,
    'Content-Type': 'application/json',
    'Accept':       'audio/mpeg',
  }, body);

  // H003 — Erro de autenticação
  if (res.statusCode === 401 || res.statusCode === 403) {
    const detail = Buffer.isBuffer(res.body) ? res.body.toString() : JSON.stringify(res.body);
    throw new Error(
      `H003 — ERRO ${res.statusCode} ElevenLabs: autenticação inválida.\n` +
      `  Detalhes: ${detail}\n` +
      `  → Verificar ELEVENLABS_API_KEY em config/publisher-secrets.yaml`
    );
  }

  if (res.statusCode !== 200) {
    const detail = Buffer.isBuffer(res.body) ? res.body.toString() : JSON.stringify(res.body);
    throw new Error(`ElevenLabs erro ${res.statusCode}: ${detail}`);
  }

  // res.body é Buffer com o áudio
  const audioBuffer = Buffer.isBuffer(res.body) ? res.body : Buffer.from(res.body);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, audioBuffer);
  console.log(`  ✅ MP3 salvo: ${path.basename(outputPath)} (${(audioBuffer.length / 1024).toFixed(0)} KB)`);
}

// ─── Cloudinary — Upload de áudio (para URL pública) ─────────────────────────

function cloudinarySign(params, apiSecret) {
  const str = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(str + apiSecret).digest('hex');
}

async function uploadAudioToCloudinary(mp3Path, cloudinary) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params    = { resource_type: 'video', timestamp }; // Cloudinary trata áudio como "video"
  const signature = cloudinarySign({ timestamp }, cloudinary.api_secret); // resource_type não entra na assinatura
  const boundary  = `----CloudBoundary${Date.now().toString(16)}`;
  const CRLF      = '\r\n';
  const file      = fs.readFileSync(mp3Path);
  const filename  = path.basename(mp3Path);

  const fields = [
    ['api_key',       cloudinary.api_key],
    ['timestamp',     timestamp],
    ['signature',     signature],
    ['resource_type', 'video'],
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
    `Content-Type: audio/mpeg${CRLF}${CRLF}`
  ));
  parts.push(file);
  parts.push(Buffer.from(`${CRLF}--${boundary}--${CRLF}`));

  const bodyBuf = Buffer.concat(parts);
  const url     = `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/video/upload`;

  const res = await httpsPost(url, {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  }, bodyBuf);

  if (res.statusCode !== 200 || !res.body.secure_url) {
    throw new Error(`Cloudinary áudio upload falhou (${res.statusCode}): ${JSON.stringify(res.body)}`);
  }
  return { url: res.body.secure_url, publicId: res.body.public_id };
}

async function deleteCloudinaryAsset(publicId, resourceType, cloudinary) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = cloudinarySign(
    { public_id: publicId, resource_type: resourceType, timestamp },
    cloudinary.api_secret
  );
  const body = Buffer.from(new URLSearchParams({
    public_id:     publicId,
    resource_type: resourceType,
    api_key:       cloudinary.api_key,
    timestamp,
    signature,
  }).toString());

  const url = `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/${resourceType}/destroy`;
  const res = await httpsPost(url, { 'Content-Type': 'application/x-www-form-urlencoded' }, body);
  if (res.body.result !== 'ok') {
    console.warn(`  ⚠️  Cloudinary delete (${publicId}): ${JSON.stringify(res.body)}`);
  }
}

// ─── Google Veo3 — Geração de vídeo ──────────────────────────────────────────

/**
 * Inicia geração de vídeo via Veo3 e faz polling até concluir.
 * H003 — Erro 401/403 → PARAR IMEDIATAMENTE.
 * H004 — Safety policy → PARAR, reportar mensagem exata.
 */
async function generateVideo(audioUri, durationSeconds, apiKey, outputPath, dryRun) {
  if (dryRun) {
    console.log(`  [DRY-RUN] Google Veo3 seria chamado com audio_uri=${audioUri}`);
    console.log(`  [DRY-RUN] duration_seconds=${durationSeconds}, resolução=1080x1920`);
    console.log(`  [DRY-RUN] Saída simulada: ${outputPath}`);
    return;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-preview:generateVideo?key=${apiKey}`;

  const body = Buffer.from(JSON.stringify({
    prompt: [
      'A Brazilian woman doctor named Dra. Julia Resende,',
      'professional appearance, warm expression, speaking directly to camera,',
      'white or light background, vertical video format 9:16,',
      'synchronized lip movement with provided audio,',
      'natural gestures, professional but approachable tone.',
      'No text overlays. Clean background.',
    ].join(' '),
    audio_uri:          audioUri,
    generation_config: {
      aspect_ratio:      '9:16',
      duration_seconds:  durationSeconds,
      resolution:        '1080x1920',
      person_generation: 'allow_adult',
    },
  }));

  console.log('  ⏳ Enviando requisição para Veo3...');
  const initRes = await httpsPost(endpoint, { 'Content-Type': 'application/json' }, body);

  // H003 — Autenticação
  if (initRes.statusCode === 401 || initRes.statusCode === 403) {
    const detail = JSON.stringify(initRes.body);
    throw new Error(
      `H003 — ERRO ${initRes.statusCode} Veo3: autenticação inválida.\n` +
      `  Detalhes: ${detail}\n` +
      `  → Verificar GOOGLE_VEO3_API_KEY em config/publisher-secrets.yaml`
    );
  }

  if (initRes.statusCode !== 200) {
    const detail = JSON.stringify(initRes.body);
    // H004 — Safety policy
    if (initRes.body.error && initRes.body.error.message &&
        initRes.body.error.message.toLowerCase().includes('safety')) {
      throw new Error(
        `H004 — Veo3 SAFETY POLICY:\n  ${initRes.body.error.message}\n` +
        `  → Ajustar prompt visual no video-agent.js e tentar novamente`
      );
    }
    throw new Error(`Veo3 erro ${initRes.statusCode}: ${detail}`);
  }

  const operationName = initRes.body.name;
  if (!operationName) {
    throw new Error(`Veo3: resposta inesperada — sem campo "name": ${JSON.stringify(initRes.body)}`);
  }

  console.log(`  ⏳ Operação iniciada: ${operationName}`);
  console.log('  ⏳ Processando vídeo — aguardando (pode levar 2-5 minutos)...');

  // Polling — max 20 tentativas × 15s = 5 minutos
  const pollUrl = `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${apiKey}`;
  let attempts  = 0;
  const MAX     = 20;

  while (attempts < MAX) {
    await sleep(15000);
    attempts++;
    process.stdout.write(`  ↻ tentativa ${attempts}/${MAX}... `);

    const pollRes = await httpsGet(pollUrl);

    if (pollRes.body.error) {
      // H004
      const msg = pollRes.body.error.message || JSON.stringify(pollRes.body.error);
      if (msg.toLowerCase().includes('safety')) {
        throw new Error(`H004 — Veo3 SAFETY POLICY (polling): ${msg}`);
      }
      throw new Error(`Veo3 erro no polling: ${msg}`);
    }

    if (pollRes.body.done) {
      console.log('concluído!');
      const response = pollRes.body.response;

      // Extrair URI do vídeo
      let videoUri = null;
      if (response && Array.isArray(response.videos) && response.videos.length > 0) {
        videoUri = response.videos[0].uri || response.videos[0].url;
      } else if (response && response.videoUri) {
        videoUri = response.videoUri;
      } else if (response && response.video && response.video.uri) {
        videoUri = response.video.uri;
      }

      if (!videoUri) {
        throw new Error(`Veo3: vídeo gerado mas URI não encontrada. Resposta: ${JSON.stringify(response)}`);
      }

      console.log(`  ⬇️  Baixando MP4...`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Se a URI for gs://, não conseguimos baixar diretamente — reportar ao Felipe
      if (videoUri.startsWith('gs://')) {
        throw new Error(
          `Vídeo gerado em Google Cloud Storage: ${videoUri}\n` +
          `  → Use: gsutil cp "${videoUri}" "${outputPath}"\n` +
          `  → Ou configure acesso ao GCS para download automático`
        );
      }

      await httpsDownload(videoUri, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`  ✅ MP4 salvo: ${path.basename(outputPath)} (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);
      return;
    }

    console.log('aguardando...');
  }

  throw new Error(`Veo3: timeout após ${MAX * 15}s — operação ${operationName} não concluiu`);
}

// ─── Log ─────────────────────────────────────────────────────────────────────

function appendLog(entry) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n');
}

// ─── Usage ────────────────────────────────────────────────────────────────────

function printUsage() {
  console.log('\nUso: node video-agent.js <roteiro> [--dry-run]');
  console.log('');
  console.log('  roteiro    Número do roteiro: 01, 02, 03 ou 04');
  console.log('  --dry-run  Valida estrutura sem chamar APIs reais');
  console.log('');
  console.log('Exemplos:');
  console.log('  node squads/dr-julia-resende/assets/video-agent.js 01           # produção');
  console.log('  node squads/dr-julia-resende/assets/video-agent.js 01 --dry-run # teste');
  console.log('');
  console.log('Roteiros disponíveis:');
  console.log('  01 — H06 "Birra não é capricho" (~38s) — prioridade #1');
  console.log('  02 — H12 narrativa caso real (~55s)     — prioridade #2');
  console.log('  03 — H07 "7 minutos" (~40s)             — retargeting');
  console.log('  04 — H03 culpa e alívio (~50s)          — prioridade #3');
  console.log('');
  console.log('H007: processar 1 roteiro por vez. Aguardar aprovação de cada vídeo antes de avançar.');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args      = process.argv.slice(2);
  const roteiroNum = args[0];
  const dryRun    = args.includes('--dry-run');

  if (!roteiroNum) {
    printUsage();
    process.exit(1);
  }

  if (!['01', '02', '03', '04'].includes(roteiroNum)) {
    console.error(`❌ Roteiro inválido: "${roteiroNum}". Use 01, 02, 03 ou 04.`);
    printUsage();
    process.exit(1);
  }

  // ── Carregar secrets ───────────────────────────────────────────────────────

  if (!fs.existsSync(SECRETS_PATH)) {
    throw new Error(`Credenciais não encontradas: ${SECRETS_PATH}`);
  }
  const secrets = parseYamlSecrets(SECRETS_PATH);
  const elevenKey = secrets.elevenlabs && secrets.elevenlabs.ELEVENLABS_API_KEY;
  const voiceId   = secrets.elevenlabs && secrets.elevenlabs.JULIA_VOICE_ID;
  const veo3Key   = secrets.google && secrets.google.GOOGLE_VEO3_API_KEY;
  const cloudinary = secrets.cloudinary;

  if (!dryRun) {
    if (!elevenKey) throw new Error('ELEVENLABS_API_KEY não encontrada em publisher-secrets.yaml');
    if (!voiceId)   throw new Error('JULIA_VOICE_ID não encontrada em publisher-secrets.yaml');
    if (!veo3Key)   throw new Error('GOOGLE_VEO3_API_KEY não encontrada em publisher-secrets.yaml');
    if (!cloudinary || !cloudinary.api_key) throw new Error('cloudinary não configurado em publisher-secrets.yaml');
  }

  // ── ETAPA 1 — Receber e validar roteiro ───────────────────────────────────

  console.log('\n🎬 video-agent — iniciando');
  console.log(`   Roteiro  : ${roteiroNum}`);
  if (dryRun) console.log('   Modo     : DRY-RUN (sem chamadas reais às APIs)');
  console.log('');
  console.log('ETAPA 1 — Carregando roteiro...');

  const { text, wordCount, estimatedDurationSec, roteiroId, hookText } = parseRoteiro(roteiroNum);

  console.log(`  roteiro_id       : ${roteiroId}`);
  console.log(`  hook             : "${hookText.slice(0, 60)}..."`);
  console.log(`  palavras         : ${wordCount}`);
  console.log(`  duração estimada : ~${estimatedDurationSec}s`);

  // H001 — Roteiro > 200 palavras → PARAR
  if (wordCount > 200) {
    throw new Error(
      `H001 — VETO: Roteiro ${roteiroNum} tem ${wordCount} palavras (limite: 200).\n` +
      `  → Enviar para hormozi-copy encurtar para < 150 palavras antes de prosseguir.`
    );
  }

  // H002 — Duração estimada > 65s → ALERTAR
  if (estimatedDurationSec > 65) {
    console.warn(`  ⚠️  H002 — ALERTA: duração estimada ${estimatedDurationSec}s > 65s.`);
    console.warn(`       Reels ideais têm 30-60s. O vídeo pode ter performance reduzida.`);
    console.warn(`       Para continuar mesmo assim, o pipeline prossegue automaticamente.`);
  }

  console.log('  ✅ Roteiro validado.\n');

  // ── ETAPA 2 — Gerar áudio (ElevenLabs) ───────────────────────────────────

  const today       = new Date().toISOString().split('T')[0];
  const audioName   = `audio-${roteiroId}.mp3`;
  const audioPath   = path.join(OUTPUT_DIR, audioName);
  const videoName   = `video-${today}-${roteiroId}.mp4`; // H008
  const videoPath   = path.join(OUTPUT_DIR, videoName);

  console.log('ETAPA 2 — Gerando áudio (ElevenLabs)...');
  console.log(`  voice_id : ${dryRun ? voiceId || '[DRY-RUN]' : voiceId}`);
  console.log(`  modelo   : eleven_multilingual_v2`);
  console.log(`  saída    : ${audioName}`);

  await generateAudio(text, voiceId, elevenKey, audioPath, dryRun);

  // ── ETAPA 3 — Gerar vídeo (Google Veo3) ──────────────────────────────────

  console.log('\nETAPA 3 — Gerando vídeo (Google Veo3)...');

  let cloudinaryAudioPublicId = null;
  let audioUri;

  if (!dryRun) {
    // Fazer upload do MP3 para URL pública (Veo3 precisa de URI acessível)
    console.log('  📤 Upload do MP3 para Cloudinary (URL pública para Veo3)...');
    const audioUpload = await uploadAudioToCloudinary(audioPath, cloudinary);
    audioUri = audioUpload.url;
    cloudinaryAudioPublicId = audioUpload.publicId;
    console.log(`  ✓ URL pública: ${audioUri}`);
  } else {
    audioUri = `https://res.cloudinary.com/example/audio-${roteiroId}.mp3`;
  }

  console.log(`  formato  : 9:16, 1080x1920`);
  console.log(`  duração  : ${estimatedDurationSec}s`);
  console.log(`  saída    : ${videoName}`);

  await generateVideo(audioUri, estimatedDurationSec, veo3Key, videoPath, dryRun);

  // Limpar MP3 do Cloudinary após Veo3 concluir
  if (!dryRun && cloudinaryAudioPublicId) {
    console.log('  🧹 Removendo áudio do Cloudinary...');
    await deleteCloudinaryAsset(cloudinaryAudioPublicId, 'video', cloudinary);
    console.log('  ✓');
  }

  // ── ETAPA 4 — Aguardar aprovação de Felipe ────────────────────────────────

  console.log('\nETAPA 4 — Aguardando aprovação.\n');

  if (dryRun) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎬 [DRY-RUN] video-agent.js validado com sucesso!');
    console.log('   Pipeline estrutural OK — pronto para produção.');
    console.log('   Execute sem --dry-run para gerar os vídeos reais.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return;
  }

  const stats = fs.existsSync(videoPath) ? fs.statSync(videoPath) : null;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Vídeo salvo em: ${videoPath}`);
  console.log(`   Duração  : ~${estimatedDurationSec}s`);
  console.log(`   Tamanho  : ${stats ? (stats.size / 1024 / 1024).toFixed(1) + ' MB' : '(verificar)'}`);
  console.log(`   Formato  : MP4 9:16 1080x1920`);
  console.log('');
  console.log('Assista o vídeo e informe ao video-agent:');
  console.log('  APROVADO  → próximo passo: copy-agent gera legenda → publisher-agent publica');
  console.log('  REPROVADO → informe o motivo (voz, visual ou roteiro)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // H005 — Handoff para publisher-agent após aprovação
  console.log('Quando aprovado, o publisher-agent receberá:');
  console.log(`  arquivo    : ${videoPath}`);
  console.log(`  formato    : MP4 9:16 1080x1920`);
  console.log(`  duração    : ~${estimatedDurationSec}s`);
  console.log('  plataformas: Instagram Reels + Facebook Reels');
  console.log('  legenda    : [copy-agent gerará antes da publicação]\n');

  // Log do pipeline
  appendLog({
    data:        new Date().toISOString(),
    roteiro_num: roteiroNum,
    roteiro_id:  roteiroId,
    audio_path:  audioPath,
    video_path:  videoPath,
    palavra_count: wordCount,
    duracao_estimada_sec: estimatedDurationSec,
    status:      'aguardando_aprovacao',
  });
  console.log('📁 Log atualizado: data/videos.jsonl\n');
}

main().catch(err => {
  console.error('\n❌ Erro:', err.message);

  // H003 — Erros de autenticação são sempre fatais
  if (err.message.includes('H003')) {
    console.error('\n🛑 PARADO — erro de autenticação. Nenhuma nova tentativa automática.');
  }
  // H004 — Safety policy
  if (err.message.includes('H004')) {
    console.error('\n🛑 PARADO — safety policy ativada. Ver detalhes acima.');
  }

  process.exit(1);
});
