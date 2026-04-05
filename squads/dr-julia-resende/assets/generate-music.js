// generate-music.js — Gera trilha.mp3 via ElevenLabs Music API
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_c71167d4f84e1bd3550cca2629f2baf50975699ef4dde4ce';
const OUTPUT_DIR = path.join(__dirname, '../output/reels/2026-04-02');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'trilha.mp3');

// SC005 — pilar Educativo (E)
const MUSIC_PROMPT = 'Calm instrumental, piano and soft strings, hopeful and focused, 45 seconds, no vocals';

const body = JSON.stringify({
  prompt: MUSIC_PROMPT,
  duration_seconds: 50  // gera com margem, FFmpeg corta no tempo certo
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: '/v1/music/compose',
  method: 'POST',
  headers: {
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log('Gerando trilha sonora via ElevenLabs Music API...');
console.log(`Prompt: "${MUSIC_PROMPT}"`);

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  if (res.statusCode !== 200) {
    let errBody = '';
    res.on('data', d => errBody += d);
    res.on('end', () => {
      console.error('ERRO da API:', errBody.substring(0, 500));
      process.exit(1);
    });
    return;
  }

  // Pode retornar JSON com URL ou MP3 direto — verificar Content-Type
  const contentType = res.headers['content-type'] || '';
  console.log('Content-Type:', contentType);

  if (contentType.includes('audio')) {
    // Resposta direta em MP3
    const out = fs.createWriteStream(OUTPUT_FILE);
    res.pipe(out);
    out.on('finish', () => {
      const stats = fs.statSync(OUTPUT_FILE);
      console.log(`✅ trilha.mp3 gerado — ${(stats.size / 1024).toFixed(0)} KB`);
    });
  } else {
    // Resposta em JSON — pode ter URL ou audio_url
    let jsonBody = '';
    res.on('data', d => jsonBody += d);
    res.on('end', () => {
      console.log('Resposta JSON:', jsonBody.substring(0, 500));
      try {
        const data = JSON.parse(jsonBody);
        console.log('Campos disponíveis:', Object.keys(data));
      } catch(e) {
        console.log('Não é JSON válido');
      }
    });
  }
});

req.on('error', (e) => {
  console.error('Erro de conexão:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
