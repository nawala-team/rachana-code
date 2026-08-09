import { useState } from 'react';
import './FindReplace.css';

interface Props {
  onFind: (text: string, options: { caseSensitive: boolean; wholeWord: boolean; regex: boolean }) => void;
  onReplace: (find: string, replace: string) => void;
  onReplaceAll: (find: string, replace: string) => void;
  onClose: () => void;
  matchCount?: number;
}

export default function FindReplace({ onFind, onReplace, onReplaceAll, onClose, matchCount = 0 }: Props) {
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [regex, setRegex] = useState(false);

  const handleFind = () => onFind(find, { caseSensitive, wholeWord, regex });

  return (
    <div className="find-replace">
      <div className="find-row">
        <button className="toggle-replace" onClick={() => setShowReplace(!showReplace)}>
          {showReplace ? '▼' : '▶'}
        </button>
        <div className="find-input-wrap">
          <input type="text" placeholder="Find" value={find}
            onChange={(e) => { setFind(e.target.value); onFind(e.target.value, { caseSensitive, wholeWord, regex }); }}
            onKeyDown={(e) => e.key === 'Enter' && handleFind()}
            className="find-input" autoFocus />
          {find && <span className="match-count">{matchCount} results</span>}
        </div>
        <div className="find-options">
          <button className={`opt-btn ${caseSensitive ? 'active' : ''}`} onClick={() => setCaseSensitive(!caseSensitive)} title="Case Sensitive">Aa</button>
          <button className={`opt-btn ${wholeWord ? 'active' : ''}`} onClick={() => setWholeWord(!wholeWord)} title="Whole Word">ab</button>
          <button className={`opt-btn ${regex ? 'active' : ''}`} onClick={() => setRegex(!regex)} title="Regex">.*</button>
        </div>
        <div className="find-actions">
          <button className="find-btn" title="Previous">↑</button>
          <button className="find-btn" title="Next">↓</button>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      {showReplace && (
        <div className="replace-row">
          <div className="spacer"></div>
          <input type="text" placeholder="Replace" value={replace}
            onChange={(e) => setReplace(e.target.value)} className="find-input" />
          <div className="replace-actions">
            <button className="replace-btn" onClick={() => onReplace(find, replace)} title="Replace">Replace</button>
            <button className="replace-btn" onClick={() => onReplaceAll(find, replace)} title="Replace All">All</button>
          </div>
        </div>
      )}
    </div>
  );
}
