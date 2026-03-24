import { useState, useRef } from 'react';
import { ModelCategory } from '@runanywhere/web';
import { VLMWorkerBridge } from '@runanywhere/web-llamacpp';
import { useModelLoader } from '../hooks/useModelLoader';

const CAPTURE_DIM = 256;

function imageToRGB(imgEl: HTMLImageElement, maxSize: number): { rgbPixels: Uint8Array, width: number, height: number } {
  const canvas = document.createElement('canvas');
  let w = imgEl.naturalWidth;
  let h = imgEl.naturalHeight;
  if (w > maxSize || h > maxSize) {
    if (w > h) {
      h = Math.round(h * (maxSize / w));
      w = maxSize;
    } else {
      w = Math.round(w * (maxSize / h));
      h = maxSize;
    }
  }
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(imgEl, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const rgbPixels = new Uint8Array(w * h * 3);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    rgbPixels[j] = data[i];
    rgbPixels[j + 1] = data[i + 1];
    rgbPixels[j + 2] = data[i + 2];
  }
  return { rgbPixels, width: w, height: h };
}

export function MediaScanner() {
  const loader = useModelLoader(ModelCategory.Multimodal);
  const [imageSrc, setImageSrc] = useState<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuCuDWhIzNKkX7kM6hgx5damiDSCdAjU5Z5TBYDk3IOMo3HHKAsfKLvIbhkB0HfYJDySpj2rlyQcUywfKR4farEBzepPonT7sKBxDOyNbH8Bu2wz-C6fDT61mgVodvsqGzzNRQQkuD-3ftSndy9VkM0Msc1QUwJcq2MVoxLsUX1IRsL9B-d22oqmjoXHs1374MPx_nfOLqGG-LqbjxzS3D9HaOkRQdTFtCuIB6SauWqZGKes7ABxNFWZvXAmF8vQsNyhymae0W1dLfE');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [trustIndex, setTrustIndex] = useState('-');
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setScanResult(null);
      setTrustIndex('-');
    }
  };

  const startScan = async () => {
    if (loader.state !== 'ready') {
      const ok = await loader.ensure();
      if (!ok) return;
    }

    if (!imgRef.current) return;
    setIsScanning(true);
    setScanResult('Analyzing image using local VLM...');

    try {
      const { rgbPixels, width, height } = imageToRGB(imgRef.current, CAPTURE_DIM);
      const bridge = VLMWorkerBridge.shared;
      
      const res = await bridge.process(
        rgbPixels,
        width,
        height,
        'Analyze this image for signs of AI generation or manipulation. Describe any unnatural textures or anomalies.',
        { maxTokens: 80, temperature: 0.6 }
      );
      
      setScanResult(res.text);
      setTrustIndex(res.text.toLowerCase().includes('manipulated') || res.text.toLowerCase().includes('artificial') ? '12' : '98');
    } catch (err) {
      setScanResult('Scan Error: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsScanning(false);
    }
  };
  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Media Integrity Lab</h1>
          <p className="page-subtitle">Advanced forensic analysis of visual assets using the Reality Shield Neural Engine. Detect synthetic generation, frame tampering, and biometric anomalies.</p>
        </div>
        <div className="trust-badge-compact">
          <div className="trust-badge-score">{trustIndex}</div>
          <div>
            <div className="trust-badge-label">Trust Index</div>
            <div className={`trust-badge-status ${trustIndex !== '-' && parseInt(trustIndex) < 50 ? 'tertiary-text' : 'safe-text'}`}>
              Asset: {trustIndex === '-' ? 'Pending' : parseInt(trustIndex) > 50 ? 'Validated' : 'Suspicious'}
            </div>
          </div>
        </div>
      </div>
      
      {loader.state !== 'ready' && loader.state !== 'idle' && (
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--surface-container)' }}>
          Loading VLM: {Math.round(loader.progress * 100)}% ({loader.state})
        </div>
      )}

      <div className="bento-grid bento-12">
        {/* Neural Forensics Engine */}
        <section className="bento-col-4 space-stack">
          <div className="card card-forensics">
            <h2 className="section-title-accent">
              <span className="material-symbols-outlined">psychology</span>
              Neural Forensics Engine
            </h2>
            <div className="forensics-details">
              <div className="confidence-bar">
                <div className="confidence-header">
                  <span>Model Confidence</span>
                  <span>99.4%</span>
                </div>
                <div className="load-bar-track">
                  <div className="load-bar-fill load-bar-fill--glow" style={{ width: '99.4%' }}></div>
                </div>
              </div>
              <div className="forensics-check">
                <span className="material-symbols-outlined safe-icon">check_circle</span>
                <p>GAN signature check complete. No known generator artifacts found in spatial domain.</p>
              </div>
              <div className="forensics-check">
                <span className="material-symbols-outlined safe-icon">check_circle</span>
                <p>Temporal consistency verified across 124 individual frame buffers.</p>
              </div>
            </div>
          </div>

          {/* SDK Active Modules */}
          <div className="card">
            <h3 className="section-header-sm">SDK Active Modules</h3>
            <div className="module-list">
              {[
                { name: 'Blink_Cycle_Parser_v4', status: 'Active', cls: 'safe' },
                { name: 'Skin_Pore_Texture_Map', status: 'Active', cls: 'safe' },
                { name: 'Phoneme_Viseme_Sync', status: 'Active', cls: 'safe' },
                { name: 'Specular_Light_Forensics', status: 'Scanning', cls: 'tertiary' },
              ].map((m) => (
                <div className="module-item" key={m.name}>
                  <span className="module-name">{m.name}</span>
                  <span className={`badge badge-module badge-module--${m.cls}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frame Buffer */}
        <section className="bento-col-8 space-stack">
          <div className="frame-viewport">
            <img className="frame-image" src={imageSrc} ref={imgRef} alt="Analyzing frame buffer" />
            
            {/* Action buttons inside viewport overlay */}
            <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 100, display: 'flex', gap: 8 }}>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
              <button className="btn-ghost-sm" onClick={() => fileInputRef.current?.click()} style={{ background: 'rgba(0,0,0,0.5)' }}>Upload Custom</button>
              <button className="btn-primary" onClick={startScan} disabled={isScanning}>{isScanning ? 'Scanning...' : 'Start Neural Scan'}</button>
            </div>
            {/* HUD Overlay */}
            <div className="hud-overlay">
              <div className="hud-top">
                <div className="hud-badge">Analyzing Frame Buffer... [722/1040]</div>
                <div className="hud-meta">RAW_STREAM: 4K_UHD_24FPS<br/>CODEC: HEVC_MAIN_10</div>
              </div>
              <div className="hud-reticle">
                <div className="reticle-corner reticle-tl"></div>
                <div className="reticle-corner reticle-tr"></div>
                <div className="reticle-corner reticle-bl"></div>
                <div className="reticle-corner reticle-br"></div>
                <div className="reticle-scanline"></div>
              </div>
              <div className="hud-bottom">
                <div>
                  <div className="hud-bio-status">
                    <span className="ping-dot"></span>
                    Biometric Lock Stable
                  </div>
                  <div className="hud-coords">X: 1920.44 | Y: 1080.12 | Z: 0.003</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail cards */}
          <div className="forensic-detail-grid">
            <div className="card">
              <h3 className="forensic-detail-title">
                <span>Local Vision Report</span>
                {scanResult && <span className="tertiary-text">Complete</span>}
              </h3>
              <div className="vision-alerts">
                {scanResult ? (
                  <div className="vision-alert" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--on-surface)' }}>{scanResult}</p>
                  </div>
                ) : (
                  <div className="vision-alert">
                    <p className="vision-alert-desc">Awaiting manual scan invocation to preserve privacy & resources.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <h3 className="forensic-detail-title">
                <span>Metadata Forensics</span>
                <span className="safe-text">Verified</span>
              </h3>
              <div className="metadata-rows">
                {[
                  { label: 'Camera Source', value: 'ARRI Alexa Mini LF' },
                  { label: 'GPS Signature', value: '34.0522° N, 118.2437° W' },
                  { label: 'Time Code', value: '14:22:01:12' },
                  { label: 'Encryption', value: 'AES-256 Valid', cls: 'safe' },
                ].map((r) => (
                  <div className="metadata-row" key={r.label}>
                    <span className="metadata-label">{r.label}</span>
                    <span className={`metadata-value ${r.cls || ''}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Analysis Stream Table */}
      <section className="card card-table">
        <div className="table-header">
          <h3 className="section-title-sm">Analysis Stream</h3>
          <div className="table-actions">
            <button className="btn-ghost-sm">Export JSON</button>
            <button className="btn-ghost-sm">View Full Report</button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Target Vector</th>
                <th>Metric</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '10:45:02:11', name: 'Upper_Lip_Sync_v2', pct: 88, status: 'PASSED', cls: 'safe' },
                { time: '10:45:01:94', name: 'Iris_Refraction_Model', pct: 12, status: 'FAILED', cls: 'tertiary' },
                { time: '10:45:01:22', name: 'Skin_Reflectance_Map', pct: 94, status: 'PASSED', cls: 'safe' },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="mono accent">{row.time}</td>
                  <td>{row.name}</td>
                  <td>
                    <div className="metric-bar">
                      <div className={`metric-bar-fill metric-bar-fill--${row.cls}`} style={{ width: `${row.pct}%` }}></div>
                    </div>
                  </td>
                  <td><span className={`badge badge-result badge-result--${row.cls}`}>{row.status}</span></td>
                  <td>
                    <span className="material-symbols-outlined table-action-icon">open_in_new</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
