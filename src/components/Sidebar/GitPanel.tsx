import { useState } from 'react';
import { GitBranchSmallIcon, RefreshIcon, PullIcon, PushIcon, CheckIcon, ModifiedIcon, AddedIcon, DeletedIcon, QuestionIcon, PlusIcon, MinusIcon } from '../Icons/Icons';
import './GitPanel.css';

interface GitFile { name: string; status: 'M' | 'A' | 'D' | 'U'; staged: boolean; }

const mockFiles: GitFile[] = [
  { name: 'src/App.tsx', status: 'M', staged: false },
  { name: 'src/components/Editor.tsx', status: 'M', staged: true },
  { name: 'src/styles/main.css', status: 'A', staged: false },
  { name: 'README.md', status: 'M', staged: false },
];

export default function GitPanel() {
  const [files, setFiles] = useState(mockFiles);
  const [message, setMessage] = useState('');
  const [branch] = useState('main');

  const stage = (name: string) => setFiles(files.map(f => f.name === name ? { ...f, staged: true } : f));
  const unstage = (name: string) => setFiles(files.map(f => f.name === name ? { ...f, staged: false } : f));
  const stageAll = () => setFiles(files.map(f => ({ ...f, staged: true })));
  const unstageAll = () => setFiles(files.map(f => ({ ...f, staged: false })));

  const staged = files.filter(f => f.staged);
  const unstaged = files.filter(f => !f.staged);

  const statusIcon = (s: string) => {
    if (s === 'M') return <ModifiedIcon size={14} />;
    if (s === 'A') return <AddedIcon size={14} />;
    if (s === 'D') return <DeletedIcon size={14} />;
    return <QuestionIcon size={14} />;
  };
  const statusColor = (s: string) => s === 'M' ? 'modified' : s === 'A' ? 'added' : s === 'D' ? 'deleted' : '';

  return (
    <div className="git-panel">
      <div className="git-header">
        <span className="git-branch"><GitBranchSmallIcon size={14} /> {branch}</span>
        <div className="git-actions">
          <button title="Refresh"><RefreshIcon size={14} /></button>
          <button title="Pull"><PullIcon size={14} /></button>
          <button title="Push"><PushIcon size={14} /></button>
        </div>
      </div>
      <div className="git-commit">
        <input type="text" placeholder="Commit message..." value={message}
          onChange={(e) => setMessage(e.target.value)} className="commit-input" />
        <button className="commit-btn" disabled={!message || staged.length === 0}>
          <CheckIcon size={14} /> Commit {staged.length > 0 && `(${staged.length})`}
        </button>
      </div>
      <div className="git-files">
        {staged.length > 0 && (
          <div className="file-group">
            <div className="group-header">
              <span>Staged Changes ({staged.length})</span>
              <button onClick={unstageAll} title="Unstage All"><MinusIcon size={12} /></button>
            </div>
            {staged.map(f => (
              <div key={f.name} className={`git-file ${statusColor(f.status)}`} onClick={() => unstage(f.name)}>
                <span className="file-icon">{statusIcon(f.status)}</span>
                <span className="file-name">{f.name}</span>
                <span className={`file-status ${statusColor(f.status)}`}>{f.status}</span>
              </div>
            ))}
          </div>
        )}
        {unstaged.length > 0 && (
          <div className="file-group">
            <div className="group-header">
              <span>Changes ({unstaged.length})</span>
              <button onClick={stageAll} title="Stage All"><PlusIcon size={12} /></button>
            </div>
            {unstaged.map(f => (
              <div key={f.name} className={`git-file ${statusColor(f.status)}`} onClick={() => stage(f.name)}>
                <span className="file-icon">{statusIcon(f.status)}</span>
                <span className="file-name">{f.name}</span>
                <span className={`file-status ${statusColor(f.status)}`}>{f.status}</span>
              </div>
            ))}
          </div>
        )}
        {files.length === 0 && <div className="git-empty"><CheckIcon size={14} /> No changes</div>}
      </div>
    </div>
  );
}
