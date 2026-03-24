import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { initSDK } from './runanywhere';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { LiveCallMonitor } from './pages/LiveCallMonitor';
import { MediaScanner } from './pages/MediaScanner';
import { ScanHistory } from './pages/ScanHistory';
import { Settings } from './pages/Settings';
import { ReportScam } from './pages/ReportScam';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function App() {
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState<string | null>(null);

  useEffect(() => {
    initSDK()
      .then(() => setSdkReady(true))
      .catch((err) => setSdkError(err instanceof Error ? err.message : String(err)));
  }, []);

  if (sdkError) {
    return (
      <div className="app-loading">
        <div className="loading-icon">
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#ffb3b1' }}>error</span>
        </div>
        <h2>SDK Error</h2>
        <p className="error-text">{sdkError}</p>
      </div>
    );
  }

  if (!sdkReady) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <h2>Reality Shield</h2>
        <p>Initializing on-device AI engine...</p>
        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* App Shell Routes */}
      <Route path="/*" element={
        <div className="app-shell">
          <Sidebar />
          <TopBar />
          <main className="main-canvas">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/live-call" element={<LiveCallMonitor />} />
              <Route path="/media-scan" element={<MediaScanner />} />
              <Route path="/history" element={<ScanHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/report" element={<ReportScam />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      } />
    </Routes>
  );
}
