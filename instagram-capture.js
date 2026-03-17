const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const EDGE_USER_DATA = 'C:\\Users\\felip\\AppData\\Local\\Microsoft\\Edge\\User Data';
const OUTPUT_DIR = 'C:\\Users\\felip\\projeto00\\instagram-screenshots';
const INSTAGRAM_URL = 'https://www.instagram.com/revendedoresgrupoboticario/';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  console.log('Abrindo Edge com perfil existente...');

  const context = await chromium.launchPersistentContext(EDGE_USER_DATA, {
    channel: 'msedge',
    headless: false,
    args: [
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-blink-features=AutomationControlled',
    ],
    viewport: { width: 1280, height: 900 },
    locale: 'pt-BR',
  });

  const page = await context.newPage();

  console.log('Acessando Instagram...');
  await page.goto(INSTAGRAM_URL, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(5000);

  // Screenshot 1 — topo do perfil (bio + grid)
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-perfil-topo.png'), fullPage: false });
  console.log('Screenshot 1 — topo do perfil capturado');

  // Scroll para ver mais posts
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-grid-posts.png'), fullPage: false });
  console.log('Screenshot 2 — grid de posts capturado');

  // Scroll mais
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-mais-posts.png'), fullPage: false });
  console.log('Screenshot 3 — mais posts capturado');

  // Abrir primeiro post para ver em detalhe
  const firstPost = page.locator('article a').first();
  if (await firstPost.count() > 0) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    const posts = page.locator('article a');
    const count = await posts.count();
    console.log(`Posts encontrados no grid: ${count}`);

    // Clicar no 1º post
    await posts.nth(0).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-post-1-detalhe.png') });
    console.log('Screenshot 4 — post 1 detalhe capturado');

    // Próximo post
    const nextBtn = page.locator('[aria-label="Próximo"]').or(page.locator('[aria-label="Next"]'));
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '05-post-2-detalhe.png') });
      console.log('Screenshot 5 — post 2 detalhe capturado');

      await nextBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '06-post-3-detalhe.png') });
      console.log('Screenshot 6 — post 3 detalhe capturado');
    }
  }

  console.log(`\nPronto! Screenshots salvos em: ${OUTPUT_DIR}`);
  await context.close();
})().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
