const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const content = {
  HOOK_1: 'Tem',
  HOOK_2: 'mães',
  CHECK_1: 'Dormindo antes das crianças',
  CHECK_2: 'Sem culpa no fim do dia',
  CTA_1: 'A diferença',
  CTA_2: 'está em <em>rotina.</em>',
  MSG_NAME_1: 'Ana Paula M.',
  MSG_1: 'Gente, a rotina da Dra. Julia mudou nossa casa! Meu filho dorme no horário pela primeira vez em 3 anos 😭',
  MSG_NAME_2: 'Carol B.',
  MSG_2: 'Eu também! Antes era batalha toda noite. Agora ele mesmo pede pra dormir.',
  MSG_NAME_3: 'Fernanda R.',
  MSG_3: 'Que ebook incrível! Já apliquei na primeira semana e vi resultado.',
  MSG_SENT: 'Obrigada, meninas! Quando a rotina encaixa, tudo muda.',
  MSG_4: 'Sério! E o melhor: eu também to dormindo melhor rsrs',
  MSG_5: 'Semana que vem já começo a segunda parte! 🙌'
};

(async () => {
  const templatePath = path.resolve('squads/dr-julia-resende/templates/p02-social-proof.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  for (const [key, value] of Object.entries(content)) {
    html = html.replaceAll(`{${key}}`, value);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // aguarda fonts Google

  const outPath = path.resolve('squads/dr-julia-resende/prototipo-carrosseis/estilo-p02-social-proof.png');
  await page.screenshot({ path: outPath, type: 'png' });

  await browser.close();
  console.log('✅ estilo-p02-social-proof.png gerado!');
})().catch(e => { console.error(e); process.exit(1); });
