// Tauri API stub - This app uses Electron, not Tauri
// This file provides type definitions for compatibility

export interface FileEntry {
  name: string;
  path: string;
  is_dir: boolean;
  size: number;
}

export interface GitStatus {
  branch: string;
  changed: string[];
  staged: string[];
  untracked: string[];
}

// Stub invoke function - not used in Electron version
const invoke = async (_cmd: string, _args?: Record<string, unknown>): Promise<never> => {
  throw new Error('Tauri API not available - this app uses Electron');
};

// File System API
export const fs = {
  readFile: (path: string): Promise<string> => invoke('read_file', { path }),
  writeFile: (path: string, content: string): Promise<void> => invoke('write_file', { path, content }),
  listDirectory: (path: string): Promise<FileEntry[]> => invoke('list_directory', { path }),
  createFile: (path: string): Promise<void> => invoke('create_file', { path }),
  createDirectory: (path: string): Promise<void> => invoke('create_directory', { path }),
  deletePath: (path: string): Promise<void> => invoke('delete_path', { path }),
  renamePath: (oldPath: string, newPath: string): Promise<void> => invoke('rename_path', { oldPath, newPath }),
};

// Terminal API
export const terminal = {
  runCommand: (command: string, cwd?: string): Promise<string> => invoke('run_command', { command, cwd }),
};

// Git API
export const git = {
  status: (cwd: string): Promise<GitStatus> => invoke('git_status', { cwd }),
  commit: (cwd: string, message: string): Promise<string> => invoke('git_commit', { cwd, message }),
  add: (cwd: string, files: string[]): Promise<void> => invoke('git_add', { cwd, files }),
};

// Check if running in Tauri
export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI__' in window;
};
