import { useState, useMemo } from 'react';
import './OutlinePanel.css';

interface OutlineItem {
  name: string;
  kind: 'class' | 'function' | 'variable' | 'interface' | 'method' | 'property';
  line: number;
  children?: OutlineItem[];
}

const mockOutline: OutlineItem[] = [
  { name: 'User', kind: 'interface', line: 1, children: [
    { name: 'id', kind: 'property', line: 2 },
    { name: 'name', kind: 'property', line: 3 },
    { name: 'email', kind: 'property', line: 4 },
  ]},
  { name: 'UserService', kind: 'class', line: 8, children: [
    { name: 'constructor', kind: 'method', line: 9 },
    { name: 'getUser', kind: 'method', line: 12 },
    { name: 'createUser', kind: 'method', line: 18 },
    { name: 'updateUser', kind: 'method', line: 25 },
    { name: 'deleteUser', kind: 'method', line: 32 },
  ]},
  { name: 'validateEmail', kind: 'function', line: 40 },
  { name: 'formatUser', kind: 'function', line: 48 },
  { name: 'DEFAULT_ROLE', kind: 'variable', line: 55 },
];

const kindIcons: Record<string, string> = {
  class: '🔷', function: '𝑓', variable: '𝑥', interface: '◇', method: '𝑚', property: '•',
};

export default function OutlinePanel() {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['User', 'UserService']));
  const [sortBy, setSortBy] = useState<'position' | 'name' | 'kind'>('position');

  const filteredOutline = useMemo(() => {
    if (!filter) return mockOutline;
    const lf = filter.toLowerCase();
    return mockOutline.filter(item => 
      item.name.toLowerCase().includes(lf) ||
      item.children?.some(c => c.name.toLowerCase().includes(lf))
    );
  }, [filter]);

  const sortedOutline = useMemo(() => {
    const sorted = [...filteredOutline];
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'kind') sorted.sort((a, b) => a.kind.localeCompare(b.kind));
    return sorted;
  }, [filteredOutline, sortBy]);

  const toggleExpand = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const goToLine = (line: number) => {
    // Would trigger editor.revealLineInCenter(line)
    console.log('Go to line:', line);
  };

  return (
    <div className="outline-panel">
      <div className="outline-header">
        <input type="text" placeholder="Filter..." value={filter} onChange={e => setFilter(e.target.value)} className="outline-filter" />
        <select value={sortBy} onChange={e => setSortBy(e.target.value as 'position' | 'name' | 'kind')} className="outline-sort">
          <option value="position">Position</option>
          <option value="name">Name</option>
          <option value="kind">Kind</option>
        </select>
      </div>
      <div className="outline-tree">
        {sortedOutline.map(item => (
          <div key={item.name} className="outline-item">
            <div className="outline-row" onClick={() => item.children ? toggleExpand(item.name) : goToLine(item.line)}>
              {item.children && <span className="expand-icon">{expanded.has(item.name) ? '▼' : '▶'}</span>}
              <span className={`kind-icon ${item.kind}`}>{kindIcons[item.kind]}</span>
              <span className="item-name">{item.name}</span>
              <span className="item-line">:{item.line}</span>
            </div>
            {item.children && expanded.has(item.name) && (
              <div className="outline-children">
                {item.children.map(child => (
                  <div key={child.name} className="outline-row child" onClick={() => goToLine(child.line)}>
                    <span className={`kind-icon ${child.kind}`}>{kindIcons[child.kind]}</span>
                    <span className="item-name">{child.name}</span>
                    <span className="item-line">:{child.line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
