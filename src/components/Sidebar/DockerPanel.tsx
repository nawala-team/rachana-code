import { useState } from 'react';
import { DockerIcon, PlayIcon, StopIcon, LogIcon, PackageIcon, RefreshIcon, CloseIcon, StatusDot } from '../Icons/Icons';
import './DockerPanel.css';

interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  ports: string;
  cpu: string;
  memory: string;
}

const mockContainers: Container[] = [
  { id: 'abc123', name: 'web-app', image: 'node:18-alpine', status: 'running', ports: '3000:3000', cpu: '2.3%', memory: '128MB' },
  { id: 'def456', name: 'postgres-db', image: 'postgres:15', status: 'running', ports: '5432:5432', cpu: '0.5%', memory: '256MB' },
  { id: 'ghi789', name: 'redis-cache', image: 'redis:7', status: 'running', ports: '6379:6379', cpu: '0.1%', memory: '64MB' },
  { id: 'jkl012', name: 'nginx-proxy', image: 'nginx:latest', status: 'stopped', ports: '80:80', cpu: '-', memory: '-' },
];

const mockImages = [
  { name: 'node:18-alpine', size: '175MB', created: '2 weeks ago' },
  { name: 'postgres:15', size: '379MB', created: '1 month ago' },
  { name: 'redis:7', size: '138MB', created: '3 weeks ago' },
  { name: 'nginx:latest', size: '142MB', created: '1 week ago' },
];

export default function DockerPanel() {
  const [containers, setContainers] = useState(mockContainers);
  const [activeTab, setActiveTab] = useState<'containers' | 'images' | 'compose'>('containers');
  const [logs, setLogs] = useState<string | null>(null);

  const toggleContainer = (id: string) => {
    setContainers(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'running' ? 'stopped' : 'running' } : c
    ));
  };

  const showLogs = (name: string) => {
    setLogs(`[${name}] Server started on port 3000\n[${name}] Connected to database\n[${name}] Ready to accept connections`);
  };

  const getStatusColor = (s: string) => s === 'running' ? '#28a745' : s === 'paused' ? '#ffc107' : '#dc3545';

  return (
    <div className="docker-panel">
      <div className="docker-header"><h3><DockerIcon size={16} /> Docker</h3></div>
      <div className="docker-tabs">
        <button className={activeTab === 'containers' ? 'active' : ''} onClick={() => setActiveTab('containers')}>Containers</button>
        <button className={activeTab === 'images' ? 'active' : ''} onClick={() => setActiveTab('images')}>Images</button>
        <button className={activeTab === 'compose' ? 'active' : ''} onClick={() => setActiveTab('compose')}>Compose</button>
      </div>
      
      {activeTab === 'containers' && (
        <div className="container-list">
          {containers.map(c => (
            <div key={c.id} className="container-item">
              <div className="container-header">
                <span className="container-status"><StatusDot size={8} color={getStatusColor(c.status)} /></span>
                <span className="container-name">{c.name}</span>
                <div className="container-actions">
                  <button onClick={() => toggleContainer(c.id)}>{c.status === 'running' ? <StopIcon size={12} /> : <PlayIcon size={12} />}</button>
                  <button onClick={() => showLogs(c.name)}><LogIcon size={12} /></button>
                </div>
              </div>
              <div className="container-details">
                <span>{c.image}</span>
                <span>{c.ports}</span>
                {c.status === 'running' && <span>{c.cpu} | {c.memory}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'images' && (
        <div className="image-list">
          {mockImages.map(img => (
            <div key={img.name} className="image-item">
              <span className="image-name"><PackageIcon size={14} /> {img.name}</span>
              <span className="image-size">{img.size}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'compose' && (
        <div className="compose-section">
          <div className="compose-file">docker-compose.yml</div>
          <div className="compose-actions">
            <button className="compose-btn up"><PlayIcon size={12} /> Up</button>
            <button className="compose-btn down"><StopIcon size={12} /> Down</button>
            <button className="compose-btn restart"><RefreshIcon size={12} /> Restart</button>
          </div>
        </div>
      )}

      {logs && (
        <div className="logs-section">
          <div className="logs-header">
            <span>Logs</span>
            <button onClick={() => setLogs(null)}><CloseIcon size={10} /></button>
          </div>
          <pre className="logs-content">{logs}</pre>
        </div>
      )}
    </div>
  );
}
