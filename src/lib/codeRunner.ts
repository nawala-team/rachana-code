// Code Runner - executes code based on language
import { terminal, isTauri } from './tauri';

export interface RunConfig {
  command: string;
  interpreter: string;
  needsCompiler: boolean;
  installHint: string;
  fileExtension: string;
}

// Language configurations
const languageConfigs: Record<string, RunConfig> = {
  // Interpreted languages (no compiler needed)
  javascript: {
    command: 'node',
    interpreter: 'Node.js',
    needsCompiler: false,
    installHint: 'Install Node.js from https://nodejs.org',
    fileExtension: '.js',
  },
  typescript: {
    command: 'npx ts-node',
    interpreter: 'ts-node',
    needsCompiler: false,
    installHint: 'Install with: npm install -g ts-node typescript',
    fileExtension: '.ts',
  },
  python: {
    command: 'python',
    interpreter: 'Python',
    needsCompiler: false,
    installHint: 'Install Python from https://python.org',
    fileExtension: '.py',
  },
  ruby: {
    command: 'ruby',
    interpreter: 'Ruby',
    needsCompiler: false,
    installHint: 'Install Ruby from https://ruby-lang.org',
    fileExtension: '.rb',
  },
  php: {
    command: 'php',
    interpreter: 'PHP',
    needsCompiler: false,
    installHint: 'Install PHP from https://php.net',
    fileExtension: '.php',
  },
  lua: {
    command: 'lua',
    interpreter: 'Lua',
    needsCompiler: false,
    installHint: 'Install Lua from https://lua.org',
    fileExtension: '.lua',
  },
  powershell: {
    command: 'powershell -File',
    interpreter: 'PowerShell',
    needsCompiler: false,
    installHint: 'PowerShell is pre-installed on Windows',
    fileExtension: '.ps1',
  },
  shell: {
    command: 'bash',
    interpreter: 'Bash',
    needsCompiler: false,
    installHint: 'Install Git Bash or WSL on Windows',
    fileExtension: '.sh',
  },
  // Compiled languages
  java: {
    command: 'java',
    interpreter: 'JDK',
    needsCompiler: true,
    installHint: 'Install JDK from https://adoptium.net',
    fileExtension: '.java',
  },
  c: {
    command: 'gcc',
    interpreter: 'GCC',
    needsCompiler: true,
    installHint: 'Install MinGW: winget install MinGW.MinGW-w64',
    fileExtension: '.c',
  },
  cpp: {
    command: 'g++',
    interpreter: 'G++',
    needsCompiler: true,
    installHint: 'Install MinGW: winget install MinGW.MinGW-w64',
    fileExtension: '.cpp',
  },
  go: {
    command: 'go run',
    interpreter: 'Go',
    needsCompiler: true,
    installHint: 'Install Go from https://go.dev',
    fileExtension: '.go',
  },
  rust: {
    command: 'rustc',
    interpreter: 'Rust',
    needsCompiler: true,
    installHint: 'Install Rust from https://rustup.rs',
    fileExtension: '.rs',
  },
};

export interface RunResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

// Run code function
export async function runCode(
  code: string, 
  language: string, 
  _fileName: string,
  cwd: string = 'D:\\rachana-code-new'
): Promise<RunResult> {
  const startTime = Date.now();
  
  if (!isTauri()) {
    return {
      success: false,
      output: '',
      error: '⚠️ Code execution requires the desktop app.\nIn browser mode, only preview is available.',
    };
  }

  const config = languageConfigs[language.toLowerCase()];
  if (!config) {
    return {
      success: false,
      output: '',
      error: `❌ Language "${language}" is not supported.\n\nSupported: JavaScript, TypeScript, Python, Ruby, PHP, Lua, PowerShell, Bash, Java, C, C++, Go, Rust`,
    };
  }

  try {
    // Check if interpreter/compiler exists
    const checkCmd = `where ${config.command.split(' ')[0]}`;
    try {
      await terminal.runCommand(checkCmd, cwd);
    } catch {
      const msg = config.needsCompiler 
        ? `❌ ${config.interpreter} compiler not found!\n\n🔧 Install ${config.interpreter}:\n${config.installHint}`
        : `❌ ${config.interpreter} not found!\n\n🔧 Install:\n${config.installHint}`;
      return { success: false, output: '', error: msg };
    }

    // Create temp directory if not exists
    const tempDir = `${cwd}\\temp`;
    try { await terminal.runCommand(`mkdir "${tempDir}" 2>nul`, cwd); } catch { /* ignore */ }

    const tempFile = `${tempDir}\\run${config.fileExtension}`;
    
    // Write code to temp file using PowerShell
    const b64 = btoa(unescape(encodeURIComponent(code)));
    await terminal.runCommand(
      `powershell -Command "[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64}')) | Set-Content -Path '${tempFile}' -Encoding UTF8"`,
      cwd
    );

    let output = '';
    
    if (language.toLowerCase() === 'java') {
      const classMatch = code.match(/public\s+class\s+(\w+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      const javaFile = `${tempDir}\\${className}.java`;
      await terminal.runCommand(
        `powershell -Command "[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64}')) | Set-Content -Path '${javaFile}' -Encoding UTF8"`,
        cwd
      );
      await terminal.runCommand(`javac "${javaFile}"`, tempDir);
      output = await terminal.runCommand(`java ${className}`, tempDir);
    } else if (language.toLowerCase() === 'c') {
      const exe = `${tempDir}\\run.exe`;
      await terminal.runCommand(`gcc "${tempFile}" -o "${exe}"`, cwd);
      output = await terminal.runCommand(`"${exe}"`, cwd);
    } else if (language.toLowerCase() === 'cpp') {
      const exe = `${tempDir}\\run.exe`;
      await terminal.runCommand(`g++ "${tempFile}" -o "${exe}"`, cwd);
      output = await terminal.runCommand(`"${exe}"`, cwd);
    } else if (language.toLowerCase() === 'rust') {
      const exe = `${tempDir}\\run.exe`;
      await terminal.runCommand(`rustc "${tempFile}" -o "${exe}"`, cwd);
      output = await terminal.runCommand(`"${exe}"`, cwd);
    } else {
      output = await terminal.runCommand(`${config.command} "${tempFile}"`, cwd);
    }

    return { success: true, output, executionTime: Date.now() - startTime };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : String(err),
      executionTime: Date.now() - startTime,
    };
  }
}

export function getSupportedLanguages(): string[] {
  return Object.keys(languageConfigs);
}

export function needsCompiler(language: string): boolean {
  return languageConfigs[language.toLowerCase()]?.needsCompiler ?? false;
}

export function getInstallHint(language: string): string {
  return languageConfigs[language.toLowerCase()]?.installHint ?? '';
}

