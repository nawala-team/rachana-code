import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface OpenFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  modified: boolean;
  isPinned: boolean; // true = permanent tab, false = preview (can be replaced)
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
  path: string;
}

interface EditorContextType {
  openFiles: OpenFile[];
  activeFileId: string | null;
  workingDir: string | null;
  workingDirFiles: FileNode[];
  openFile: (path: string, name: string, content?: string) => void;
  closeFile: (id: string) => void;
  setActiveFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  saveFile: (id: string) => Promise<boolean>;
  saveActiveFile: () => Promise<boolean>;
  setWorkingDir: (dir: string | null) => void;
  setWorkingDirFiles: (files: FileNode[]) => void;
  openFolder: () => Promise<void>;
  pinFile: (id: string) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

const langMap: Record<string, string> = {
  ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
  py: 'python', rs: 'rust', go: 'go', java: 'java', c: 'c', cpp: 'cpp',
  php: 'php', rb: 'ruby', html: 'html', css: 'css', json: 'json', md: 'markdown',
  sql: 'sql', sh: 'shell', yml: 'yaml', yaml: 'yaml', xml: 'xml', txt: 'plaintext',
  log: 'plaintext', env: 'plaintext', ini: 'ini', toml: 'toml',
};

function getLanguage(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  return langMap[ext] || 'plaintext';
}

let fileIdCounter = 1;

export function EditorProvider({ children }: { children: ReactNode }) {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [workingDir, setWorkingDir] = useState<string | null>(null);
  const [workingDirFiles, setWorkingDirFiles] = useState<FileNode[]>([]);

  const loadDirectory = async (dirPath: string): Promise<FileNode[]> => {
    if (!window.electronAPI) return [];
    
    const result = await window.electronAPI.listDirectory(dirPath);
    if (result.success && result.files) {
      return result.files.map((f: any) => ({
        name: f.name,
        path: f.path,
        type: f.isDirectory ? 'folder' : 'file',
        expanded: false,
        children: f.isDirectory ? [] : undefined,
      }));
    }
    return [];
  };

  const openFolder = useCallback(async () => {
    if (!window.electronAPI) return;
    
    const result = await window.electronAPI.openFolder();
    if (result) {
      setWorkingDir(result.path);
      const files = await loadDirectory(result.path);
      setWorkingDirFiles(files);
    }
  }, []);

  const openFile = useCallback((path: string, name: string, content?: string) => {
    setOpenFiles(prev => {
      // Check if file is already open
      const existing = prev.find(f => f.path === path);
      if (existing) {
        setActiveFileId(existing.id);
        return prev;
      }

      const fileContent = content ?? `// ${name}\n`;
      const id = `file-${fileIdCounter++}`;
      const newFile: OpenFile = {
        id,
        name,
        path,
        content: fileContent,
        language: getLanguage(name),
        modified: false,
        isPinned: false, // Start as preview (not pinned)
      };

      // Find existing preview tab (not pinned, not modified)
      const previewIndex = prev.findIndex(f => !f.isPinned && !f.modified);
      
      if (previewIndex !== -1) {
        // Replace the preview tab with new file
        const newFiles = [...prev];
        newFiles[previewIndex] = newFile;
        setActiveFileId(id);
        return newFiles;
      }

      // No preview tab exists, add new tab
      setActiveFileId(id);
      return [...prev, newFile];
    });
  }, []);

  const closeFile = useCallback((id: string) => {
    setOpenFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      if (activeFileId === id) {
        setActiveFileId(newFiles.length > 0 ? newFiles[newFiles.length - 1].id : null);
      }
      return newFiles;
    });
  }, [activeFileId]);

  const setActiveFile = useCallback((id: string) => {
    setActiveFileId(id);
  }, []);

  const updateFileContent = useCallback((id: string, content: string) => {
    setOpenFiles(prev => prev.map(f => 
      f.id === id ? { ...f, content, modified: true, isPinned: true } : f
    ));
  }, []);

  const saveFile = useCallback(async (id: string): Promise<boolean> => {
    const file = openFiles.find(f => f.id === id);
    if (!file) return false;

    // Check if it's an untitled file (needs Save As)
    if (file.path.startsWith('untitled-') || !file.path.includes('/') && !file.path.includes('\\')) {
      if (window.electronAPI) {
        const result = await window.electronAPI.saveFileDialog(file.name);
        if (result.success && result.filePath) {
          const writeResult = await window.electronAPI.writeFile(result.filePath, file.content);
          if (writeResult.success) {
            // Update file path and name
            setOpenFiles(prev => prev.map(f => 
              f.id === id ? { 
                ...f, 
                path: result.filePath!, 
                name: result.filePath!.split(/[/\\]/).pop() || file.name,
                modified: false 
              } : f
            ));
            return true;
          }
        }
      }
      return false;
    }

    // Save to existing path
    if (window.electronAPI) {
      const result = await window.electronAPI.writeFile(file.path, file.content);
      if (result.success) {
        setOpenFiles(prev => prev.map(f => 
          f.id === id ? { ...f, modified: false } : f
        ));
        return true;
      }
    }
    return false;
  }, [openFiles]);

  const saveActiveFile = useCallback(async (): Promise<boolean> => {
    if (!activeFileId) return false;
    return saveFile(activeFileId);
  }, [activeFileId, saveFile]);

  const pinFile = useCallback((id: string) => {
    setOpenFiles(prev => prev.map(f => 
      f.id === id ? { ...f, isPinned: true } : f
    ));
  }, []);

  return (
    <EditorContext.Provider value={{ 
      openFiles, 
      activeFileId, 
      workingDir,
      workingDirFiles,
      openFile, 
      closeFile, 
      setActiveFile, 
      updateFileContent,
      saveFile,
      saveActiveFile,
      setWorkingDir,
      setWorkingDirFiles,
      openFolder,
      pinFile
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
}
