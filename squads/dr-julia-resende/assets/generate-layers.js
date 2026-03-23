const { chromium } = require('playwright');
const fs = require('fs');

const bgTextHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,600;0,800;1,800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1080px; overflow:hidden;
    background: radial-gradient(ellipse at 15% 20%, #0d1a2e 0%, #060a14 70%);
    position:relative; font-family:'Poppins', sans-serif;
  }
  .circles {
    position:absolute; top:-120px; left:-120px;
    width:700px; height:700px; border-radius:50%;
    border:1px solid rgba(255,255,255,0.05); pointer-events:none;
  }
  .circles::before {
    content:''; position:absolute;
    top:-80px; left:-80px; right:-80px; bottom:-80px;
    border-radius:50%; border:1px solid rgba(255,255,255,0.03);
  }
  .circles::after {
    content:''; position:absolute;
    top:-160px; left:-160px; right:-160px; bottom:-160px;
    border-radius:50%; border:1px solid rgba(255,255,255,0.02);
  }
  .accent {
    position:absolute; bottom:-100px; left:-100px;
    width:400px; height:400px; border-radius:50%;
    background: radial-gradient(circle, rgba(80,40,160,0.18) 0%, transparent 70%);
    pointer-events:none;
  }
  .handle-top {
    position:absolute; top:44px; left:52px;
    font-size:15px; font-weight:300; letter-spacing:2px;
    color:rgba(255,255,255,0.28);
  }
  .text-block { position:absolute; top:180px; left:52px; width:340px; }
  .hook { font-size:104px; font-weight:800; line-height:0.88; color:#fff; letter-spacing:-2px; }
  .hook em { font-style:italic; display:block; }
  .checklist { margin-top:30px; display:flex; flex-direction:column; gap:16px; margin-bottom:32px; }
  .check-item { display:flex; align-items:center; gap:12px; }
  .check-icon svg { width:22px; height:22px; flex-shrink:0; }
  .check-text { font-size:23px; font-weight:600; color:rgba(255,255,255,0.9); line-height:1.2; }
  .cta { font-size:33px; font-weight:800; line-height:1.15; color:#fff; }
  .cta em { font-style:normal; color:#03bb85; }
  .handle-bottom {
    position:absolute; bottom:36px; left:52px;
    font-size:15px; font-weight:300; letter-spacing:2px;
    color:rgba(255,255,255,0.22);
  }
</style></head><body>
  <div class="circles"></div>
  <div class="accent"></div>
  <span class="handle-top">@drjuliaresende</span>
  <div class="text-block">
    <div class="hook">Tem<em>m&#xE3;es</em></div>
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

const waHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:470px; height:720px; overflow:hidden;
    background:#ece5dd; font-family:'Poppins', sans-serif;
    display:flex; flex-direction:column;
  }
  .wa-header {
    background:#075e54; padding:16px 18px;
    display:flex; align-items:center; gap:14px; flex-shrink:0;
  }
  .wa-avatar {
    width:46px; height:46px; border-radius:50%;
    background:rgba(255,255,255,0.2);
    display:flex; align-items:center; justify-content:center;
    font-size:20px; font-weight:700; color:white; flex-shrink:0;
  }
  .wa-name { font-size:17px; font-weight:600; color:#fff; }
  .wa-sub { font-size:13px; color:rgba(255,255,255,0.7); }
  .wa-messages {
    flex:1; padding:14px; display:flex;
    flex-direction:column; gap:10px; overflow:hidden;
  }
  .wa-date {
    align-self:center; font-size:12px;
    background:rgba(255,255,255,0.65); color:#555;
    padding:3px 12px; border-radius:6px; margin-bottom:2px;
  }
  .msg { max-width:86%; padding:9px 13px 22px; border-radius:10px;
    font-size:15px; line-height:1.45; color:#303030; position:relative; }
  .msg-r { background:#fff; align-self:flex-start; border-top-left-radius:2px; }
  .msg-s { background:#dcf8c6; align-self:flex-end; border-top-right-radius:2px; }
  .sender { font-size:12px; font-weight:700; color:#075e54; margin-bottom:3px; display:block; }
  .time { position:absolute; bottom:4px; right:10px; font-size:11px; color:#888; }
  .msg-s .time { color:#666; }
  .wa-input {
    padding:10px 14px; background:#f0f0f0;
    display:flex; align-items:center; gap:8px; flex-shrink:0;
  }
  .input-box {
    flex:1; height:38px; background:#fff; border-radius:19px;
    font-size:14px; color:#aaa; display:flex; align-items:center; padding:0 14px;
  }
  .send-btn {
    width:38px; height:38px; background:#075e54; border-radius:50%;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
</style></head><body>
  <div class="wa-header">
    <div class="wa-avatar">R</div>
    <div><div class="wa-name">M&#xE3;es com Rotina</div><div class="wa-sub">1.247 participantes</div></div>
  </div>
  <div class="wa-messages">
    <div class="wa-date">Hoje</div>
    <div class="msg msg-r">
      <span class="sender">Ana Paula M.</span>
      Gente, a rotina da Dra. Julia mudou nossa casa! Meu filho dorme no hor&#xE1;rio pela primeira vez em 3 anos &#x1F62D;
      <span class="time">08:14</span>
    </div>
    <div class="msg msg-r">
      <span class="sender">Carol B.</span>
      Eu tamb&#xE9;m! Antes era batalha toda noite. Agora ele mesmo pede pra dormir.
      <span class="time">08:31</span>
    </div>
    <div class="msg msg-r">
      <span class="sender">Fernanda R.</span>
      Que ebook incr&#xED;vel! J&#xE1; apliquei na primeira semana e vi resultado.
      <span class="time">09:02</span>
    </div>
    <div class="msg msg-s">
      Obrigada, meninas! Quando a rotina encaixa, tudo muda.
      <span class="time">09:15</span>
    </div>
    <div class="msg msg-r">
      <span class="sender">Ana Paula M.</span>
      S&#xE9;rio! E o melhor: eu tamb&#xE9;m to dormindo melhor rsrs
      <span class="time">09:22</span>
    </div>
  </div>
  <div class="wa-input">
    <div class="input-box">Mensagem</div>
    <div class="send-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(bgTextHTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'squads/dr-julia-resende/assets/bg-text-layer.png', type: 'png' });
  console.log('bg-text-layer.png OK');

  await page.setViewportSize({ width: 470, height: 720 });
  await page.setContent(waHTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'squads/dr-julia-resende/assets/wa-messages-layer.png', type: 'png' });
  console.log('wa-messages-layer.png OK');

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
