const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a simple SOLVI "S" logo as SVG
const svg192 = `<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" rx="40" fill="#0A0E17"/>
  <rect x="8" y="8" width="176" height="176" rx="36" fill="url(#grad)"/>
  <text x="96" y="120" font-family="Inter, system-ui, sans-serif" font-size="96" font-weight="800" fill="white" text-anchor="middle" dominant-baseline="middle">S</text>
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="192" y2="192">
      <stop offset="0%" stop-color="#4F8EF7"/>
      <stop offset="100%" stop-color="#22C55E"/>
    </linearGradient>
  </defs>
</svg>`;

const svg512 = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#0A0E17"/>
  <rect x="20" y="20" width="472" height="472" rx="88" fill="url(#grad2)"/>
  <text x="256" y="320" font-family="Inter, system-ui, sans-serif" font-size="256" font-weight="800" fill="white" text-anchor="middle" dominant-baseline="middle">S</text>
  <defs>
    <linearGradient id="grad2" x1="0" y1="0" x2="512" y2="512">
      <stop offset="0%" stop-color="#4F8EF7"/>
      <stop offset="100%" stop-color="#22C55E"/>
    </linearGradient>
  </defs>
</svg>`;

async function generateIcons() {
  try {
    await sharp(Buffer.from(svg192)).png().toFile(path.join(iconsDir, 'icon-192.png'));
    console.log('✅ icon-192.png created');

    await sharp(Buffer.from(svg512)).png().toFile(path.join(iconsDir, 'icon-512.png'));
    console.log('✅ icon-512.png created');

    // Also create a favicon
    await sharp(Buffer.from(svg192)).png().toFile(path.join(__dirname, '../public/favicon.ico'));
    console.log('✅ favicon.ico created');

  } catch (error) {
    console.error('Icon generation failed:', error);
    process.exit(1);
  }
}

generateIcons();
