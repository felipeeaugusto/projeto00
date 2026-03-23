const { chromium } = require('playwright');
const path = require('path');

const waHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:470px; height:900px; overflow:hidden;
    background:#0d1117;
    font-family:'Roboto', sans-serif;
    display:flex; flex-direction:column;
  }

  /* Header */
  .wa-header {
    background:#1f2c34;
    padding:10px 16px 10px;
    display:flex; align-items:center; gap:12px;
    flex-shrink:0;
    border-bottom:1px solid rgba(255,255,255,0.05);
  }
  .back-arrow {
    color:#00a884; font-size:22px; line-height:1;
    margin-right:2px;
  }
  .wa-avatar {
    width:42px; height:42px; border-radius:50%;
    background:#00a884;
    display:flex; align-items:center; justify-content:center;
    font-size:18px; font-weight:700; color:#fff; flex-shrink:0;
  }
  .wa-info { flex:1; }
  .wa-name { font-size:16px; font-weight:500; color:#e3e3e3; line-height:1.3; }
  .wa-sub { font-size:12px; color:#8696a0; }
  .wa-icons { display:flex; gap:18px; }
  .wa-icon { color:#8696a0; font-size:18px; }

  /* Messages area */
  .wa-messages {
    flex:1;
    padding:12px 14px;
    display:flex;
    flex-direction:column;
    gap:4px;
    overflow:hidden;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%230d1117'/%3E%3C/svg%3E");
  }

  /* Date pill */
  .wa-date {
    align-self:center;
    font-size:12px;
    background:#182229;
    color:#8696a0;
    padding:5px 14px;
    border-radius:8px;
    margin:4px 0 8px;
    border:1px solid rgba(255,255,255,0.06);
  }

  /* Message bubble base */
  .msg {
    max-width:82%;
    padding:7px 10px 20px;
    border-radius:8px;
    font-size:14px;
    line-height:1.45;
    color:#e3e3e3;
    position:relative;
    word-break:break-word;
  }

  /* Received */
  .msg-r {
    background:#202c33;
    align-self:flex-start;
    border-top-left-radius:2px;
    margin-bottom:2px;
  }

  /* Sent */
  .msg-s {
    background:#005c4b;
    align-self:flex-end;
    border-top-right-radius:2px;
    margin-bottom:2px;
  }

  /* Sender name */
  .sender {
    font-size:12.5px;
    font-weight:500;
    margin-bottom:2px;
    display:block;
  }
  .s1 { color:#53bdeb; }
  .s2 { color:#29a56c; }
  .s3 { color:#d4a84b; }

  /* Timestamp */
  .time {
    position:absolute;
    bottom:5px; right:9px;
    font-size:11px; color:#8696a0;
    display:flex; align-items:center; gap:3px;
  }
  .msg-s .time { color:#8696a0; }
  .check { font-size:13px; color:#53bdeb; }

  /* Input bar */
  .wa-input {
    background:#1f2c34;
    padding:8px 12px;
    display:flex; align-items:center; gap:10px;
    flex-shrink:0;
  }
  .input-box {
    flex:1; height:40px;
    background:#2a3942;
    border-radius:20px;
    font-size:14px; color:#8696a0;
    display:flex; align-items:center; padding:0 16px;
  }
  .mic-btn {
    width:40px; height:40px;
    background:#00a884;
    border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
    font-size:18px;
  }
  .emoji-btn { color:#8696a0; font-size:22px; }
</style></head><body>

  <div class="wa-header">
    <div class="back-arrow">&#8592;</div>
    <div class="wa-avatar">M</div>
    <div class="wa-info">
      <div class="wa-name">M&#xE3;es com Rotina &#x1F49A;</div>
      <div class="wa-sub">2.841 participantes</div>
    </div>
    <div class="wa-icons">
      <span class="wa-icon">&#128247;</span>
      <span class="wa-icon">&#128222;</span>
    </div>
  </div>

  <div class="wa-messages">
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
      E o melhor: eu tambem to dormindo melhor kkk
      <span class="time">09:22</span>
    </div>

  </div>

  <div class="wa-input">
    <span class="emoji-btn">&#128578;</span>
    <div class="input-box">Mensagem</div>
    <div class="mic-btn">&#127908;</div>
  </div>

</body></html>`;

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 470, height: 900 });
  await page.setContent(waHTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outPath = path.resolve('squads/dr-julia-resende/assets/wa-screen-dark.png');
  await page.screenshot({ path: outPath, type: 'png' });

  await browser.close();
  console.log('✅ wa-screen-dark.png gerado!');
})().catch(e => { console.error(e); process.exit(1); });
