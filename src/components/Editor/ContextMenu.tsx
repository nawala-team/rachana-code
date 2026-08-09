import './ContextMenu.css';

interface MenuItem {
  label: string;
  action: () => void;
  icon?: string;
  divider?: boolean;
  disabled?: boolean;
}

interface Props {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  return (
    <>
      <div className="context-overlay" onClick={onClose} />
      <div className="context-menu" style={{ left: x, top: y }}>
        {items.map((item, i) => 
          item.divider ? (
            <div key={i} className="context-divider" />
          ) : (
            <button
              key={i}
              className={`context-item ${item.disabled ? 'disabled' : ''}`}
              onClick={() => { if (!item.disabled) { item.action(); onClose(); } }}
            >
              {item.icon && <span className="context-icon">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
    </>
  );
}
