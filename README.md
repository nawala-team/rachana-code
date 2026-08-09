<div align="center">

# Rachana Code

### A Modern, Privacy-First Code Editor

<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/electron-36.x-9feaf9?style=flat-square&logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/react-19.x-61dafb?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/typescript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<p><em>Fast. Lightweight. No telemetry. Your code stays yours.</em></p>

<br>

<img src="assets/screenshot.png" alt="Rachana Code Screenshot" width="800">

<br>

---

</div>

## Why Rachana Code?

Rachana Code is built for developers who value **speed**, **privacy**, and **simplicity**. Unlike bloated editors that spy on your every keystroke, Rachana keeps things local and lightning-fast.

| Feature | Rachana Code | Others |
|---------|:------------:|:------:|
| Zero Telemetry | Yes | No |
| Fast Startup | Yes | No |
| Lightweight | Yes | No |
| Open Source | Yes | Partial |

---

## Features

### Core Editor
- **Syntax Highlighting** - Support for 20+ programming languages
- **Preview Tabs** - VS Code-style tab behavior (single-click preview, double-click pin)
- **Multiple Tabs** - Work on multiple files simultaneously
- **Auto-Save** - Never lose your work

### Navigation
- **File Explorer** - Browse and manage your project files
- **Command Palette** - Quick access to all commands (`Ctrl+Shift+P`)
- **Search** - Find text across your entire project
- **Breadcrumbs** - Easy file path navigation

### Developer Tools
- **Integrated Terminal** - Run commands without leaving the editor
- **Git Integration** - View branch, changes, and manage source control
- **Debug Panel** - Built-in debugging support
- **Extensions** - Extend functionality with plugins

### Customization
- **Themes** - Rachana Dark & Light themes
- **Settings** - Customize font, tab size, and more
- **Resizable Panels** - Adjust layout to your preference

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/nawala-team/rachana-code.git
cd rachana-code

# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Build for production
npm run build && npm run electron:build
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Command Palette |
| `Ctrl+Shift+E` | Explorer |
| `Ctrl+Shift+F` | Search in Files |
| `Ctrl+Shift+G` | Source Control |
| `Ctrl+S` | Save File |
| `Ctrl+N` | New File |
| `Ctrl+B` | Toggle Sidebar |
| `Ctrl+J` | Toggle Terminal |
| `Ctrl+,` | Settings |

---

## Preview Tabs

Rachana Code uses VS Code-style preview tabs:

- **Single-click** a file - Opens as preview (italic title, replaceable)
- **Double-click** a file - Opens as pinned tab (permanent)
- **Edit** a preview file - Automatically pins the tab
- **Double-click** a tab - Pins it manually

---

## Project Structure

```
rachana-code/
├── electron/               # Electron main process
│   ├── main.cjs           # Main entry point
│   └── preload.cjs        # Preload scripts
├── src/
│   ├── components/
│   │   ├── Layout/        # App layout & resizer
│   │   ├── TitleBar/      # Custom title bar with menus
│   │   ├── Sidebar/       # File explorer, search, git, settings
│   │   ├── Editor/        # Code editor & tabs
│   │   ├── BottomPanel/   # Terminal
│   │   ├── StatusBar/     # Status information
│   │   └── CommandPalette/# Quick command access
│   ├── context/           # React contexts (Editor, Settings)
│   └── styles/            # Design system & CSS
└── package.json
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, CSS Variables
- **Backend**: Electron 36, Node.js
- **Build**: Vite, electron-builder
- **Terminal**: node-pty, xterm.js

---

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [NAWALA Team](https://github.com/nawala-team)**

</div>

