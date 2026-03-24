export function Settings() {
  return (
    <div className="page-content">
      {/* Hero */}
      <section className="settings-hero">
        <div className="settings-hero-text">
          <span className="settings-kicker">System Control</span>
          <h1 className="page-title">Defense <span className="accent">Architecture</span></h1>
          <p className="page-subtitle">Adjust the Reality Shield cognitive layer, encryption protocols, and hardware acceleration nodes. Changes to AI models require a container restart.</p>
        </div>
        <div className="uptime-badge hide-mobile">
          <div className="uptime-label">Protection Uptime</div>
          <div className="uptime-value">412:18:44</div>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="settings-grid">
        {/* AI Models */}
        <section className="card settings-card settings-card--wide">
          <div className="settings-card-bg">
            <span className="material-symbols-outlined">neurology</span>
          </div>
          <h3 className="settings-card-title">
            <span className="material-symbols-outlined accent-icon">psychology</span>
            AI Models Configuration
          </h3>
          <div className="settings-toggles">
            {[
              { icon: 'graphic_eq', name: 'Local Whisper', desc: 'On-device speech-to-text analysis', on: true },
              { icon: 'model_training', name: 'Llama Reasoning Engine', desc: 'Contextual fraud pattern detection', on: true },
              { icon: 'visibility_off', name: 'VLM Vision Scan', desc: 'Visual deepfake & UI manipulation detection', on: false },
            ].map((m) => (
              <div className="settings-toggle-row" key={m.name}>
                <div className="settings-toggle-info">
                  <div className={`settings-toggle-icon ${m.on ? '' : 'settings-toggle-icon--off'}`}>
                    <span className="material-symbols-outlined">{m.icon}</span>
                  </div>
                  <div>
                    <div className="settings-toggle-name">{m.name}</div>
                    <div className="settings-toggle-desc">{m.desc}</div>
                  </div>
                </div>
                <div className={`toggle ${m.on ? 'toggle--on' : 'toggle--off'}`}>
                  <div className="toggle-thumb"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Hardware */}
        <section className="card settings-card settings-card--narrow">
          <h3 className="settings-card-title">
            <span className="material-symbols-outlined accent-icon">memory</span>
            System Hardware
          </h3>
          <div className="hw-blocks">
            <div className="hw-block">
              <div className="hw-block-head">
                <span className="hw-label">WebGPU Status</span>
                <span className="badge badge-module badge-module--safe">Active</span>
              </div>
              <div className="load-bar-track">
                <div className="load-bar-fill" style={{ width: '78%' }}></div>
              </div>
              <div className="hw-block-foot">
                <span>Resource Load</span>
                <span>78%</span>
              </div>
            </div>
            <div className="hw-block">
              <div className="hw-block-head">
                <span className="hw-label">WASM Sandbox</span>
                <span className="badge badge-module badge-module--safe">Secure</span>
              </div>
              <div className="hw-check">
                <span className="material-symbols-outlined safe-icon">check_circle</span>
                <span>Isolated execution verified</span>
              </div>
            </div>
            <div className="hw-action">
              <button className="btn-outline" id="btn-diagnostics">Run Diagnostics</button>
            </div>
          </div>
        </section>

        {/* Privacy Core */}
        <section className="card settings-card settings-card--half">
          <h3 className="settings-card-title">
            <span className="material-symbols-outlined accent-icon">verified_user</span>
            Privacy Core
          </h3>
          <div className="privacy-controls">
            <div className="privacy-group">
              <label className="privacy-label">Offline-First Mode</label>
              <div className="mode-toggle">
                <button className="mode-btn mode-btn--active">Strict Local</button>
                <button className="mode-btn">Hybrid Cloud</button>
              </div>
            </div>
            <div className="privacy-group">
              <label className="privacy-label">Encryption Protocol</label>
              <div className="select-wrap">
                <select className="custom-select" id="select-encryption">
                  <option>XChaCha20-Poly1305 (Quantum Resistant)</option>
                  <option>AES-256-GCM (Standard)</option>
                  <option>Kyber-1024 (Post-Quantum)</option>
                </select>
                <span className="material-symbols-outlined select-chevron">expand_more</span>
              </div>
            </div>
            <div className="key-rotation">
              <div>
                <div className="key-rotation-label">Last Key Rotation</div>
                <div className="key-rotation-value">12 minutes ago</div>
              </div>
              <button className="btn-icon-sm">
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
        </section>

        {/* Alert UI Settings */}
        <section className="card settings-card settings-card--half">
          <h3 className="settings-card-title">
            <span className="material-symbols-outlined accent-icon">notification_important</span>
            Alert UI Settings
          </h3>
          <div className="alert-controls">
            <div className="slider-group">
              <div className="slider-header">
                <span>HUD Overlay Opacity</span>
                <span className="accent">85%</span>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: '85%' }}></div>
                <div className="slider-thumb" style={{ left: '85%' }}></div>
              </div>
            </div>
            <div className="haptic-group">
              <span>Haptic Feedback</span>
              <div className="haptic-options">
                <span className="haptic-option">Low</span>
                <span className="haptic-option haptic-option--active">Medium</span>
                <span className="haptic-option">High</span>
              </div>
            </div>
            <div className="visual-group">
              <label className="privacy-label">Critical Threat Visuals</label>
              <div className="visual-options">
                <div className="visual-option visual-option--glow">
                  <div className="visual-option-icon visual-option-icon--glow">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <span>Pulsing Glow</span>
                </div>
                <div className="visual-option">
                  <div className="visual-option-icon visual-option-icon--static">
                    <span className="material-symbols-outlined">block</span>
                  </div>
                  <span>Static High-Viz</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Banner */}
        <section className="config-banner">
          <div className="config-banner-info">
            <div className="config-banner-icon">
              <span className="material-symbols-outlined filled" style={{ fontSize: 32 }}>security</span>
            </div>
            <div>
              <h4 className="config-banner-title">Configuration Persistent</h4>
              <p className="config-banner-desc">Global settings are synced with your local hardware key. Your identity remains 100% anonymous.</p>
            </div>
          </div>
          <div className="config-banner-actions">
            <button className="btn-ghost" id="btn-reset">Reset to Default</button>
            <button className="btn-primary" id="btn-save">Save Changes</button>
          </div>
        </section>
      </div>

      <div className="atmo atmo-3"></div>
      <div className="atmo atmo-4"></div>
    </div>
  );
}
