// Generate two stylish QR codes for Ridgewood School:
//   1. App/Website QR → https://ridgewoodschools.com
//   2. Admission Form QR → https://ridgewoodschools.com/#admissions
//
// Style: navy QR dots on cream background, gold accent border,
//        shield logo in the center, rounded corners, branded frame.
//
// Run with: node scripts/generate-qr-codes.js
const QRCode = require("qrcode");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://ridgewoodschools.com";
const ADMISSIONS_URL = "https://ridgewoodschools.com/#admissions";

async function generateStylishQR(url, outputPath, label, shieldSrc) {
  // Generate QR code as SVG with custom colors (navy dots on transparent bg)
  // High error correction (H = 30%) so the logo in center doesn't break scanning
  const qrSvg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 0,
    color: {
      dark: "#1A2B4C",   // navy
      light: "#00000000", // transparent
    },
    width: 600,
  });

  // Create a styled SVG frame with:
  // - Cream rounded background
  // - Gold border
  // - QR code centered
  // - Shield logo badge in the center of the QR
  // - Label text below

  // Read the shield as base64 for embedding in SVG
  const shieldBuffer = fs.readFileSync(shieldSrc);
  const shieldBase64 = shieldBuffer.toString("base64");
  const shieldMime = shieldSrc.endsWith(".png") ? "image/png" : "image/webp";

  // The QR is 600x600. We'll place it on a 800x900 canvas with frame + label.
  const frameSvg = `
<svg width="800" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gold gradient for border -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C9A961"/>
      <stop offset="50%" stop-color="#E8C878"/>
      <stop offset="100%" stop-color="#C9A961"/>
    </linearGradient>
    <!-- Navy gradient for text -->
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A2B4C"/>
      <stop offset="100%" stop-color="#2A3B6C"/>
    </linearGradient>
    <!-- Soft shadow filter -->
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
      <feOffset dx="0" dy="4"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Clip path for QR rounded corners -->
    <clipPath id="qrClip">
      <rect x="100" y="80" width="600" height="600" rx="24" ry="24"/>
    </clipPath>
  </defs>

  <!-- Outer cream card with shadow -->
  <rect x="40" y="30" width="720" height="840" rx="32" ry="32"
        fill="#FAF7F0" filter="url(#softShadow)"/>

  <!-- Gold border frame -->
  <rect x="50" y="40" width="700" height="820" rx="28" ry="28"
        fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <rect x="58" y="48" width="684" height="804" rx="24" ry="24"
        fill="none" stroke="#C9A961" stroke-width="1" opacity="0.4"/>

  <!-- QR code background (white, rounded) -->
  <rect x="100" y="80" width="600" height="600" rx="24" ry="24" fill="#FFFFFF"/>

  <!-- QR code dots (navy on white) -->
  <g transform="translate(100, 80)" clip-path="url(#qrClip)">
    ${qrSvg
      .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
      .replace(/<svg[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">')
      .replace(/<rect[^>]*fill="#00000000"[^>]*>/g, '')
      .replace(/fill="#00000000"/g, 'fill="none"')
      .replace(/<path /g, '<path ')
      .replace(/stroke="#00000000"/g, '')
    }
  </g>

  <!-- Shield logo badge in the center of the QR (white circle + shield) -->
  <circle cx="400" cy="380" r="70" fill="#FAF7F0" stroke="url(#goldGrad)" stroke-width="3"/>
  <circle cx="400" cy="380" r="65" fill="#FFFFFF"/>
  <image href="data:${shieldMime};base64,${shieldBase64}"
         x="365" y="335" width="70" height="80"
         preserveAspectRatio="xMidYMid meet"/>

  <!-- Label text below the QR -->
  <text x="400" y="730" text-anchor="middle"
        font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="700"
        fill="url(#navyGrad)">${label}</text>

  <!-- URL text -->
  <text x="400" y="770" text-anchor="middle"
        font-family="Poppins, Arial, sans-serif" font-size="18" font-weight="500"
        fill="#1A2B4C" opacity="0.7">${url.replace("https://", "")}</text>

  <!-- Decorative gold line separator -->
  <line x1="320" y1="795" x2="480" y2="795" stroke="#C9A961" stroke-width="2" opacity="0.5"/>

  <!-- "Scan to visit" text -->
  <text x="400" y="830" text-anchor="middle"
        font-family="Poppins, Arial, sans-serif" font-size="14" font-weight="500"
        fill="#C9A961" letter-spacing="2">SCAN TO VISIT</text>
</svg>`;

  // Convert SVG to PNG using sharp
  await sharp(Buffer.from(frameSvg))
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  console.log(`✓ ${outputPath}: ${label} (${(stat.size / 1024).toFixed(0)}KB)`);
}

(async () => {
  const shieldWhite = "public/brand/ridgewood-shield-white.png";
  const shieldNavy = "public/brand/ridgewood-shield.png";

  console.log("Generating stylish QR codes for Ridgewood School...\n");

  // 1. Website/App QR — white shield on navy dots
  await generateStylishQR(
    SITE_URL,
    "public/qr-app.png",
    "Ridgewood School",
    shieldWhite
  );

  // 2. Admission Form QR — same style, different URL
  await generateStylishQR(
    ADMISSIONS_URL,
    "public/qr-admissions.png",
    "Admissions 2026-27",
    shieldWhite
  );

  console.log("\n✅ Both QR codes generated successfully!");
  console.log("   App QR:     public/qr-app.png");
  console.log("   Admission:  public/qr-admissions.png");
})();
