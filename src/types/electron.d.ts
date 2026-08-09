// Electron API type definitions

export interface ElectronAPI {
  // Window controls
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  
  // File operations
  openFolder: () => Promise<{ path: string; isGitRepo: boolean } | null>;
  readFile: (path: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  writeFile: (path: string, content: string) => Promise<{ success: boolean; error?: string }>;
  saveFileDialog: (defaultPath?: string) => Promise<{ success: boolean; filePath?: string }>;
  listDirectory: (path?: string) => Promise<{ success: boolean; files?: any[]; error?: string }>;
  getWorkingDir: () => Promise<string | null>;
  setWorkingDir: (dir: string) => Promise<{ path: string; isGitRepo: boolean }>;
  createFile: (filePath: string, content?: string) => Promise<{ success: boolean; error?: string }>;
  createFolder: (folderPath: string) => Promise<{ success: boolean; error?: string }>;
  deleteFile: (filePath: string) => Promise<{ success: boolean; error?: string }>;
  renameFile: (oldPath: string, newPath: string) => Promise<{ success: boolean; error?: string }>;
  fileExists: (filePath: string) => Promise<boolean>;
  getFileStat: (filePath: string) => Promise<{ 
    success: boolean; 
    isDirectory?: boolean; 
    isFile?: boolean; 
    size?: number; 
    modified?: string; 
    created?: string; 
    error?: string 
  }>;
  
  // Git operations
  gitGetBranch: () => Promise<{ branch: string | null; isRepo: boolean }>;
  gitGetBranches: () => Promise<{ branches: string[]; isRepo: boolean }>;
  gitCheckout: (branch: string) => Promise<{ success: boolean; error?: string }>;
  gitGetStatus: () => Promise<{ isRepo: boolean; files: { status: string; file: string }[] }>;
  
  // Terminal operations
  terminalCreate: () => Promise<{ id: number; cwd: string }>;
  terminalWrite: (id: number, data: string) => Promise<{ success: boolean; error?: string }>;
  terminalKill: (id: number) => Promise<{ success: boolean; error?: string }>;
  terminalResize: (id: number, cols: number, rows: number) => Promise<{ success: boolean }>;
  onTerminalOutput: (callback: (data: { id: number; data: string }) => void) => void;
  onTerminalExit: (callback: (data: { id: number; code: number }) => void) => void;
  
  // Run single command
  runCommand: (command: string, cwd?: string) => Promise<{ success: boolean; stdout?: string; stderr?: string; error?: string }>;
  
  // Menu event listeners
  onMenuSave: (callback: () => void) => void;
  onMenuNewFile: (callback: () => void) => void;
  onMenuOpen: (callback: () => void) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
