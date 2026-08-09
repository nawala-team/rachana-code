import { useState } from 'react';
import type { SidebarView } from '../Layout/AppLayout';
import FileExplorer from './FileExplorer';
import SearchPanel from './SearchPanel';
import ExtensionsPanel from './ExtensionsPanel';
import GitPanel from './GitPanel';
import SettingsPanel from './SettingsPanel';
import AIAssistantPanel from './AIAssistantPanel';
import DatabasePanel from './DatabasePanel';
import DebugPanel from './DebugPanel';
import { PlusIcon, FolderIcon, RefreshIcon, CollapseIcon, CloseIcon } from '../Icons/Icons';
import './Sidebar.css';

interface SidebarProps {
  view: SidebarView;
}

const viewTitles: Record<SidebarView, string> = {
  explorer: 'EXPLORER',
  search: 'SEARCH',
  git: 'SOURCE CONTROL',
  debug: 'DEBUG',
  extensions: 'EXTENSIONS',
  settings: 'SETTINGS',
  ai: 'AI ASSISTANT',
  database: 'DATABASE',
};

export default function Sidebar({ view }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNewFile = () => {
    const editor = (window as any).rachanaEditor;
    if (editor?.newFile) editor.newFile();
  };

  const handleNewFolder = () => {
    // Placeholder for new folder functionality
    console.log('New folder');
  };

  const handleRefresh = () => {
    // Placeholder for refresh functionality
    console.log('Refresh');
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderContent = () => {
    switch (view) {
      case 'explorer': return <FileExplorer />;
      case 'search': return <SearchPanel />;
      case 'git': return <GitPanel />;
      case 'debug': return <DebugPanel />;
      case 'extensions': return <ExtensionsPanel />;
      case 'settings': return <SettingsPanel />;
      case 'ai': return <AIAssistantPanel />;
      case 'database': return <DatabasePanel />;
      default: return null;
    }
  };

  const renderActions = () => {
    switch (view) {
      case 'explorer':
        return (
          <div className="sidebar-actions">
            <button className="sidebar-action" onClick={handleNewFile} title="New File">
              <PlusIcon size={14} />
            </button>
            <button className="sidebar-action" onClick={handleNewFolder} title="New Folder">
              <FolderIcon size={14} />
            </button>
            <button className="sidebar-action" onClick={handleRefresh} title="Refresh">
              <RefreshIcon size={14} />
            </button>
            <button className="sidebar-action" onClick={handleCollapse} title="Collapse All">
              <CollapseIcon size={14} />
            </button>
          </div>
        );
      case 'search':
        return (
          <div className="sidebar-actions">
            <button className="sidebar-action" title="Clear Search">
              <CloseIcon size={14} />
            </button>
          </div>
        );
      case 'git':
        return (
          <div className="sidebar-actions">
            <button className="sidebar-action" title="Refresh">
              <RefreshIcon size={14} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">{viewTitles[view]}</span>
        {renderActions()}
      </div>
      <div className="sidebar-content">
        {renderContent()}
      </div>
    </aside>
  );
}
