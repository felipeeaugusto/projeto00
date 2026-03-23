const sharp = require('sharp');

// Coordenadas do celular na canvas 1080x1080
// Phone shell: 1024x1536, posicionado em left=56, top=0
// A tela visível começa em aprox. x=460 (no espaço da phone-shell)
// → na canvas: left=56+460=516... mas phone começa em x=422 na imagem
// Vamos posicionar phone em left=0 top=0 (ocupa 1024px de largura, canvas tem 1080)
// Tela na phone-shell: começa em x≈460, y≈210 (após o frame)
// Na canvas (phone em 0,0): tela em x=460, y=210
// WA messages: 520x780, posicionada em x=460, y=210

const PHONE_LEFT = 0;
const PHONE_TOP = 0;

// Área da tela do celular na canvas
const SCREEN_LEFT = 460;
const SCREEN_TOP  = 210;

async function compose() {
  // Phone original (tela escura intacta) → cropar para 1024x1080
  const phoneCropped = await sharp('squads/dr-julia-resende/assets/phone-shell.png')
    .extract({ left: 0, top: 0, width: 1024, height: 1080 })
    .toBuffer();

  // WA messages redimensionada para cobrir toda a área da tela
  const waCover = await sharp('squads/dr-julia-resende/assets/wa-messages-layer.png')
    .resize(620, 840, { fit: 'fill' })
    .toBuffer();

  await sharp('squads/dr-julia-resende/assets/bg-text-layer.png')
    .composite([
      // Camada 4: phone shell (tela escura original)
      {
        input: phoneCropped,
        left: PHONE_LEFT,
        top: PHONE_TOP,
        blend: 'over'
      },
      // Camada 3: WA por cima com blend 'screen'
      // screen(dark, light) = light → conteúdo claro do WA aparece na tela escura
      {
        input: waCover,
        left: 430,
        top: 185,
        blend: 'screen'
      }
    ])
    .toFile('squads/dr-julia-resende/prototipo-carrosseis/estilo-p02-social-proof.png');

  console.log('Composição finalizada: estilo-p02-social-proof.png');
}

compose().catch(e => { console.error(e); process.exit(1); });
