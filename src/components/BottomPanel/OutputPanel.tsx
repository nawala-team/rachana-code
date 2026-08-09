import { useState, useEffect } from 'react';
import { TrashIcon, OutputIcon, SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, PlayIcon } from '../Icons/Icons';
import './OutputPanel.css';

export interface OutputEntry {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timestamp: Date;
  language?: string;
  executionTime?: number;
}

// Global output store
let outputEntries: OutputEntry[] = [];
let listeners: ((entries: OutputEntry[]) => void)[] = [];

export function addOutput(entry: Omit<OutputEntry, 'id' | 'timestamp'>) {
  const newEntry: OutputEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: new Date(),
  };
  outputEntries = [...outputEntries, newEntry];
  listeners.forEach(l => l(outputEntries));
}

export function clearOutput() {
  outputEntries = [];
  listeners.forEach(l => l(outputEntries));
}

export default function OutputPanel() {
  const [entries, setEntries] = useState<OutputEntry[]>(outputEntries);

  useEffect(() => {
    const listener = (e: OutputEntry[]) => setEntries([...e]);
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  }, []);

  return (
    <div className="output-panel">
      <div className="output-toolbar">
        <button className="output-clear" onClick={clearOutput} title="Clear Output">
          <TrashIcon size={14} /> Clear
        </button>
      </div>
      <div className="output-content">
        {entries.length === 0 ? (
          <div className="output-empty">
            <OutputIcon size={32} />
            <p>No output yet. Run your code to see results here.</p>
            <p className="hint"><PlayIcon size={12} /> Press F5 or click Run to execute</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className={`output-entry ${entry.type}`}>
              <div className="output-header">
                <span className="output-icon">
                  {entry.type === 'success' && <SuccessIcon size={14} />}
                  {entry.type === 'error' && <ErrorIcon size={14} />}
                  {entry.type === 'warning' && <WarningIcon size={14} />}
                  {entry.type === 'info' && <InfoIcon size={14} />}
                </span>
                <span className="output-lang">{entry.language || 'Output'}</span>
                {entry.executionTime && (
                  <span className="output-time">{entry.executionTime}ms</span>
                )}
                <span className="output-timestamp">
                  {entry.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <pre className="output-message">{entry.message}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
