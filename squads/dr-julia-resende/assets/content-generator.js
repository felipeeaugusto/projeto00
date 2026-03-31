#!/usr/bin/env node
/**
 * content-generator.js — Gerador automático de slides HTML para carrosseis
 * Squad Dr. Julia Resende
 *
 * Uso:    node content-generator.js <caminho/para/config.json>
 * Exemplo: node content-generator.js ../carrossel-03/config.json
 *
 * Input:  config.json preenchido pelo copy-agent
 * Output: slide-01.html, slide-02.html... + render.js + manifesto.json
 *
 * Tipos de slide suportados:
 *   hook         — slide de abertura (fundo escuro, hook grande)
 *   lista-escura — lista com fundo escuro #0A0A0A (lado negativo)
 *   lista-clara  — lista com fundo papel #F5ECD7 (lado positivo)
 *   reflexao     — citação em fundo papel #F5ECD7
 *   cta          — slide final com fundo verde #03bb85
 *
 * Marcação de texto nos campos de conteúdo:
 *   [verde]texto[/verde] → <span> (verde #03bb85)
 *   [em]texto[/em]       → <em>   (itálico + cor secundária)
 *   \n                   → quebra de linha no HTML
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Utils ────────────────────────────────────────────────────────────────────

function markup(text) {
  if (!text) return '';
  return String(text)
    .replace(/\[verde\]([\s\S]*?)\[\/verde\]/g, '<span>$1</span>')
    .replace(/\[em\]([\s\S]*?)\[\/em\]/g,       '<em>$1</em>')
    .replace(/\n/g, '<br>\n      ');
}

function dots(activeIndex, total, theme) {
  const isLight = (theme === 'light' || theme === 'reflexao');
  const isCta   = (theme === 'cta');

  const inactiveBg = isCta   ? 'rgba(255,255,255,0.3)'
                   : isLight ? 'rgba(44,24,16,0.2)'
                   :           'rgba(255,255,255,0.2)';
  const activeBg   = isCta ? '#FFFFFF' : '#03bb85';
  const position   = isCta
    ? 'left: 50%; transform: translateX(-50%);'
    : 'left: 160px;';

  const css = `
    .dots {
      position: absolute;
      bottom: 58px;
      ${position}
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .dot {
      height: 7px;
      border-radius: 10px;
      background: ${inactiveBg};
      width: 7px;
    }
    .dot.active {
      background: ${activeBg};
      width: 28px;
    }`;

  const html = Array.from({ length: total }, (_, i) =>
    `    <div class="dot${i === activeIndex ? ' active' : ''}"></div>`
  ).join('\n');

  return { css, html };
}

// ─── Slide Templates ──────────────────────────────────────────────────────────

function slideHook(slide, index, total) {
  const d = dots(index, total, 'dark');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px; height: 1080px;
      overflow: hidden;
      background: #0A0A0A;
      position: relative;
      font-family: 'Poppins', sans-serif;
    }
    body::before {
      content: '';
      position: absolute; inset: 0;
      background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px);
      z-index: 0;
    }
    .accent-bar { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: #03bb85; z-index: 10; }
    .handle { position: absolute; top: 52px; right: 130px; font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.35); letter-spacing: 1px; z-index: 10; }
    .content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 130px 0 160px; }
    .eyebrow { font-size: 17px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #03bb85; margin-bottom: 40px; }
    .hook { font-size: 62px; font-weight: 800; line-height: 1.1; color: #FFFFFF; margin-bottom: 48px; }
    .hook span { color: #03bb85; }
    .divider { width: 60px; height: 3px; background: #03bb85; margin-bottom: 44px; }
    .sub { font-size: 24px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.6; max-width: 700px; margin-bottom: 56px; }
    .cta-tag { display: inline-flex; align-items: center; gap: 14px; background: rgba(3,187,133,0.12); border: 1px solid rgba(3,187,133,0.35); color: #03bb85; font-size: 18px; font-weight: 400; letter-spacing: 2px; padding: 14px 28px; border-radius: 2px; }
    ${d.css}
  </style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="handle">@drjuliaresende</div>
  <div class="content">
    <p class="eyebrow">${slide.eyebrow || 'Dra. Julia Resende'}</p>
    <h1 class="hook">
      ${markup(slide.hook)}
    </h1>
    <div class="divider"></div>
    <p class="sub">${markup(slide.sub)}</p>
    <div class="cta-tag">
      <span>${slide.cta || 'deslize para entender'}</span>
      <span>→</span>
    </div>
  </div>
  <div class="dots">
${d.html}
  </div>
</body>
</html>`;
}

function slideListaEscura(slide, index, total) {
  const d = dots(index, total, 'dark');
  const items = (slide.items || []).map(item =>
    `      <div class="item"><div class="bullet"></div><span class="item-text">${markup(item)}</span></div>`
  ).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1080px; overflow: hidden; background: #0A0A0A; position: relative; font-family: 'Poppins', sans-serif; }
    body::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px); z-index: 0; }
    .accent-bar { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: rgba(255,255,255,0.15); z-index: 10; }
    .handle { position: absolute; top: 52px; right: 130px; font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.3); letter-spacing: 1px; z-index: 10; }
    .content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 130px 0 160px; }
    .label { display: inline-flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.5); font-size: 15px; font-weight: 400; letter-spacing: 4px; text-transform: uppercase; padding: 10px 22px; border-radius: 2px; margin-bottom: 40px; width: fit-content; }
    .title { font-family: 'Playfair Display', serif; font-size: 58px; font-weight: 700; line-height: 1.2; color: rgba(255,255,255,0.9); margin-bottom: 50px; }
    .title em { font-style: italic; color: rgba(255,255,255,0.45); }
    .list { display: flex; flex-direction: column; gap: 0; }
    .item { display: flex; align-items: center; gap: 24px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .item:last-child { border-bottom: none; }
    .bullet { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); flex-shrink: 0; }
    .item-text { font-size: 26px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.4; }
    ${d.css}
  </style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="handle">@drjuliaresende</div>
  <div class="content">
    <div class="label">${slide.label || ''}</div>
    <h2 class="title">${markup(slide.titulo)}</h2>
    <div class="list">
${items}
    </div>
  </div>
  <div class="dots">
${d.html}
  </div>
</body>
</html>`;
}

function slideListaClara(slide, index, total) {
  const d = dots(index, total, 'light');
  const items = (slide.items || []).map(item =>
    `      <div class="item"><div class="bullet"></div><span class="item-text">${markup(item)}</span></div>`
  ).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1080px; overflow: hidden; background: #F5ECD7; position: relative; font-family: 'Poppins', sans-serif; }
    body::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,150,100,0.04) 2px, rgba(180,150,100,0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180,150,100,0.03) 3px, rgba(180,150,100,0.03) 6px); z-index: 0; }
    .accent-bar { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: #03bb85; z-index: 10; }
    .handle { position: absolute; top: 52px; right: 130px; font-size: 18px; font-weight: 300; color: rgba(44,24,16,0.35); letter-spacing: 1px; z-index: 10; }
    .content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 130px 0 160px; }
    .label { display: inline-flex; align-items: center; gap: 12px; background: rgba(3,187,133,0.12); border: 1px solid rgba(3,187,133,0.3); color: #03bb85; font-size: 15px; font-weight: 400; letter-spacing: 4px; text-transform: uppercase; padding: 10px 22px; border-radius: 2px; margin-bottom: 40px; width: fit-content; }
    .title { font-family: 'Playfair Display', serif; font-size: 58px; font-weight: 700; line-height: 1.2; color: #2C1810; margin-bottom: 50px; }
    .title em { font-style: italic; color: #03bb85; }
    .list { display: flex; flex-direction: column; gap: 0; }
    .item { display: flex; align-items: center; gap: 24px; padding: 20px 0; border-bottom: 1px solid rgba(44,24,16,0.1); }
    .item:last-child { border-bottom: none; }
    .bullet { width: 8px; height: 8px; border-radius: 50%; background: #03bb85; flex-shrink: 0; }
    .item-text { font-size: 26px; font-weight: 300; color: #2C1810; line-height: 1.4; }
    ${d.css}
  </style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="handle">@drjuliaresende</div>
  <div class="content">
    <div class="label">${slide.label || ''}</div>
    <h2 class="title">${markup(slide.titulo)}</h2>
    <div class="list">
${items}
    </div>
  </div>
  <div class="dots">
${d.html}
  </div>
</body>
</html>`;
}

function slideReflexao(slide, index, total) {
  const d = dots(index, total, 'reflexao');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1080px; overflow: hidden; background: #F5ECD7; position: relative; font-family: 'Poppins', sans-serif; }
    body::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,150,100,0.04) 2px, rgba(180,150,100,0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180,150,100,0.03) 3px, rgba(180,150,100,0.03) 6px); z-index: 0; }
    .accent-bar { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: #03bb85; z-index: 10; }
    .handle { position: absolute; top: 52px; right: 130px; font-size: 18px; font-weight: 300; color: rgba(44,24,16,0.35); letter-spacing: 1px; z-index: 10; }
    .content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 130px 0 160px; }
    .quote-mark { font-family: 'Playfair Display', serif; font-size: 120px; font-weight: 700; color: rgba(3,187,133,0.2); line-height: 0.7; margin-bottom: 24px; }
    .quote { font-family: 'Playfair Display', serif; font-size: 66px; font-weight: 700; line-height: 1.18; color: #2C1810; margin-bottom: 52px; }
    .quote em { font-style: italic; color: #03bb85; }
    .divider { width: 60px; height: 3px; background: #03bb85; margin-bottom: 44px; }
    .sub { font-size: 24px; font-weight: 300; color: rgba(44,24,16,0.6); line-height: 1.65; max-width: 780px; }
    ${d.css}
  </style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="handle">@drjuliaresende</div>
  <div class="content">
    <div class="quote-mark">"</div>
    <h2 class="quote">
      ${markup(slide.citacao)}
    </h2>
    <div class="divider"></div>
    <p class="sub">
      ${markup(slide.sub)}
    </p>
  </div>
  <div class="dots">
${d.html}
  </div>
</body>
</html>`;
}

function slideCta(slide, index, total) {
  const d = dots(index, total, 'cta');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1080px; overflow: hidden; background: #03bb85; position: relative; font-family: 'Poppins', sans-serif; }
    body::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px); z-index: 0; }
    .handle { position: absolute; top: 52px; right: 130px; font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.55); letter-spacing: 1px; z-index: 10; }
    .content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 130px; }
    .eyebrow { font-size: 16px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 36px; }
    .title { font-family: 'Poppins', sans-serif; font-size: 72px; font-weight: 800; line-height: 1.08; color: #FFFFFF; margin-bottom: 18px; }
    .subtitle { font-family: 'Playfair Display', serif; font-style: italic; font-size: 36px; font-weight: 400; color: rgba(255,255,255,0.8); margin-bottom: 60px; }
    .divider { width: 50px; height: 2px; background: rgba(255,255,255,0.4); margin: 0 auto 60px auto; }
    .cta-block { display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .cta-line1 { font-size: 26px; font-weight: 300; color: rgba(255,255,255,0.85); }
    .cta-line2 { font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: 1px; }
    .cta-arrow { font-size: 18px; font-weight: 400; color: rgba(255,255,255,0.7); letter-spacing: 3px; margin-top: 8px; }
    ${d.css}
  </style>
</head>
<body>
  <div class="handle">@drjuliaresende</div>
  <div class="content">
    <p class="eyebrow">${slide.eyebrow || 'o método'}</p>
    <h2 class="title">${markup(slide.titulo)}</h2>
    <p class="subtitle">${markup(slide.subtitulo)}</p>
    <div class="divider"></div>
    <div class="cta-block">
      <span class="cta-line1">${slide.cta_linha1 || ''}</span>
      <span class="cta-line2">${slide.cta_linha2 || 'Link na Bio.'}</span>
      <span class="cta-arrow">${slide.cta_seta || '↑'}</span>
    </div>
  </div>
  <div class="dots">
${d.html}
  </div>
</body>
</html>`;
}

// ─── Render.js generator ──────────────────────────────────────────────────────

function generateRenderJs(slideCount) {
  const names = Array.from({ length: slideCount }, (_, i) =>
    `'slide-${String(i + 1).padStart(2, '0')}'`
  ).join(', ');

  return `const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });

  const slides = [${names}];
  const baseDir = path.resolve(__dirname);

  for (const slide of slides) {
    const htmlPath = 'file:///' + path.join(baseDir, slide + '.html').split('\\\\').join('/');
    await page.goto(htmlPath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(baseDir, slide + '.png') });
    console.log('OK:', slide + '.png');
  }

  await browser.close();
  console.log('DONE');
})();
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const GENERATORS = {
  'hook':         slideHook,
  'lista-escura': slideListaEscura,
  'lista-clara':  slideListaClara,
  'reflexao':     slideReflexao,
  'cta':          slideCta,
};

function main() {
  const configArg = process.argv[2];
  if (!configArg) {
    console.error('Uso: node content-generator.js <caminho/para/config.json>');
    console.error('Tipos suportados: ' + Object.keys(GENERATORS).join(', '));
    process.exit(1);
  }

  const configPath = path.resolve(configArg);
  if (!fs.existsSync(configPath)) {
    console.error('Arquivo não encontrado: ' + configPath);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const outputDir = path.dirname(configPath);
  const total = config.slides.length;

  console.log('\n🎨 Gerando carrossel: ' + config.id);
  console.log('📝 Tema: ' + config.tema);
  console.log('📊 Slides: ' + total + '\n');

  const slideNames = [];
  config.slides.forEach((slide, i) => {
    const gen = GENERATORS[slide.tipo];
    if (!gen) {
      console.error('❌ Tipo desconhecido: "' + slide.tipo + '". Válidos: ' + Object.keys(GENERATORS).join(', '));
      process.exit(1);
    }
    const html     = gen(slide, i, total);
    const filename = 'slide-' + String(i + 1).padStart(2, '0') + '.html';
    fs.writeFileSync(path.join(outputDir, filename), html, 'utf8');
    slideNames.push(filename);
    console.log('  ✅ ' + filename + ' (tipo: ' + slide.tipo + ')');
  });

  fs.writeFileSync(path.join(outputDir, 'render.js'), generateRenderJs(total), 'utf8');
  console.log('  ✅ render.js');

  const manifesto = {
    pasta:       path.basename(outputDir),
    id:          config.id,
    tema:        config.tema,
    gerado_em:   new Date().toISOString(),
    gerado_por:  'content-generator.js',
    slides_html: slideNames,
    slides_png:  slideNames.map(n => n.replace('.html', '.png')),
  };
  fs.writeFileSync(path.join(outputDir, 'manifesto.json'), JSON.stringify(manifesto, null, 2), 'utf8');
  console.log('  ✅ manifesto.json');

  console.log('\n🚀 Pronto! Para gerar os PNGs:');
  console.log('   cd ' + outputDir);
  console.log('   node render.js\n');
}

main();
