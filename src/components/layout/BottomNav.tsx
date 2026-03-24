import { NavLink } from 'react-router-dom';

const bottomItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dash' },
  { to: '/live-call', icon: 'settings_input_antenna', label: 'Live' },
  { to: '/media-scan', icon: 'fingerprint', label: 'Scan' },
  { to: '/history', icon: 'history', label: 'Logs' },
  { to: '/settings', icon: 'settings', label: 'Set' },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" id="bottom-nav">
      {bottomItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'bottom-nav-item--active' : ''}`}
          id={`btm-${item.label.toLowerCase()}`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
