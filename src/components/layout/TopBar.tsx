import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'System Overview',
  '/live-call': 'Live Call Monitor',
  '/media-scan': 'Media Integrity Lab',
  '/history': 'Scan History',
  '/settings': 'Aegis Configuration',
  '/report': 'Threat Reporting',
};

export function TopBar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Reality Shield';

  return (
    <header className="topbar" id="topbar">
      {/* Mobile brand */}
      <div className="topbar-brand-mobile">Reality Shield</div>
      {/* Desktop: contextual title */}
      <div className="topbar-title-desktop">
        <span className="status-pill">
          <span className="status-dot"></span>
          System Active
        </span>
      </div>
      <div className="topbar-actions">
        <span className="material-symbols-outlined topbar-icon" id="btn-sensors">sensors</span>
        <span className="material-symbols-outlined topbar-icon" id="btn-memory">memory</span>
        <span className="material-symbols-outlined topbar-icon" id="btn-account">account_circle</span>
      </div>
      <div className="topbar-glow"></div>
    </header>
  );
}
