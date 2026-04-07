// assemble-reel-v2.js — Reel R01 corrigido (5 fixes)
// video-assembly-agent — Fix: fade, timing legendas, tipografia, posição, sync áudio/vídeo

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── Config ─────────────────────────────────────────────────────────────────
const FFMPEG = 'C:/Users/Felipe Augusto/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1-full_build/bin/ffmpeg.exe';
const OUTPUT_DIR = 'C:/Users/Felipe Augusto/projeto00/squads/dr-julia-resende/output/reels/2026-04-02';
const TEMP_DIR = OUTPUT_DIR + '/temp';
const SRT_TEMP = 'C:/temp/legendas_r01.srt'; // FIX 4: sem espaços no path

const FALA_MP3 = OUTPUT_DIR + '/fala.mp3';
const TRILHA_MP3 = OUTPUT_DIR + '/trilha.mp3';
const CONCATENADO = TEMP_DIR + '/concatenado.mp4';
const FINAL_MP4 = OUTPUT_DIR + '/reel-2026-04-03-telas-criancas-pequenas.mp4';

// Duração medida dos componentes
const DURACAO_FALA = 48.99;    // segundos — fonte da verdade para o vídeo
const DURACAO_CLIPS = 48.04;   // vídeo concatenado atual
const EXTENSAO_NECESSARIA = DURACAO_FALA - DURACAO_CLIPS + 0.5; // FIX 5: +0.5s margem

const ROTEIRO = `Seu filho tem menos de 6 anos. E usa o celular todo dia. O que isso está fazendo com o cérebro dele? O cérebro dele ainda está se formando. Cada experiência deixa uma marca real. Você sente que algo não está certo. Esse desconforto é sabedoria de mãe. A tela entrega estímulo rápido demais. Brincar e se concentrar ficam difíceis. A boa notícia: o cérebro infantil é plástico. Pequenas mudanças na rotina mudam tudo. A OMS é clara sobre isso. Zero tela até os 2 anos. Até uma hora por dia, de 2 a 5. Quando você troca tela por presença, o comportamento dele muda. Em dias. Tenho um guia com o passo a passo. Link na bio.`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ffmpeg(args, label) {
  console.log(`\n▶ ${label}`);
  try {
    execSync(`"${FFMPEG}" ${args}`, { stdio: 'pipe' });
    console.log(`  ✅ OK`);
  } catch(e) {
    console.error(`  ❌ ERRO:`);
    console.error(e.stderr?.toString()?.substring(0, 600) || e.message);
    process.exit(1);
  }
}

function toSrtTime(sec) {
  const s = Math.max(0, sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  const ms = Math.round((s % 1) * 1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')},${String(ms).padStart(3,'0')}`;
}

// FIX 2: SRT com timing baseado em caracteres + pausas entre frases
function gerarSRT(texto, duracaoTotal) {
  // Divide em frases pelo ponto final, ponto de interrogação e ponto de exclamação
  const frases = texto.match(/[^.!?]+[.!?]+/g) || [texto];

  // Conta total de caracteres (melhor proxy para duração que palavras)
  const totalChars = frases.reduce((acc, f) => acc + f.trim().length, 0);

  // Reserva 4% do tempo para pausas entre frases
  const tempoUtil = duracaoTotal * 0.96;
  const pausaEntreFrases = (duracaoTotal * 0.04) / frases.length;

  let srt = '';
  let idx = 1;
  let tempo = 0.10; // começa bem próximo do início

  for (const frase of frases) {
    const trimmed = frase.trim();
    const chars = trimmed.length;
    const duracaoFrase = (chars / totalChars) * tempoUtil;

    // Divide a frase em blocos de no máximo 4 palavras (mais legível em mobile)
    const palavras = trimmed.split(/\s+/).filter(Boolean);
    const blocos = [];
    let bloco = [];
    for (const p of palavras) {
      bloco.push(p);
      if (bloco.length >= 4) {
        blocos.push(bloco.join(' '));
        bloco = [];
      }
    }
    if (bloco.length > 0) blocos.push(bloco.join(' '));

    const duracaoPorBloco = duracaoFrase / blocos.length;

    for (let i = 0; i < blocos.length; i++) {
      const inicio = tempo;
      const fim = Math.min(tempo + duracaoPorBloco - 0.06, duracaoTotal - 0.4);
      srt += `${idx}\n${toSrtTime(inicio)} --> ${toSrtTime(fim)}\n${blocos[i]}\n\n`;
      tempo = fim + 0.06;
      idx++;
    }

    // Pausa entre frases
    tempo += pausaEntreFrases;
  }

  return srt;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🎞️ video-assembly-agent v2 — Correção dos 5 problemas');
  console.log('='.repeat(55));

  // ── FIX 2+3+4: Gerar SRT corrigido em path sem espaços ──────────────────
  console.log('\n▶ FIX 2+3+4 — Gerando SRT corrigido...');
  const srt = gerarSRT(ROTEIRO, DURACAO_FALA);
  fs.writeFileSync(SRT_TEMP, srt, 'utf8');
  const blocos = srt.split('\n\n').filter(Boolean).length;
  console.log(`  ✅ ${blocos} blocos de legenda → ${SRT_TEMP}`);

  // Mostrar primeiros 3 blocos para conferência
  console.log('\n  Primeiros 3 blocos:');
  srt.split('\n\n').slice(0, 3).forEach(b => console.log('  ' + b.replace(/\n/g, ' | ')));

  // ── FIX 5: Estender vídeo para duração do áudio ──────────────────────────
  const CONCATENADO_EXT = TEMP_DIR + '/concatenado-ext.mp4';
  const stopDuration = EXTENSAO_NECESSARIA.toFixed(2);
  ffmpeg(
    `-y -i "${CONCATENADO}" -vf "tpad=stop_mode=clone:stop_duration=${stopDuration}" -c:v libx264 -preset fast -crf 18 -an "${CONCATENADO_EXT}"`,
    `FIX 5 — Estendendo vídeo +${stopDuration}s (clone último frame)`
  );

  // Verificar nova duração (FFmpeg retorna exit 1 quando só lê info — usar try/catch)
  let durCheck = '';
  try { execSync(`"${FFMPEG}" -i "${CONCATENADO_EXT}"`, { stdio: 'pipe' }); } catch(e) { durCheck = (e.stderr || '').toString(); }
  const durMatch = durCheck.match(/Duration: (\d+:\d+:\d+\.\d+)/);
  console.log(`  Duração após extensão: ${durMatch ? durMatch[1] : 'desconhecida'}`);

  // ── Mixar áudio: fala + trilha sobre vídeo estendido ────────────────────
  const COM_AUDIO = TEMP_DIR + '/com-audio-v2.mp4';
  ffmpeg(
    `-y -i "${CONCATENADO_EXT}" -i "${FALA_MP3}" -i "${TRILHA_MP3}" ` +
    `-filter_complex "[1:a]volume=1.0[fala];[2:a]volume=0.12[trilha];[fala][trilha]amix=inputs=2:duration=first[audio]" ` +
    `-map 0:v -map "[audio]" -c:v copy -c:a aac -b:a 192k -shortest "${COM_AUDIO}"`,
    'Mixando áudio (fala 100% + trilha 12%)'
  );

  // ── FIX 3+4: Legendas com tipografia e posição corrigidas ────────────────
  // FIX 3: FontSize=34 (era 22), Outline=3 forte
  // FIX 4: Alignment=2 (bottom-center), MarginV=130 → ~130px do rodapé
  // FIX path: usar SRT_TEMP sem espaços
  const COM_LEGENDAS = TEMP_DIR + '/com-legendas-v2.mp4';
  const srtPath = SRT_TEMP.replace(/:/g, '\\:');
  ffmpeg(
    `-y -i "${COM_AUDIO}" ` +
    `-vf "subtitles='${srtPath}':force_style='FontName=Arial,FontSize=34,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=3,Shadow=1,Alignment=2,MarginV=130'" ` +
    `-c:v libx264 -preset fast -crf 18 -c:a copy "${COM_LEGENDAS}"`,
    'FIX 3+4 — Gravando legendas (FontSize=34, posição inferior)'
  );

  // ── FIX 1: Fade in/out com duração correta ───────────────────────────────
  // Medir duração real do vídeo com legendas antes de aplicar o fade
  let durOut = '';
  try { execSync(`"${FFMPEG}" -i "${COM_LEGENDAS}"`, { stdio: 'pipe' }); } catch(e) { durOut = (e.stderr || '').toString(); }
  const durFinal = durOut.match(/Duration: (\d+:\d+:(\d+\.\d+))/);
  let duracaoFinalSec = DURACAO_FALA; // fallback
  if (durFinal) {
    const parts = durFinal[1].split(':');
    duracaoFinalSec = parseInt(parts[0])*3600 + parseInt(parts[1])*60 + parseFloat(parts[2]);
  }
  const fadeOutStart = (duracaoFinalSec - 0.5).toFixed(2);
  console.log(`\n  Duração do vídeo antes do fade: ${duracaoFinalSec.toFixed(2)}s`);
  console.log(`  Fade out começa em: ${fadeOutStart}s`);

  ffmpeg(
    `-y -i "${COM_LEGENDAS}" ` +
    `-vf "fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOutStart}:d=0.5" ` +
    `-af "afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOutStart}:d=0.5" ` +
    `-c:v libx264 -preset medium -crf 17 "${FINAL_MP4}"`,
    'FIX 1 — Aplicando fade in/out (vídeo + áudio)'
  );

  // ── Verificação VA004 ────────────────────────────────────────────────────
  console.log('\n▶ Verificação VA004...');
  let statsOut = '';
  try { execSync(`"${FFMPEG}" -i "${FINAL_MP4}"`, { stdio: 'pipe' }); } catch(e) { statsOut = (e.stderr || '').toString(); }
  const durFinalCheck = statsOut.match(/Duration: (\d+:\d+:\d+\.\d+)/);
  const size = fs.statSync(FINAL_MP4).size;

  console.log(`  Arquivo: ${FINAL_MP4}`);
  console.log(`  Duração: ${durFinalCheck ? durFinalCheck[1] : '?'}`);
  console.log(`  Tamanho: ${(size/1024/1024).toFixed(1)} MB`);

  // Checklist VA004
  console.log('\n  Checklist VA004:');
  console.log('  ✅ FIX 1 — Fade in 0.5s + fade out 0.5s (vídeo e áudio)');
  console.log('  ✅ FIX 2 — Legendas: timing character-based + pausas entre frases');
  console.log('  ✅ FIX 3 — Tipografia: FontSize=34, Bold, Outline=3 (era FontSize=22)');
  console.log('  ✅ FIX 4 — Posição: Alignment=2 bottom-center, MarginV=130 (path sem espaços)');
  console.log('  ✅ FIX 5 — Vídeo estendido para igualar duração do áudio');

  console.log('\n' + '='.repeat(55));
  console.log('✅ Reel v2 pronto — aguardando Felipe assistir e aprovar.');
}

main().catch(e => {
  console.error('ERRO FATAL:', e.message);
  process.exit(1);
});
