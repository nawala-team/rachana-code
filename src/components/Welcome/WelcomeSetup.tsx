import { useState } from 'react';
import { themes, type Theme } from '../../data/themes';
import { BoltIcon, PaletteIcon, LockIcon, RocketIcon, MoonIcon, SunIcon } from '../Icons/Icons';
import './WelcomeSetup.css';

function WelcomeIntro({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="welcome-intro">
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 100 100" className="logo-svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#logoGrad)" />
            <text x="50" y="68" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">R</text>
          </svg>
        </div>
        <div className="logo-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
        </div>
      </div>
      
      <h1 className="welcome-title"><span className="gradient-text">Rachana Code</span></h1>
      <p className="welcome-subtitle">by NAWALA Team</p>
      
      <p className="welcome-description">
        A modern, lightweight code editor built for developers who value
        <span className="highlight"> speed</span>,
        <span className="highlight"> simplicity</span>, and
        <span className="highlight"> privacy</span>.
      </p>

      <div className="features-grid">
        <div className="feature-card"><span className="feature-icon"><BoltIcon size={20} /></span><span>Lightning Fast</span></div>
        <div className="feature-card"><span className="feature-icon"><PaletteIcon size={20} /></span><span>Beautiful Themes</span></div>
        <div className="feature-card"><span className="feature-icon"><LockIcon size={20} /></span><span>Zero Telemetry</span></div>
        <div className="feature-card"><span className="feature-icon"><RocketIcon size={20} /></span><span>50+ Languages</span></div>
      </div>

      <button className="welcome-btn primary" onClick={onContinue}>
        <span>Get Started</span><span className="btn-arrow">→</span>
      </button>
    </div>
  );
}

interface ThemeSelectionProps {
  darkThemes: Theme[];
  lightThemes: Theme[];
  selectedTheme: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

function ThemeSelection({ darkThemes, lightThemes, selectedTheme, onSelect, onBack, onContinue }: ThemeSelectionProps) {
  const ThemeCard = ({ theme }: { theme: Theme }) => (
    <button
      className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
      onClick={() => onSelect(theme.id)}
      style={{
        '--theme-bg': theme.colors.bg,
        '--theme-bg2': theme.colors.bgSecondary,
        '--theme-accent': theme.colors.accent,
        '--theme-text': theme.colors.text,
      } as React.CSSProperties}
    >
      <div className="theme-preview">
        <div className="preview-sidebar"></div>
        <div className="preview-editor">
          <div className="preview-line line-1"></div>
          <div className="preview-line line-2"></div>
          <div className="preview-line line-3"></div>
        </div>
      </div>
      <span className="theme-name">{theme.name}</span>
      {selectedTheme === theme.id && <span className="check-mark">✓</span>}
    </button>
  );

  return (
    <div className="theme-selection">
      <h2 className="theme-title">Choose Your Theme</h2>
      <p className="theme-subtitle">Select a color theme that suits your style. You can change this anytime.</p>

      <div className="theme-sections">
        <div className="theme-section">
          <h3 className="section-label"><MoonIcon size={16} /> Dark Themes</h3>
          <div className="theme-grid">
            {darkThemes.map(t => <ThemeCard key={t.id} theme={t} />)}
          </div>
        </div>
        <div className="theme-section">
          <h3 className="section-label"><SunIcon size={16} /> Light Themes</h3>
          <div className="theme-grid">
            {lightThemes.map(t => <ThemeCard key={t.id} theme={t} />)}
          </div>
        </div>
      </div>

      <div className="theme-actions">
        <button className="welcome-btn secondary" onClick={onBack}>← Back</button>
        <button className="welcome-btn primary" onClick={onContinue}>
          <span>Start Coding</span><span className="btn-arrow"><RocketIcon size={14} /></span>
        </button>
      </div>
    </div>
  );
}

interface WelcomeSetupProps {
  onComplete: (themeId: string) => void;
}

export default function WelcomeSetup({ onComplete }: WelcomeSetupProps) {
  const [selectedTheme, setSelectedTheme] = useState('rachana-dark');
  const [step, setStep] = useState(0);

  const darkThemes = themes.filter(t => t.type === 'dark');
  const lightThemes = themes.filter(t => t.type === 'light');

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else {
      localStorage.setItem('rachana-setup-complete', 'true');
      onComplete(selectedTheme);
    }
  };

  return (
    <div className="welcome-setup">
      <div className="welcome-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>

      <div className="welcome-container">
        {step === 0 ? (
          <WelcomeIntro onContinue={handleContinue} />
        ) : (
          <ThemeSelection
            darkThemes={darkThemes}
            lightThemes={lightThemes}
            selectedTheme={selectedTheme}
            onSelect={setSelectedTheme}
            onBack={() => setStep(0)}
            onContinue={handleContinue}
          />
        )}
        <div className="step-indicators">
          <span className={`step-dot ${step === 0 ? 'active' : ''}`}></span>
          <span className={`step-dot ${step === 1 ? 'active' : ''}`}></span>
        </div>
      </div>
    </div>
  );
}
