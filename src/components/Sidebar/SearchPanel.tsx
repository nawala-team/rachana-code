import { useState, useMemo, useEffect } from 'react';
import { useEditor } from '../../context/EditorContext';
import './SearchPanel.css';

interface SearchResult { file: string; line: number; text: string; match: string; }

const mockFiles: Record<string, string> = {
  'src/App.tsx': `import React from 'react';\nfunction App() { return <div />; }`,
  'src/Editor.tsx': `import { useState } from 'react';\nexport default function Editor() {}`,
  'scripts/build.sh': `#!/bin/bash\nnpm run build`,
  'logs/app.log': `[INFO] Started\n[ERROR] Failed`,
};

export default function SearchPanel() {
  const { openFile } = useEditor();
  const [query, setQuery] = useState('');
  const [replace, setReplace] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [excludePattern, setExcludePattern] = useState('node_modules');
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') { e.preventDefault(); document.getElementById('srch')?.focus(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    const out: SearchResult[] = [];
    try {
      const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pat = useRegex ? query : (wholeWord ? `\\b${esc}\\b` : esc);
      Object.entries(mockFiles).forEach(([file, content]) => {
        if (excludePattern && file.includes(excludePattern)) return;
        content.split('\n').forEach((line, idx) => {
          const lr = new RegExp(pat, caseSensitive ? 'g' : 'gi');
          let m; while ((m = lr.exec(line)) !== null) out.push({ file, line: idx + 1, text: line, match: m[0] });
        });
      });
    } catch {}
    return out;
  }, [query, caseSensitive, wholeWord, useRegex, excludePattern]);

  const grouped = useMemo(() => { const g: Record<string, SearchResult[]> = {}; results.forEach(r => { (g[r.file] ??= []).push(r); }); return g; }, [results]);
  const toggle = (f: string) => setExpandedFiles(p => { const n = new Set(p); if (n.has(f)) { n.delete(f); } else { n.add(f); } return n; });

  return (
    <div className="search-panel">
      <div className="search-row">
        <button onClick={() => setShowReplace(!showReplace)}>{showReplace ? '▼' : '▶'}</button>
        <input id="srch" className="search-input" placeholder="Search (Ctrl+Shift+F)" value={query} onChange={e => setQuery(e.target.value)} />
        <button className={caseSensitive ? 'active' : ''} onClick={() => setCaseSensitive(!caseSensitive)} title="Case">Aa</button>
        <button className={wholeWord ? 'active' : ''} onClick={() => setWholeWord(!wholeWord)} title="Word">ab</button>
        <button className={useRegex ? 'active' : ''} onClick={() => setUseRegex(!useRegex)} title="Regex">.*</button>
      </div>
      {showReplace && <div className="search-row"><input className="search-input" placeholder="Replace" value={replace} onChange={e => setReplace(e.target.value)} /><button>⟲</button><button>All</button></div>}
      <input className="filter-input" placeholder="Exclude" value={excludePattern} onChange={e => setExcludePattern(e.target.value)} />
      {query && <div className="search-summary">{results.length} in {Object.keys(grouped).length} files</div>}
      <div className="search-results">
        {Object.entries(grouped).map(([file, res]) => (
          <div key={file} className="result-file">
            <div className="result-file-header" onClick={() => toggle(file)}><span>{expandedFiles.has(file) ? '▼' : '▶'}</span><span>{file}</span><span>({res.length})</span></div>
            {expandedFiles.has(file) && res.map((r, i) => (
              <div key={i} className="result-line" onClick={() => openFile(r.file, r.file.split('/').pop() || r.file, mockFiles[r.file])}>
                <span className="line-num">{r.line}</span>
                <span className="line-text">{r.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
