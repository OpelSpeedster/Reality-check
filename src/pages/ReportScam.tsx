export function ReportScam() {
  return (
    <div className="page-content">
      {/* Header */}
      <div className="report-header">
        <h1 className="page-title">Aegis Threat Reporting</h1>
        <div className="title-underline"></div>
      </div>

      <div className="bento-grid bento-12">
        {/* Threat Summary */}
        <div className="card card-glass bento-col-12">
          <div className="threat-glow"></div>
          <div className="threat-summary">
            <div className="threat-info">
              <div className="threat-icon-wrap">
                <span className="material-symbols-outlined">emergency_home</span>
              </div>
              <div>
                <p className="threat-detected-label">Threat Detected</p>
                <h3 className="threat-title">Live Call #8829-AX: Synthetic Voice Pattern Detected</h3>
              </div>
            </div>
            <div className="log-id-badge">
              <span>LOG ID: AX-492-990</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bento-col-8 space-stack">
          <section className="card">
            <div className="report-form">
              {/* Scam Category */}
              <div className="form-group">
                <label className="form-label">Scam Category</label>
                <select className="custom-select custom-select--full" id="select-scam-category">
                  <option value="impersonation">Impersonation</option>
                  <option value="financial">Financial Fraud</option>
                  <option value="phishing">Phishing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Contact Method */}
              <div className="form-group">
                <label className="form-label">Contact Method Used</label>
                <div className="contact-methods">
                  {[
                    { icon: 'call', label: 'Phone Call' },
                    { icon: 'chat', label: 'WhatsApp' },
                    { icon: 'mail', label: 'Email' },
                    { icon: 'public', label: 'Social Media' },
                  ].map((c) => (
                    <button key={c.label} className="contact-method-btn" id={`method-${c.label.toLowerCase().replace(' ', '-')}`}>
                      <span className="material-symbols-outlined">{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea className="report-textarea" placeholder="Describe the incident in detail..." rows={5} id="report-description"></textarea>
              </div>

              {/* Toggle */}
              <div className="share-toggle">
                <div className="share-toggle-info">
                  <span className="material-symbols-outlined accent-icon">analytics</span>
                  <div>
                    <p className="share-toggle-title">Share anonymized scan data</p>
                    <p className="share-toggle-desc">Help improve local detection models</p>
                  </div>
                </div>
                <div className="toggle toggle--on">
                  <div className="toggle-thumb"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="report-actions">
            <button className="btn-primary btn-primary--full" id="btn-submit-report">
              Submit Report
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
            </button>
            <button className="btn-ghost" id="btn-cancel-report">Cancel</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bento-col-4 space-stack">
          <div className="card">
            <h4 className="forensic-data-title">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>fingerprint</span>
              Aegis Forensic Data
            </h4>
            <div className="forensic-data">
              <div className="forensic-row">
                <span>Deepfake Confidence</span>
                <span className="tertiary-text font-bold">98.4%</span>
              </div>
              <div className="load-bar-track">
                <div className="load-bar-fill load-bar-fill--tertiary" style={{ width: '98.4%' }}></div>
              </div>
              <div className="forensic-row">
                <span>Waveform Entropy</span>
                <span className="mono">0.124-σ</span>
              </div>
              <div className="forensic-row">
                <span>Source Node</span>
                <span className="mono">X-8829-AX</span>
              </div>
            </div>
          </div>

          <div className="card card-privacy">
            <img className="privacy-bg-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO_W6uY6t5g7eqSybHJHl1AO_8iTyd37nIUdmANRV4DL2Xf0CZzPSWGP8nb_A6kizXLc-_8-tJaqHGZOFXghMJIvSWUdsoemz9XJQTazXlFQL_8FSfaI9OkxT0eL8qd0nSWTBaHi-i5IuvC2ohcszAEPVHMGVhF97KF4ep_0HA42ltamhn6ErccsX5i3QYDjoGLmfeTUXDWCkp4QfQ8YmJmaQSkovSB8GjvKXeGBjZyx0iQBKvpHShg9jflxT2CTxPATYLwz1TmLY" alt="" />
            <div className="privacy-content">
              <h4 className="privacy-title">Privacy Shield Active</h4>
              <p className="privacy-desc">All reporting is handled via encrypted end-to-end protocols. Your personal identity remains obscured from training datasets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
