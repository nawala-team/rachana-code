import { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { useSettings } from '../../context/SettingsContext';
import './DiffViewer.css';

interface DiffViewerProps {
  original: string;
  modified: string;
  originalTitle?: string;
  modifiedTitle?: string;
  language?: string;
  onClose: () => void;
}

export default function DiffViewer({ original, modified, originalTitle = 'Original', modifiedTitle = 'Modified', language = 'typescript', onClose }: DiffViewerProps) {
  const { theme } = useSettings();
  const [inline, setInline] = useState(false);

  return (
    <div className="diff-viewer">
      <div className="diff-header">
        <div className="diff-titles">
          <span className="diff-title original">{originalTitle}</span>
          <span className="diff-arrow">→</span>
          <span className="diff-title modified">{modifiedTitle}</span>
        </div>
        <div className="diff-actions">
          <button className={`diff-mode-btn ${!inline ? 'active' : ''}`} onClick={() => setInline(false)}>Side by Side</button>
          <button className={`diff-mode-btn ${inline ? 'active' : ''}`} onClick={() => setInline(true)}>Inline</button>
          <button className="diff-close" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="diff-content">
        <DiffEditor
          height="100%"
          original={original}
          modified={modified}
          language={language}
          theme={theme.type === 'dark' ? 'vs-dark' : 'vs'}
          options={{
            readOnly: true,
            renderSideBySide: !inline,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}
