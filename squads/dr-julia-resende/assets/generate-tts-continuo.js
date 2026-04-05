#!/usr/bin/env node
/**
 * generate-tts-continuo.js — video-assembly-agent
 * Gera 1 arquivo de áudio TTS contínuo via ElevenLabs
 * Reel R01 "Telas e Crianças Pequenas" — roteiro v2 (fala fluida)
 *
 * Usage: node generate-tts-continuo.js
 * Output: squads/dr-julia-resende/output/reels/2026-04-02/fala.mp3
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

const ELEVENLABS_API_KEY = 'sk_c71167d4f84e1bd3550cca2629f2baf50975699ef4dde4ce';
const VOICE_ID           = 'bMQVOFw0g6ACPbiM5XqE';
const MODEL_ID           = 'eleven_multilingual_v2';
const OUTPUT_DIR         = path.resolve(__dirname, '../output/reels/2026-04-02');
const OUT_PATH           = path.join(OUTPUT_DIR, 'fala.mp3');

const TEXTO = 'Seu filho no celular… você percebe que algo mudou. O cérebro dele ainda está sendo construído… Você sente que algo não está certo… e está. A tela entrega estímulo rápido demais para ele… E você não sabe mais por onde começar… As noites difíceis também têm relação com isso. A boa notícia: pequenas mudanças mudam tudo. Quando você troca tela por presença real… A OMS é clara: existe um limite seguro. E o resultado aparece em dias, não meses. Tenho o guia pra você começar hoje. Link na bio.';

function gerarTTS() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: TEXTO,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const fileStream = fs.createWriteStream(OUT_PATH);

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errBody = '';
        res.on('data', chunk => { errBody += chunk; });
        res.on('end', () => reject(new Error(`ElevenLabs erro ${res.statusCode}: ${errBody}`)));
        return;
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        const kb = Math.round(fs.statSync(OUT_PATH).size / 1024);
        resolve(kb);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('\n🎙️  video-assembly-agent — Gerando fala.mp3 contínuo');
  console.log('   Reel R01 — Telas e Crianças Pequenas (roteiro v2)');
  console.log('   Voz: Dra. Julia | Modelo: eleven_multilingual_v2\n');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('⏳ Gerando áudio...');
  console.log(`   "${TEXTO.substring(0, 60)}..."\n`);

  const kb = await gerarTTS();

  console.log(`✅ fala.mp3 salvo (${kb} KB)`);
  console.log(`📁 ${OUT_PATH}\n`);
}

main().catch(e => {
  console.error('\n❌ Erro fatal:', e.message);
  process.exit(1);
});
