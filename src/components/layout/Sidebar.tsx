import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/live-call', icon: 'settings_input_antenna', label: 'Live Call Monitor' },
  { to: '/media-scan', icon: 'fingerprint', label: 'Image/Video Scan' },
  { to: '/history', icon: 'history', label: 'History' },
  { to: '/settings', icon: 'settings', label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar-nav">
      <div className="sidebar-brand">
        <div className="brand-name">Reality Shield</div>
        <div className="brand-status">
          <span className="status-dot"></span>
          AI Engine: Online
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
            id={`nav-${item.label.toLowerCase().replace(/[\s\/]/g, '-')}`}
          >
            <span className="material-symbols-outlined nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/report" className={({ isActive }) => `btn-deep-scan ${isActive ? 'active' : ''}`} id="btn-deep-scan">
          Deep Scan Now
        </NavLink>
        <a href="#" className="footer-link" id="link-support">
          <span className="material-symbols-outlined">help</span>
          <span>Support</span>
        </a>
        <a href="#" className="footer-link" id="link-signout">
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
