import { useState } from 'react';
import { CheckIcon, CloseIcon, SkipIcon, LoadingIcon, PlayIcon, ChevronDownIcon, ChevronRightIcon } from '../Icons/Icons';
import './TestRunnerPanel.css';

interface TestResult { name: string; status: 'pass' | 'fail' | 'skip' | 'running'; duration?: number; error?: string; }
interface TestSuite { name: string; tests: TestResult[]; }

export default function TestRunnerPanel() {
  const [suites, setSuites] = useState<TestSuite[]>([
    { name: 'App.test.tsx', tests: [
      { name: 'renders without crashing', status: 'pass', duration: 12 },
      { name: 'displays title correctly', status: 'pass', duration: 8 },
      { name: 'handles click events', status: 'fail', duration: 45, error: 'Expected 1 but got 0' },
    ]},
    { name: 'utils.test.ts', tests: [
      { name: 'formatDate works', status: 'pass', duration: 3 },
      { name: 'parseJSON handles null', status: 'skip' },
    ]},
  ]);
  const [running, setRunning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pass' | 'fail'>('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['App.test.tsx']));

  const counts = suites.flatMap(s => s.tests).reduce((a, t) => ({ ...a, [t.status]: (a[t.status] || 0) + 1 }), { pass: 0, fail: 0, skip: 0, running: 0 });
  const total = counts.pass + counts.fail + counts.skip;

  const runAllTests = () => {
    setRunning(true);
    setSuites(ss => ss.map(s => ({ ...s, tests: s.tests.map(t => ({ ...t, status: 'running' as const })) })));
    setTimeout(() => {
      setSuites([
        { name: 'App.test.tsx', tests: [
          { name: 'renders without crashing', status: 'pass', duration: 15 },
          { name: 'displays title correctly', status: 'pass', duration: 10 },
          { name: 'handles click events', status: 'pass', duration: 38 },
        ]},
        { name: 'utils.test.ts', tests: [
          { name: 'formatDate works', status: 'pass', duration: 5 },
          { name: 'parseJSON handles null', status: 'pass', duration: 2 },
        ]},
      ]);
      setRunning(false);
    }, 1500);
  };

  const toggleSuite = (name: string) => setExpanded(p => { const s = new Set(p); s.has(name) ? s.delete(name) : s.add(name); return s; });

  const getIcon = (s: string) => {
    if (s === 'pass') return <CheckIcon size={12} />;
    if (s === 'fail') return <CloseIcon size={12} />;
    if (s === 'skip') return <SkipIcon size={12} />;
    return <LoadingIcon size={12} />;
  };

  return (
    <div className="test-panel">
      <div className="test-toolbar">
        <button onClick={runAllTests} disabled={running}>{running ? <><LoadingIcon size={12} /> Running...</> : <><PlayIcon size={12} /> Run All</>}</button>
        <select value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
          <option value="all">All ({total})</option>
          <option value="pass">Passed ({counts.pass})</option>
          <option value="fail">Failed ({counts.fail})</option>
        </select>
      </div>
      <div className="test-summary">
        <span className="pass">{counts.pass} passed</span>
        <span className="fail">{counts.fail} failed</span>
        <span className="skip">{counts.skip} skipped</span>
      </div>
      <div className="test-suites">
        {suites.map(suite => (
          <div key={suite.name} className="test-suite">
            <div className="suite-header" onClick={() => toggleSuite(suite.name)}>
              <span>{expanded.has(suite.name) ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}</span>
              <span className="suite-name">{suite.name}</span>
              <span className="suite-count">{suite.tests.filter(t => t.status === 'pass').length}/{suite.tests.length}</span>
            </div>
            {expanded.has(suite.name) && suite.tests.filter(t => filter === 'all' || t.status === filter).map(test => (
              <div key={test.name} className={`test-item ${test.status}`}>
                <span className="test-icon">{getIcon(test.status)}</span>
                <span className="test-name">{test.name}</span>
                {test.duration && <span className="test-time">{test.duration}ms</span>}
                {test.error && <div className="test-error">{test.error}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
