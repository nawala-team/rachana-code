# Rachana Code - Feature Checklist

## Legend: [x] Done | [~] Partial | [ ] Not Started

## CURRENT STATUS: ~35/150 features (23%)

---

## 1. EDITOR CORE

### Basic Editing
- [x] Syntax Highlighting (80+ languages)
- [x] Find & Replace (Ctrl+F)
- [x] Word Wrap, Line Numbers, Minimap
- [x] Bracket Matching, Auto Indent, Code Folding
- [x] Undo/Redo, Cut/Copy/Paste
- [ ] Multi-cursor (Alt+Click)
- [ ] Column Selection (Alt+Shift+Drag)
- [ ] Duplicate Line (Ctrl+Shift+D)
- [ ] Move Line Up/Down (Alt+↑↓)
- [ ] Toggle Comment (Ctrl+/)
- [ ] Emmet

### Code Intelligence
- [~] Auto Complete (basic Monaco)
- [ ] IntelliSense / LSP
- [ ] Go to Definition (F12)
- [ ] Go to References
- [ ] Peek Definition
- [ ] Rename Symbol (F2)
- [ ] Format Document
- [ ] Snippets

### Navigation
- [x] Breadcrumbs
- [ ] Go to Line (Ctrl+G)
- [ ] Go to File (Ctrl+P)
- [ ] Go to Symbol (Ctrl+Shift+O)
- [ ] Outline View
- [ ] Back/Forward navigation

---

## 2. USER INTERFACE

### Layout
- [x] Activity Bar
- [x] Primary Sidebar
- [x] Bottom Panel
- [x] Status Bar
- [x] Sidebar Left/Right
- [ ] Secondary Sidebar
- [ ] Zen Mode (Ctrl+K Z)
- [ ] Panel Position (bottom/left/right)

### Tabs & Editors
- [x] Editor Tabs with icons
- [x] Modified indicator, Close tab

---

## 3. SIDEBAR PANELS

### File Explorer
- [x] Tree View (mock)
- [ ] Open File (real filesystem)
- [ ] Create/Rename/Delete File
- [ ] Create Folder
- [ ] Drag & Drop
- [ ] Context Menu
- [ ] Open Editors list

### Search
- [x] Search Panel UI
- [ ] Search in Files
- [ ] Replace in Files
- [ ] Include/Exclude filters

### Source Control (Git)
- [x] Git Panel UI (mock)
- [x] Stage/Unstage (mock)
- [x] Commit UI (mock)
- [ ] Real Git integration
- [ ] Push/Pull/Fetch
- [ ] Branches
- [ ] Diff View
- [ ] Blame/History
- [ ] Gutter indicators

### Extensions
- [x] Marketplace (60+ extensions)
- [x] Search, Categories, Ratings
- [x] Install/Uninstall (mock)
- [ ] Enable/Disable
- [ ] Extension settings

---

## 4. BOTTOM PANEL

### Terminal
- [~] Basic mock terminal
- [ ] Real shell (Tauri)
- [ ] Multiple terminals
- [ ] Split terminal
- [ ] Shell selection

### Problems/Output/Debug
- [x] Panel UI ready
- [ ] Real error list
- [ ] Debugger integration

---

## 5. FILE & COMMANDS

- [x] New File (Ctrl+N)
- [x] Command Palette (Ctrl+Shift+P)
- [ ] Open File (Ctrl+O)
- [ ] Open Folder
- [ ] Save (Ctrl+S)
- [ ] Save As
- [ ] Recent Files/Folders
- [ ] Workspaces
- [ ] Quick Open (Ctrl+P)
- [ ] Custom Keybindings

---

## 6. SETTINGS
- [x] Settings UI Panel
- [x] localStorage persistence
- [x] Theme switching
- [x] Editor settings (font, size, minimap, etc)
- [~] Search settings (UI only)
- [ ] Settings JSON editor
- [ ] Per-language settings
- [ ] Settings Sync

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

- [ ] Reorder tabs (drag)
- [ ] Pin Tab
- [ ] Split Editor (Ctrl+\)
- [ ] Grid Layout
- [ ] Close All/Others

### Themes
- [x] 15 Color Themes
- [x] Font Customization
- [ ] Icon Themes
- [ ] Font Ligatures
- [ ] UI Zoom
