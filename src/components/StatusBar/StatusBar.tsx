import { useState, useEffect } from 'react';
import { languages, getLangDisplay } from '../../data/languages';
import { CloseIcon, WarningIcon } from '../Icons/Icons';
import '../../types/electron.d.ts';
import './StatusBar.css';

export default function StatusBar() {
  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);
  const [language, setLanguage] = useState('plaintext');
  const [branch, setBranch] = useState<string | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [isGitRepo, setIsGitRepo] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [errors, setErrors] = useState(0);
  const [warnings, setWarnings] = useState(0);

  // Fetch Git info
  useEffect(() => {
    const fetchGitInfo = async () => {
      if (window.electronAPI) {
        try {
          const result = await window.electronAPI.gitGetBranch();
          setIsGitRepo(result.isRepo);
          setBranch(result.branch);
          if (result.isRepo) {
            const br = await window.electronAPI.gitGetBranches();
            setBranches(br.branches);
          }
        } catch { /* ignore */ }
      }
    };
    fetchGitInfo();
    const interval = setInterval(fetchGitInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const editor = (window as any).rachanaEditor;
      if (editor) {
        setLine(editor.cursorPos?.line || 1);
        setCol(editor.cursorPos?.col || 1);
        setLanguage(editor.activeTab?.language || 'plaintext');
        // Get lint stats
        setErrors(editor.lintStats?.errors || 0);
        setWarnings(editor.lintStats?.warnings || 0);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => { setShowBranchMenu(false); setShowLangMenu(false); };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const editor = (window as any).rachanaEditor;
    if (editor?.setLanguage) { editor.setLanguage(lang); setLanguage(lang); }
    setShowLangMenu(false);
  };

  const handleNewFile = () => {
    const editor = (window as any).rachanaEditor;
    if (editor?.newFile) editor.newFile();
  };

  const handleBranchChange = async (newBranch: string) => {
    if (window.electronAPI && newBranch !== branch) {
      const result = await window.electronAPI.gitCheckout(newBranch);
      if (result.success) setBranch(newBranch);
    }
    setShowBranchMenu(false);
  };

  const langInfo = getLangDisplay(language);

  return (
    <footer className="status-bar">
      <div className="status-left">
        <button className="status-item status-btn new-btn" onClick={handleNewFile} title="New File (Ctrl+N)">
          <span className="btn-icon">+</span>
          <span>New</span>
        </button>

        <div className="status-dropdown">
          <button className="status-item status-btn git-btn" onClick={(e) => { e.stopPropagation(); if(isGitRepo) setShowBranchMenu(!showBranchMenu); }} title={isGitRepo ? "Git Branch" : "Not a Git repository"}>
            <span className="btn-icon">⎇</span>
            <span>{isGitRepo ? (branch || 'HEAD') : 'No Git'}</span>
            {isGitRepo && <span className="dropdown-arrow">▾</span>}
          </button>
          {showBranchMenu && isGitRepo && (
            <div className="status-menu">
              <div className="menu-header">Switch Branch</div>
              {branches.length > 0 ? branches.map(b => (
                <button key={b} className={`menu-item ${b === branch ? 'active' : ''}`} onClick={() => handleBranchChange(b)}>
                  {b === branch && <span className="check">✓</span>}
                  <span>{b}</span>
                </button>
              )) : <div className="menu-item disabled">No branches</div>}
            </div>
          )}
        </div>

        <button className="status-item status-indicator" title="Errors">
          <span className="indicator-icon error"><CloseIcon size={12} /></span>
          <span>{errors}</span>
        </button>
        <button className="status-item status-indicator" title="Warnings">
          <span className="indicator-icon warning"><WarningIcon size={12} /></span>
          <span>{warnings}</span>
        </button>
      </div>
      
      <div className="status-right">
        <button className="status-item"><span>Ln {line}, Col {col}</span></button>
        <button className="status-item"><span>Spaces: 2</span></button>
        <button className="status-item"><span>UTF-8</span></button>

        <div className="status-dropdown">
          <button className="status-item status-btn lang-btn" onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); }} title="Select Language">
            <span className="lang-icon">{langInfo.icon}</span>
            <span>{langInfo.name}</span>
            <span className="dropdown-arrow">▾</span>
          </button>
          {showLangMenu && (
            <div className="status-menu lang-menu">
              <div className="menu-header">Select Language</div>
              <div className="menu-list">
                {languages.map(lang => {
                  const info = getLangDisplay(lang);
                  return (
                    <button key={lang} className={`menu-item ${lang === language ? 'active' : ''}`} onClick={() => handleLanguageChange(lang)}>
                      <span className="lang-icon">{info.icon}</span>
                      <span>{info.name}</span>
                      {lang === language && <span className="check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button className="status-item" title="Notifications"><span>🔔</span></button>
      </div>
    </footer>
  );
}
