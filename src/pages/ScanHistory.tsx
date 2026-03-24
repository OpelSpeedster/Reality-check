export function ScanHistory() {
  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Scan History</h1>
          <p className="page-subtitle">Comprehensive audit trail of all neural network validations and reality integrity checks performed by the Sentinel engine.</p>
        </div>
        <div className="date-picker-badge">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_month</span>
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-card-inner">
            <p className="summary-label accent">Total Verified Scans</p>
            <div className="summary-value-row">
              <span className="summary-number">1,428</span>
              <span className="summary-change safe">+12%</span>
            </div>
          </div>
          <span className="material-symbols-outlined summary-bg-icon">verified_user</span>
        </div>
        <div className="summary-card">
          <div className="summary-card-inner">
            <p className="summary-label tertiary-text">Threats Blocked</p>
            <div className="summary-value-row">
              <span className="summary-number">42</span>
              <span className="summary-change tertiary-text">Critical</span>
            </div>
          </div>
          <span className="material-symbols-outlined summary-bg-icon tertiary-bg-icon">gpp_maybe</span>
        </div>
        <div className="summary-card summary-card--accent">
          <div className="summary-card-inner">
            <p className="summary-label safe-text">Deepfake Accuracy</p>
            <div className="summary-value-row">
              <span className="summary-number">99.9</span>
              <span className="summary-pct safe-text">%</span>
            </div>
          </div>
          <span className="material-symbols-outlined summary-bg-icon safe-bg-icon">psychology</span>
        </div>
      </div>

      {/* History Table */}
      <div className="card card-table-lg">
        {/* Filters */}
        <div className="table-filters">
          <div className="search-input-wrap">
            <span className="material-symbols-outlined search-icon">search</span>
            <input type="text" className="search-input" placeholder="Search by file name, ID or type..." id="search-history" />
          </div>
          <div className="filter-tabs">
            {['All Scans', 'Critical', 'Suspicious', 'Secure'].map((tab, i) => (
              <button key={tab} className={`filter-tab ${i === 0 ? 'filter-tab--active' : ''}`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-scroll">
          <table className="data-table data-table--lg">
            <thead>
              <tr>
                <th>Entity / Filename</th>
                <th>Scan ID</th>
                <th>Date & Time</th>
                <th>Trust Score</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'video_file', typeClass: 'tertiary', name: 'ceo_internal_memo.mp4', tag: 'Video Injection Attack', id: 'RS-88291-TX', date: 'Oct 24, 2023', time: '14:22:10 UTC', score: 12, scoreClass: 'tertiary' },
                { type: 'call', typeClass: 'safe', name: 'Incoming VoIP (Encrypted)', tag: 'Voice Bio-Verification', id: 'RS-88304-VC', date: 'Oct 24, 2023', time: '13:15:44 UTC', score: 98, scoreClass: 'safe' },
                { type: 'image', typeClass: 'accent', name: 'identity_card_scan.jpg', tag: 'Metadata Anomaly', id: 'RS-88312-IM', date: 'Oct 24, 2023', time: '11:02:19 UTC', score: 45, scoreClass: 'accent' },
                { type: 'settings_input_antenna', typeClass: 'tertiary', name: 'Neural Link Stream', tag: 'Adversarial Patch Detected', id: 'RS-88319-NL', date: 'Oct 23, 2023', time: '22:45:01 UTC', score: 8, scoreClass: 'tertiary' },
              ].map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="entity-cell">
                      <div className={`entity-icon entity-icon--${row.typeClass}`}>
                        <span className="material-symbols-outlined">{row.type}</span>
                      </div>
                      <div>
                        <p className="entity-name">{row.name}</p>
                        <p className="entity-tag">{row.tag}</p>
                      </div>
                    </div>
                  </td>
                  <td><code className="scan-id">{row.id}</code></td>
                  <td>
                    <p className="date-primary">{row.date}</p>
                    <p className="date-secondary">{row.time}</p>
                  </td>
                  <td>
                    <div className="score-cell">
                      <div className="score-bar">
                        <div className={`score-bar-fill score-bar-fill--${row.scoreClass}`} style={{ width: `${row.score}%` }}></div>
                      </div>
                      <span className={`score-value score-value--${row.scoreClass}`}>{row.score < 10 ? `0${row.score}` : row.score}%</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <button className="btn-icon">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="table-pagination">
          <p className="pagination-info">Showing <strong>1 - 4</strong> of 1,428 scans</p>
          <div className="pagination-controls">
            <button className="page-btn"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="page-btn page-btn--active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-text">
          <h2 className="cta-title">Uncover Hidden Forgeries</h2>
          <p className="cta-desc">Our neural architecture deep-dives into frequency domain analysis, detecting synthetic noise patterns invisible to the human eye.</p>
          <div className="cta-buttons">
            <button className="btn-primary" id="btn-new-upload">New Upload</button>
            <button className="btn-ghost" id="btn-view-docs">View Docs</button>
          </div>
        </div>
        <div className="cta-visual">
          <div className="cta-ring cta-ring--outer"></div>
          <div className="cta-ring cta-ring--inner"></div>
          <div className="cta-center-orb">
            <span className="material-symbols-outlined filled" style={{ fontSize: 48 }}>fingerprint</span>
          </div>
          <div className="cta-reality-badge">
            <p className="cta-badge-label">Reality Index</p>
            <div className="cta-badge-bar">
              <div className="cta-badge-bar-fill"></div>
            </div>
            <span className="cta-badge-pct">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
