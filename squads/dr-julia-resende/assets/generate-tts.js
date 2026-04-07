// generate-tts.js — Gera fala.mp3 via ElevenLabs TTS
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_c71167d4f84e1bd3550cca2629f2baf50975699ef4dde4ce';
const VOICE_ID = 'bMQVOFw0g6ACPbiM5XqE';
const OUTPUT_DIR = path.join(__dirname, '../output/reels/2026-04-02');
const TEXT_FILE = path.join(OUTPUT_DIR, 'roteiro-fala.txt');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'fala.mp3');

const text = fs.readFileSync(TEXT_FILE, 'utf8').trim();

const body = JSON.stringify({
  text,
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.2
  }
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: `/v1/text-to-speech/${VOICE_ID}`,
  method: 'POST',
  headers: {
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log('Gerando áudio de fala via ElevenLabs TTS...');
console.log(`Texto: "${text.substring(0, 80)}..."`);

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  if (res.statusCode !== 200) {
    let errBody = '';
    res.on('data', d => errBody += d);
    res.on('end', () => {
      console.error('ERRO da API:', errBody);
      process.exit(1);
    });
    return;
  }

  const out = fs.createWriteStream(OUTPUT_FILE);
  res.pipe(out);
  out.on('finish', () => {
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(`✅ fala.mp3 gerado — ${(stats.size / 1024).toFixed(0)} KB`);
    console.log(`   Salvo em: ${OUTPUT_FILE}`);
  });
});

req.on('error', (e) => {
  console.error('Erro de conexão:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
