#!/usr/bin/env node
/**
 * generate-reel-images.js — video-prompt-agent FASE 2
 * Squad Dr. Julia Resende — Reel R01 "Telas e Crianças Pequenas"
 *
 * Gera 8 imagens PNG via Vertex AI Imagen 3
 * CENA 8 usa ebook-capa-poder-da-rotina.png como reference image
 *
 * Usage: node generate-reel-images.js [--dry-run]
 *
 * Requisito: squads/dr-julia-resende/config/vertex-ai-key.json
 *   (Service Account JSON do GCP — gitignored, sincronizar via Google Drive)
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const https  = require('https');
const crypto = require('crypto');

// ─── Paths ─────────────────────────────────────────────────────────────────
const SQUAD_DIR    = path.resolve(__dirname, '..');
const KEY_PATH     = path.join(SQUAD_DIR, 'config', 'vertex-ai-key.json');
const OUTPUT_DIR   = path.join(SQUAD_DIR, 'output', 'reels', '2026-04-02');
const EBOOK_PATH   = path.join(SQUAD_DIR, 'assets', 'ebook-capa-poder-da-rotina.png');

// ─── Config ────────────────────────────────────────────────────────────────
// Vertex AI Imagen 3 — requer Service Account com billing ativo
const GCP_PROJECT  = 'gen-lang-client-0541444185';
const GCP_LOCATION = 'us-central1';
const IMAGEN_MODEL = 'imagen-3.0-generate-002';

// ─── 8 Prompts aprovados por Felipe (FASE 1) ───────────────────────────────
const SCENES = [
  {
    id: 'cena-01',
    description: 'Criança pequena com celular, rosto iluminado pela tela',
    prompt: `A close-up of a small Brazilian child (2-4 years old) sitting on a couch in a cozy domestic living room, face softly illuminated by the blue-white glow of a smartphone screen. The child's expression is absorbed, almost hypnotic. Warm ambient light in the background — beige walls, soft lamp glow. The room feels familiar and middle-class. No text overlays. Cinematic depth of field. Vertical 9:16 format, photorealistic, 4K. Warm tones dominate the background; the cool screen glow creates a gentle contrast on the child's face.`,
  },
  {
    id: 'cena-02',
    description: 'Criança olhando para cima com curiosidade, luz suave dourada',
    prompt: `A Brazilian toddler (2-3 years old) sitting on a bright, sunlit floor, looking up with wide-eyed curiosity and wonder — as if seeing something magical. Natural golden morning light streams through a window off-frame. The background is soft and blurred (bokeh) — cream-colored walls, wooden furniture. The child's expression radiates pure curiosity and openness. No smartphones in frame. Warm golden tones throughout. Vertical 9:16 format, photorealistic, 4K. Clean, hopeful composition.`,
  },
  {
    id: 'cena-03',
    description: 'Mãe ao lado da criança com celular, expressão cansada',
    prompt: `A Brazilian mother (30s, warm brown skin, casual home clothes) sitting on a sofa beside her young child (3-5 years old) who is absorbed in a tablet or smartphone. The mother's expression is gently tired — not angry, but quietly exhausted and slightly worried. She looks at the child with concern. Living room setting, warm afternoon light, soft golden tones. Cozy but real middle-class Brazilian home. No judgment in the image — just a real moment. Vertical 9:16 format, photorealistic, 4K.`,
  },
  {
    id: 'cena-04',
    description: 'Criança tentando brincar sozinha, olhando para brinquedo',
    prompt: `A Brazilian child (3-4 years old) sitting on a warm wooden floor, looking at a colorful toy in front of them — a simple wooden block or stuffed animal. The child's expression is restless, slightly distracted, as if finding it hard to engage. Bright, warm sunlight fills the room — golden afternoon tones, cream-colored walls, soft shadows. The scene feels hopeful despite the child's restlessness. No screens in frame. Vertical 9:16 format, photorealistic, 4K. Warm beige, golden, and honey tones throughout.`,
  },
  {
    id: 'cena-05',
    description: 'Mãe e filho sentados juntos lendo, luz dourada',
    prompt: `A Brazilian mother (30s) and her young child (3-4 years old) sitting close together on a comfortable couch, reading a picture book together. Both are smiling softly — the mother pointing at something in the book, the child looking up at her with delight. Warm golden afternoon light fills the scene. No phones or screens visible. The moment feels connected, peaceful, intimate. Vertical 9:16 format, photorealistic, 4K. Rich warm tones: golden, honey, beige. Depth of field blurs the background softly.`,
  },
  {
    id: 'cena-06',
    description: 'Infográfico — limites OMS de tempo de tela por faixa etária',
    prompt: `A clean, warm-toned infographic card displayed as if on a light beige background. The card shows three age groups in simple bold typography in Portuguese: "0–2 anos: zero tela", "2–5 anos: até 1h/dia", "6 anos+: com supervisão". Clean sans-serif font, warm golden accent color (#D4A96A), white card background with soft shadow. Minimal design — no clutter. Small OMS logo reference at the bottom. The overall feel is warm, trustworthy, educational. Vertical 9:16 format, clean flat design, 4K.`,
  },
  {
    id: 'cena-07',
    description: 'Família caminhando ao pôr do sol, crianças correndo',
    prompt: `A Brazilian family walking together on a warm golden-hour evening path — mother and father holding hands, two young children running ahead with joy and energy. Silhouettes against a breathtaking warm sunset sky: deep orange, golden yellow, soft pink horizon. The scene radiates happiness, freedom, and connection. No phones or screens. Wide shot with space above for text overlays. Vertical 9:16 format, photorealistic, 4K. Rich sunset palette: deep amber, terracotta, golden yellow, warm rose.`,
  },
  {
    id: 'cena-08',
    description: 'Capa do ebook O Poder da Rotina em celular, fundo dourado — CTA',
    prompt: `A close-up of a modern smartphone held in a woman's hands (only hands visible, warm Brazilian skin tone, no nail polish), displaying the cover of the ebook "O Poder da Rotina" by Dra. Júlia Resende on the screen. The ebook cover shows a warm golden family silhouette at sunset — matching the visual style of this Reel. Soft warm bokeh background in golden and cream tones. The phone screen is bright and clear. The composition feels like a CTA moment — inviting, warm, actionable. Vertical 9:16 format, photorealistic, 4K. Dominant warm golden palette.`,
    useEbookReference: true,
  },
];

// ─── HTTP helper ────────────────────────────────────────────────────────────

function httpsPost(urlStr, headers, bodyBuf) {
  return new Promise((resolve, reject) => {
    const u   = new URL(urlStr);
    const req = https.request({
      hostname: u.hostname,
      path:     u.pathname + u.search,
      method:   'POST',
      headers:  { ...headers, 'Content-Length': bodyBuf.length },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        let body;
        try { body = JSON.parse(buf.toString()); } catch { body = buf; }
        resolve({ statusCode: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

// ─── Vertex AI Auth — JWT → Bearer token ────────────────────────────────────

function buildJwt(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss:   serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud:   serviceAccount.token_uri || 'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  })).toString('base64url');

  const unsigned  = `${header}.${payload}`;
  const signer    = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer.sign(serviceAccount.private_key, 'base64url');
  return `${unsigned}.${signature}`;
}

async function getAccessToken(keyPath) {
  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const jwt = buildJwt(serviceAccount);

  const tokenUrl = serviceAccount.token_uri || 'https://oauth2.googleapis.com/token';
  const body = Buffer.from(
    `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  );

  const res = await httpsPost(tokenUrl, {
    'Content-Type': 'application/x-www-form-urlencoded',
  }, body);

  if (res.statusCode !== 200) {
    throw new Error(`Auth Vertex AI falhou (${res.statusCode}): ${JSON.stringify(res.body)}`);
  }

  return res.body.access_token;
}

// ─── Vertex AI Imagen 3 — Geração de imagem ─────────────────────────────────

async function generateImage(scene, accessToken, dryRun) {
  const endpoint = `https://${GCP_LOCATION}-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT}/locations/${GCP_LOCATION}/publishers/google/models/${IMAGEN_MODEL}:predict`;
  const outPath  = path.join(OUTPUT_DIR, `${scene.id}.png`);

  if (dryRun) {
    console.log(`  [DRY-RUN] ${scene.id} — chamaria Imagen 3 (${IMAGEN_MODEL})`);
    fs.writeFileSync(outPath, Buffer.from('DRY-RUN-PLACEHOLDER'));
    return outPath;
  }

  // Build instance
  const instance = { prompt: scene.prompt };

  // CENA 8 — incluir capa do ebook como referenceImage
  if (scene.useEbookReference && fs.existsSync(EBOOK_PATH)) {
    const ebookB64 = fs.readFileSync(EBOOK_PATH).toString('base64');
    instance.referenceImages = [{
      referenceType:  'REFERENCE_TYPE_RAW',
      referenceId:    1,
      referenceImage: { bytesBase64Encoded: ebookB64 },
    }];
    console.log(`  📎 Capa ebook passada como referenceImage`);
  }

  const reqBody = Buffer.from(JSON.stringify({
    instances:  [instance],
    parameters: {
      sampleCount:    1,
      aspectRatio:    '9:16',
      outputMimeType: 'image/png',
    },
  }));

  console.log(`  ⏳ Gerando ${scene.id}...`);
  const res = await httpsPost(endpoint, {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${accessToken}`,
  }, reqBody);

  if (res.statusCode !== 200) {
    throw new Error(`Imagen 3 erro ${res.statusCode} (${scene.id}): ${JSON.stringify(res.body)}`);
  }

  // Resposta Imagen 3: predictions[0].bytesBase64Encoded
  const prediction = res.body.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) {
    throw new Error(`${scene.id}: sem bytesBase64Encoded na resposta: ${JSON.stringify(res.body)}`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(prediction.bytesBase64Encoded, 'base64'));
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  ✅ ${path.basename(outPath)} salvo (${kb} KB)`);
  return outPath;
}

// ─── Kling Animation Prompts ────────────────────────────────────────────────

const KLING_PROMPTS = [
  { id: 'cena-01', duration: 5, motion: 'Slow zoom-in on the child\'s face illuminated by the screen. Subtle flicker of light as if the screen content is changing. Camera barely moves — the stillness amplifies the absorption. Smooth, cinematic.' },
  { id: 'cena-02', duration: 5, motion: 'Gentle upward tilt — camera starts at child\'s hands and slowly rises to reveal the wondering face looking up. Warm golden light rays subtly intensify. Soft Ken Burns movement.' },
  { id: 'cena-03', duration: 6, motion: 'Slow pull-back (zoom out) to reveal both mother and child in frame. The mother\'s gaze shifts from the child to slightly off-camera — a quiet worried moment. Ambient light remains warm and steady.' },
  { id: 'cena-04', duration: 5, motion: 'Camera drifts slowly from the toy to the child\'s face — a gentle rack focus. Child\'s eyes blink, glance briefly away. Dust particles float softly in the warm sunlight. Peaceful but restless energy.' },
  { id: 'cena-05', duration: 6, motion: 'Warm slow push-in toward mother and child reading together. The child looks up at the mother with a smile — a micro-moment of genuine connection. Soft golden bokeh in background gently swirls.' },
  { id: 'cena-06', duration: 5, motion: 'The infographic card fades in with a soft scale-up from center. Each age group line appears sequentially with a gentle fade. Warm golden background has a very subtle particle shimmer. Static-feeling but alive.' },
  { id: 'cena-07', duration: 6, motion: 'Wide shot slow pan right following the family walking. Children run ahead — their silhouettes against the golden sky. Camera speed is dreamy and gentle. The horizon glows intensely at the center.' },
  { id: 'cena-08', duration: 5, motion: 'Macro slow push-in toward the phone screen showing the ebook cover. The hands remain still and warm. Soft bokeh background pulses gently with golden light. The ebook cover becomes the focal hero of the shot.' },
];

function generateKlingPromptsFile(outDir) {
  const lines = [
    '# Prompts de Animação Kling 3.0 — Reel R01 "Telas e Crianças Pequenas"',
    `**Data:** 2026-04-02 | **Gerado por:** video-prompt-agent FASE 2`,
    `**Pilar:** Educativo | **Duração total estimada:** ~43s`,
    '',
    '> Rodar cada prompt no Artlist Kling 3.0. Salvar clips como: clip-01.mp4 ... clip-08.mp4',
    '',
    '---',
    '',
  ];

  for (const k of KLING_PROMPTS) {
    const num = k.id.replace('cena-', '');
    lines.push(`## CENA ${num} — ${k.id}.png aprovada`);
    lines.push(`**Duração:** ${k.duration}s | **Aspect Ratio:** 9:16`);
    lines.push('');
    lines.push('**Prompt Kling:**');
    lines.push(`> Animate ${k.id}.png: ${k.motion}`);
    lines.push(`> duration: ${k.duration}s, aspect ratio: 9:16, smooth motion, cinematic`);
    lines.push('');
    lines.push(`**Salvar como:** clip-${num}.mp4`);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('## Próximo passo');
  lines.push('');
  lines.push('1. Felipe roda cada prompt no Artlist Kling 3.0');
  lines.push('2. Salva clips como clip-01.mp4 ... clip-08.mp4 em `squads/dr-julia-resende/output/reels/2026-04-02/`');
  lines.push('3. Chama video-assembly-agent para montar o Reel final');
  lines.push('');

  const outPath = path.join(outDir, 'prompts-animacao.md');
  fs.writeFileSync(outPath, lines.join('\n'));
  console.log(`\n✅ prompts-animacao.md salvo`);
  return outPath;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('\n🖼️  video-prompt-agent — FASE 2');
  console.log('   Reel R01 — Telas e Crianças Pequenas');
  if (dryRun) console.log('   Modo: DRY-RUN');
  console.log('');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Vertex AI auth — carregar token via Service Account
  let accessToken = null;
  if (!dryRun) {
    if (!fs.existsSync(KEY_PATH)) {
      throw new Error(
        `vertex-ai-key.json não encontrado em: ${KEY_PATH}\n` +
        `  → Copie o arquivo do Google Drive para esta pasta e tente novamente.`
      );
    }
    console.log('🔑 Autenticando com Vertex AI (Service Account)...');
    accessToken = await getAccessToken(KEY_PATH);
    console.log('✅ Token obtido\n');
  }

  // Generate 8 images
  console.log(`🖼️  Gerando 8 imagens (Imagen 3 — ${IMAGEN_MODEL})...\n`);
  const generated = [];

  for (const scene of SCENES) {
    try {
      const p = await generateImage(scene, accessToken, dryRun);
      generated.push({ scene: scene.id, path: p, status: 'ok' });
    } catch (err) {
      console.error(`  ❌ ${scene.id} FALHOU: ${err.message}`);
      generated.push({ scene: scene.id, status: 'error', error: err.message });
    }
  }

  // Generate Kling prompts
  console.log('\n🎬 Gerando prompts de animação Kling 3.0...');
  generateKlingPromptsFile(OUTPUT_DIR);

  // Summary
  const ok  = generated.filter(g => g.status === 'ok').length;
  const err = generated.filter(g => g.status === 'error').length;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ ${ok}/8 imagens geradas | ❌ ${err} erros`);
  console.log(`📁 Output: squads/dr-julia-resende/output/reels/2026-04-02/`);

  if (err > 0) {
    console.log('\n⚠️  Imagens com erro:');
    generated.filter(g => g.status === 'error').forEach(g => {
      console.log(`   ${g.scene}: ${g.error}`);
    });
  }

  console.log('\nPróximos passos:');
  console.log('  1. Felipe verifica as 8 imagens');
  console.log('  2. Felipe abre prompts-animacao.md e roda cada um no Artlist Kling 3.0');
  console.log('  3. Salvar clips como clip-01.mp4 ... clip-08.mp4 no mesmo diretório');
  console.log('  4. Chamar video-assembly-agent');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
