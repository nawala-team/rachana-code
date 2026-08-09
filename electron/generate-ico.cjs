const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

async function createIco() {
  const pngPath = path.join(__dirname, 'icons', 'icon.png');
  const icoPath = path.join(__dirname, 'icons', 'icon.ico');
  
  try {
    const buf = await pngToIco(pngPath);
    fs.writeFileSync(icoPath, buf);
    console.log('✅ icon.ico created successfully!');
  } catch (err) {
    console.error('Error creating ICO:', err);
  }
}

createIco();
