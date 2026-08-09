const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const { execSync, exec } = require('child_process');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
let currentWorkingDir = null; // Start with no folder open
let mainWindow = null;

// Git helper functions
function runGitCommand(command, cwd = currentWorkingDir) {
  if (!cwd) return null;
  try {
    return execSync(command, { cwd, encoding: 'utf8', timeout: 5000 }).trim();
  } catch (error) {
    return null;
  }
}

function isGitRepo(dir) {
  if (!dir) return false;
  try {
    execSync('git rev-parse --is-inside-work-tree', { cwd: dir, encoding: 'utf8' });
    return true;
  } catch {
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'icons/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    frame: false, // Remove default frame for custom title bar
    backgroundColor: '#1e1e2e',
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click: () => mainWindow.webContents.send('menu-new-file') },
        { label: 'Open...', accelerator: 'CmdOrCtrl+O', click: () => mainWindow.webContents.send('menu-open') },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => mainWindow.webContents.send('menu-save') },
        { type: 'separator' },
        { label: 'Exit', accelerator: 'Alt+F4', role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Rachana Code',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Rachana Code',
              message: 'Rachana Code',
              detail: 'Version 1.0.0\n\nA modern code editor by NAWALA Team.\n\n© 2026 NAWALA Team',
            });
          },
        },
        {
          label: 'GitHub',
          click: () => shell.openExternal('https://github.com/nicoryne/rachana-code'),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Window control IPC handlers
ipcMain.handle('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) mainWindow.close();
});

// IPC Handlers for Git operations
ipcMain.handle('git-get-branch', async () => {
  if (!currentWorkingDir || !isGitRepo(currentWorkingDir)) return { branch: null, isRepo: false };
  const branch = runGitCommand('git branch --show-current');
  return { branch: branch || 'HEAD', isRepo: true };
});

ipcMain.handle('git-get-branches', async () => {
  if (!currentWorkingDir || !isGitRepo(currentWorkingDir)) return { branches: [], isRepo: false };
  const output = runGitCommand('git branch -a');
  if (!output) return { branches: [], isRepo: true };
  
  const branches = output.split('\n')
    .map(b => b.replace('*', '').trim())
    .filter(b => b && !b.includes('->'))
    .map(b => b.replace('remotes/origin/', ''));
  
  // Remove duplicates
  const unique = [...new Set(branches)];
  return { branches: unique, isRepo: true };
});

ipcMain.handle('git-checkout', async (event, branch) => {
  if (!currentWorkingDir || !isGitRepo(currentWorkingDir)) return { success: false, error: 'Not a git repository' };
  const result = runGitCommand(`git checkout ${branch}`);
  if (result === null) {
    return { success: false, error: 'Failed to checkout branch' };
  }
  return { success: true, branch };
});

ipcMain.handle('git-get-status', async () => {
  if (!currentWorkingDir || !isGitRepo(currentWorkingDir)) return { isRepo: false, files: [] };
  const output = runGitCommand('git status --porcelain');
  if (!output) return { isRepo: true, files: [] };
  
  const files = output.split('\n').filter(Boolean).map(line => ({
    status: line.substring(0, 2).trim(),
    file: line.substring(3),
  }));
  return { isRepo: true, files };
});

// IPC Handlers for File operations
ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!result.canceled && result.filePaths[0]) {
    currentWorkingDir = result.filePaths[0];
    return { path: currentWorkingDir, isGitRepo: isGitRepo(currentWorkingDir) };
  }
  return null;
});

ipcMain.handle('list-directory', async (event, dirPath) => {
  try {
    const targetPath = dirPath || currentWorkingDir;
    if (!targetPath) return { success: false, error: 'No directory specified' };
    
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    const files = entries.map(entry => ({
      name: entry.name,
      path: path.join(targetPath, entry.name),
      isDirectory: entry.isDirectory(),
    })).sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
    
    return { success: true, files };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-file-dialog', async (event, defaultPath) => {
  const result = await dialog.showSaveDialog({
    defaultPath: defaultPath || 'untitled.txt',
    filters: [
      { name: 'All Files', extensions: ['*'] },
      { name: 'Text Files', extensions: ['txt', 'md'] },
      { name: 'JavaScript', extensions: ['js', 'jsx', 'ts', 'tsx'] },
    ]
  });
  if (!result.canceled && result.filePath) {
    return { success: true, filePath: result.filePath };
  }
  return { success: false };
});

ipcMain.handle('get-working-dir', async () => {
  return currentWorkingDir;
});

ipcMain.handle('set-working-dir', async (event, dir) => {
  currentWorkingDir = dir;
  return { path: dir, isGitRepo: isGitRepo(dir) };
});

// Terminal/Shell execution
const activeTerminals = new Map();
let terminalIdCounter = 0;

ipcMain.handle('terminal-create', async () => {
  const id = ++terminalIdCounter;
  const shell = process.platform === 'win32' ? 'powershell.exe' : process.env.SHELL || '/bin/bash';
  const cwd = currentWorkingDir || process.cwd();
  
  const { spawn } = require('child_process');
  const pty = spawn(shell, [], {
    cwd,
    env: process.env,
    shell: true,
  });
  
  activeTerminals.set(id, { process: pty, cwd });
  
  pty.stdout.on('data', (data) => {
    mainWindow?.webContents.send('terminal-output', { id, data: data.toString() });
  });
  
  pty.stderr.on('data', (data) => {
    mainWindow?.webContents.send('terminal-output', { id, data: data.toString() });
  });
  
  pty.on('exit', (code) => {
    mainWindow?.webContents.send('terminal-exit', { id, code });
    activeTerminals.delete(id);
  });
  
  return { id, cwd };
});

ipcMain.handle('terminal-write', async (event, id, data) => {
  const terminal = activeTerminals.get(id);
  if (terminal && terminal.process) {
    terminal.process.stdin.write(data);
    return { success: true };
  }
  return { success: false, error: 'Terminal not found' };
});

ipcMain.handle('terminal-kill', async (event, id) => {
  const terminal = activeTerminals.get(id);
  if (terminal && terminal.process) {
    terminal.process.kill();
    activeTerminals.delete(id);
    return { success: true };
  }
  return { success: false, error: 'Terminal not found' };
});

ipcMain.handle('terminal-resize', async (event, id, cols, rows) => {
  // For basic spawn, resize is not directly supported
  // Would need node-pty for proper terminal emulation
  return { success: true };
});

// Execute single command (for simpler use cases)
ipcMain.handle('run-command', async (event, command, cwd) => {
  return new Promise((resolve) => {
    const targetCwd = cwd || currentWorkingDir || process.cwd();
    exec(command, { cwd: targetCwd, timeout: 30000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, error: error.message, stderr, stdout });
      } else {
        resolve({ success: true, stdout, stderr });
      }
    });
  });
});

// File/Folder operations
ipcMain.handle('create-file', async (event, filePath, content = '') => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-folder', async (event, folderPath) => {
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('rename-file', async (event, oldPath, newPath) => {
  try {
    fs.renameSync(oldPath, newPath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('file-exists', async (event, filePath) => {
  return fs.existsSync(filePath);
});

ipcMain.handle('get-file-stat', async (event, filePath) => {
  try {
    const stat = fs.statSync(filePath);
    return {
      success: true,
      isDirectory: stat.isDirectory(),
      isFile: stat.isFile(),
      size: stat.size,
      modified: stat.mtime.toISOString(),
      created: stat.birthtime.toISOString(),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
