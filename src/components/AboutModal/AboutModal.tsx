import { useEffect, useRef } from 'react';
import './AboutModal.css';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="about-modal-overlay">
      <div className="about-modal" ref={modalRef}>
        <button className="about-close-x" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="about-modal-content">
          <div className="about-header">
            <div className="about-logo-modern">
              <div className="logo-glow"></div>
              <span className="logo-symbol">R</span>
            </div>
            <div className="about-title-group">
              <h1>Rachana Code</h1>
              <div className="about-version-badge">v1.0.0</div>
            </div>
          </div>

          <p className="about-tagline">
            Code editor untuk developer Indonesia
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-value">15+</span>
              <span className="stat-label">Themes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">∞</span>
              <span className="stat-label">Possibilities</span>
            </div>
          </div>

          <div className="about-tech-stack">
            <span className="tech-tag">React</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">Monaco</span>
            <span className="tech-tag">Vite</span>
          </div>

          <div className="about-footer">
            <div className="about-copyright-modern">
              <span className="copyright-symbol">©</span>
              <span>2026 Nawala Team</span>
            </div>
            <a 
              href="https://github.com/nawala" 
              target="_blank" 
              rel="noopener noreferrer"
              className="about-github-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
