/**
 * @type {import('electron-builder').Configuration}
 */
const config = {
  appId: "com.nawala.rachana-code",
  productName: "Rachana Code",
  copyright: "Copyright © 2026 NAWALA Team",
  directories: {
    output: "D:/temp/rachana-release",
    buildResources: "electron/icons"
  },
  files: [
    "dist/**/*",
    "electron/**/*",
    "!electron/generate-icons.cjs",
    "!electron/generate-installer-images.cjs"
  ],
  win: {
    target: "nsis",
    icon: "electron/icons/icon.png"
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    allowElevation: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "Rachana Code",
    installerIcon: "electron/icons/icon.ico",
    uninstallerIcon: "electron/icons/icon.ico",
    installerHeader: "electron/icons/installerHeader.png",
    installerHeaderIcon: "electron/icons/icon.ico",
    installerSidebar: "electron/icons/installerSidebar.png",
    uninstallerSidebar: "electron/icons/installerSidebar.png",
    license: null,
    deleteAppDataOnUninstall: false,
    displayLanguageSelector: false,
    installerLanguages: ["en_US"],
    language: "1033"
  },
  dmg: {
    title: "Rachana Code"
  }
};

module.exports = config;
