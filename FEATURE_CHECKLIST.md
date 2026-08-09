# Rachana Code - Feature Checklist

## Legend: ✅ Done | 🔄 Partial | ❌ Not Started

## CURRENT STATUS: ~35/150 features (23%)

---

## 1. EDITOR CORE

### Basic Editing
- ✅ Syntax Highlighting (80+ languages)
- ✅ Find & Replace (Ctrl+F)
- ✅ Word Wrap, Line Numbers, Minimap
- ✅ Bracket Matching, Auto Indent, Code Folding
- ✅ Undo/Redo, Cut/Copy/Paste
- ❌ Multi-cursor (Alt+Click)
- ❌ Column Selection (Alt+Shift+Drag)
- ❌ Duplicate Line (Ctrl+Shift+D)
- ❌ Move Line Up/Down (Alt+↑↓)
- ❌ Toggle Comment (Ctrl+/)
- ❌ Emmet

### Code Intelligence
- 🔄 Auto Complete (basic Monaco)
- ❌ IntelliSense / LSP
- ❌ Go to Definition (F12)
- ❌ Go to References
- ❌ Peek Definition
- ❌ Rename Symbol (F2)
- ❌ Format Document
- ❌ Snippets

### Navigation
- ✅ Breadcrumbs
- ❌ Go to Line (Ctrl+G)
- ❌ Go to File (Ctrl+P)
- ❌ Go to Symbol (Ctrl+Shift+O)
- ❌ Outline View
- ❌ Back/Forward navigation

---

## 2. USER INTERFACE

### Layout
- ✅ Activity Bar
- ✅ Primary Sidebar
- ✅ Bottom Panel
- ✅ Status Bar
- ✅ Sidebar Left/Right
- ❌ Secondary Sidebar
- ❌ Zen Mode (Ctrl+K Z)
- ❌ Panel Position (bottom/left/right)

### Tabs & Editors
- ✅ Editor Tabs with icons
- ✅ Modified indicator, Close tab

---

## 3. SIDEBAR PANELS

### File Explorer
- ✅ Tree View (mock)
- ❌ Open File (real filesystem)
- ❌ Create/Rename/Delete File
- ❌ Create Folder
- ❌ Drag & Drop
- ❌ Context Menu
- ❌ Open Editors list

### Search
- ✅ Search Panel UI
- ❌ Search in Files
- ❌ Replace in Files
- ❌ Include/Exclude filters

### Source Control (Git)
- ✅ Git Panel UI (mock)
- ✅ Stage/Unstage (mock)
- ✅ Commit UI (mock)
- ❌ Real Git integration
- ❌ Push/Pull/Fetch
- ❌ Branches
- ❌ Diff View
- ❌ Blame/History
- ❌ Gutter indicators

### Extensions
- ✅ Marketplace (60+ extensions)
- ✅ Search, Categories, Ratings
- ✅ Install/Uninstall (mock)
- ❌ Enable/Disable
- ❌ Extension settings

---

## 4. BOTTOM PANEL

### Terminal
- 🔄 Basic mock terminal
- ❌ Real shell (Tauri)
- ❌ Multiple terminals
- ❌ Split terminal
- ❌ Shell selection

### Problems/Output/Debug
- ✅ Panel UI ready
- ❌ Real error list
- ❌ Debugger integration

---

## 5. FILE & COMMANDS

- ✅ New File (Ctrl+N)
- ✅ Command Palette (Ctrl+Shift+P)
- ❌ Open File (Ctrl+O)
- ❌ Open Folder
- ❌ Save (Ctrl+S)
- ❌ Save As
- ❌ Recent Files/Folders
- ❌ Workspaces
- ❌ Quick Open (Ctrl+P)
- ❌ Custom Keybindings

---

## 6. SETTINGS
- ✅ Settings UI Panel
- ✅ localStorage persistence
- ✅ Theme switching
- ✅ Editor settings (font, size, minimap, etc)
- 🔄 Search settings (UI only)
- ❌ Settings JSON editor
- ❌ Per-language settings
- ❌ Settings Sync

---

## PRIORITY IMPLEMENTATION

### Phase 1: Core Usability (NEXT)
1. Open File/Folder (Tauri)
2. Save File (Ctrl+S)
3. Quick Open (Ctrl+P)
4. Go to Line (Ctrl+G)
5. Real Terminal
6. Multi-cursor
7. Split Editor

### Phase 2: Enhanced Editing
8. Go to Definition
9. Toggle Comment
10. Duplicate/Move Line
11. Format Document
12. Snippets

### Phase 3: Project Features
13. Search in Files
14. Real Git integration
15. File operations (create/rename/delete)
16. Context menus

### Phase 4: Advanced
17. Debugger
18. LSP Support
19. Diff Editor
20. Zen Mode

- ❌ Reorder tabs (drag)
- ❌ Pin Tab
- ❌ Split Editor (Ctrl+\)
- ❌ Grid Layout
- ❌ Close All/Others

### Themes
- ✅ 15 Color Themes
- ✅ Font Customization
- ❌ Icon Themes
- ❌ Font Ligatures
- ❌ UI Zoom
