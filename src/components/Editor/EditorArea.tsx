import { useState, useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import type { OnMount, OnChange } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { useSettings } from '../../context/SettingsContext';
import { useEditor } from '../../context/EditorContext';
import Breadcrumbs from './Breadcrumbs';
import FindReplace from './FindReplace';
import GoToLine from './GoToLine';
import QuickOpen from './QuickOpen';
import ContextMenu from './ContextMenu';
import KeyboardShortcuts from './KeyboardShortcuts';
import { registerSnippets } from '../../data/snippets';
import { analyzeCode, issuesToMarkers, getIssueStats } from '../../data/codeAnalyzer';
import { registerAutoComplete } from '../../data/autoComplete';
import { runCode } from '../../lib/codeRunner';
import { addOutput } from '../BottomPanel/OutputPanel';
import {
  TypeScriptIcon, JavaScriptIcon, ReactIcon, PythonIcon, CssIcon, HtmlIcon, JsonIcon, MarkdownIcon, ShellIcon, ConfigIcon, FileIcon, DockerIcon
} from '../Icons/Icons';
import './EditorArea.css';


export interface Tab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
  isNew?: boolean;
}

export interface EditorState {
  tabs: Tab[];
  activeTabId: string | null;
  cursorLine: number;
  cursorColumn: number;
}

// Start with empty tabs - show welcome screen
const defaultTabs: Tab[] = [];


function getIcon(name: string): React.ReactNode {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const baseName = name.toLowerCase();
  
  // Special files
  if (baseName === 'dockerfile') return <DockerIcon size={14} />;
  if (baseName === 'makefile') return <ConfigIcon size={14} />;
  if (baseName === '.gitignore') return <ConfigIcon size={14} />;
  if (baseName === '.env' || baseName.startsWith('.env.')) return <ConfigIcon size={14} />;
  
  // By extension
  switch (ext) {
    case 'ts':
      return <TypeScriptIcon size={14} />;
    case 'tsx':
      return <ReactIcon size={14} />;
    case 'js':
      return <JavaScriptIcon size={14} />;
    case 'jsx':
      return <ReactIcon size={14} />;
    case 'py':
      return <PythonIcon size={14} />;
    case 'css':
    case 'scss':
    case 'sass':
    case 'less':
      return <CssIcon size={14} />;
    case 'html':
      return <HtmlIcon size={14} />;
    case 'json':
      return <JsonIcon size={14} />;
    case 'md':
      return <MarkdownIcon size={14} />;
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'fish':
    case 'ps1':
    case 'bat':
    case 'cmd':
      return <ShellIcon size={14} />;
    case 'yml':
    case 'yaml':
    case 'toml':
    case 'ini':
    case 'conf':
    case 'cfg':
    case 'config':
      return <ConfigIcon size={14} />;
    default:
      return <FileIcon size={14} />;
  }
}

let fileCounter = 4;

type SplitDirection = 'none' | 'vertical' | 'horizontal';

export default function EditorArea() {
  const { settings, theme } = useSettings();
  const { openFiles, activeFileId, closeFile, updateFileContent, openFolder, pinFile } = useEditor();
  
  // Local tabs for default welcome files + context files
  const [localTabs, setLocalTabs] = useState<Tab[]>(defaultTabs);
  const [activeTabId, setActiveTabId] = useState<string | null>('1');
  const [splitTabId, setSplitTabId] = useState<string | null>(null);
  const [splitDirection, setSplitDirection] = useState<SplitDirection>('none');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [showFind, setShowFind] = useState(false);
  const [showGoTo, setShowGoTo] = useState(false);
  const [showQuickOpen, setShowQuickOpen] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; tabId: string } | null>(null);
  const [zenMode, setZenMode] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [lintStats, setLintStats] = useState({ errors: 0, warnings: 0, info: 0 });
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const snippetsRegistered = useRef(false);

  // Merge local tabs with context files
  const tabs: (Tab & { isPinned?: boolean })[] = [
    ...localTabs.map(t => ({ ...t, isPinned: true })), // local tabs always pinned
    ...openFiles.map(f => ({
      id: f.id,
      name: f.name,
      content: f.content,
      language: f.language,
      modified: f.modified,
      isPinned: f.isPinned,
    }))
  ];

  // Sync active tab with context
  useEffect(() => {
    if (activeFileId && !activeTabId?.startsWith('file-')) {
      setActiveTabId(activeFileId);
    }
  }, [activeFileId, activeTabId]);

  const activeTab = tabs.find(t => t.id === activeTabId);

  const newFile = useCallback(() => {
    const id = String(fileCounter++);
    const tab: Tab = { id, name: `Untitled-${id}`, content: '', language: 'plaintext', modified: false, isNew: true };
    setLocalTabs(prev => [...prev, tab]);
    setActiveTabId(id);
  }, []);

  const handleRunCode = useCallback(async () => {
    const tab = activeTab;
    if (!tab) {
      addOutput({ type: 'warning', message: 'No file is open to run.' });
      return;
    }
    
    addOutput({ 
      type: 'info', 
      message: `▶ Running ${tab.name}...`,
      language: tab.language 
    });

    const result = await runCode(tab.content, tab.language, tab.name);
    
    if (result.success) {
      addOutput({
        type: 'success',
        message: result.output || '(No output)',
        language: tab.language,
        executionTime: result.executionTime,
      });
    } else {
      addOutput({
        type: 'error',
        message: result.error || 'Unknown error occurred',
        language: tab.language,
        executionTime: result.executionTime,
      });
    }
  }, [activeTab]);

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Check if it's a context file (from FileExplorer)
    if (id.startsWith('file-')) {
      closeFile(id);
    } else {
      setLocalTabs(prev => prev.filter(t => t.id !== id));
    }
    if (activeTabId === id) {
      const remaining = tabs.filter(t => t.id !== id);
      setActiveTabId(remaining[0]?.id || null);
    }
  };

  const closeOtherTabs = (id: string) => {
    const tabToKeep = tabs.find(t => t.id === id);
    if (tabToKeep) {
      // Close all context files except this one
      openFiles.forEach(f => { if (f.id !== id) closeFile(f.id); });
      // Close all local tabs except this one
      setLocalTabs(prev => prev.filter(t => t.id === id));
      setActiveTabId(id);
    }
  };

  const closeAllTabs = () => {
    openFiles.forEach(f => closeFile(f.id));
    setLocalTabs([]);
    setActiveTabId(null);
  };

  const closeTabsToRight = (id: string) => {
    const idx = tabs.findIndex(t => t.id === id);
    const tabsToClose = tabs.slice(idx + 1);
    tabsToClose.forEach(t => {
      if (t.id.startsWith('file-')) closeFile(t.id);
      else setLocalTabs(prev => prev.filter(lt => lt.id !== t.id));
    });
    if (!tabs.slice(0, idx + 1).find(t => t.id === activeTabId)) {
      setActiveTabId(id);
    }
  };

  const handleTabContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, tabId });
  };

  const getContextMenuItems = (tabId: string) => [
    { label: 'Close', action: () => closeTab({ stopPropagation: () => {} } as React.MouseEvent, tabId), icon: '✕' },
    { label: 'Close Others', action: () => closeOtherTabs(tabId), icon: '⊖', disabled: tabs.length <= 1 },
    { label: 'Close All', action: closeAllTabs, icon: '⊗' },
    { label: 'Close to the Right', action: () => closeTabsToRight(tabId), icon: '→', disabled: tabs.findIndex(t => t.id === tabId) === tabs.length - 1 },
    { label: '', action: () => {}, divider: true },
    { label: 'Split Right', action: () => { setSplitDirection('vertical'); setSplitTabId(tabId); }, icon: '▯' },
    { label: 'Split Down', action: () => { setSplitDirection('horizontal'); setSplitTabId(tabId); }, icon: '▭' },
  ];

  const saveTab = useCallback(() => {
    if (!activeTabId) return;
    if (activeTabId.startsWith('file-')) {
      // For context files - mark as saved
    } else {
      setLocalTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, modified: false } : t));
    }
  }, [activeTabId]);

  const setLanguage = useCallback((lang: string) => {
    if (!activeTabId) return;
    // Update tab state
    setLocalTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, language: lang } : t));
    // Also update Monaco editor model language
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, lang);
      }
    }
  }, [activeTabId]);

  // Run code linter (SonarLint-like)
  const runLint = useCallback((editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    const model = editor.getModel();
    if (!model) return;
    
    const code = model.getValue();
    const language = model.getLanguageId();
    const issues = analyzeCode(code, language);
    const markers = issuesToMarkers(issues);
    
    monaco.editor.setModelMarkers(model, 'rachana-lint', markers);
    setLintStats(getIssueStats(issues));
  }, []);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Store monaco globally for theme switching
    // @ts-expect-error Setting global monaco reference
    window.monaco = monaco;
    
    // Register snippets only once
    if (!snippetsRegistered.current) {
      registerSnippets(monaco);
      // Register autocomplete for all supported languages
      registerAutoComplete(monaco);
      snippetsRegistered.current = true;
    }
    
    // Run initial lint
    runLint(editor, monaco);
    
    // Define dark theme
    monaco.editor.defineTheme('rachana-dark', {
      base: 'vs-dark', inherit: true,
      rules: [
        { token: 'comment', foreground: '6c7086', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'cba6f7' },
        { token: 'string', foreground: 'a6e3a1' },
      ],
      colors: { 
        'editor.background': '#1e1e2e', 
        'editor.lineHighlightBackground': '#313244',
        'editor.selectionBackground': '#45475a',
        'editorCursor.foreground': '#22d3ee',
      },
    });
    
    // Define light theme
    monaco.editor.defineTheme('rachana-light', {
      base: 'vs', inherit: true,
      rules: [
        { token: 'comment', foreground: '7c7f93', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7e22ce' },
        { token: 'string', foreground: '40a02b' },
      ],
      colors: { 
        'editor.background': '#eff1f5', 
        'editor.lineHighlightBackground': '#e6e9ef',
        'editor.selectionBackground': '#acb0be',
        'editorCursor.foreground': '#7e22ce',
      },
    });
    
    // Set theme based on current setting
    const currentTheme = document.documentElement.getAttribute('data-theme');
    monaco.editor.setTheme(currentTheme === 'light' ? 'rachana-light' : 'rachana-dark');
    editor.onDidChangeCursorPosition((e) => setCursorPos({ line: e.position.lineNumber, col: e.position.column }));
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, saveTab);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, newFile);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => setShowFind(true));
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => setShowGoTo(true));
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => setShowQuickOpen(true));
    // Keyboard shortcuts help: Ctrl+Shift+?
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Slash, () => {
      setShowKeyboardShortcuts(true);
    });
    // Duplicate line: Ctrl+Shift+D
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD, () => {
      editor.trigger('keyboard', 'editor.action.copyLinesDownAction', null);
    });
    // Add selection to next find match: Ctrl+D (like Sublime)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
      editor.trigger('keyboard', 'editor.action.addSelectionToNextFindMatch', null);
    });
    // Undo last cursor operation: Ctrl+U (undo Ctrl+D selection)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU, () => {
      editor.trigger('keyboard', 'cursorUndo', null);
    });
    // Delete entire line: Ctrl+Shift+K
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyK, () => {
      editor.trigger('keyboard', 'editor.action.deleteLines', null);
    });
    // Toggle comment: Ctrl+/
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
      editor.trigger('keyboard', 'editor.action.commentLine', null);
    });
    // Move line up: Alt+Up
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.UpArrow, () => {
      editor.trigger('keyboard', 'editor.action.moveLinesUpAction', null);
    });
    // Move line down: Alt+Down
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.DownArrow, () => {
      editor.trigger('keyboard', 'editor.action.moveLinesDownAction', null);
    });
    // Copy line up: Alt+Shift+Up
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow, () => {
      editor.trigger('keyboard', 'editor.action.copyLinesUpAction', null);
    });
    // Copy line down: Alt+Shift+Down
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow, () => {
      editor.trigger('keyboard', 'editor.action.copyLinesDownAction', null);
    });
    // Select all occurrences: Ctrl+Shift+L
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyL, () => {
      editor.trigger('keyboard', 'editor.action.selectHighlights', null);
    });
    // Add cursor above: Ctrl+Alt+Up
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.UpArrow, () => {
      editor.trigger('keyboard', 'editor.action.insertCursorAbove', null);
    });
    // Add cursor below: Ctrl+Alt+Down
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.DownArrow, () => {
      editor.trigger('keyboard', 'editor.action.insertCursorBelow', null);
    });
    // Split editor: Ctrl+\
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Backslash, () => {
      toggleSplit('vertical');
    });
    // Run code: F5
    editor.addCommand(monaco.KeyCode.F5, () => {
      handleRunCode();
    });
    // Zen mode: Ctrl+K Z
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      // Wait for Z key
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'z' || e.key === 'Z') {
          setZenMode(z => !z);
          window.removeEventListener('keydown', handler);
        }
      };
      window.addEventListener('keydown', handler);
      setTimeout(() => window.removeEventListener('keydown', handler), 1000);
    });
    // Escape exits zen mode
    editor.addCommand(monaco.KeyCode.Escape, () => {
      if (zenMode) setZenMode(false);
      setShowFind(false);
      setShowGoTo(false);
      setShowQuickOpen(false);
      setShowKeyboardShortcuts(false);
    });
    editor.focus();
  };

  const toggleSplit = (direction: SplitDirection) => {
    if (splitDirection === direction) {
      setSplitDirection('none');
      setSplitTabId(null);
    } else {
      setSplitDirection(direction);
      // Default: split with same file or next tab
      if (!splitTabId && tabs.length > 1) {
        const currentIdx = tabs.findIndex(t => t.id === activeTabId);
        const nextTab = tabs[(currentIdx + 1) % tabs.length];
        setSplitTabId(nextTab.id);
      } else if (!splitTabId) {
        setSplitTabId(activeTabId);
      }
    }
  };

  const goToLine = (line: number) => {
    if (!editorRef.current) return;
    editorRef.current.setPosition({ lineNumber: line, column: 1 });
    editorRef.current.revealLineInCenter(line);
    editorRef.current.focus();
  };

  const getMaxLine = () => {
    if (!editorRef.current) return 1;
    return editorRef.current.getModel()?.getLineCount() || 1;
  };

  const quickOpenFiles = tabs.map(t => ({
    id: t.id,
    name: t.name,
    path: `src/${t.name}`,
    icon: getIcon(t.name),
  }));

  const handleQuickSelect = (file: { id: string }) => {
    setActiveTabId(file.id);
  };

  const handleFind = (text: string) => {
    if (!editorRef.current || !text) { setMatchCount(0); return; }
    const model = editorRef.current.getModel();
    if (!model) return;
    const matches = model.findMatches(text, true, false, false, null, true);
    setMatchCount(matches.length);
  };

  const handleReplace = (find: string, replace: string) => {
    if (!editorRef.current || !find) return;
    const model = editorRef.current.getModel();
    if (!model) return;
    const matches = model.findMatches(find, true, false, false, null, true);
    if (matches.length > 0) {
      editorRef.current.executeEdits('replace', [{ range: matches[0].range, text: replace }]);
    }
  };

  const handleReplaceAll = (find: string, replace: string) => {
    if (!editorRef.current || !find) return;
    const model = editorRef.current.getModel();
    if (!model) return;
    const matches = model.findMatches(find, true, false, false, null, true);
    const edits = matches.map(m => ({ range: m.range, text: replace }));
    editorRef.current.executeEdits('replace-all', edits);
    setMatchCount(0);
  };

  const handleChange: OnChange = (value) => {
    if (!value || !activeTabId) return;
    // Check if it's a context file
    if (activeTabId.startsWith('file-')) {
      updateFileContent(activeTabId, value);
    } else {
      setLocalTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, content: value, modified: true } : t));
    }
    // Run linter on change (debounced by Monaco internally)
    if (editorRef.current && monacoRef.current) {
      runLint(editorRef.current, monacoRef.current);
    }
  };

  // Expose to window for StatusBar
  (window as any).rachanaEditor = { newFile, saveTab, setLanguage, cursorPos, activeTab, lintStats };

  if (!tabs.length) return (
    <div className="editor-area">
      <div className="welcome-screen">
        <div className="welcome-logo">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="m10 13-2 2 2 2"/>
            <path d="m14 17 2-2-2-2"/>
          </svg>
        </div>
        <div className="welcome-title">Rachana Code</div>
        <div className="welcome-subtitle">Lightweight code editor by NAWALA Team</div>
        <div className="welcome-actions">
          <button className="welcome-btn" onClick={newFile}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            New File
            <span className="shortcut">Ctrl+N</span>
          </button>
          <button className="welcome-btn" onClick={openFolder}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              <line x1="12" y1="11" x2="12" y2="17"/>
              <line x1="9" y1="14" x2="15" y2="14"/>
            </svg>
            Open Folder
            <span className="shortcut">Ctrl+O</span>
          </button>
        </div>
        <div className="welcome-shortcuts">
          <div className="shortcut-item"><kbd>Ctrl+Shift+P</kbd> Command Palette</div>
          <div className="shortcut-item"><kbd>Ctrl+P</kbd> Quick Open</div>
          <div className="shortcut-item"><kbd>Ctrl+`</kbd> Toggle Terminal</div>
        </div>
      </div>
    </div>
  );

  if (zenMode) {
    return (
      <div className="editor-area zen-mode" onClick={() => setZenMode(false)}>
        <div className="zen-editor" onClick={e => e.stopPropagation()}>
          <Editor
            height="100%"
            language={activeTab?.language}
            value={activeTab?.content}
            theme={theme.type === 'dark' ? 'vs-dark' : 'vs'}
            onChange={handleChange}
            options={{
              fontFamily: settings.fontFamily,
              fontSize: settings.fontSize + 2,
              tabSize: settings.tabSize,
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'off',
              smoothScrolling: true,
              padding: { top: 40 },
              automaticLayout: true,
              folding: false,
              glyphMargin: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
            }}
          />
        </div>
        <div className="zen-hint">Press Escape to exit Zen Mode</div>
      </div>
    );
  }

  return (
    <div className="editor-area">
      <div className="tab-bar">
        <div className="tabs-container" onDoubleClick={(e) => {
          // Only create new file if double-click is on empty space (not on a tab)
          if ((e.target as HTMLElement).classList.contains('tabs-container')) {
            newFile();
          }
        }}>
          {tabs.map(tab => (
            <button key={tab.id} className={`tab ${activeTabId === tab.id ? 'active' : ''} ${!tab.isPinned ? 'preview' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              onDoubleClick={() => {
                // Pin the tab on double-click
                if (tab.id.startsWith('file-') && !tab.isPinned) {
                  pinFile(tab.id);
                }
              }}
              onContextMenu={(e) => handleTabContextMenu(e, tab.id)}>
              <span className="tab-icon">{getIcon(tab.name)}</span>
              <span className={`tab-name ${!tab.isPinned ? 'italic' : ''}`}>{tab.name}</span>
              {tab.modified && <span className="modified-dot">●</span>}
              <span className="tab-close" onClick={(e) => closeTab(e, tab.id)}>×</span>
            </button>
          ))}
        </div>
        <button className="new-tab-btn" onClick={newFile} title="New File (Ctrl+N)">+</button>
        <button className="run-btn" onClick={handleRunCode} title="Run Code (F5)">▶ Run</button>
      </div>
      {settings.breadcrumbs && activeTab && (
        <Breadcrumbs path={`src/${activeTab.name}`} />
      )}
      {showFind && (
        <FindReplace
          onFind={handleFind}
          onReplace={handleReplace}
          onReplaceAll={handleReplaceAll}
          onClose={() => setShowFind(false)}
          matchCount={matchCount}
        />
      )}
      <div className={`editor-content ${splitDirection !== 'none' ? `split-${splitDirection}` : ''}`}>
        <div className="editor-pane primary">
          <Editor
            height="100%"
            language={activeTab?.language}
            value={activeTab?.content}
            theme={theme.type === 'dark' ? 'vs-dark' : 'vs'}
            onMount={handleMount}
            onChange={handleChange}
            options={{
              fontFamily: settings.fontFamily,
              fontSize: settings.fontSize,
              tabSize: settings.tabSize,
              minimap: { 
                enabled: settings.minimap,
                scale: 1,
                showSlider: 'mouseover',
                renderCharacters: false,
                maxColumn: 120,
              },
              wordWrap: settings.wordWrap ? 'on' : 'off',
              lineNumbers: settings.lineNumbers ? 'on' : 'off',
              smoothScrolling: true,
              padding: { top: 16 },
              automaticLayout: true,
              bracketPairColorization: { enabled: true },
              // Sticky scroll - shows scope context at top
              stickyScroll: { enabled: true, maxLineCount: 5 },
              // Multi-cursor settings
              multiCursorModifier: 'alt',
              multiCursorMergeOverlapping: true,
              // Additional enhancements
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              renderWhitespace: 'selection',
              guides: {
                indentation: true,
                bracketPairs: true,
              },
              suggest: {
                snippetsPreventQuickSuggestions: false,
                showSnippets: true,
              },
            }}
          />
        </div>
        {splitDirection !== 'none' && splitTabId && (
          <div className="editor-pane secondary">
            <div className="split-tab-header">
              <span className="tab-icon">{getIcon(tabs.find(t => t.id === splitTabId)?.name || '')}</span>
              <span className="tab-name">{tabs.find(t => t.id === splitTabId)?.name}</span>
              <select 
                className="split-file-select"
                value={splitTabId} 
                onChange={(e) => setSplitTabId(e.target.value)}
              >
                {tabs.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <button className="split-close" onClick={() => { setSplitDirection('none'); setSplitTabId(null); }}>×</button>
            </div>
            <Editor
              height="100%"
              language={tabs.find(t => t.id === splitTabId)?.language}
              value={tabs.find(t => t.id === splitTabId)?.content}
              theme={theme.type === 'dark' ? 'vs-dark' : 'vs'}
              onChange={(value) => {
                if (!value || !splitTabId) return;
                if (splitTabId.startsWith('file-')) {
                  updateFileContent(splitTabId, value);
                } else {
                  setLocalTabs(prev => prev.map(t => t.id === splitTabId ? { ...t, content: value, modified: true } : t));
                }
              }}
              options={{
                fontFamily: settings.fontFamily,
                fontSize: settings.fontSize,
                tabSize: settings.tabSize,
                minimap: { enabled: false },
                wordWrap: settings.wordWrap ? 'on' : 'off',
                lineNumbers: settings.lineNumbers ? 'on' : 'off',
                smoothScrolling: true,
                padding: { top: 8 },
                automaticLayout: true,
              }}
            />
          </div>
        )}
      </div>
      {showGoTo && (
        <GoToLine
          onGo={goToLine}
          onClose={() => setShowGoTo(false)}
          maxLine={getMaxLine()}
          currentLine={cursorPos.line}
        />
      )}
      {showQuickOpen && (
        <QuickOpen
          files={quickOpenFiles}
          onSelect={handleQuickSelect}
          onClose={() => setShowQuickOpen(false)}
        />
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={getContextMenuItems(contextMenu.tabId)}
          onClose={() => setContextMenu(null)}
        />
      )}
      {showKeyboardShortcuts && (
        <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
      )}
    </div>
  );
}

