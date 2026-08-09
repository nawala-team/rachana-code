import { useState, useEffect } from 'react';
import { useEditor, type FileNode } from '../../context/EditorContext';
import { 
  FolderIcon, 
  FolderOpenIcon, 
  FileIcon, 
  TypeScriptIcon, 
  JavaScriptIcon, 
  ReactIcon, 
  CssIcon, 
  HtmlIcon, 
  JsonIcon, 
  MarkdownIcon, 
  PythonIcon, 
  ShellIcon, 
  ConfigIcon,
  RefreshIcon,
  ChevronRightIcon
} from '../Icons/Icons';
import './FileExplorer.css';

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
  onSelect: (node: FileNode) => void;
  onToggle: (node: FileNode) => void;
}

function getFileIcon(filename: string): React.ReactNode {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const name = filename.toLowerCase();
  
  // Check for React files
  if (ext === 'tsx' || ext === 'jsx') return <ReactIcon size={16} />;
  if (ext === 'ts') return <TypeScriptIcon size={16} />;
  if (ext === 'js') return <JavaScriptIcon size={16} />;
  if (ext === 'css' || ext === 'scss' || ext === 'sass') return <CssIcon size={16} />;
  if (ext === 'html' || ext === 'htm') return <HtmlIcon size={16} />;
  if (ext === 'json') return <JsonIcon size={16} />;
  if (ext === 'md' || ext === 'mdx') return <MarkdownIcon size={16} />;
  if (ext === 'py') return <PythonIcon size={16} />;
  if (ext === 'sh' || ext === 'bash' || ext === 'zsh') return <ShellIcon size={16} />;
  if (ext === 'yml' || ext === 'yaml' || ext === 'toml' || ext === 'ini' || name.includes('config')) return <ConfigIcon size={16} />;
  
  return <FileIcon size={16} />;
}

function FileTreeItem({ node, depth, onSelect, onToggle }: FileTreeItemProps) {
  const handleClick = () => {
    if (node.type === 'folder') {
      onToggle(node);
    } else {
      onSelect(node);
    }
  };

  return (
    <div className="file-tree-item-wrapper">
      <button
        className="file-tree-item"
        onClick={handleClick}
        onDoubleClick={node.type === 'file' ? handleClick : undefined}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        data-type={node.type}
      >
        {node.type === 'folder' && (
          <span className={`chevron ${node.expanded ? 'expanded' : ''}`}>
            <ChevronRightIcon size={9} />
          </span>
        )}
        <span className="file-icon">
          {node.type === 'folder' 
            ? (node.expanded ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />) 
            : getFileIcon(node.name)}
        </span>
        <span className="file-name">{node.name}</span>
      </button>
      
      {node.type === 'folder' && node.expanded && node.children && (
        <div className="file-tree-children">
          {node.children.map((child, index) => (
            <FileTreeItem
              key={`${child.path}-${index}`}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer() {
  const { openFile, workingDir, workingDirFiles, setWorkingDirFiles, openFolder } = useEditor();
  const [loading, setLoading] = useState(false);

  // Load working directory on mount
  useEffect(() => {
    loadWorkingDir();
  }, []);

  const loadWorkingDir = async () => {
    if (window.electronAPI && !workingDir) {
      const dir = await window.electronAPI.getWorkingDir();
      if (dir) {
        await openFolder();
      }
    }
  };

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

  const handleOpenFolder = async () => {
    setLoading(true);
    await openFolder();
    setLoading(false);
  };

  const handleToggleFolder = async (node: FileNode) => {
    if (node.type !== 'folder') return;

    const updateTree = async (nodes: FileNode[]): Promise<FileNode[]> => {
      const result: FileNode[] = [];
      for (const n of nodes) {
        if (n.path === node.path) {
          if (!n.expanded) {
            // Load children if expanding
            const children = await loadDirectory(n.path);
            result.push({ ...n, expanded: true, children });
          } else {
            result.push({ ...n, expanded: false });
          }
        } else if (n.children) {
          result.push({ ...n, children: await updateTree(n.children) });
        } else {
          result.push(n);
        }
      }
      return result;
    };

    const updatedFiles = await updateTree(workingDirFiles);
    setWorkingDirFiles(updatedFiles);
  };

  const handleFileSelect = async (node: FileNode) => {
    if (!window.electronAPI || node.type !== 'file') return;
    
    const result = await window.electronAPI.readFile(node.path);
    if (result.success && result.content !== undefined) {
      openFile(node.path, node.name, result.content);
    }
  };

  // No folder opened - show welcome message
  if (!workingDir) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-empty">
          <p>No folder opened</p>
          <button className="open-folder-btn" onClick={handleOpenFolder}>
            <FolderOpenIcon size={16} /> Open Folder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span className="folder-name" title={workingDir}>
          {workingDir.split(/[/\\]/).pop()}
        </span>
        <button className="refresh-btn" onClick={() => loadDirectory(workingDir).then(setWorkingDirFiles)} title="Refresh">
          <RefreshIcon size={14} />
        </button>
      </div>
      <div className="file-tree">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : workingDirFiles.length === 0 ? (
          <div className="empty-folder">Empty folder</div>
        ) : (
          workingDirFiles.map((node, index) => (
            <FileTreeItem
              key={`${node.path}-${index}`}
              node={node}
              depth={0}
              onSelect={handleFileSelect}
              onToggle={handleToggleFolder}
            />
          ))
        )}
      </div>
    </div>
  );
}
