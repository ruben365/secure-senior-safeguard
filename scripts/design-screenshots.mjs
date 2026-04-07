import { chromium } from 'playwright';
import { mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://localhost:8082';
const OUT_DIR = path.join(__dirname, '..', 'design-review');
const EXPORT_DIR = 'C:\\Users\\malob\\Documents\\secure-senior-safeguard\\design-review';

const VIEWPORTS = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/training', name: 'training' },
  { path: '/training/ai-analysis', name: 'training-ai-analysis' },
  { path: '/business', name: 'business' },
  { path: '/contact', name: 'contact' },
  { path: '/resources', name: 'resources' },
  { path: '/articles', name: 'articles' },
  { path: '/careers', name: 'careers' },
  { path: '/faq', name: 'faq' },
  { path: '/auth', name: 'auth' },
];

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(EXPORT_DIR, { recursive: true }).catch(() => {});

  const browser = await chromium.launch({ headless: true });
  const created = [];

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Suppress console noise
    page.on('console', () => {});
    page.on('pageerror', () => {});

    for (const route of ROUTES) {
      const filename = `${route.name}--${viewport.name}.png`;
      const outPath = path.join(OUT_DIR, filename);
      const exportPath = path.join(EXPORT_DIR, filename);

      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 15000,
        });
        // Wait for animations/fonts to settle
        await wait(1200);

        // Close any cookie banners, chat widgets, or overlays
        await page.evaluate(() => {
          // Hide floating chat widget if present so it doesn't block content
          document.querySelectorAll('[class*="chat"], [class*="Chat"], [id*="chat"]')
            .forEach(el => { if (el instanceof HTMLElement) el.style.opacity = '0'; });
        });

        await page.screenshot({
          path: outPath,
          fullPage: true,
        });

        // Copy to export dir
        try { await copyFile(outPath, exportPath); } catch {}

        console.log(`  ✓ ${filename}`);
        created.push(outPath);
      } catch (err) {
        console.log(`  ✗ ${route.path} — ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();

  console.log(`\n=== Done: ${created.length} screenshots ===`);
  console.log('\nFiles created:');
  created.forEach(f => console.log(' ', f));

  console.log('\nExport directory:');
  console.log(' ', EXPORT_DIR);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
