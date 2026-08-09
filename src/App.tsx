import { useState } from 'react';
import './styles/design-system.css';
import { SettingsProvider } from './context/SettingsContext';
import { NotificationProvider } from './context/NotificationContext';
import { EditorProvider } from './context/EditorContext';
import AppLayout from './components/Layout/AppLayout';
import NotificationToast from './components/Notifications/NotificationToast';
import WelcomeSetup from './components/Welcome/WelcomeSetup';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('rachana-setup-complete');
  });

  const handleSetupComplete = (themeId: string) => {
    // Save selected theme to settings
    const currentSettings = localStorage.getItem('rachana-settings');
    const settings = currentSettings ? JSON.parse(currentSettings) : {};
    settings.themeId = themeId;
    localStorage.setItem('rachana-settings', JSON.stringify(settings));
    
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeSetup onComplete={handleSetupComplete} />;
  }

  return (
    <SettingsProvider>
      <NotificationProvider>
        <EditorProvider>
          <AppLayout />
          <NotificationToast />
        </EditorProvider>
      </NotificationProvider>
    </SettingsProvider>
  );
}

export default App
