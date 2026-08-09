import { useState } from 'react';
import { PlayIcon, StopIcon, StepIcon, ChevronDownIcon, ChevronRightIcon, CrossIcon } from '../Icons/Icons';
import './DebugPanel.css';

interface Breakpoint { id: string; file: string; line: number; enabled: boolean; condition?: string; }
interface Variable { name: string; value: string; type: string; children?: Variable[]; }
interface StackFrame { id: number; name: string; file: string; line: number; }

export default function DebugPanel() {
  const [isDebugging, setIsDebugging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([
    { id: '1', file: 'src/App.tsx', line: 15, enabled: true },
    { id: '2', file: 'src/utils.ts', line: 42, enabled: true, condition: 'count > 10' },
  ]);
  const [variables] = useState<Variable[]>([
    { name: 'count', value: '5', type: 'number' },
    { name: 'items', value: 'Array(3)', type: 'array', children: [
      { name: '0', value: '"apple"', type: 'string' },
      { name: '1', value: '"banana"', type: 'string' },
    ]},
  ]);
  const [callStack] = useState<StackFrame[]>([
    { id: 1, name: 'handleClick', file: 'App.tsx', line: 15 },
    { id: 2, name: 'processData', file: 'utils.ts', line: 42 },
  ]);
  const [watchExpressions, setWatchExpressions] = useState(['count * 2', 'items.length']);
  const [consoleOutput, setConsoleOutput] = useState(['> Debug session started']);
  const [newWatch, setNewWatch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleBp = (id: string) => setBreakpoints(bps => bps.map(b => b.id === id ? {...b, enabled: !b.enabled} : b));
  const removeBp = (id: string) => setBreakpoints(bps => bps.filter(b => b.id !== id));
  const addWatch = () => { if (newWatch.trim()) { setWatchExpressions([...watchExpressions, newWatch]); setNewWatch(''); } };
  const toggleExp = (n: string) => setExpanded(p => { const s = new Set(p); s.has(n) ? s.delete(n) : s.add(n); return s; });
  
  const startDebug = () => { setIsDebugging(true); setIsPaused(true); setConsoleOutput(p => [...p, '> Started']); };
  const stopDebug = () => { setIsDebugging(false); setIsPaused(false); setConsoleOutput(p => [...p, '> Stopped']); };

  const renderVar = (v: Variable, d = 0): React.ReactNode => (
    <div key={v.name} style={{ paddingLeft: d * 12 }}>
      <div className="var-row" onClick={() => v.children && toggleExp(v.name)}>
        {v.children && <span>{expanded.has(v.name) ? <ChevronDownIcon size={10} /> : <ChevronRightIcon size={10} />}</span>}
        <span className="var-name">{v.name}</span>: <span className={`var-val ${v.type}`}>{v.value}</span>
      </div>
      {v.children && expanded.has(v.name) && v.children.map(c => renderVar(c, d + 1))}
    </div>
  );

  return (
    <div className="debug-panel">
      <div className="debug-toolbar">
        {!isDebugging ? <button className="dbg-btn start" onClick={startDebug}><PlayIcon size={12} /> Start</button> : (
          <>
            <button className="dbg-btn" onClick={() => setConsoleOutput(p => [...p, '> Continue'])} disabled={!isPaused}><PlayIcon size={12} /></button>
            <button className="dbg-btn" onClick={() => setConsoleOutput(p => [...p, '> Step'])} disabled={!isPaused}><StepIcon size={12} /></button>
            <button className="dbg-btn stop" onClick={stopDebug}><StopIcon size={12} /></button>
          </>
        )}
      </div>
      <details className="dbg-section" open><summary>Variables</summary>
        <div className="section-body">{isPaused ? variables.map(v => renderVar(v)) : <em>Not paused</em>}</div>
      </details>
      <details className="dbg-section" open><summary>Watch</summary>
        <div className="section-body">
          {watchExpressions.map((e, i) => <div key={i} className="watch-item">{e} = {isPaused ? '?' : '-'} <button onClick={() => setWatchExpressions(w => w.filter((_, j) => j !== i))}><CrossIcon size={10} /></button></div>)}
          <input value={newWatch} onChange={e => setNewWatch(e.target.value)} placeholder="Add watch..." onKeyDown={e => e.key === 'Enter' && addWatch()} />
        </div>
      </details>
      <details className="dbg-section" open><summary>Call Stack</summary>
        <div className="section-body">{isPaused ? callStack.map(f => <div key={f.id} className="stack-frame">{f.name} <span className="loc">{f.file}:{f.line}</span></div>) : <em>Not paused</em>}</div>
      </details>
      <details className="dbg-section" open><summary>Breakpoints ({breakpoints.filter(b => b.enabled).length})</summary>
        <div className="section-body">{breakpoints.map(b => <div key={b.id} className="bp-item"><input type="checkbox" checked={b.enabled} onChange={() => toggleBp(b.id)} />{b.file}:{b.line} {b.condition && <span className="cond">if {b.condition}</span>}<button onClick={() => removeBp(b.id)}><CrossIcon size={10} /></button></div>)}</div>
      </details>
      <details className="dbg-section"><summary>Console</summary>
        <div className="section-body console">{consoleOutput.map((l, i) => <div key={i}>{l}</div>)}</div>
      </details>
    </div>
  );
}
