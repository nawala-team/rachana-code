// SVG Icons for Rachana Code Editor

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// File Explorer Icons
export function FolderIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1.5 3.5A1.5 1.5 0 013 2h3.379a1.5 1.5 0 011.06.44L8.562 3.5H13a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5H3a1.5 1.5 0 01-1.5-1.5v-8z" fill="#dcad5a"/>
    </svg>
  );
}

export function FolderOpenIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1.5 3.5A1.5 1.5 0 013 2h3.379a1.5 1.5 0 011.06.44L8.562 3.5H13a1.5 1.5 0 011.5 1.5v1H3.5L1.5 12V3.5z" fill="#dcad5a"/>
      <path d="M1.5 6h12l-2 7H3l-1.5-7z" fill="#e8c478"/>
    </svg>
  );
}

export function FileIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 1.5A1.5 1.5 0 014.5 0h4.879a1.5 1.5 0 011.06.44l2.122 2.12A1.5 1.5 0 0113 3.622V14.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 14.5v-13z" fill="#8b949e"/>
    </svg>
  );
}

export function TypeScriptIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect width="16" height="16" rx="2" fill="#3178c6"/>
      <path d="M4 8h4v1H6.5v4h-1V9H4V8zM8.5 11.5c0 .828.895 1.5 2 1.5s2-.672 2-1.5-.895-1.5-2-1.5c-.552 0-1-.224-1-.5s.448-.5 1-.5.895.168 1 .5h1c-.105-.828-.895-1.5-2-1.5s-2 .672-2 1.5.895 1.5 2 1.5c.552 0 1 .224 1 .5s-.448.5-1 .5-.895-.168-1-.5h-1z" fill="white"/>
    </svg>
  );
}

export function JavaScriptIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect width="16" height="16" rx="2" fill="#f7df1e"/>
      <path d="M5.5 8v3c0 .552-.448 1-1 1s-1-.448-1-1h-1c0 1.105.895 2 2 2s2-.895 2-2V8h-1zM10.5 8c-1.105 0-2 .672-2 1.5s.895 1.5 2 1.5c.552 0 1 .224 1 .5s-.448.5-1 .5c-.368 0-.684-.112-.895-.5h-1c.21.888 1.052 1.5 2.395 1.5 1.105 0 2-.672 2-1.5s-.895-1.5-2-1.5c-.552 0-1-.224-1-.5s.448-.5 1-.5c.368 0 .684.112.895.5h1c-.21-.888-1.052-1.5-2.395-1.5z" fill="#323330"/>
    </svg>
  );
}

export function ReactIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="1.5" fill="#61dafb"/>
      <ellipse cx="8" cy="8" rx="7" ry="2.5" stroke="#61dafb" strokeWidth="0.8" fill="none"/>
      <ellipse cx="8" cy="8" rx="7" ry="2.5" stroke="#61dafb" strokeWidth="0.8" fill="none" transform="rotate(60 8 8)"/>
      <ellipse cx="8" cy="8" rx="7" ry="2.5" stroke="#61dafb" strokeWidth="0.8" fill="none" transform="rotate(120 8 8)"/>
    </svg>
  );
}

export function CssIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect width="16" height="16" rx="2" fill="#264de4"/>
      <path d="M3 2l1 10 4 2 4-2 1-10H3zM5 5h6l-.5 5L8 11l-2.5-1-.25-2h1.5l.125 1L8 9.5l1.125-.5.25-2H5.5l-.25-2h5.5l-.125 1" fill="white"/>
    </svg>
  );
}

export function HtmlIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect width="16" height="16" rx="2" fill="#e34f26"/>
      <path d="M3 2l1 10 4 2 4-2 1-10H3zM5 5h6l-.125 1H5.25l.125 1h5.25l-.5 4L8 12l-2.125-.75-.125-1.25h1.25l.063.625L8 11l1-.25.25-2.75H5L4.75 6" fill="white"/>
    </svg>
  );
}


export function JsonIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect width="16" height="16" rx="2" fill="#cbcb41"/>
      <path d="M5 4c-.552 0-1 .448-1 1v2c0 .552-.448 1-1 1s1 .448 1 1v2c0 .552.448 1 1 1M11 4c.552 0 1 .448 1 1v2c0 .552.448 1 1 1s-1 .448-1 1v2c0 .552-.448 1-1 1" stroke="#323330" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function MarkdownIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="0.5" y="2.5" width="15" height="11" rx="1.5" stroke="#519aba" fill="none"/>
      <path d="M3 10V6l1.5 2 1.5-2v4M9 10V6l2 2.5L13 6v4" stroke="#519aba" strokeWidth="1.2"/>
    </svg>
  );
}

export function PythonIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1c-2.5 0-4 1-4 2.5v1.5h4v1H3.5C2 6 1 7.5 1 9.5S2 13 3.5 13H5v-2c0-1.5 1-2.5 2.5-2.5h3c1 0 2-.5 2-1.5V3.5C12.5 2 11 1 8 1zM6 3a1 1 0 110 2 1 1 0 010-2z" fill="#3776ab"/>
      <path d="M8 15c2.5 0 4-1 4-2.5v-1.5H8v-1h4.5c1.5 0 2.5-1.5 2.5-3.5S14 3 12.5 3H11v2c0 1.5-1 2.5-2.5 2.5h-3c-1 0-2 .5-2 1.5v3.5C3.5 14 5 15 8 15zm2-2a1 1 0 110-2 1 1 0 010 2z" fill="#ffd43b"/>
    </svg>
  );
}

export function ShellIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1" y="2" width="14" height="12" rx="2" fill="#4d4d4d"/>
      <path d="M4 6l2.5 2L4 10M7.5 10h3" stroke="#4ec9b0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ConfigIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#6d8086"/>
      <circle cx="8" cy="8" r="2" stroke="white" strokeWidth="1.2" fill="none"/>
      <path d="M8 3v2M8 11v2M3 8h2M11 8h2" stroke="white" strokeWidth="1.2"/>
    </svg>
  );
}


// Activity Bar Icons
export function ExplorerIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293L12 5h7a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
      <path d="M8 11h8M8 15h5" strokeLinecap="round"/>
    </svg>
  );
}

export function SearchIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
    </svg>
  );
}

export function GitBranchIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="10" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M6 9v6M9 6h4a2 2 0 012 2v2"/>
    </svg>
  );
}

export function DebugIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z"/>
      <path d="M8 14v4a4 4 0 008 0v-4"/>
      <path d="M4 10h3M17 10h3M4 14h3M17 14h3"/>
    </svg>
  );
}

export function ExtensionsIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="8" rx="1"/>
      <rect x="13" y="3" width="8" height="8" rx="1"/>
      <rect x="3" y="13" width="8" height="8" rx="1"/>
      <path d="M17 13v8M13 17h8"/>
    </svg>
  );
}

export function AiIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}

export function DatabaseIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 5v14c0 1.657-4.03 3-9 3s-9-1.343-9-3V5"/>
      <path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3"/>
    </svg>
  );
}

export function SettingsIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  );
}

// Utility Icons
export function CloseIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MinimizeIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MaximizeIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 1l8 8M1 9l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function RefreshIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M14 8A6 6 0 112 8a6 6 0 0112 0z"/>
      <path d="M14 3v5h-5"/>
    </svg>
  );
}

export function ChevronRightIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronDownIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Bottom Panel Icons
export function TerminalIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="2" width="14" height="12" rx="1"/>
      <path d="M4 6l3 2-3 2M8 10h4"/>
    </svg>
  );
}

export function WarningIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1L1 14h14L8 1z" fill="#f0ad4e" stroke="#f0ad4e"/>
      <path d="M8 6v4M8 11.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function OutputIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="12" height="12" rx="1"/>
      <path d="M5 6h6M5 8h4M5 10h5"/>
    </svg>
  );
}

export function BugIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <ellipse cx="8" cy="9" rx="4" ry="5"/>
      <circle cx="8" cy="4" r="2"/>
      <path d="M2 7h2M12 7h2M2 11h2M12 11h2M4 3L2 1M12 3l2-2"/>
    </svg>
  );
}

// Status Icons
export function SuccessIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="7" fill="#28a745"/>
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ErrorIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="7" fill="#dc3545"/>
      <path d="M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function InfoIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="7" fill="#17a2b8"/>
      <path d="M8 5v.5M8 7v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SparklesIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#ffc107"/>
      <path d="M3 9l.5 1.5L5 11l-1.5.5L3 13l-.5-1.5L1 11l1.5-.5L3 9z" fill="#ffc107"/>
      <path d="M12 8l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L10 10l1.5-.5.5-1.5z" fill="#ffc107"/>
    </svg>
  );
}

// Action Icons
export function TrashIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M3 4h10M6 4V2h4v2M4 4v9a1 1 0 001 1h6a1 1 0 001-1V4"/>
      <path d="M6 7v4M10 7v4"/>
    </svg>
  );
}

export function PlusIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 3v10M3 8h10"/>
    </svg>
  );
}

export function MinusIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10"/>
    </svg>
  );
}

export function CollapseIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PlayIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 2l10 6-10 6V2z" fill="currentColor"/>
    </svg>
  );
}

export function StopIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="3" y="3" width="10" height="10" rx="1" fill="currentColor"/>
    </svg>
  );
}

export function SendIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2 8l12-6-4 6 4 6-12-6z" fill="currentColor"/>
    </svg>
  );
}

// Git Icons
export function GitBranchSmallIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <circle cx="4" cy="4" r="2"/>
      <circle cx="4" cy="12" r="2"/>
      <circle cx="12" cy="6" r="2"/>
      <path d="M4 6v4M4 4c4 0 8 0 8 2"/>
    </svg>
  );
}

export function PullIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v10M4 8l4 4 4-4"/>
    </svg>
  );
}

export function PushIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 14V4M4 8l4-4 4 4"/>
    </svg>
  );
}

export function CheckIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <path d="M3 8l4 4 6-8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ModifiedIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="5" fill="#e2c08d"/>
    </svg>
  );
}

export function AddedIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="5" fill="#73c991"/>
      <path d="M8 5v6M5 8h6" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

export function DeletedIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="5" fill="#f14c4c"/>
      <path d="M5 8h6" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

export function QuestionIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="7" fill="#6c757d"/>
      <path d="M6 6c0-1.5 1.5-2 2-2s2 .5 2 1.5c0 1-1 1.5-2 2v1" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="8" cy="12" r=".8" fill="white"/>
    </svg>
  );
}

// AI Assistant Icons
export function LightbulbIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9z" fill="#ffc107"/>
      <path d="M6 14h4M6 13h4" stroke="#ffc107" strokeWidth="1"/>
    </svg>
  );
}

export function TestTubeIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M5 2v8l-2 4h10l-2-4V2"/>
      <path d="M4 2h8"/>
      <path d="M4 10h8" strokeDasharray="2 1"/>
    </svg>
  );
}

export function WrenchIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M12 4a3 3 0 00-4 4L3 13l1 1 5-5a3 3 0 004-4l-2 2-1-1 2-2z"/>
    </svg>
  );
}

export function UserIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="5" r="3"/>
      <path d="M2 14c0-3 3-5 6-5s6 2 6 5"/>
    </svg>
  );
}

export function RobotIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="5" width="10" height="9" rx="2"/>
      <circle cx="6" cy="9" r="1" fill="currentColor"/>
      <circle cx="10" cy="9" r="1" fill="currentColor"/>
      <path d="M6 12h4"/>
      <path d="M8 2v3"/>
      <circle cx="8" cy="2" r="1"/>
    </svg>
  );
}

// Database Icons  
export function TableIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="2" width="12" height="12" rx="1"/>
      <path d="M2 6h12M2 10h12M6 2v12"/>
    </svg>
  );
}

export function PlugIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M6 2v4M10 2v4M4 6h8v2a4 4 0 01-8 0V6zM8 12v2"/>
    </svg>
  );
}

export function LoadingIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5"/>
    </svg>
  );
}

// Docker Icons
export function DockerIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M1 7h2v2H1V7zM4 7h2v2H4V7zM7 7h2v2H7V7zM4 4h2v2H4V4zM7 4h2v2H7V4zM10 7h2v2h-2V7z" fill="#2496ed"/>
      <path d="M15 8c-.5-1-1.5-1-2-1h-1c0-1-1-2-2-2V4c1 0 2 1 2 1 1-.5 2 0 2.5.5.5.5 1 1.5.5 2.5z" fill="#2496ed"/>
      <path d="M0 9c1 2 4 4 8 4 5 0 7-3 7-4H0z" fill="#2496ed"/>
    </svg>
  );
}

export function ContainerIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3" width="12" height="10" rx="1"/>
      <path d="M5 6h2M5 8h4M5 10h3"/>
    </svg>
  );
}

export function PackageIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M8 1l6 3v8l-6 3-6-3V4l6-3z"/>
      <path d="M8 8v7M2 4l6 4 6-4"/>
    </svg>
  );
}

export function LogIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="2" width="12" height="12" rx="1"/>
      <path d="M4 5h8M4 8h6M4 11h7"/>
    </svg>
  );
}

// Status Dots
export function StatusDot({ size = 8, color = '#28a745', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className}>
      <circle cx="4" cy="4" r="4" fill={color}/>
    </svg>
  );
}

// Command Palette Icons
export function NewFileIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
      <path d="M10 2v3h3"/>
      <path d="M8 7v5M5.5 9.5h5"/>
    </svg>
  );
}

export function SaveIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M3 2h8l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
      <path d="M5 2v4h5V2"/>
      <path d="M5 10h6v4H5z"/>
    </svg>
  );
}

export function ReplaceIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M11 1l3 3-3 3"/>
      <path d="M14 4H6a3 3 0 000 6h1"/>
      <path d="M5 15l-3-3 3-3"/>
      <path d="M2 12h8a3 3 0 000-6h-1"/>
    </svg>
  );
}

export function SidebarIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="2" width="12" height="12" rx="1"/>
      <path d="M6 2v12"/>
    </svg>
  );
}

export function KeyboardIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="3" width="14" height="10" rx="1"/>
      <path d="M4 6h1M7 6h2M11 6h1M4 9h1M6 9h4M11 9h1"/>
    </svg>
  );
}

export function MoonIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M14 10A6 6 0 116 2c0 4 4 8 8 8z" fill="currentColor"/>
    </svg>
  );
}

export function SunIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="3" fill="currentColor"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function BoltIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" fill="currentColor"/>
    </svg>
  );
}

export function PaletteIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1a7 7 0 00-1.5 13.85c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A7 7 0 008 1z" fill="currentColor"/>
    </svg>
  );
}

export function LockIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="3" y="7" width="10" height="8" rx="1" fill="currentColor"/>
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function RocketIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1c3 2 5 5 5 8 0 2-1 3-2 4l-1-2H6l-1 2c-1-1-2-2-2-4 0-3 2-6 5-8z" fill="currentColor"/>
      <circle cx="8" cy="6" r="1.5" fill="var(--bg-primary, #1e1e1e)"/>
      <path d="M4 12l-2 3M12 12l2 3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function SkipIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M4 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 3v10" strokeLinecap="round"/>
    </svg>
  );
}

export function HistoryIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 4v4l3 2" strokeLinecap="round"/>
    </svg>
  );
}

export function EditorIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="12" height="12" rx="2"/>
      <path d="M5 5h6M5 8h4M5 11h5" strokeLinecap="round"/>
    </svg>
  );
}

export function DownloadIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v8M4 7l4 4 4-4M2 12v2h12v-2"/>
    </svg>
  );
}

export function StarIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5l2-5z" fill="#ffc107"/>
    </svg>
  );
}

export function StepIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v8M5 7l3 3 3-3"/>
      <path d="M4 13h8"/>
    </svg>
  );
}

export function CrossIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/>
    </svg>
  );
}

export function BackArrowIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2L4 8l6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function HintIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M8 1a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9z"/>
      <path d="M6 14h4"/>
    </svg>
  );
}
