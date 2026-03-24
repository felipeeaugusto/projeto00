/**
 * compositor-agent.js — Gera PNGs a partir de pasta com slides HTML
 *
 * Uso:
 *   node compositor-agent.js --pasta carrossel-02
 *   node compositor-agent.js --pasta carrossel-02 --prefixo slide
 *
 * Output: PNG de cada .html na pasta, mesmo nome
 */

const { chromium } = require('C:/Users/Felipe Augusto/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');
const fs   = require('fs');

// ─── Args ───────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const pastaIdx = args.indexOf('--pasta');
const pasta   = pastaIdx !== -1 ? args[pastaIdx + 1] : null;

if (!pasta) {
  console.error('❌ Uso: node compositor-agent.js --pasta <nome-da-pasta>');
  console.error('   Exemplo: node compositor-agent.js --pasta carrossel-02');
  process.exit(1);
}

const BASE = path.resolve(__dirname, '..', pasta);

if (!fs.existsSync(BASE)) {
  console.error(`❌ Pasta não encontrada: ${BASE}`);
  process.exit(1);
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  const htmlFiles = fs.readdirSync(BASE)
    .filter(f => f.endsWith('.html'))
    .sort();

  if (htmlFiles.length === 0) {
    console.error(`❌ Nenhum arquivo .html encontrado em: ${BASE}`);
    process.exit(1);
  }

  console.log(`\n🎨 compositor-agent — processando ${htmlFiles.length} slides`);
  console.log(`   Pasta: ${BASE}\n`);

  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });

  const resultados = [];

  for (const htmlFile of htmlFiles) {
    const htmlPath = 'file:///' + path.join(BASE, htmlFile).split('\\').join('/');
    const pngName  = htmlFile.replace('.html', '.png');
    const pngPath  = path.join(BASE, pngName);

    await page.goto(htmlPath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: pngPath });

    resultados.push({ html: htmlFile, png: pngName, caminho: pngPath });
    console.log(`   ✅ ${pngName}`);
  }

  await browser.close();

  console.log(`\n✅ compositor-agent concluído — ${resultados.length} PNGs gerados`);
  console.log(`   Pasta: ${BASE}`);

  // Salvar manifesto para o publisher-agent ler
  const manifesto = {
    pasta,
    gerado_em: new Date().toISOString(),
    slides: resultados.map(r => ({ nome: r.png, caminho: r.caminho }))
  };

  const manifestoPath = path.join(BASE, 'manifesto.json');
  fs.writeFileSync(manifestoPath, JSON.stringify(manifesto, null, 2));
  console.log(`\n📋 Manifesto salvo: ${manifestoPath}`);
  console.log('   → publisher-agent está pronto para usar este manifesto\n');
})();
