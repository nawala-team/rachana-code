import { useState } from 'react';
import './GitGraphPanel.css';

interface Commit {
  id: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  parents: string[];
}

const mockCommits: Commit[] = [
  { id: '1', hash: 'a1b2c3d', message: 'feat: add AI assistant panel', author: 'dev@nawala.id', date: '2 hours ago', branch: 'main', parents: ['2'] },
  { id: '2', hash: 'e4f5g6h', message: 'feat: implement API tester', author: 'dev@nawala.id', date: '4 hours ago', branch: 'main', parents: ['3'] },
  { id: '3', hash: 'i7j8k9l', message: 'feat: add Docker integration', author: 'dev@nawala.id', date: '6 hours ago', branch: 'main', parents: ['4', '7'] },
  { id: '4', hash: 'm0n1o2p', message: 'fix: editor cursor position', author: 'dev@nawala.id', date: '8 hours ago', branch: 'main', parents: ['5'] },
  { id: '5', hash: 'q3r4s5t', message: 'feat: split editor view', author: 'dev@nawala.id', date: '1 day ago', branch: 'main', parents: ['6'] },
  { id: '6', hash: 'u6v7w8x', message: 'feat: add zen mode', author: 'dev@nawala.id', date: '1 day ago', branch: 'main', parents: [] },
  { id: '7', hash: 'y9z0a1b', message: 'feat: profiler panel', author: 'dev@nawala.id', date: '5 hours ago', branch: 'feature/profiler', parents: ['5'] },
];

const branchColors: Record<string, string> = {
  main: '#49cc90',
  'feature/profiler': '#61affe',
  'feature/ai': '#f093fb',
  develop: '#fca130',
};

export default function GitGraphPanel() {
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [filter, setFilter] = useState('');

  const filteredCommits = mockCommits.filter(c => 
    c.message.toLowerCase().includes(filter.toLowerCase()) ||
    c.hash.includes(filter) ||
    c.author.includes(filter)
  );

  return (
    <div className="git-graph-panel">
      <div className="graph-header">
        <h3>📊 Git Graph</h3>
        <input 
          type="text" 
          placeholder="Filter commits..." 
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      
      <div className="graph-container">
        <div className="commit-list">
          {filteredCommits.map((commit, idx) => (
            <div 
              key={commit.id} 
              className={`commit-row ${selectedCommit?.id === commit.id ? 'selected' : ''}`}
              onClick={() => setSelectedCommit(commit)}
            >
              <div className="graph-line">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  {idx > 0 && <line x1="20" y1="0" x2="20" y2="15" stroke={branchColors[commit.branch] || '#666'} strokeWidth="2" />}
                  <circle cx="20" cy="20" r="6" fill={branchColors[commit.branch] || '#666'} />
                  {idx < filteredCommits.length - 1 && <line x1="20" y1="25" x2="20" y2="40" stroke={branchColors[commit.branch] || '#666'} strokeWidth="2" />}
                  {commit.parents.length > 1 && (
                    <path d="M20 20 Q35 20 35 5" stroke="#61affe" strokeWidth="2" fill="none" />
                  )}
                </svg>
              </div>
              <div className="commit-info">
                <div className="commit-message">{commit.message}</div>
                <div className="commit-meta">
                  <span className="commit-hash">{commit.hash}</span>
                  <span className="commit-branch" style={{ background: branchColors[commit.branch] || '#666' }}>{commit.branch}</span>
                  <span className="commit-date">{commit.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCommit && (
        <div className="commit-detail">
          <div className="detail-header">Commit Details</div>
          <div className="detail-row"><span>Hash:</span><code>{selectedCommit.hash}</code></div>
          <div className="detail-row"><span>Author:</span><span>{selectedCommit.author}</span></div>
          <div className="detail-row"><span>Date:</span><span>{selectedCommit.date}</span></div>
          <div className="detail-row"><span>Message:</span><span>{selectedCommit.message}</span></div>
          <div className="detail-actions">
            <button>Cherry Pick</button>
            <button>Revert</button>
            <button>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
