const sharp = require('sharp');
const path = require('path');

const size = 512;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="100" fill="url(#bg)"/>
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="300" font-weight="bold" fill="white" text-anchor="middle">R</text>
  <circle cx="380" cy="140" r="30" fill="#22c55e"/>
  <circle cx="380" cy="220" r="25" fill="#f59e0b"/>
  <circle cx="380" cy="290" r="20" fill="#ef4444"/>
</svg>`;

const outDir = path.join(__dirname, 'icons');

sharp(Buffer.from(svg))
  .resize(512, 512)
  .png()
  .toFile(path.join(outDir, 'icon.png'))
  .then(() => console.log('✅ icon.png created'))
  .catch(console.error);
