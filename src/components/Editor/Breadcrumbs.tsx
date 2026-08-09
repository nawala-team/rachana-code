import { FolderIcon } from '../Icons/Icons';
import './Breadcrumbs.css';

interface Props {
  path: string;
  onNavigate?: (path: string) => void;
}

export default function Breadcrumbs({ path, onNavigate }: Props) {
  const parts = path.split('/').filter(Boolean);
  
  return (
    <div className="breadcrumbs">
      <span className="breadcrumb-item" onClick={() => onNavigate?.('/')}><FolderIcon size={14} /></span>
      {parts.map((part, i) => {
        const fullPath = '/' + parts.slice(0, i + 1).join('/');
        const isLast = i === parts.length - 1;
        return (
          <span key={i}>
            <span className="breadcrumb-sep">›</span>
            <span className={`breadcrumb-item ${isLast ? 'current' : ''}`} 
              onClick={() => !isLast && onNavigate?.(fullPath)}>
              {part}
            </span>
          </span>
        );
      })}
    </div>
  );
}
