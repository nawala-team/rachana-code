import type { SidebarView } from '../Layout/AppLayout';
import { 
  ExplorerIcon, 
  SearchIcon, 
  GitBranchIcon, 
  DebugIcon, 
  ExtensionsIcon, 
  AiIcon, 
  DatabaseIcon, 
  SettingsIcon 
} from '../Icons/Icons';
import './ActivityBar.css';

interface ActivityBarProps {
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

const activities: { id: SidebarView; icon: React.FC<{size?: number; className?: string}>; title: string }[] = [
  { id: 'explorer', icon: ExplorerIcon, title: 'Explorer (Ctrl+Shift+E)' },
  { id: 'search', icon: SearchIcon, title: 'Search (Ctrl+Shift+F)' },
  { id: 'git', icon: GitBranchIcon, title: 'Source Control (Ctrl+Shift+G)' },
  { id: 'debug', icon: DebugIcon, title: 'Debug (Ctrl+Shift+D)' },
  { id: 'extensions', icon: ExtensionsIcon, title: 'Extensions (Ctrl+Shift+X)' },
  { id: 'ai', icon: AiIcon, title: 'AI Assistant' },
  { id: 'database', icon: DatabaseIcon, title: 'Database' },
];

export default function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  return (
    <aside className="activity-bar">
      <div className="activity-bar-top">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <button
              key={activity.id}
              className={`activity-item ${activeView === activity.id ? 'active' : ''}`}
              onClick={() => onViewChange(activity.id)}
              title={activity.title}
              aria-label={activity.title}
            >
              <IconComponent size={22} className="activity-icon" />
            </button>
          );
        })}
      </div>
      
      <div className="activity-bar-bottom">
        <button
          className={`activity-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => onViewChange('settings')}
          title="Settings (Ctrl+,)"
          aria-label="Settings"
        >
          <SettingsIcon size={22} className="activity-icon" />
        </button>
      </div>
    </aside>
  );
}
