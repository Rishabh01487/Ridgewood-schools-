// Convert gallery PNGs to optimized WebP for better performance.
// WebP is ~30-50% smaller than PNG for the same quality.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

async function convertToWebP(dir, recursive = false) {
  const items = fs.readdirSync(dir);
  for (const f of items) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && recursive) {
      await convertToWebP(full, recursive);
      continue;
    }
    if (!f.endsWith('.png')) continue;
    const webpPath = full.replace(/\.png$/, '.webp');
    await sharp(full)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(webpPath);
    const newSize = fs.statSync(webpPath).size;
    const oldSize = stat.size;
    const savings = (1 - newSize / oldSize) * 100;
    console.log(`✓ ${path.relative(PUBLIC, webpPath)}: ${(oldSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings.toFixed(0)}% saved)`);
  }
}

(async () => {
  console.log('Converting gallery images to WebP...\n');
  await convertToWebP(path.join(PUBLIC, 'gallery'), true);
  console.log('\n✅ Done');
})();
