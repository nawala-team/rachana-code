const sharp = require('sharp');

async function createInstallerImages() {
  // Header image (150x57) - top right of installer
  const headerSvg = `
    <svg width="150" height="57" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="50%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>
      <rect width="150" height="57" fill="#0f0f17"/>
      <rect x="10" y="10" width="37" height="37" rx="8" fill="url(#g)"/>
      <text x="28.5" y="38" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Segoe UI">R</text>
      <text x="100" y="35" text-anchor="middle" fill="white" font-size="13" font-weight="600" font-family="Segoe UI">Rachana</text>
    </svg>`;

  await sharp(Buffer.from(headerSvg))
    .png()
    .toFile('electron/icons/installerHeader.png');
  console.log('✓ Header image created');

  // Sidebar/wizard image (164x314) - left side of installer
  const sidebarSvg = `
    <svg width="164" height="314" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#12121a"/>
          <stop offset="100%" stop-color="#1e1e2e"/>
        </linearGradient>
        <linearGradient id="logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="50%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>
      <rect width="164" height="314" fill="url(#bg)"/>
      
      <!-- Decorative circles -->
      <circle cx="20" cy="40" r="60" fill="#6366f1" opacity="0.08"/>
      <circle cx="140" cy="260" r="80" fill="#a855f7" opacity="0.06"/>
      
      <!-- Logo -->
      <rect x="42" y="70" width="80" height="80" rx="18" fill="url(#logo)"/>
      <text x="82" y="128" text-anchor="middle" fill="white" font-size="44" font-weight="bold" font-family="Segoe UI">R</text>
      
      <!-- App name -->
      <text x="82" y="185" text-anchor="middle" fill="white" font-size="18" font-weight="700" font-family="Segoe UI">Rachana</text>
      <text x="82" y="207" text-anchor="middle" fill="#a78bfa" font-size="16" font-weight="600" font-family="Segoe UI">Code</text>
      
      <!-- Tagline -->
      <text x="82" y="245" text-anchor="middle" fill="#6b7280" font-size="9" font-family="Segoe UI">Modern Code Editor</text>
      
      <!-- Footer -->
      <text x="82" y="295" text-anchor="middle" fill="#4b5563" font-size="9" font-family="Segoe UI">© 2026 Nawala Team</text>
    </svg>`;

  await sharp(Buffer.from(sidebarSvg))
    .png()
    .toFile('electron/icons/installerSidebar.png');
  console.log('✓ Sidebar image created');

  // Also create uninstaller header
  const uninstallHeaderSvg = `
    <svg width="150" height="57" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#4f46e5"/>
        </linearGradient>
      </defs>
      <rect width="150" height="57" fill="#0f0f17"/>
      <rect x="10" y="10" width="37" height="37" rx="8" fill="url(#g2)"/>
      <text x="28.5" y="38" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Segoe UI">R</text>
      <text x="100" y="35" text-anchor="middle" fill="#9ca3af" font-size="12" font-weight="500" font-family="Segoe UI">Uninstall</text>
    </svg>`;

  await sharp(Buffer.from(uninstallHeaderSvg))
    .png()
    .toFile('electron/icons/uninstallerHeader.png');
  console.log('✓ Uninstaller header created');

  console.log('\n✅ All installer images generated (PNG format)!');
}

createInstallerImages().catch(console.error);
