import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
  actions?: { label: string; onClick: () => void }[];
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((n: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const notification = { ...n, id };
    setNotifications(prev => [...prev, notification]);
    
    if (n.duration !== 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(x => x.id !== id));
      }, n.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}
