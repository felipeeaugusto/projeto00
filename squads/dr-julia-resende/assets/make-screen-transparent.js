const sharp = require('sharp');

// Tornar a tela do celular transparente (remover o papel de parede escuro)
// mantendo o frame metálico intacto
async function makeScreenTransparent() {
  const { data, info } = await sharp('squads/dr-julia-resende/assets/phone-shell.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;   // 1024
  const h = info.height;  // 1536
  const ch = info.channels; // 4 (RGBA)

  // Pixels da tela do WhatsApp: muito escuros (r<65, g<65, b<65) e opacos
  // Frame metálico: mais claro (r,g,b > 60) em pelo menos um canal
  // Dynamic island (pílula preta no topo): também escuro, mas vamos manter visível
  //   → está na região y=150-280, x=380-640 aprox.

  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];

      // Só toca pixels opacos (não tocar transparência existente)
      if (a < 50) continue;

      // Dynamic island: y entre 150-290, x entre 350-680 — preservar
      if (y >= 150 && y <= 290 && x >= 350 && x <= 680) continue;

      // Tela: qualquer pixel mais escuro que o frame metálico (frame = cinza claro >150)
      if (r < 145 && g < 145 && b < 145) {
        data[i+3] = 0; // tornar transparente
        count++;
      }
    }
  }

  // Reconstruir imagem com a tela transparente
  await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: ch }
  })
  .png()
  .toFile('squads/dr-julia-resende/assets/phone-shell-open-screen.png');

  console.log('phone-shell-open-screen.png criado');
  console.log('Pixels removidos (tela): ' + count);
}

makeScreenTransparent().catch(e => { console.error(e); process.exit(1); });
