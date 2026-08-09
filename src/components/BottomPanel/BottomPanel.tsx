import { useState } from 'react';
import Terminal from './Terminal';
import ProblemsPanel from './ProblemsPanel';
import OutputPanel from './OutputPanel';
import { TerminalIcon, WarningIcon, OutputIcon, BugIcon, CloseIcon } from '../Icons/Icons';
import './BottomPanel.css';

type Tab = 'terminal' | 'problems' | 'output' | 'debug';

export default function BottomPanel() {
  const [tab, setTab] = useState<Tab>('terminal');
  const [visible, setVisible] = useState(true);

  if (!visible) return (
    <div className="panel-toggle" onClick={() => setVisible(true)}>
      <span>Terminal</span><span>Problems</span><span>Output</span>
    </div>
  );

  return (
    <div className="bottom-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          {(['terminal', 'problems', 'output', 'debug'] as Tab[]).map(t => (
            <button key={t} className={`panel-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'terminal' && <TerminalIcon size={14} />}
              {t === 'problems' && <WarningIcon size={14} />}
              {t === 'output' && <OutputIcon size={14} />}
              {t === 'debug' && <BugIcon size={14} />}
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
          ))}
        </div>
        <div className="panel-actions">
          <button onClick={() => setVisible(false)}><CloseIcon size={10} /></button>
        </div>
      </div>
      <div className="panel-content">
        {tab === 'terminal' && <Terminal />}
        {tab === 'problems' && <ProblemsPanel />}
        {tab === 'output' && <OutputPanel />}
        {tab === 'debug' && <div className="debug-view"><BugIcon size={16} /> No active debug session</div>}
      </div>
    </div>
  );
}
