import { useState, useRef, useEffect, useCallback } from 'react';
import './Terminal.css';

interface HistoryEntry {
  command: string;
  output: string;
  isError: boolean;
  timestamp: Date;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Sync cwd with working directory
  const syncWorkingDir = useCallback(async () => {
    if (window.electronAPI) {
      const dir = await window.electronAPI.getWorkingDir();
      if (dir && dir !== cwd) {
        setCwd(dir);
      } else if (!dir && !cwd) {
        setCwd('C:\\');
      }
    }
  }, [cwd]);

  // Initialize and listen for working directory changes
  useEffect(() => {
    syncWorkingDir();
    const interval = setInterval(syncWorkingDir, 1000);
    return () => clearInterval(interval);
  }, [syncWorkingDir]);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim() || isRunning) return;
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Handle built-in commands
    if (cmd.trim() === 'clear' || cmd.trim() === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd.trim().startsWith('cd ')) {
      const newDir = cmd.trim().slice(3).trim();
      let targetDir = newDir;
      
      // Handle relative paths
      if (!newDir.startsWith('/') && !newDir.match(/^[A-Z]:\\/i)) {
        targetDir = `${cwd}\\${newDir}`.replace(/\\\\/g, '\\');
      }
      
      // Verify directory exists
      if (window.electronAPI) {
        const stat = await window.electronAPI.getFileStat(targetDir);
        if (stat.success && stat.isDirectory) {
          setCwd(targetDir);
          setHistory(prev => [...prev, { command: cmd, output: '', isError: false, timestamp: new Date() }]);
        } else {
          setHistory(prev => [...prev, { 
            command: cmd, 
            output: `The system cannot find the path specified: ${targetDir}`, 
            isError: true, 
            timestamp: new Date() 
          }]);
        }
      }
      setInput('');
      return;
    }

    setIsRunning(true);
    
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.runCommand(cmd, cwd);
        if (result.success) {
          const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
          setHistory(prev => [...prev, { 
            command: cmd, 
            output: output || '(No output)', 
            isError: false, 
            timestamp: new Date() 
          }]);
        } else {
          setHistory(prev => [...prev, { 
            command: cmd, 
            output: result.error || result.stderr || 'Command failed', 
            isError: true, 
            timestamp: new Date() 
          }]);
        }
      } else {
        setHistory(prev => [...prev, { 
          command: cmd, 
          output: `[Browser Mode] Command: ${cmd}\nNote: Real terminal requires Electron runtime`, 
          isError: false, 
          timestamp: new Date() 
        }]);
      }
    } catch (err) {
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: err instanceof Error ? err.message : String(err), 
        isError: true, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsRunning(false);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isRunning) {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'c' && e.ctrlKey && !e.shiftKey) {
      // Ctrl+C - copy selected text
      const selection = window.getSelection()?.toString();
      if (selection) {
        navigator.clipboard.writeText(selection);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      // Ctrl+L - clear screen
      e.preventDefault();
      setHistory([]);
    }
  };

  // Handle right-click context menu for copy/paste
  const handleContextMenu = async (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection()?.toString();
    if (selection) {
      await navigator.clipboard.writeText(selection);
    } else {
      try {
        const text = await navigator.clipboard.readText();
        setInput(prev => prev + text);
      } catch {
        // Clipboard access denied
      }
    }
  };

  const displayCwd = cwd || 'Loading...';

  return (
    <div 
      className="terminal" 
      onClick={() => inputRef.current?.focus()}
      onContextMenu={handleContextMenu}
    >
      <div className="terminal-header">
        <span className="terminal-title">Terminal</span>
        <span className="terminal-cwd" title={displayCwd}>{displayCwd}</span>
        {isRunning && <span className="terminal-running">Running...</span>}
      </div>
      <div className="terminal-output" ref={outputRef}>
        {history.map((entry, i) => (
          <div key={i} className="terminal-entry">
            <div className="terminal-prompt">
              <span className="prompt-path">{cwd}&gt;</span>
              <span className="prompt-command">{entry.command}</span>
            </div>
            {entry.output && (
              <pre className={`terminal-result ${entry.isError ? 'error' : ''}`}>{entry.output}</pre>
            )}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="prompt-path">{displayCwd}&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck={false}
            autoFocus
            disabled={isRunning}
            placeholder={isRunning ? 'Running...' : ''}
          />
        </div>
      </div>
    </div>
  );
}
