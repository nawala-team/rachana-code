import { useState, useMemo } from 'react';
import './QuickOpen.css';

interface FileItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface Props {
  files: FileItem[];
  onSelect: (file: FileItem) => void;
  onClose: () => void;
}

export default function QuickOpen({ files, onSelect, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = useMemo(() => {
    if (!query) return files.slice(0, 10);
    const q = query.toLowerCase();
    return files.filter(f => 
      f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, files]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      onSelect(filtered[selected]);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="quickopen-overlay" onClick={onClose}>
      <div className="quickopen-dialog" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search files by name..."
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(0); }}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="quickopen-list">
          {filtered.map((file, i) => (
            <div
              key={file.id}
              className={`quickopen-item ${i === selected ? 'selected' : ''}`}
              onClick={() => { onSelect(file); onClose(); }}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="quickopen-icon">{file.icon}</span>
              <span className="quickopen-name">{file.name}</span>
              <span className="quickopen-path">{file.path}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="quickopen-empty">No matching files</div>
          )}
        </div>
      </div>
    </div>
  );
}
