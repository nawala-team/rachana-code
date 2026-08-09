import { useState, useCallback, useEffect, useRef } from 'react';
import TitleBar from '../TitleBar/TitleBar';
import ActivityBar from '../Sidebar/ActivityBar';
import Sidebar from '../Sidebar/Sidebar';
import EditorArea from '../Editor/EditorArea';
import StatusBar from '../StatusBar/StatusBar';
import CommandPalette from '../CommandPalette/CommandPalette';
import BottomPanel from '../BottomPanel/BottomPanel';
import KeyboardShortcuts from '../Editor/KeyboardShortcuts';
import AboutModal from '../AboutModal/AboutModal';
import Resizer from './Resizer';
import { useSettings } from '../../context/SettingsContext';
import { useEditor } from '../../context/EditorContext';
import '../../types/electron.d.ts';
import './AppLayout.css';

export type SidebarView = 'explorer' | 'search' | 'git' | 'extensions' | 'settings' | 'ai' | 'database' | 'debug';

export default function AppLayout() {
  const { settings } = useSettings();
  const { openFile, saveActiveFile } = useEditor();
  const [sidebarView, setSidebarView] = useState<SidebarView>('explorer');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [panelHeight, setPanelHeight] = useState(200);
  const [panelVisible, setPanelVisible] = useState(true);

  const handleNewFile = useCallback(() => {
    const id = Date.now();
    openFile(`untitled-${id}`, `Untitled-${id}`, '');
  }, [openFile]);

  const handleOpenFolder = useCallback(async () => {
    if (window.electronAPI) {
      await window.electronAPI.openFolder();
    }
  }, []);

  // Listen for menu events from Electron
  const saveActiveFileRef = useRef(saveActiveFile);
  const handleNewFileRef = useRef(handleNewFile);
  const handleOpenFolderRef = useRef(handleOpenFolder);
  
  useEffect(() => {
    saveActiveFileRef.current = saveActiveFile;
    handleNewFileRef.current = handleNewFile;
    handleOpenFolderRef.current = handleOpenFolder;
  });

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onMenuSave(() => {
        saveActiveFileRef.current();
      });
      window.electronAPI.onMenuNewFile(() => {
        handleNewFileRef.current();
      });
      window.electronAPI.onMenuOpen(() => {
        handleOpenFolderRef.current();
      });
    }
  }, []);

  const handleActivityClick = (view: SidebarView) => {
    if (sidebarView === view && sidebarVisible) {
      setSidebarVisible(false);
    } else {
      setSidebarView(view);
      setSidebarVisible(true);
    }
  };

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(prev => Math.max(180, Math.min(600, prev + delta)));
  }, []);

  const handlePanelResize = useCallback((delta: number) => {
    setPanelHeight(prev => Math.max(100, Math.min(500, prev - delta)));
  }, []);

  const handleCommand = (cmd: string) => {
    switch (cmd) {
      case 'commandPalette': setCommandPaletteOpen(true); break;
      case 'toggleSidebar': setSidebarVisible(!sidebarVisible); break;
      case 'togglePanel': setPanelVisible(!panelVisible); break;
      case 'viewExplorer': setSidebarView('explorer'); setSidebarVisible(true); break;
      case 'viewSearch': setSidebarView('search'); setSidebarVisible(true); break;
      case 'viewGit': setSidebarView('git'); setSidebarVisible(true); break;
      case 'viewExtensions': setSidebarView('extensions'); setSidebarVisible(true); break;
      case 'settings': setSidebarView('settings'); setSidebarVisible(true); break;
      case 'viewTerminal': setPanelVisible(true); break;
      case 'keyboardShortcuts': setShortcutsOpen(true); break;
      case 'about': setAboutOpen(true); break;
      case 'newFile': handleNewFile(); break;
      case 'openFolder': handleOpenFolder(); break;
      case 'save': saveActiveFile(); break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
      e.preventDefault(); setCommandPaletteOpen(true);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
      e.preventDefault(); setSidebarView('search'); setSidebarVisible(true);
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault(); setSidebarVisible(!sidebarVisible);
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
      e.preventDefault(); setPanelVisible(!panelVisible);
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault(); saveActiveFile();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
      e.preventDefault(); handleNewFile();
    }
    if (e.key === 'Escape') setCommandPaletteOpen(false);
  };

  const isRight = settings.sidebarPosition === 'right';

  return (
    <div className={`app-layout ${isRight ? 'sidebar-right' : ''}`} onKeyDown={handleKeyDown} tabIndex={-1}>
      <TitleBar onCommand={handleCommand} />
      <div className="app-body">
        {settings.activityBarVisible && <ActivityBar activeView={sidebarView} onViewChange={handleActivityClick} />}
        {sidebarVisible && (
          <div className="sidebar-container" style={{ width: sidebarWidth }}>
            <Sidebar view={sidebarView} />
            <Resizer direction="horizontal" position="right" onResize={handleSidebarResize} />
          </div>
        )}
        <main className="main-content">
          <EditorArea />
          {panelVisible && (
            <div className="panel-container" style={{ height: panelHeight }}>
              <Resizer direction="vertical" position="top" onResize={handlePanelResize} />
              <BottomPanel />
            </div>
          )}
        </main>
      </div>
      <StatusBar />
      {commandPaletteOpen && <CommandPalette onClose={() => setCommandPaletteOpen(false)} />}
      {shortcutsOpen && <KeyboardShortcuts onClose={() => setShortcutsOpen(false)} />}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </div>
  );
}

