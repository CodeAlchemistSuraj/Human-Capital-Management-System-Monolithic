import { Link } from 'react-router-dom';

export default function QuickActions({ actions }) {
  return (
    <div className="quick-actions">
      {actions.map((action, idx) => (
        <Link
          key={idx}
          to={action.href}
          className="quick-action-button"
        >
          {action.icon && <action.icon size={20} />}
          {action.label}
        </Link>
      ))}
    </div>
  );
}