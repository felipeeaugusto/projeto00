#!/usr/bin/env node
/**
 * generate-tts-11cenas.js — video-assembly-agent
 * Gera 11 arquivos de áudio TTS separados via ElevenLabs
 * Reel R01 "Telas e Crianças Pequenas" — 11 cenas × 4s
 *
 * Usage: node generate-tts-11cenas.js
 * Output: squads/dr-julia-resende/output/reels/2026-04-02/fala-01.mp3 ... fala-11.mp3
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

// ─── Config ─────────────────────────────────────────────────────────────────
const ELEVENLABS_API_KEY = 'sk_c71167d4f84e1bd3550cca2629f2baf50975699ef4dde4ce';
const VOICE_ID           = 'bMQVOFw0g6ACPbiM5XqE';
const MODEL_ID           = 'eleven_multilingual_v2';
const OUTPUT_DIR         = path.resolve(__dirname, '../output/reels/2026-04-02');

// ─── 11 Falas do roteiro aprovado ───────────────────────────────────────────
const FALAS = [
  { id: '01', texto: 'Seu filho usa o celular todo dia.' },
  { id: '02', texto: 'O cérebro infantil está em formação.' },
  { id: '03', texto: 'Você sente que algo não está certo.' },
  { id: '04', texto: 'A tela entrega estímulo rápido demais.' },
  { id: '05', texto: 'Você não sabe por onde começar.' },
  { id: '06', texto: 'Noites difíceis têm relação com isso.' },
  { id: '07', texto: 'Pequenas mudanças na rotina mudam tudo.' },
  { id: '08', texto: 'Quando você troca tela por presença.' },
  { id: '09', texto: 'A OMS é clara sobre o tempo de tela.' },
  { id: '10', texto: 'O resultado aparece em dias, não meses.' },
  { id: '11', texto: 'Tenho um guia com o passo a passo.' },
];

// ─── ElevenLabs TTS ──────────────────────────────────────────────────────────
function gerarTTS(fala) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: fala.texto,
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

    const outPath = path.join(OUTPUT_DIR, `fala-${fala.id}.mp3`);
    const fileStream = fs.createWriteStream(outPath);

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errBody = '';
        res.on('data', chunk => { errBody += chunk; });
        res.on('end', () => reject(new Error(`ElevenLabs erro ${res.statusCode}: ${errBody}`)));
        return;
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        const kb = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`  ✅ fala-${fala.id}.mp3 salvo (${kb} KB) — "${fala.texto}"`);
        resolve(outPath);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🎙️  video-assembly-agent — Gerando 11 áudios TTS');
  console.log('   Reel R01 — Telas e Crianças Pequenas');
  console.log('   Voz: Dra. Julia | Modelo: eleven_multilingual_v2\n');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let ok = 0;
  let err = 0;

  for (const fala of FALAS) {
    try {
      await gerarTTS(fala);
      ok++;
    } catch (e) {
      console.error(`  ❌ fala-${fala.id}.mp3 FALHOU: ${e.message}`);
      err++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ ${ok}/11 áudios gerados | ❌ ${err} erros`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(e => {
  console.error('\n❌ Erro fatal:', e.message);
  process.exit(1);
});
