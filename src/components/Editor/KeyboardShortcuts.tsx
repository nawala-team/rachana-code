import { useEffect, useRef } from 'react';
import { KeyboardIcon, LightbulbIcon } from '../Icons/Icons';
import './KeyboardShortcuts.css';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string; description: string }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'General',
    shortcuts: [
      { keys: 'Ctrl+N', description: 'New File' },
      { keys: 'Ctrl+S', description: 'Save File' },
      { keys: 'Ctrl+Shift+P', description: 'Command Palette' },
      { keys: 'Ctrl+P', description: 'Quick Open File' },
      { keys: 'Ctrl+K Z', description: 'Toggle Zen Mode' },
      { keys: 'Escape', description: 'Exit Zen Mode / Close Dialog' },
    ],
  },
  {
    title: 'Editing',
    shortcuts: [
      { keys: 'Ctrl+C', description: 'Copy' },
      { keys: 'Ctrl+X', description: 'Cut' },
      { keys: 'Ctrl+V', description: 'Paste' },
      { keys: 'Ctrl+Z', description: 'Undo' },
      { keys: 'Ctrl+Shift+Z', description: 'Redo' },
      { keys: 'Ctrl+/', description: 'Toggle Line Comment' },
      { keys: 'Ctrl+Shift+D', description: 'Duplicate Line' },
      { keys: 'Alt+↑/↓', description: 'Move Line Up/Down' },
      { keys: 'Ctrl+Shift+K', description: 'Delete Line' },
      { keys: 'Ctrl+Enter', description: 'Insert Line Below' },
      { keys: 'Ctrl+Shift+Enter', description: 'Insert Line Above' },
    ],
  },
  {
    title: 'Multi-Cursor & Selection',
    shortcuts: [
      { keys: 'Alt+Click', description: 'Add Cursor' },
      { keys: 'Ctrl+Alt+↑/↓', description: 'Add Cursor Above/Below' },
      { keys: 'Ctrl+D', description: 'Select Next Occurrence' },
      { keys: 'Ctrl+Shift+L', description: 'Select All Occurrences' },
      { keys: 'Ctrl+L', description: 'Select Current Line' },
      { keys: 'Ctrl+A', description: 'Select All' },
      { keys: 'Shift+Alt+→', description: 'Expand Selection' },
      { keys: 'Shift+Alt+←', description: 'Shrink Selection' },
    ],
  },
  {
    title: 'Navigation',
    shortcuts: [
      { keys: 'Ctrl+G', description: 'Go to Line' },
      { keys: 'Ctrl+F', description: 'Find' },
      { keys: 'Ctrl+H', description: 'Find and Replace' },
      { keys: 'F3 / Shift+F3', description: 'Find Next/Previous' },
      { keys: 'Ctrl+Home', description: 'Go to Beginning' },
      { keys: 'Ctrl+End', description: 'Go to End' },
      { keys: 'Ctrl+←/→', description: 'Move by Word' },
      { keys: 'Ctrl+Shift+\\', description: 'Jump to Matching Bracket' },
    ],
  },
  {
    title: 'View',
    shortcuts: [
      { keys: 'Ctrl+\\', description: 'Split Editor' },
      { keys: 'Ctrl++/-', description: 'Zoom In/Out' },
      { keys: 'Ctrl+0', description: 'Reset Zoom' },
      { keys: 'Ctrl+B', description: 'Toggle Sidebar' },
      { keys: 'Ctrl+J', description: 'Toggle Bottom Panel' },
      { keys: 'Ctrl+Shift+F', description: 'Global Search' },
      { keys: 'Ctrl+`', description: 'Toggle Terminal' },
    ],
  },
  {
    title: 'Snippets',
    shortcuts: [
      { keys: 'log', description: 'console.log()' },
      { keys: 'func', description: 'Function declaration' },
      { keys: 'afunc', description: 'Async function' },
      { keys: 'usestate', description: 'React useState hook' },
      { keys: 'useeffect', description: 'React useEffect hook' },
      { keys: 'try', description: 'Try-catch block' },
      { keys: 'forloop', description: 'For loop' },
      { keys: 'map', description: 'Array map' },
    ],
  },
];

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="keyboard-shortcuts-overlay">
      <div className="keyboard-shortcuts-modal" ref={modalRef}>
        <div className="keyboard-shortcuts-header">
          <h2><KeyboardIcon size={18} /> Keyboard Shortcuts</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="keyboard-shortcuts-content">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="shortcut-group">
              <h3>{group.title}</h3>
              <div className="shortcut-list">
                {group.shortcuts.map((shortcut) => (
                  <div key={shortcut.keys} className="shortcut-item">
                    <kbd className="shortcut-keys">{shortcut.keys}</kbd>
                    <span className="shortcut-description">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="keyboard-shortcuts-footer">
          <span className="tip"><LightbulbIcon size={14} /> Tip: Type snippet prefixes and press Tab to expand</span>
        </div>
      </div>
    </div>
  );
}
