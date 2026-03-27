const { chromium } = require('C:/Users/felip/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

// Design tokens
const VERDE      = '#03bb85';
const VERDE_CLARO = '#f0fdf8';
const PRETO      = '#1a1a1a';
const CINZA      = '#555555';
const CINZA_CLARO = '#aaaaaa';
const BRANCO     = '#ffffff';
const FUNDO_CLARO = '#f8f8f8';
const FUNDO_ESCURO = '#0a2a20';

// ─── DADOS DOS CRIATIVOS ───────────────────────────────────────────────────

const criativos = [
  {
    id: 'c1-dor',
    tipo: 'dor',
    headline: 'Toda noite vira batalha. Birra, negociação, choro. Não é o temperamento dela.',
    ruptura:  'São os 7 minutos que estão faltando.',
    sub:      'O Poder da Rotina — R$27',
    cta:      'Quero essa mudança',
  },
  {
    id: 'c2-resultado',
    tipo: 'resultado',
    headline_html: 'Ela dormiu em <b style="color:#03bb85">7 minutos</b>. Sem choro. Pelo <b style="color:#03bb85">3º dia</b> seguido.',
    sub:   'Não é sorte. É o que a rotina faz.',
    apoio: 'O Poder da Rotina — R$27',
    cta:   'Quero esse resultado',
  },
  {
    id: 'c3-mecanismo',
    tipo: 'mecanismo',
    numero:       '7 minutos',
    headline_rest: 'por dia criam mais calma do que 1 hora de conversa.',
    sub:   'A maioria das mães nunca aprendeu isso.',
    apoio: 'O Poder da Rotina — R$27',
    cta:   'Ver como funciona',
  },
  {
    id: 'c4-previsibilidade',
    tipo: 'previsibilidade',
    headline: 'Criança que berra toda hora não é difícil. Está pedindo previsibilidade.',
    ruptura:  'São coisas diferentes — e têm soluções diferentes.',
    sub:      'Em 21 dias de rotina consistente, o comportamento muda.',
    cta:      'Entender o método',
  },
  {
    id: 'c5-oferta',
    tipo: 'oferta',
    preco_riscado: 'R$389',
    preco:         'R$27 pra você.',
    sub:           'Sem pegadinha. Sem renovação automática.',
    lista:         ['Ebook O Poder da Rotina', 'Desafio 21 Dias', 'Guia 7 Minutos', '+ 7 bônus práticos'],
    cta:           'Garantir o Super Combo — R$27',
  },
];

const formatos = [
  { id: 'quadrado',    width: 1080, height: 1080 },
  { id: 'vertical',   width: 1080, height: 1920 },
  { id: 'horizontal', width: 1200, height: 628  },
];

// ─── TAMANHOS POR FORMATO ─────────────────────────────────────────────────

function sz(fmtId) {
  if (fmtId === 'vertical') return {
    pad: '100px 80px', logo: 22, bar: 10,
    h1: 68, h1lh: 1.12, numero: 110, rest: 42,
    rupt: 38, sub: 30, apoio: 24, cta: 28, ctaPad: '24px 52px', br: 10,
    listFs: 28, checkSz: 28,
    mb1: 60, mb2: 36, mb3: 28, mb4: 24, mb5: 60,
  };
  if (fmtId === 'horizontal') return {
    pad: '48px 56px', logo: 14, bar: 6,
    h1: 34, h1lh: 1.18, numero: 54, rest: 24,
    rupt: 19, sub: 16, apoio: 14, cta: 16, ctaPad: '13px 28px', br: 6,
    listFs: 16, checkSz: 16,
    mb1: 16, mb2: 14, mb3: 10, mb4: 10, mb5: 22,
  };
  // quadrado (default)
  return {
    pad: '70px', logo: 16, bar: 8,
    h1: 50, h1lh: 1.14, numero: 80, rest: 30,
    rupt: 26, sub: 20, apoio: 16, cta: 20, ctaPad: '16px 38px', br: 8,
    listFs: 20, checkSz: 20,
    mb1: 40, mb2: 22, mb3: 18, mb4: 16, mb5: 36,
  };
}

// ─── LAYOUT BASE: vertical bar + content (usado em Q e V) ─────────────────

function wrapBar(content, bg, w, h, s) {
  return `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:${w}px; height:${h}px; overflow:hidden; background:${bg}; font-family:'Poppins',sans-serif; display:flex; align-items:stretch; }
.bar { width:${s.bar}px; background:${VERDE}; flex-shrink:0; }
.content { flex:1; display:flex; flex-direction:column; justify-content:center; padding:${s.pad}; }
</style></head><body>
<div class="bar"></div>
<div class="content">${content}</div>
</body></html>`;
}

// ─── LAYOUT HORIZONTAL BASE: bar left + content ───────────────────────────

function wrapH(content, bg, w, h, s) {
  return `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:${w}px; height:${h}px; overflow:hidden; background:${bg}; font-family:'Poppins',sans-serif; display:flex; align-items:stretch; }
.bar { width:${s.bar}px; background:${VERDE}; flex-shrink:0; }
.content { flex:1; display:flex; flex-direction:column; justify-content:center; padding:${s.pad}; }
</style></head><body>
<div class="bar"></div>
<div class="content">${content}</div>
</body></html>`;
}

// ─── C1 — DOR ─────────────────────────────────────────────────────────────

function htmlDor(c, fmt) {
  const s = sz(fmt.id);
  const inner = `
    <div style="font-size:${s.logo}px;color:${VERDE};font-weight:600;letter-spacing:1px;margin-bottom:${s.mb1}px;">Dra. Julia Resende</div>
    <div style="font-size:${s.h1}px;font-weight:800;color:${PRETO};line-height:${s.h1lh};margin-bottom:${s.mb2}px;">${c.headline}</div>
    <div style="font-size:${s.rupt}px;font-weight:700;color:${VERDE};line-height:1.25;margin-bottom:${s.mb3}px;">${c.ruptura}</div>
    <div style="font-size:${s.apoio}px;color:${CINZA};margin-bottom:${s.mb5}px;">${c.sub}</div>
    <div style="display:inline-block;background:${VERDE};color:${BRANCO};font-size:${s.cta}px;font-weight:700;padding:${s.ctaPad};border-radius:${s.br}px;align-self:flex-start;">${c.cta}</div>
  `;
  if (fmt.id === 'horizontal') return wrapH(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
  return wrapBar(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
}

// ─── C2 — RESULTADO ───────────────────────────────────────────────────────

function htmlResultado(c, fmt) {
  const s = sz(fmt.id);
  const inner = `
    <div style="font-size:${s.logo}px;color:${VERDE};font-weight:600;letter-spacing:1px;margin-bottom:${s.mb1}px;">Dra. Julia Resende</div>
    <div style="border:2px solid ${VERDE};background:${VERDE_CLARO};border-radius:${s.br}px;padding:${Math.round(s.mb3 * 0.8)}px ${Math.round(s.mb1 * 0.6)}px;margin-bottom:${s.mb2}px;">
      <div style="font-size:${s.h1}px;font-weight:800;color:${PRETO};line-height:${s.h1lh};">${c.headline_html}</div>
    </div>
    <div style="width:40px;height:3px;background:${VERDE};margin-bottom:${s.mb3}px;"></div>
    <div style="font-size:${s.sub}px;font-weight:600;color:${PRETO};margin-bottom:${s.mb4}px;">${c.sub}</div>
    <div style="font-size:${s.apoio}px;color:${CINZA};margin-bottom:${s.mb5}px;">${c.apoio}</div>
    <div style="display:inline-block;background:${VERDE};color:${BRANCO};font-size:${s.cta}px;font-weight:700;padding:${s.ctaPad};border-radius:${s.br}px;align-self:flex-start;">${c.cta}</div>
  `;
  if (fmt.id === 'horizontal') return wrapH(inner, '#ffffff', fmt.width, fmt.height, s);
  return wrapBar(inner, '#ffffff', fmt.width, fmt.height, s);
}

// ─── C3 — MECANISMO ───────────────────────────────────────────────────────

function htmlMecanismo(c, fmt) {
  const s = sz(fmt.id);
  const inner = `
    <div style="font-size:${s.logo}px;color:${VERDE};font-weight:600;letter-spacing:1px;margin-bottom:${s.mb1}px;">Dra. Julia Resende</div>
    <div style="font-size:${s.numero}px;font-weight:900;color:${VERDE};line-height:1;margin-bottom:${Math.round(s.mb2 * 0.6)}px;">${c.numero}</div>
    <div style="font-size:${s.rest}px;font-weight:700;color:${PRETO};line-height:1.25;margin-bottom:${s.mb2}px;">${c.headline_rest}</div>
    <div style="width:40px;height:3px;background:${VERDE};margin-bottom:${s.mb3}px;"></div>
    <div style="font-size:${s.sub}px;color:${CINZA};margin-bottom:${s.mb4}px;">${c.sub}</div>
    <div style="font-size:${s.apoio}px;color:${CINZA};margin-bottom:${s.mb5}px;">${c.apoio}</div>
    <div style="display:inline-block;background:${VERDE};color:${BRANCO};font-size:${s.cta}px;font-weight:700;padding:${s.ctaPad};border-radius:${s.br}px;align-self:flex-start;">${c.cta}</div>
  `;
  if (fmt.id === 'horizontal') return wrapH(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
  return wrapBar(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
}

// ─── C4 — PREVISIBILIDADE ─────────────────────────────────────────────────

function htmlPrevisibilidade(c, fmt) {
  const s = sz(fmt.id);
  const inner = `
    <div style="font-size:${s.logo}px;color:${VERDE};font-weight:600;letter-spacing:1px;margin-bottom:${s.mb1}px;">Dra. Julia Resende</div>
    <div style="font-size:${s.h1}px;font-weight:800;color:${PRETO};line-height:${s.h1lh};margin-bottom:${s.mb2}px;">${c.headline}</div>
    <div style="width:40px;height:3px;background:${VERDE};margin-bottom:${s.mb3}px;"></div>
    <div style="font-size:${s.rupt}px;font-weight:700;color:${VERDE};line-height:1.3;margin-bottom:${s.mb3}px;border-left:4px solid ${VERDE};padding-left:16px;">${c.ruptura}</div>
    <div style="font-size:${s.sub}px;color:${CINZA};margin-bottom:${s.mb5}px;">${c.sub}</div>
    <div style="display:inline-block;background:${VERDE};color:${BRANCO};font-size:${s.cta}px;font-weight:700;padding:${s.ctaPad};border-radius:${s.br}px;align-self:flex-start;">${c.cta}</div>
  `;
  if (fmt.id === 'horizontal') return wrapH(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
  return wrapBar(inner, FUNDO_CLARO, fmt.width, fmt.height, s);
}

// ─── C5 — OFERTA ──────────────────────────────────────────────────────────

function htmlOferta(c, fmt) {
  const s = sz(fmt.id);
  const listaHtml = c.lista.map(item =>
    `<div style="display:flex;align-items:center;gap:12px;margin-bottom:${Math.round(s.listFs * 0.5)}px;">
      <span style="color:${VERDE};font-size:${s.checkSz}px;font-weight:700;">✓</span>
      <span style="color:${BRANCO};font-size:${s.listFs}px;">${item}</span>
    </div>`
  ).join('');

  // CTA button: white bg, dark text (inverted because bg is dark)
  const ctaBtn = `<div style="display:inline-block;background:${BRANCO};color:${FUNDO_ESCURO};font-size:${s.cta}px;font-weight:700;padding:${s.ctaPad};border-radius:${s.br}px;align-self:flex-start;">${c.cta}</div>`;

  const inner = `
    <div style="font-size:${s.logo}px;color:${VERDE};font-weight:600;letter-spacing:1px;margin-bottom:${s.mb1}px;">Dra. Julia Resende</div>
    <div style="font-size:${Math.round(s.h1 * 0.85)}px;font-weight:700;color:${CINZA_CLARO};text-decoration:line-through;margin-bottom:${Math.round(s.mb2 * 0.4)}px;">${c.preco_riscado}</div>
    <div style="font-size:${Math.round(s.h1 * 1.5)}px;font-weight:900;color:${BRANCO};line-height:1.05;margin-bottom:${s.mb2}px;">${c.preco}</div>
    <div style="font-size:${s.sub}px;color:${VERDE};font-weight:600;margin-bottom:${s.mb3}px;">${c.sub}</div>
    <div style="margin-bottom:${s.mb5}px;">${listaHtml}</div>
    ${ctaBtn}
  `;

  // Full-width dark bg (no sidebar bar)
  return `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:${fmt.width}px; height:${fmt.height}px; overflow:hidden; background:${FUNDO_ESCURO}; font-family:'Poppins',sans-serif; display:flex; flex-direction:column; justify-content:center; padding:${fmt.id === 'horizontal' ? s.pad : s.pad}; }
</style></head><body>${inner}</body></html>`;
}

// ─── DISPATCH ─────────────────────────────────────────────────────────────

function getHtml(c, fmt) {
  switch (c.tipo) {
    case 'dor':             return htmlDor(c, fmt);
    case 'resultado':       return htmlResultado(c, fmt);
    case 'mecanismo':       return htmlMecanismo(c, fmt);
    case 'previsibilidade': return htmlPrevisibilidade(c, fmt);
    case 'oferta':          return htmlOferta(c, fmt);
  }
}

// ─── RENDER ───────────────────────────────────────────────────────────────

(async () => {
  const outDir = path.resolve(__dirname);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const c of criativos) {
    for (const fmt of formatos) {
      await page.setViewportSize({ width: fmt.width, height: fmt.height });
      const html = getHtml(c, fmt);
      await page.setContent(html, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      const filename = `${c.id}-${fmt.id}.png`;
      await page.screenshot({ path: path.join(outDir, filename) });
      console.log('✓', filename);
    }
  }

  await browser.close();
  console.log('\nDONE — 15 PNGs gerados em criativos-ads/');
})();
