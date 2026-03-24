const { chromium } = require('C:/Users/Felipe Augusto/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });

  const slides = ['slide-01', 'slide-02', 'slide-03', 'slide-04', 'slide-05'];
  const baseDir = path.resolve(__dirname);

  for (const slide of slides) {
    const htmlPath = 'file:///' + path.join(baseDir, slide + '.html').split('\\').join('/');
    await page.goto(htmlPath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(baseDir, slide + '.png') });
    console.log('OK:', slide + '.png');
  }

  await browser.close();
  console.log('DONE');
})();
