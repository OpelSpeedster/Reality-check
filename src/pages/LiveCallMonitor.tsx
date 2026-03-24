import { useState, useRef, useEffect, useCallback } from 'react';
import { VoicePipeline, ModelCategory, AudioCapture, SpeechActivity } from '@runanywhere/web';
import { VAD } from '@runanywhere/web-onnx';
import { useModelLoader } from '../hooks/useModelLoader';

type Message = { id: number; speaker: 'caller' | 'user'; text: string; time: string; flagged?: boolean; response?: string };

export function LiveCallMonitor() {
  const llmLoader = useModelLoader(ModelCategory.Language, true);
  const sttLoader = useModelLoader(ModelCategory.SpeechRecognition, true);
  const vadLoader = useModelLoader(ModelCategory.Audio, true);

  const [voiceState, setVoiceState] = useState<'idle' | 'loading' | 'listening' | 'processing'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [trustScore, setTrustScore] = useState(82);

  const micRef = useRef<AudioCapture | null>(null);
  const pipelineRef = useRef<VoicePipeline | null>(null);
  const vadUnsub = useRef<(() => void) | null>(null);
  const msgId = useRef(0);

  useEffect(() => {
    return () => {
      micRef.current?.stop();
      vadUnsub.current?.();
    };
  }, []);

  const ensureModels = useCallback(async () => {
    setVoiceState('loading');
    const results = await Promise.all([vadLoader.ensure(), sttLoader.ensure(), llmLoader.ensure()]);
    if (results.every(Boolean)) {
      setVoiceState('idle');
      return true;
    }
    return false;
  }, [vadLoader, sttLoader, llmLoader]);

  const processSpeech = useCallback(async (audioData: Float32Array) => {
    const pipeline = pipelineRef.current;
    if (!pipeline) return;

    micRef.current?.stop();
    vadUnsub.current?.();
    setVoiceState('processing');

    const tempId = ++msgId.current;
    setMessages(prev => [...prev, { id: tempId, speaker: 'caller', text: '...', time: new Date().toLocaleTimeString() }]);

    try {
      const result = await pipeline.processTurn(audioData, {
        maxTokens: 50,
        temperature: 0.4,
        systemPrompt: 'You are a scam detection AI monitor. If the caller\'s transcription asks for passwords, codes, gift cards, or uses extreme urgency to bypass security, reply ONLY with "SCAM_FLAGGED". Otherwise reply ONLY with "SAFE".',
      }, {
        onTranscription: (text) => {
          setMessages(prev => prev.map(m => m.id === tempId ? { ...m, text } : m));
        },
      });

      if (result) {
        const isFlagged = result.response.includes('SCAM_FLAGGED');
        setMessages(prev => prev.map(m => m.id === tempId ? { ...m, text: result.transcription, flagged: isFlagged, response: result.response } : m));
        if (isFlagged) {
          setTrustScore(prev => Math.max(12, prev - 35));
        }
      }
    } catch (err) {
      console.error(err);
    }

    setVoiceState('idle');
    // Auto resume recording after processing
    startMonitoringBackend();
  }, []);

  const startMonitoringBackend = useCallback(async () => {
    const mic = new AudioCapture({ sampleRate: 16000 });
    micRef.current = mic;
    if (!pipelineRef.current) pipelineRef.current = new VoicePipeline();

    VAD.reset();
    if (vadUnsub.current) vadUnsub.current();
    vadUnsub.current = VAD.onSpeechActivity((activity) => {
      if (activity === SpeechActivity.Ended) {
        const segment = VAD.popSpeechSegment();
        if (segment && segment.samples.length > 16000) { // ~1 second minimum audio
          processSpeech(segment.samples);
        }
      }
    });
    
    try {
      await mic.start((chunk) => { VAD.processSamples(chunk); }, () => {});
      setVoiceState('listening');
    } catch (e) {
      console.error(e);
      setVoiceState('idle');
    }
  }, [processSpeech]);

  const startMonitoring = useCallback(async () => {
    const ok = await ensureModels();
    if (!ok) return;
    setMessages([]);
    setTrustScore(99);
    await startMonitoringBackend();
  }, [ensureModels, startMonitoringBackend]);

  const stopMonitoring = useCallback(() => {
    micRef.current?.stop();
    vadUnsub.current?.();
    setVoiceState('idle');
  }, []);

  return (
    <div className="page-content">
      {/* Hero Grid */}
      <div className="bento-grid bento-12">
        {/* Trust Score */}
        <div className="card card-trust-compact bento-col-4">
          <div className="trust-gradient-bg"></div>
          <h2 className="section-header-xs">Universal Trust Score</h2>
          <div className="trust-gauge trust-gauge--sm">
            <svg className="gauge-svg" viewBox="0 0 192 192">
              <circle className="gauge-track" cx="96" cy="96" r="88" fill="transparent" strokeWidth="12" />
              <circle className="gauge-fill" cx="96" cy="96" r="88" fill="transparent" strokeWidth="12"
                strokeDasharray="553" strokeDashoffset={553 - (553 * trustScore) / 100} strokeLinecap="round" stroke={trustScore < 50 ? 'var(--error)' : 'var(--primary)'} />
            </svg>
            <div className="gauge-center">
              <span className="gauge-number" style={{ color: trustScore < 50 ? 'var(--error)' : 'var(--on-surface)' }}>{trustScore}</span>
              <span className="gauge-label">{trustScore < 50 ? 'Scam Warning' : 'Safe Caller'}</span>
            </div>
            <div className="gauge-inner-glow"></div>
          </div>
          <div className="trust-mini-stats">
            <div className="mini-stat">
              <span className="mini-stat-label">Identity</span>
              <span className="mini-stat-value safe">Verified</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Signal</span>
              <span className="mini-stat-value accent">Encryption: AES</span>
            </div>
          </div>
        </div>

        {/* Live Transcription */}
        <div className="card-bordered bento-col-8">
          <div className="card card-inner">
            <div className="transcript-header">
              <div className="transcript-title-group">
                <div className="pulse-dot"></div>
                <h3 className="section-title-sm">Live Transcription</h3>
              </div>
              <div className="transcript-actions">
                <div className="inference-badge hide-mobile">
                  <span>{voiceState === 'idle' ? 'Ready' : voiceState === 'loading' ? 'Loading Models...' : voiceState === 'listening' ? '🟢 Listening' : 'Processing...'}</span>
                </div>
                {voiceState === 'listening' || voiceState === 'processing' ? (
                  <button className="btn-ghost-sm" onClick={stopMonitoring} style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
                    Stop Monitoring
                  </button>
                ) : (
                  <button className="btn-primary" onClick={startMonitoring} disabled={voiceState === 'loading'}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>mic</span>
                    Start Monitoring
                  </button>
                )}
              </div>
            </div>
            <div className="transcript-messages">
              {messages.length === 0 && (
                <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  {voiceState === 'idle' ? 'Click "Start Monitoring" to enable local AI detection.' : 'Awaiting speech...'}
                </div>
              )}
              {messages.map((msg) => (
                <div className={`msg msg-${msg.speaker}`} key={msg.id}>
                  {msg.speaker === 'caller' && (
                    <div className="msg-avatar">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                  )}
                  <div className={`msg-bubble msg-bubble--${msg.speaker} ${msg.flagged ? 'msg-bubble--flagged' : ''}`}>
                    {msg.flagged && <div className="msg-flag-bar"></div>}
                    <p>{msg.text}</p>
                    {msg.response && (
                      <p style={{ fontSize: '10px', marginTop: 4, opacity: 0.5, fontStyle: 'italic' }}>LLM: {msg.response}</p>
                    )}
                    <div className={`msg-meta ${msg.speaker === 'user' ? 'msg-meta--right' : ''}`}>
                      {msg.speaker === 'user' && <span className="msg-tag tag-user">You</span>}
                      {msg.flagged && <span className="msg-tag tag-urgency">Threat Detected</span>}
                      {msg.speaker === 'caller' && !msg.flagged && <span className="msg-tag tag-caller">Caller</span>}
                      <span className="msg-time">{msg.time}</span>
                    </div>
                  </div>
                  {msg.speaker === 'user' && (
                    <div className="msg-avatar msg-avatar--user">
                      <span className="material-symbols-outlined">face</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bento-grid bento-3">
        {/* Neural Analysis Logs */}
        <div className="bento-col-2 space-stack">
          <h3 className="section-header-sm">Neural Analysis Logs</h3>
          <div className="card">
            {[
              { icon: 'warning', cls: 'tertiary', title: 'Urgency Pattern Detected', time: '0.4s ago', desc: 'AI detected linguistic markers associated with social engineering: "quickly", "prevent", "permanent freeze".' },
              { icon: 'security_update_warning', cls: 'error', title: 'Authority Claim Mismatch', time: '2.1m ago', desc: 'Voice profile does not match official institution voice prints. Potential deepfake or spoofed identity detected.' },
              { icon: 'verified_user', cls: 'safe', title: 'Signal Integrity Check', time: '5.0m ago', desc: 'Connection path verified through secure relay. Latency within normal parameters (42ms).' },
            ].map((log, i) => (
              <div className={`analysis-log-item ${i > 0 ? 'analysis-log-item--border' : ''}`} key={log.title}>
                <div className={`analysis-icon analysis-icon--${log.cls}`}>
                  <span className="material-symbols-outlined">{log.icon}</span>
                </div>
                <div className="analysis-content">
                  <div className="analysis-head">
                    <h4 className="analysis-title">{log.title}</h4>
                    <span className="analysis-time">{log.time}</span>
                  </div>
                  <p className="analysis-desc">{log.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vocal Stress Index */}
        <div className="card card-stress bento-col-1">
          <h3 className="section-header-sm">Vocal Stress Index</h3>
          <div className="stress-visualizer">
            <div className="stress-bars">
              {[40, 60, 30, 85, 70, 100, 90, 45, 55, 35].map((h, i) => (
                <div key={i} className={`stress-bar stress-bar--${h > 80 ? 'high' : h > 50 ? 'mid' : 'low'}`}
                  style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
          <div className="stress-summary">
            <div className="stress-level">
              <span className="stress-label">Stress Level</span>
              <span className="stress-value tertiary">Elevated</span>
            </div>
            <div className="stress-progress">
              <div className="stress-progress-fill"></div>
            </div>
            <div className="stress-scale">
              <span>Stable</span>
              <span>Variable</span>
              <span>Critical</span>
            </div>
          </div>
          <div className="stress-action">
            <button className="btn-ghost" id="btn-voiceprint">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>record_voice_over</span>
              Run Voice Print Match
            </button>
          </div>
        </div>
      </div>

      <div className="atmo atmo-3"></div>
      <div className="atmo atmo-4"></div>
    </div>
  );
}
