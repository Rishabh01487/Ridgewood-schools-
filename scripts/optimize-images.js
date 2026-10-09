// Optimize brand and gallery images for the web.
// Resizes over-sized PNGs and saves optimized versions.
// Run with: node scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

// Brand logo: used at 48-88px height in navbar/footer. 600px tall is more than enough.
const BRAND_MAX_HEIGHT = 600;
// Shield: used at 14-72px. 300px is more than enough.
const SHIELD_MAX_HEIGHT = 300;
// Gallery: shown in grid at ~300-500px. 800px tall is plenty.
const GALLERY_MAX_WIDTH = 800;

async function optimizeBrand() {
  const brandDir = path.join(PUBLIC, 'brand');
  for (const f of fs.readdirSync(brandDir)) {
    if (!f.endsWith('.png')) continue;
    const src = path.join(brandDir, f);
    const isShield = f.includes('shield');
    const isFull = f.includes('full');
    // For full logo (very wide aspect ratio), limit by height
    // For shield (tall), limit by height
    const maxH = isShield ? SHIELD_MAX_HEIGHT : BRAND_MAX_HEIGHT;
    const dest = src; // overwrite
    const info = await sharp(src)
      .resize({ height: maxH, withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9, palette: true, colors: 256 })
      .toFile(dest + '.tmp');
    // Replace original
    fs.renameSync(dest + '.tmp', dest);
    const newSize = fs.statSync(dest).size;
    console.log(`✓ ${f}: ${info.width}x${info.height}, ${(newSize / 1024).toFixed(0)}KB`);
  }
}

async function optimizeGallery() {
  const galleryDir = path.join(PUBLIC, 'gallery');
  for (const f of fs.readdirSync(galleryDir)) {
    if (!f.endsWith('.png')) continue;
    const src = path.join(galleryDir, f);
    const dest = src; // overwrite
    const info = await sharp(src)
      .resize({ width: GALLERY_MAX_WIDTH, withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9, palette: true, colors: 256 })
      .toFile(dest + '.tmp');
    fs.renameSync(dest + '.tmp', dest);
    const newSize = fs.statSync(dest).size;
    console.log(`✓ ${f}: ${info.width}x${info.height}, ${(newSize / 1024).toFixed(0)}KB`);
  }
}

async function optimizeGeneratedGallery() {
  const genDir = path.join(PUBLIC, 'gallery', 'generated');
  if (!fs.existsSync(genDir)) return;
  for (const f of fs.readdirSync(genDir)) {
    if (!f.endsWith('.png')) continue;
    const src = path.join(genDir, f);
    const dest = src;
    const info = await sharp(src)
      .resize({ width: GALLERY_MAX_WIDTH, withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9, palette: true, colors: 256 })
      .toFile(dest + '.tmp');
    fs.renameSync(dest + '.tmp', dest);
    const newSize = fs.statSync(dest).size;
    console.log(`✓ generated/${f}: ${info.width}x${info.height}, ${(newSize / 1024).toFixed(0)}KB`);
  }
}

(async () => {
  console.log('Optimizing brand images...');
  await optimizeBrand();
  console.log('\nOptimizing gallery images...');
  await optimizeGallery();
  console.log('\nOptimizing generated gallery images...');
  await optimizeGeneratedGallery();
  console.log('\n✅ All images optimized');
})();
