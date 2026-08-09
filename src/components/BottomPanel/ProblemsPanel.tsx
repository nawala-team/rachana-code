import { useState, useMemo } from 'react';
import { ErrorIcon, WarningIcon, InfoIcon, FolderIcon, FileIcon, SparklesIcon } from '../Icons/Icons';
import './ProblemsPanel.css';

interface Problem {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  file: string;
  line: number;
  column: number;
  source: string;
  code?: string;
}

const mockProblems: Problem[] = [
  { id: '1', type: 'error', message: "Cannot find name 'useState'", file: 'src/App.tsx', line: 5, column: 10, source: 'ts', code: '2304' },
  { id: '2', type: 'error', message: "Property 'name' does not exist on type '{}'", file: 'src/components/User.tsx', line: 12, column: 8, source: 'ts', code: '2339' },
  { id: '3', type: 'warning', message: "'data' is defined but never used", file: 'src/hooks/useApi.ts', line: 8, column: 7, source: 'ts', code: '6133' },
  { id: '4', type: 'warning', message: "Unexpected console statement", file: 'src/utils/logger.ts', line: 15, column: 1, source: 'eslint', code: 'no-console' },
  { id: '5', type: 'info', message: "Consider using optional chaining", file: 'src/services/api.ts', line: 22, column: 5, source: 'eslint', code: 'prefer-optional-chain' },
];

export default function ProblemsPanel() {
  const [filter, setFilter] = useState('');
  const [showErrors, setShowErrors] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [groupByFile, setGroupByFile] = useState(true);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter(p => {
      if (!showErrors && p.type === 'error') return false;
      if (!showWarnings && p.type === 'warning') return false;
      if (!showInfo && p.type === 'info') return false;
      if (filter && !p.message.toLowerCase().includes(filter.toLowerCase()) && !p.file.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });
  }, [filter, showErrors, showWarnings, showInfo]);

  const grouped = useMemo(() => {
    if (!groupByFile) return { '': filteredProblems };
    const g: Record<string, Problem[]> = {};
    filteredProblems.forEach(p => { if (!g[p.file]) g[p.file] = []; g[p.file].push(p); });
    return g;
  }, [filteredProblems, groupByFile]);

  const counts = { error: mockProblems.filter(p => p.type === 'error').length, warning: mockProblems.filter(p => p.type === 'warning').length, info: mockProblems.filter(p => p.type === 'info').length };

  const getIcon = (type: string) => {
    if (type === 'error') return <ErrorIcon size={14} />;
    if (type === 'warning') return <WarningIcon size={14} />;
    return <InfoIcon size={14} />;
  };

  return (
    <div className="problems-panel">
      <div className="problems-toolbar">
        <input type="text" placeholder="Filter problems..." value={filter} onChange={e => setFilter(e.target.value)} className="problems-filter" />
        <div className="problems-toggles">
          <button className={`toggle-btn ${showErrors ? 'active' : ''}`} onClick={() => setShowErrors(!showErrors)}><ErrorIcon size={14} /> {counts.error}</button>
          <button className={`toggle-btn ${showWarnings ? 'active' : ''}`} onClick={() => setShowWarnings(!showWarnings)}><WarningIcon size={14} /> {counts.warning}</button>
          <button className={`toggle-btn ${showInfo ? 'active' : ''}`} onClick={() => setShowInfo(!showInfo)}><InfoIcon size={14} /> {counts.info}</button>
        </div>
        <button className={`group-btn ${groupByFile ? 'active' : ''}`} onClick={() => setGroupByFile(!groupByFile)}><FolderIcon size={14} /></button>
      </div>
      <div className="problems-list">
        {Object.entries(grouped).map(([file, problems]) => (
          <div key={file || 'all'} className="problems-group">
            {file && <div className="problems-file-header"><FileIcon size={14} /> {file} <span className="problem-count">{problems.length}</span></div>}
            {problems.map(p => (
              <div key={p.id} className={`problem-item ${p.type}`}>
                <span className="problem-icon">{getIcon(p.type)}</span>
                <span className="problem-message">{p.message}</span>
                <span className="problem-location">{p.line}:{p.column}</span>
                <span className="problem-source">[{p.source}{p.code ? `(${p.code})` : ''}]</span>
              </div>
            ))}
          </div>
        ))}
        {filteredProblems.length === 0 && <div className="no-problems"><SparklesIcon size={16} /> No problems found</div>}
      </div>
    </div>
  );
}
