import { useState, useRef, useEffect } from 'react';
import { CloseIcon, MinimizeIcon, MaximizeIcon } from '../Icons/Icons';
import '../../types/electron.d.ts';
import './TitleBar.css';

interface MenuItem { label: string; shortcut?: string; action?: () => void; divider?: boolean; }
interface Menu { label: string; items: MenuItem[]; }
interface TitleBarProps { onCommand: (command: string) => void; }

export default function TitleBar({ onCommand }: TitleBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [controlsHovered, setControlsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.windowClose();
    } else {
      window.close();
    }
  };

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.windowMinimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.windowMaximize();
    }
  };

  const menus: Menu[] = [
    { label: 'File', items: [
      { label: 'New File', action: () => onCommand('newFile') },
      { label: 'Open File...', action: () => onCommand('openFile') },
      { label: 'Open Folder...', action: () => onCommand('openFolder') },
      { divider: true, label: '' },
      { label: 'Save', action: () => onCommand('save') },
      { label: 'Save As...', action: () => onCommand('saveAs') },
      { divider: true, label: '' },
      { label: 'Settings', action: () => onCommand('settings') },
      { label: 'Exit', action: () => onCommand('exit') },
    ]},
    { label: 'Edit', items: [
      { label: 'Undo', action: () => onCommand('undo') },
      { label: 'Redo', action: () => onCommand('redo') },
      { divider: true, label: '' },
      { label: 'Cut', action: () => onCommand('cut') },
      { label: 'Copy', action: () => onCommand('copy') },
      { label: 'Paste', action: () => onCommand('paste') },
      { divider: true, label: '' },
      { label: 'Find', action: () => onCommand('find') },
      { label: 'Replace', action: () => onCommand('replace') },
    ]},
    { label: 'View', items: [
      { label: 'Command Palette', action: () => onCommand('commandPalette') },
      { label: 'Explorer', action: () => onCommand('viewExplorer') },
      { label: 'Search', action: () => onCommand('viewSearch') },
      { label: 'Source Control', action: () => onCommand('viewGit') },
      { label: 'Extensions', action: () => onCommand('viewExtensions') },
      { divider: true, label: '' },
      { label: 'Terminal', action: () => onCommand('viewTerminal') },
      { label: 'Toggle Sidebar', action: () => onCommand('toggleSidebar') },
      { label: 'Toggle Panel', action: () => onCommand('togglePanel') },
    ]},
    { label: 'Go', items: [
      { label: 'Go to File...', action: () => onCommand('quickOpen') },
      { label: 'Go to Line...', action: () => onCommand('goToLine') },
      { label: 'Go to Definition', action: () => onCommand('goToDefinition') },
    ]},
    { label: 'Run', items: [
      { label: 'Start Debugging', action: () => onCommand('startDebugging') },
      { label: 'Stop Debugging', action: () => onCommand('stopDebugging') },
    ]},
    { label: 'Terminal', items: [
      { label: 'New Terminal', action: () => onCommand('newTerminal') },
      { label: 'Run Build Task', action: () => onCommand('runBuildTask') },
    ]},
    { label: 'Help', items: [
      { label: 'Keyboard Shortcuts', action: () => onCommand('keyboardShortcuts') },
      { divider: true, label: '' },
      { label: 'Documentation', action: () => onCommand('documentation') },
      { label: 'Release Notes', action: () => onCommand('releaseNotes') },
      { divider: true, label: '' },
      { label: 'About Rachana Code', action: () => onCommand('about') },
    ]},
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="title-bar">
      {/* macOS style traffic lights */}
      <div 
        className="macos-controls"
        onMouseEnter={() => setControlsHovered(true)}
        onMouseLeave={() => setControlsHovered(false)}
      >
        <button className="traffic-light close" onClick={handleClose} title="Close">
          {controlsHovered && <CloseIcon size={8} />}
        </button>
        <button className="traffic-light minimize" onClick={handleMinimize} title="Minimize">
          {controlsHovered && <MinimizeIcon size={8} />}
        </button>
        <button className="traffic-light maximize" onClick={handleMaximize} title="Maximize">
          {controlsHovered && <MaximizeIcon size={8} />}
        </button>
      </div>

      <div className="menu-bar" ref={menuRef}>
        {menus.map((menu) => (
          <div key={menu.label} className="menu-item-wrapper">
            <button className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}>{menu.label}</button>
            {activeMenu === menu.label && (
              <div className="menu-dropdown">
                {menu.items.map((item, idx) => item.divider ? <div key={idx} className="menu-divider" /> : (
                  <div key={idx} className="menu-dropdown-item" onClick={() => { item.action?.(); setActiveMenu(null); }}>
                    <span className="menu-item-label">{item.label}</span>
                    {item.shortcut && <span className="menu-item-shortcut">{item.shortcut}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="title-bar-title">Rachana Code</div>
      <div className="title-bar-spacer"></div>
    </div>
  );
}
