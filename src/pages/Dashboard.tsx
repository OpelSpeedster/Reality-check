export function Dashboard() {
  return (
    <div className="page-content">
      {/* Hero Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">System Overview</h1>
          <div className="header-badges">
            <span className="badge badge-active">
              <span className="status-dot"></span>
              Aegis Active
            </span>
            <span className="badge-text">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>cloud_off</span>
              Offline Mode: Enabled
            </span>
          </div>
        </div>
        <div className="header-meta hide-mobile">
          <p className="meta-label">Last Integrity Check</p>
          <p className="meta-value accent">2.4ms ago</p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid bento-12">
        {/* Trust Score */}
        <div className="card card-trust bento-col-7">
          <div className="trust-glow"></div>
          <div className="trust-gauge">
            <svg className="gauge-svg" viewBox="0 0 256 256">
              <circle className="gauge-track" cx="128" cy="128" r="110" fill="transparent" strokeWidth="12" />
              <circle className="gauge-fill" cx="128" cy="128" r="110" fill="transparent" strokeWidth="12"
                strokeDasharray="691" strokeDashoffset="69" strokeLinecap="round" />
            </svg>
            <div className="gauge-center">
              <span className="gauge-number">92</span>
              <span className="gauge-label">Safe Zone</span>
            </div>
          </div>
          <div className="trust-info">
            <h2 className="section-title">Universal Trust Score</h2>
            <p className="section-desc">
              Your identity perimeter is currently optimized. We've detected and neutralized 14 synthetic voice attempts in the last 24 hours.
            </p>
            <div className="trust-stats">
              <div className="stat-card">
                <span className="stat-label">Deepfake Risk</span>
                <span className="stat-value safe">0.02%</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Identity Health</span>
                <span className="stat-value accent">Optimal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Protection */}
        <div className="bento-col-5 protection-stack">
          <h3 className="section-header-sm">Active Protection</h3>
          {[
            { icon: 'record_voice_over', title: 'Voice Spoof Filter', desc: 'Real-time spectral analysis' },
            { icon: 'photo_filter', title: 'Deepfake Imaging', desc: 'Artifact detection enabled' },
            { icon: 'fingerprint', title: 'Biometric Shield', desc: 'Continuous verification' },
          ].map((item) => (
            <div className="protection-item" key={item.title}>
              <div className="protection-icon-wrap">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="protection-text">
                <p className="protection-title">{item.title}</p>
                <p className="protection-desc">{item.desc}</p>
              </div>
              <div className="toggle toggle--on">
                <div className="toggle-thumb"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Neural Engine Hub */}
        <div className="card bento-col-4">
          <div className="card-header">
            <h3 className="section-header-sm">Neural Engine Hub</h3>
            <span className="material-symbols-outlined accent-icon">analytics</span>
          </div>
          <div className="engine-list">
            {[
              { name: 'Whisper STT v3', status: 'Running' },
              { name: 'Llama-3 Sentinel', status: 'Running' },
              { name: 'Vision Matrix 4.0', status: 'Running' },
            ].map((engine) => (
              <div className="engine-item" key={engine.name}>
                <div className="engine-icon">
                  <span className="material-symbols-outlined filled">bolt</span>
                </div>
                <span className="engine-name">{engine.name}</span>
                <span className="badge badge-running">{engine.status}</span>
              </div>
            ))}
          </div>
          <div className="load-bar-section">
            <div className="load-bar-header">
              <span>Total Load</span>
              <span>12%</span>
            </div>
            <div className="load-bar-track">
              <div className="load-bar-fill" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>

        {/* Intercept Log */}
        <div className="card bento-col-8">
          <div className="card-header">
            <h3 className="section-header-sm">Intercept Log</h3>
            <button className="btn-text accent">Download Archive</button>
          </div>
          <div className="log-list">
            {[
              { icon: 'warning', iconClass: 'tertiary', title: 'Voice Anomaly Blocked', desc: 'Incoming Call: +1 (555) 012-4432', time: '2m ago' },
              { icon: 'verified_user', iconClass: 'safe', title: 'Biometric Re-validation', desc: 'Auth Key: XY-8829-AB', time: '15m ago' },
              { icon: 'sync', iconClass: 'accent', title: 'Offline DB Update', desc: 'Deepfake Signature V.21.4', time: '1h ago' },
            ].map((log) => (
              <div className="log-item" key={log.title}>
                <div className="log-item-left">
                  <span className={`material-symbols-outlined log-icon log-icon--${log.iconClass}`}>{log.icon}</span>
                  <div>
                    <p className="log-title">{log.title}</p>
                    <p className="log-desc">{log.desc}</p>
                  </div>
                </div>
                <span className="log-time">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atmosphere overlays */}
      <div className="atmo atmo-1"></div>
      <div className="atmo atmo-2"></div>
    </div>
  );
}
