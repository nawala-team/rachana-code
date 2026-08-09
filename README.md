# Rachana Code

A lightweight, privacy-focused code editor by NAWALA Team.

Built with **Electron + React + TypeScript**.

## Features

- Fast and lightweight
- Zero telemetry, maximum privacy
- Rachana Dark & Light themes
- File Explorer with preview tabs (VS Code-style)
- Search across files
- Integrated Terminal
- Command Palette (Ctrl+Shift+P)
- Git integration
- Cross-platform (Windows, Linux, macOS)

## Project Structure

```
rachana-code/
├── src/                    # React frontend
│   ├── components/
│   │   ├── Layout/         # AppLayout
│   │   ├── Sidebar/        # ActivityBar, FileExplorer, SearchPanel
│   │   ├── Editor/         # EditorArea, TabBar
│   │   ├── BottomPanel/    # Terminal
│   │   ├── StatusBar/      # StatusBar
│   │   └── CommandPalette/ # Command Palette
│   └── context/            # React contexts
├── electron/               # Electron main process
│   ├── main.cjs
│   └── preload.cjs
└── package.json
```

## Requirements

- Node.js 18+
- Windows: WebView2 (included in Windows 10/11)

## Development

```bash
# Install dependencies
npm install

# Run development server (frontend only)
npm run dev

# Run with Electron
npm run electron:dev

# Build for production
npm run build
npm run electron:build
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
| Ctrl+` | Toggle Terminal |

## Preview Tabs

Single-click a file to open it as a preview tab (shown in italic). The preview tab will be replaced when you open another file. To pin a tab:
- Double-click the tab
- Edit the file content
- Double-click the file in explorer

## Themes

Switch themes via Command Palette or Settings:
- Rachana Dark
- Rachana Light

## License

MIT License - NAWALA Team
