# Rachana Code

A lightweight, privacy-focused code editor by NAWALA Team.

Built with **Tauri + React + TypeScript**.

## Features

- 🚀 Fast and lightweight (Tauri, not Electron)
- 🔒 Zero telemetry, maximum privacy
- 🌙 Rachana Dark & Light themes
- 📁 File Explorer
- 🔍 Search
- ⌨️ Command Palette (Ctrl+Shift+P)
- 🖥️ Cross-platform (Windows, Linux, macOS)

## Project Structure

```
rachana-code-new/
├── src/                    # React frontend
│   ├── components/
│   │   ├── Layout/         # AppLayout
│   │   ├── Sidebar/        # ActivityBar, FileExplorer, SearchPanel
│   │   ├── Editor/         # EditorArea, TabBar
│   │   ├── StatusBar/      # StatusBar
│   │   └── CommandPalette/ # Command Palette
│   └── styles/
│       └── design-system.css
├── src-tauri/              # Rust backend
│   ├── src/
│   ├── Cargo.toml
│   └── tauri.conf.json
└── package.json
```

## Requirements

- Node.js 18+
- Rust (install from https://rustup.rs)
- Windows: WebView2 (included in Windows 10/11)

## Development

```bash
# Install dependencies
npm install

# Run development server (frontend only)
npm run dev

# Run with Tauri (requires Rust)
npm run tauri dev

# Build for production
npm run tauri build
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+P | Command Palette |
| Ctrl+Shift+E | Explorer |
| Ctrl+Shift+F | Search |
| Ctrl+S | Save |
| Ctrl+N | New File |
| Ctrl+O | Open File |
| Ctrl+B | Toggle Sidebar |

## Themes

Switch themes via Command Palette:
- `Theme: Rachana Dark` 🌙
- `Theme: Rachana Light` ☀️

## License

MIT License - NAWALA Team
