import { useState } from 'react';
import './GoToLine.css';

interface Props {
  onGo: (line: number) => void;
  onClose: () => void;
  maxLine: number;
  currentLine: number;
}

export default function GoToLine({ onGo, onClose, maxLine, currentLine }: Props) {
  const [value, setValue] = useState(String(currentLine));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const line = parseInt(value, 10);
    if (line >= 1 && line <= maxLine) {
      onGo(line);
      onClose();
    }
  };

  return (
    <div className="goto-overlay" onClick={onClose}>
      <div className="goto-dialog" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`Go to line (1-${maxLine})`}
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
          />
          <div className="goto-hint">Current line: {currentLine}, Type a line number</div>
        </form>
      </div>
    </div>
  );
}
