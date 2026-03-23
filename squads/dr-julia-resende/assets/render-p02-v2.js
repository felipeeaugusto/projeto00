const { chromium } = require('playwright');
const path = require('path');

const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,600;0,800;1,800&family=Roboto:wght@400;500&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }

body {
  width:1080px; height:1080px; overflow:hidden;
  background: radial-gradient(ellipse at 12% 18%, #0d1a2e 0%, #060a14 65%);
  font-family:'Poppins', sans-serif;
  position:relative;
}

.circles {
  position:absolute; top:-200px; left:-200px;
  width:900px; height:900px; border-radius:50%;
  border:1px solid rgba(255,255,255,0.04);
  pointer-events:none; z-index:1;
}
.circles::before {
  content:''; position:absolute;
  top:-100px; left:-100px; right:-100px; bottom:-100px;
  border-radius:50%; border:1px solid rgba(255,255,255,0.025);
}
.circles::after {
  content:''; position:absolute;
  top:-200px; left:-200px; right:-200px; bottom:-200px;
  border-radius:50%; border:1px solid rgba(255,255,255,0.015);
}

/* ── PHONE — menor e com borda visível ── */
.phone-wrap {
  position:absolute;
  left:430px; top:20px;
  transform: perspective(1800px) rotateY(-20deg) rotateZ(-4deg);
  transform-origin: top left;
  z-index:5;
}

.phone {
  width:520px; height:1100px;
  background:#0a0a0a;
  border-radius:52px;
  border:3px solid #4a4a4c;
  outline:12px solid #1a1a1c;
  outline-offset:-3px;
  box-shadow:
    -14px 20px 70px rgba(0,0,0,0.95),
    0 0 0 1px rgba(255,255,255,0.08),
    inset 0 0 0 1px rgba(255,255,255,0.04);
  overflow:hidden;
  position:relative;
}

.phone::before {
  content:''; position:absolute;
  top:0; left:0; width:18px; height:100%;
  background:linear-gradient(to right,
    rgba(255,255,255,0.14) 0%,
    rgba(255,255,255,0.05) 50%,
    transparent 100%);
  z-index:30; pointer-events:none;
}

.island {
  position:absolute; top:16px; left:50%;
  transform:translateX(-50%);
  width:100px; height:30px;
  background:#000; border-radius:18px;
  z-index:10;
}

/* ── TELA — wallpaper dark mode WA ── */
.screen {
  position:absolute;
  top:0; left:0; right:0; bottom:0;
  background-color:#0d1117;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0);
  background-size:18px 18px;
  display:flex; flex-direction:column;
  font-family:'Roboto', sans-serif;
}

.wa-header {
  background:#1f2c34;
  padding:58px 16px 12px;
  display:flex; align-items:center; gap:12px;
  flex-shrink:0;
  border-bottom:1px solid rgba(255,255,255,0.06);
}
.wa-avatar {
  width:42px; height:42px; border-radius:50%;
  background:#00a884;
  display:flex; align-items:center; justify-content:center;
  font-size:18px; font-weight:700; color:#fff; flex-shrink:0;
}
.wa-name { font-size:16px; font-weight:500; color:#e9edef; }
.wa-sub  { font-size:12px; color:#8696a0; }

.wa-msgs {
  flex:1; padding:14px 12px;
  display:flex; flex-direction:column; gap:8px;
  overflow:hidden;
}
.wa-date {
  align-self:center; font-size:12px;
  background:#182229; color:#8696a0;
  padding:5px 14px; border-radius:7px; margin-bottom:4px;
  border:1px solid rgba(255,255,255,0.07);
}

.msg {
  max-width:82%; padding:9px 12px 24px;
  border-radius:9px; font-size:17px;
  line-height:1.45; color:#e9edef;
  position:relative; word-break:break-word;
}
.msg-r { background:#202c33; align-self:flex-start; border-top-left-radius:2px; }
.msg-s { background:#005c4b; align-self:flex-end;   border-top-right-radius:2px; }

.sender { font-size:13px; font-weight:500; display:block; margin-bottom:3px; }
.s1 { color:#53bdeb; }
.s2 { color:#29a56c; }
.s3 { color:#d4a84b; }

.time {
  position:absolute; bottom:6px; right:10px;
  font-size:12px; color:#8696a0;
}
.check { color:#53bdeb; }

.wa-input {
  background:#1f2c34; padding:8px 12px;
  display:flex; align-items:center; gap:10px; flex-shrink:0;
}
.input-box {
  flex:1; height:38px; background:#2a3942;
  border-radius:19px; font-size:14px; color:#8696a0;
  display:flex; align-items:center; padding:0 14px;
}
.mic { width:38px; height:38px; background:#00a884; border-radius:50%;
  display:flex; align-items:center; justify-content:center; font-size:16px; }

/* ── TEXTO ESQUERDA — novo layout ── */
.text-overlay {
  position:absolute; left:52px; top:0; bottom:0;
  width:340px; z-index:20;
  display:flex; flex-direction:column; justify-content:center;
  padding:60px 0;
}

.handle-top {
  font-size:13px; font-weight:300;
  letter-spacing:2.5px; color:rgba(255,255,255,0.3);
  margin-bottom:36px;
}

.hook {
  font-size:100px; font-weight:800;
  line-height:0.85; color:#fff;
  letter-spacing:-3px; margin-bottom:36px;
}
.hook em { font-style:italic; display:block; }

.divider {
  width:48px; height:3px;
  background:#03bb85; border-radius:2px;
  margin-bottom:28px;
}

.checklist { display:flex; flex-direction:column; gap:16px; margin-bottom:36px; }
.check-item { display:flex; align-items:center; gap:12px; }
.check-icon svg { width:22px; height:22px; flex-shrink:0; }
.check-text { font-size:22px; font-weight:600; color:rgba(255,255,255,0.92); line-height:1.2; }

.cta { font-size:34px; font-weight:800; line-height:1.1; color:#fff; }
.cta em { font-style:normal; color:#03bb85; }

.handle-bottom {
  position:absolute; bottom:36px; left:52px;
  font-size:14px; font-weight:300;
  letter-spacing:2px; color:rgba(255,255,255,0.25);
  z-index:20;
}
</style>
</head>
<body>

<div class="circles"></div>
<div class="accent"></div>

<!-- PHONE -->
<div class="phone-wrap">
  <div class="phone">
    <div class="island"></div>
    <div class="screen">

      <div class="wa-header">
        <div class="wa-avatar">M</div>
        <div>
          <div class="wa-name">M&#xE3;es com Rotina &#x1F49A;</div>
          <div class="wa-sub">2.841 participantes</div>
        </div>
      </div>

      <div class="wa-msgs">
        <div class="wa-date">Hoje</div>

        <div class="msg msg-r">
          <span class="sender s1">Ana Paula M.</span>
          Gente!! Meu filho dormiu 8h sem chorar pela 1&#xAA; vez &#x1F62D;
          <span class="time">08:14</span>
        </div>

        <div class="msg msg-r">
          <span class="sender s2">Carol B.</span>
          Igual aqui! 3 semanas com a rotina e mudou tudo
          <span class="time">08:31</span>
        </div>

        <div class="msg msg-r">
          <span class="sender s3">Fernanda R.</span>
          Que ebook top demais! Valeu cada centavo
          <span class="time">09:02</span>
        </div>

        <div class="msg msg-s">
          Fico muito feliz! Isso &#xE9; o m&#xE9;todo funcionando &#x1F49A;
          <span class="time">09:15 <span class="check">&#10003;&#10003;</span></span>
        </div>

        <div class="msg msg-r">
          <span class="sender s1">Ana Paula M.</span>
          Eu tambem to dormindo melhor kkk
          <span class="time">09:22</span>
        </div>

      </div>

      <div class="wa-input">
        <span style="font-size:22px;color:#8696a0">&#128578;</span>
        <div class="input-box">Mensagem</div>
        <div class="mic">&#127908;</div>
      </div>

    </div>
  </div>
</div>

<!-- TEXTO -->
<div class="text-overlay">
  <span class="handle-top">@drjuliaresende</span>
  <div class="hook">Tem<em>m&#xE3;es</em></div>
  <div class="divider"></div>
  <div class="checklist">
    <div class="check-item">
      <div class="check-icon"><svg viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="#03bb85" stroke-width="1.5"/>
        <path d="M6 11.5l3.5 3.5 6-7" stroke="#03bb85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>
      <span class="check-text">Dormindo antes das crian&#xE7;as</span>
    </div>
    <div class="check-item">
      <div class="check-icon"><svg viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="#03bb85" stroke-width="1.5"/>
        <path d="M6 11.5l3.5 3.5 6-7" stroke="#03bb85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>
      <span class="check-text">Sem culpa no fim do dia</span>
    </div>
  </div>
  <p class="cta">A diferen&#xE7;a<br>est&#xE1; em <em>rotina.</em></p>
</div>

<span class="handle-bottom">@drjuliaresende</span>

</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const out = path.resolve('squads/dr-julia-resende/prototipo-carrosseis/estilo-p02-social-proof.png');
  await page.screenshot({ path: out, type: 'png' });
  await browser.close();
  console.log('✅ P02 v2 gerado!');
})().catch(e => { console.error(e); process.exit(1); });
