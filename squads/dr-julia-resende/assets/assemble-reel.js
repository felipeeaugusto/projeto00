// assemble-reel.js — Monta o Reel R01 completo via FFmpeg
// video-assembly-agent — Ordem VA001 obrigatória

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Config ─────────────────────────────────────────────────────────────────
const FFMPEG = 'C:/Users/Felipe Augusto/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1-full_build/bin/ffmpeg.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../output/reels/2026-04-02');
const CLIPS = [1,2,3,4,5,6,7,8].map(i => path.join(OUTPUT_DIR, `clip-0${i}.mp4`));
const FALA_MP3 = path.join(OUTPUT_DIR, 'fala.mp3');
const TRILHA_MP3 = path.join(OUTPUT_DIR, 'trilha.mp3');
const FINAL_MP4 = path.join(OUTPUT_DIR, 'reel-2026-04-03-telas-criancas-pequenas.mp4');
const TEMP_DIR = path.join(OUTPUT_DIR, 'temp');

// Texto do roteiro para gerar legendas
const ROTEIRO = `Seu filho tem menos de 6 anos. E usa o celular todo dia. O que isso está fazendo com o cérebro dele? O cérebro dele ainda está se formando. Cada experiência deixa uma marca real. Você sente que algo não está certo. Esse desconforto é sabedoria de mãe. A tela entrega estímulo rápido demais. Brincar e se concentrar ficam difíceis. A boa notícia: o cérebro infantil é plástico. Pequenas mudanças na rotina mudam tudo. A OMS é clara sobre isso. Zero tela até os 2 anos. Até uma hora por dia, de 2 a 5. Quando você troca tela por presença, o comportamento dele muda. Em dias. Tenho um guia com o passo a passo. Link na bio.`;

// ─── Helpers ────────────────────────────────────────────────────────────────
function run(cmd, label) {
  console.log(`\n▶ ${label}`);
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`  ✅ ${label} — OK`);
  } catch (e) {
    console.error(`  ❌ ERRO em "${label}":`);
    console.error(e.stderr?.toString()?.substring(0, 500) || e.message);
    process.exit(1);
  }
}

function ffmpeg(args, label) {
  const cmd = `"${FFMPEG}" ${args}`;
  run(cmd, label);
}

function toSrtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.round((sec % 1) * 1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`;
}

function gerarSRT(texto, duracaoTotal) {
  // Divide o texto em blocos de máximo 6 palavras
  const palavras = texto.replace(/[.?!]/g, ' $& ').split(/\s+/).filter(Boolean);
  const blocos = [];
  let bloco = [];

  for (const palavra of palavras) {
    bloco.push(palavra);
    const terminaFrase = /[.?!]$/.test(palavra);
    if (bloco.length >= 5 || terminaFrase) {
      blocos.push(bloco.join(' ').replace(/\s([.?!])/g, '$1').trim());
      bloco = [];
    }
  }
  if (bloco.length > 0) blocos.push(bloco.join(' ').trim());

  // Distribui o tempo proporcionalmente ao número de palavras por bloco
  const totalPalavras = blocos.reduce((acc, b) => acc + b.split(/\s+/).length, 0);

  let srt = '';
  let tempoAtual = 0.3; // começa um pouco depois do início
  const tempoUtil = duracaoTotal - 0.5; // reserva o final para fade

  blocos.forEach((bloco, idx) => {
    const palavrasBloco = bloco.split(/\s+/).length;
    const duracao = (palavrasBloco / totalPalavras) * tempoUtil;
    const inicio = tempoAtual;
    const fim = Math.min(tempoAtual + duracao - 0.05, tempoUtil);

    srt += `${idx + 1}\n`;
    srt += `${toSrtTime(inicio)} --> ${toSrtTime(fim)}\n`;
    srt += `${bloco}\n\n`;

    tempoAtual = fim + 0.05;
  });

  return srt;
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🎞️ video-assembly-agent — Montagem do Reel R01');
  console.log('='.repeat(50));

  // Criar pasta temp
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  // ─── PASSO 3: Gerar legendas SRT ─────────────────────────────────────────
  console.log('\n▶ PASSO 3 — Gerando legendas SRT...');
  const DURACAO_TOTAL = 48.99;
  const srtContent = gerarSRT(ROTEIRO, DURACAO_TOTAL);
  const SRT_FILE = path.join(TEMP_DIR, 'legendas.srt');
  fs.writeFileSync(SRT_FILE, srtContent, 'utf8');
  const blocoCount = srtContent.split('\n\n').filter(Boolean).length;
  console.log(`  ✅ Legendas SRT geradas — ${blocoCount} blocos`);

  // ─── PASSO 4: Normalizar clips para 1080x1920 ────────────────────────────
  console.log('\n▶ PASSO 4a — Normalizando clips para 1080x1920...');
  const normalizedClips = [];
  for (let i = 0; i < CLIPS.length; i++) {
    const src = CLIPS[i];
    const dst = path.join(TEMP_DIR, `norm-${String(i+1).padStart(2,'0')}.mp4`);
    normalizedClips.push(dst);

    if (!fs.existsSync(dst)) {
      ffmpeg(
        `-y -i "${src}" -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1" -c:v libx264 -preset fast -crf 18 -an "${dst}"`,
        `Normalizando clip-${String(i+1).padStart(2,'0')}.mp4`
      );
    } else {
      console.log(`  ⏭️ norm-${String(i+1).padStart(2,'0')}.mp4 já existe — pulando`);
    }
  }

  // ─── PASSO 4b: Concatenar clips ──────────────────────────────────────────
  const FILELIST = path.join(TEMP_DIR, 'filelist.txt');
  const filelistContent = normalizedClips.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(FILELIST, filelistContent);

  const CONCATENADO = path.join(TEMP_DIR, 'concatenado.mp4');
  ffmpeg(
    `-y -f concat -safe 0 -i "${FILELIST}" -c copy "${CONCATENADO}"`,
    'Concatenando 8 clips'
  );

  // ─── PASSO 5+6: Mixar fala + trilha sobre os clips ───────────────────────
  const COM_AUDIO = path.join(TEMP_DIR, 'com-audio.mp4');
  ffmpeg(
    `-y -i "${CONCATENADO}" -i "${FALA_MP3}" -i "${TRILHA_MP3}" ` +
    `-filter_complex "[1:a]volume=1.0[fala];[2:a]volume=0.15[trilha];[fala][trilha]amix=inputs=2:duration=first[audio]" ` +
    `-map 0:v -map "[audio]" -c:v copy -c:a aac -b:a 192k -shortest "${COM_AUDIO}"`,
    'Mixando áudio (fala + trilha -85%)'
  );

  // ─── PASSO 7: Gravar legendas no vídeo ───────────────────────────────────
  const COM_LEGENDAS = path.join(TEMP_DIR, 'com-legendas.mp4');
  // Escapar o caminho para o filtro subtitles do FFmpeg
  const srtEscaped = SRT_FILE.replace(/\\/g, '/').replace(/:/g, '\\:');
  ffmpeg(
    `-y -i "${COM_AUDIO}" ` +
    `-vf "subtitles='${srtEscaped}':force_style='FontName=Arial,FontSize=22,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Shadow=0,Alignment=2,MarginV=180'" ` +
    `-c:v libx264 -preset fast -crf 18 -c:a copy "${COM_LEGENDAS}"`,
    'Gravando legendas no vídeo'
  );

  // ─── PASSO 8+9: Fade in/out e exportar final ─────────────────────────────
  const FADE_START = (DURACAO_TOTAL - 0.5).toFixed(2);
  ffmpeg(
    `-y -i "${COM_LEGENDAS}" ` +
    `-vf "fade=t=in:st=0:d=0.5,fade=t=out:st=${FADE_START}:d=0.5" ` +
    `-c:v libx264 -preset medium -crf 17 -c:a copy "${FINAL_MP4}"`,
    'Aplicando fade in/out e exportando MP4 final'
  );

  // ─── Verificação VA004 ───────────────────────────────────────────────────
  console.log('\n▶ Verificação VA004...');
  const stats = fs.statSync(FINAL_MP4);
  console.log(`  Arquivo: ${FINAL_MP4}`);
  console.log(`  Tamanho: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);

  console.log('\n' + '='.repeat(50));
  console.log('✅ Reel montado — Telas e Crianças Pequenas');
  console.log(`   Duração: ~${DURACAO_TOTAL}s`);
  console.log(`   Arquivo: reel-2026-04-03-telas-criancas-pequenas.mp4`);
  console.log(`   Componentes: 8 clips Kling + fala ElevenLabs + trilha Artlist + legendas SRT`);
  console.log('   Passando para approval-agent.');
}

main().catch(e => {
  console.error('ERRO FATAL:', e.message);
  process.exit(1);
});
