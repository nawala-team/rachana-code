import { useCallback, useEffect, useState } from 'react';
import './Resizer.css';

interface ResizerProps {
  direction: 'horizontal' | 'vertical';
  position: 'left' | 'right' | 'top' | 'bottom';
  onResize: (delta: number) => void;
}

export default function Resizer({ direction, position, onResize }: ResizerProps) {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    let lastPos = direction === 'horizontal' ? 0 : 0;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      if (lastPos !== 0) {
        let delta = currentPos - lastPos;
        if (position === 'left' || position === 'top') delta = -delta;
        onResize(delta);
      }
      lastPos = currentPos;
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, direction, position, onResize]);

  const className = `resizer resizer-${direction} resizer-${position} ${isResizing ? 'resizing' : ''}`;

  return <div className={className} onMouseDown={handleMouseDown} />;
}
