import { useState, useEffect, useRef } from 'react';
import { NewFileIcon, FolderOpenIcon, SaveIcon, SearchIcon, ReplaceIcon, SidebarIcon, TerminalIcon, SettingsIcon, MoonIcon, SunIcon } from '../Icons/Icons';
import './CommandPalette.css';

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
}

const commands: Command[] = [
  { id: 'new-file', label: 'New File', icon: <NewFileIcon size={14} />, shortcut: 'Ctrl+N', action: () => console.log('New File') },
  { id: 'open-file', label: 'Open File', icon: <FolderOpenIcon size={14} />, shortcut: 'Ctrl+O', action: () => console.log('Open File') },
  { id: 'save', label: 'Save', icon: <SaveIcon size={14} />, shortcut: 'Ctrl+S', action: () => console.log('Save') },
  { id: 'save-as', label: 'Save As...', icon: <SaveIcon size={14} />, shortcut: 'Ctrl+Shift+S', action: () => console.log('Save As') },
  { id: 'find', label: 'Find', icon: <SearchIcon size={14} />, shortcut: 'Ctrl+F', action: () => console.log('Find') },
  { id: 'replace', label: 'Replace', icon: <ReplaceIcon size={14} />, shortcut: 'Ctrl+H', action: () => console.log('Replace') },
  { id: 'toggle-sidebar', label: 'Toggle Sidebar', icon: <SidebarIcon size={14} />, shortcut: 'Ctrl+B', action: () => console.log('Toggle Sidebar') },
  { id: 'toggle-terminal', label: 'Toggle Terminal', icon: <TerminalIcon size={14} />, shortcut: 'Ctrl+`', action: () => console.log('Toggle Terminal') },
  { id: 'settings', label: 'Open Settings', icon: <SettingsIcon size={14} />, shortcut: 'Ctrl+,', action: () => console.log('Settings') },
  { id: 'theme-dark', label: 'Theme: Rachana Dark', icon: <MoonIcon size={14} />, action: () => document.documentElement.setAttribute('data-theme', 'dark') },
  { id: 'theme-light', label: 'Theme: Rachana Light', icon: <SunIcon size={14} />, action: () => document.documentElement.setAttribute('data-theme', 'light') },
];

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleItemClick = (cmd: Command) => {
    cmd.action();
    onClose();
  };

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="command-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder="Type a command..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="command-list">
          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleItemClick(cmd)}
            >
              <div className="command-item-left">
                <span className="command-icon">{cmd.icon}</span>
                <span className="command-label">{cmd.label}</span>
              </div>
              {cmd.shortcut && (
                <span className="command-shortcut">{cmd.shortcut}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
