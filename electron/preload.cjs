const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  
  // Git operations
  gitGetBranch: () => ipcRenderer.invoke('git-get-branch'),
  gitGetBranches: () => ipcRenderer.invoke('git-get-branches'),
  gitCheckout: (branch) => ipcRenderer.invoke('git-checkout', branch),
  gitGetStatus: () => ipcRenderer.invoke('git-get-status'),
  
  // File operations
  openFolder: () => ipcRenderer.invoke('open-folder'),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  getWorkingDir: () => ipcRenderer.invoke('get-working-dir'),
  setWorkingDir: (dir) => ipcRenderer.invoke('set-working-dir', dir),
  listDirectory: (dirPath) => ipcRenderer.invoke('list-directory', dirPath),
  saveFileDialog: (defaultPath) => ipcRenderer.invoke('save-file-dialog', defaultPath),
  createFile: (filePath, content) => ipcRenderer.invoke('create-file', filePath, content),
  createFolder: (folderPath) => ipcRenderer.invoke('create-folder', folderPath),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  renameFile: (oldPath, newPath) => ipcRenderer.invoke('rename-file', oldPath, newPath),
  fileExists: (filePath) => ipcRenderer.invoke('file-exists', filePath),
  getFileStat: (filePath) => ipcRenderer.invoke('get-file-stat', filePath),
  
  // Terminal operations
  terminalCreate: () => ipcRenderer.invoke('terminal-create'),
  terminalWrite: (id, data) => ipcRenderer.invoke('terminal-write', id, data),
  terminalKill: (id) => ipcRenderer.invoke('terminal-kill', id),
  terminalResize: (id, cols, rows) => ipcRenderer.invoke('terminal-resize', id, cols, rows),
  onTerminalOutput: (callback) => ipcRenderer.on('terminal-output', (event, data) => callback(data)),
  onTerminalExit: (callback) => ipcRenderer.on('terminal-exit', (event, data) => callback(data)),
  
  // Run single command
  runCommand: (command, cwd) => ipcRenderer.invoke('run-command', command, cwd),
  
  // Menu events
  onMenuNewFile: (callback) => ipcRenderer.on('menu-new-file', callback),
  onMenuOpen: (callback) => ipcRenderer.on('menu-open', callback),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
});
