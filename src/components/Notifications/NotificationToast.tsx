import { useNotifications } from '../../context/NotificationContext';
import { InfoIcon, CheckIcon, WarningIcon, ErrorIcon } from '../Icons/Icons';
import './NotificationToast.css';

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();

  const icons = { 
    info: <InfoIcon size={14} />, 
    success: <CheckIcon size={14} />, 
    warning: <WarningIcon size={14} />, 
    error: <ErrorIcon size={14} /> 
  };

  if (!notifications.length) return null;

  return (
    <div className="notification-container">
      {notifications.map(n => (
        <div key={n.id} className={`notification-toast ${n.type}`}>
          <span className="notification-icon">{icons[n.type]}</span>
          <span className="notification-message">{n.message}</span>
          {n.actions?.map((a, i) => (
            <button key={i} className="notification-action" onClick={() => { a.onClick(); removeNotification(n.id); }}>{a.label}</button>
          ))}
          <button className="notification-close" onClick={() => removeNotification(n.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
