import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="landing-layout bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
      {/* Top Navigation */}
      <nav className="bg-[#041329]/70 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-2xl shadow-[#000000]/40">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto z-50">
          <div className="text-xl font-bold tracking-tighter text-[#3cd7ff] font-headline">Reality Shield</div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-['Space_Grotesk'] text-sm tracking-wide text-[#3cd7ff] font-bold border-b-2 border-[#3cd7ff] pb-1" href="#features">Features</a>
            <a className="font-['Space_Grotesk'] text-sm tracking-wide text-[#d6e3ff]/70 hover:text-[#d6e3ff] transition-colors" href="#how-it-works">How it Works</a>
            <a className="font-['Space_Grotesk'] text-sm tracking-wide text-[#d6e3ff]/70 hover:text-[#d6e3ff] transition-colors" href="#security">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[#d6e3ff]/70 font-headline text-sm hover:text-[#d6e3ff] transition-colors">Login</Link>
            <Link to="/signup" className="flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-[#002e3a] px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-wider scale-95 active:scale-90 transition-transform">Get Started</Link>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-outline-variant/15 to-transparent"></div>
      </nav>
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-primary/20 w-fit mb-8">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-label uppercase tracking-widest text-primary">On-Device Intelligence Active</span>
              </div>
              <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.1] mb-6">
                Protecting Real People from <span className="text-transparent text-gradient bg-clip-text">Synthetic Threats</span>.
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl mb-10 font-light leading-relaxed">
                Experience the ultimate digital aegis. Reality Shield detects deepfakes, clones, and AI-generated deception in real-time, completely offline. No data leaves your device.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="bg-gradient-to-br flex items-center justify-center from-primary to-primary-container text-[#002e3a] px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20">
                  Initialize Shield
                </Link>
                <button className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest border border-outline/20 text-on-surface hover:bg-surface-bright/30 transition-all">
                  View Tech Specs
                </button>
              </div>
              <div className="mt-12 flex gap-12 items-center">
                <div>
                  <div className="text-2xl font-headline font-bold text-secondary">0ms</div>
                  <div className="text-xs text-outline uppercase tracking-tighter">Latency</div>
                </div>
                <div className="w-[1px] h-8 bg-outline-variant/30"></div>
                <div>
                  <div className="text-2xl font-headline font-bold text-secondary">100%</div>
                  <div className="text-xs text-outline uppercase tracking-tighter">Offline</div>
                </div>
                <div className="w-[1px] h-8 bg-outline-variant/30"></div>
                <div>
                  <div className="text-2xl font-headline font-bold text-secondary">Zero</div>
                  <div className="text-xs text-outline uppercase tracking-tighter">Data Logging</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Signature Trust Score Shield */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-[12px] border-surface-container-highest glass-panel flex flex-col items-center justify-center inner-glow-safe relative">
                <div className="absolute inset-0 rounded-full border border-primary/30 scale-110"></div>
                <div className="absolute inset-0 rounded-full border border-secondary/10 scale-125"></div>
                <span className="text-label text-secondary tracking-widest uppercase mb-2">Integrity Score</span>
                <div className="text-8xl lg:text-9xl font-headline font-bold text-on-surface tracking-tighter">99</div>
                <span className="text-sm font-label text-secondary/80 font-medium tracking-widest uppercase mt-2">Atmosphere: Pure</span>
                {/* Status HUD bits */}
                <div className="absolute -top-4 -right-4 bg-surface-bright p-4 rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary block mb-1">verified_user</span>
                  <span className="text-[10px] font-label text-outline uppercase">Neural Lock</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="features">
          <div className="mb-16">
            <h2 className="text-headline text-3xl font-bold mb-4">Atmospheric Protection Layers</h2>
            <p className="text-on-surface-variant max-w-2xl font-light">The Sentinel Interface operates across all sensory inputs, creating a seamless barrier between you and synthetic deception.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-surface-container-low rounded-xl p-8 overflow-hidden relative group">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary">record_voice_over</span>
                  </div>
                  <h3 className="text-headline text-2xl font-bold mb-4">Live Voice &amp; Call Scam Detector</h3>
                  <p className="text-on-surface-variant max-w-md font-light">Real-time spectral analysis of incoming audio. Detects synthetic vocal patterns, clones, and latency markers in cellular and VOIP calls instantly.</p>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline uppercase tracking-widest mb-1">Sampling Rate</span>
                    <span className="text-on-surface font-headline font-medium">192kHz Ultra-High</span>
                  </div>
                  <div className="w-[1px] h-8 bg-outline-variant/30"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline uppercase tracking-widest mb-1">Process</span>
                    <span className="text-on-surface font-headline font-medium">On-Device NPU</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="h-full w-full bg-gradient-to-l from-primary/40 to-transparent flex items-end justify-center p-4">
                  <div className="flex gap-1 h-32 items-end">
                    <div className="w-2 h-1/2 bg-primary"></div>
                    <div className="w-2 h-3/4 bg-primary"></div>
                    <div className="w-2 h-full bg-primary"></div>
                    <div className="w-2 h-2/3 bg-primary"></div>
                    <div className="w-2 h-1/3 bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container rounded-xl p-8 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary">videocam</span>
              </div>
              <h3 className="text-headline text-xl font-bold mb-4">Video Deepfake Frame Checker</h3>
              <p className="text-sm text-on-surface-variant font-light mb-6">Analyzes 60 frames per second for inconsistencies in lighting, micro-expressions, and biometric pulses.</p>
              <div className="relative rounded-lg overflow-hidden h-40 bg-surface-container-highest">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuMz5qK0Ee21bGMKx3gSaHARkq6jeEdc0ol1YMxgz7k6tzIHJult0gRIhKYjQmSrzOGSEMVpNhymn6MlGVmozoZdoVbIhzPnjBV7yiKJryWsKp5w8dW63Ql9VXK0NZVr0Ge_uBA6tSw3Toy-aygXHhVwTTzqeLMBWAA3VjViA6bJk5p6BE2hNxBBZS4YpG1MFI866tXBblKY81Y1EownIo62abB-0TA1IEK0xUphIrZ4iJUmc9n_BSTp2rzfJ_8DWHPNFAOqlaikY" alt="Analyzing" />
                <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-[#00311f] bg-secondary px-2 py-1 rounded">SCANNING 100% PURE</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container rounded-xl p-8 relative overflow-hidden">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-tertiary">wallpaper</span>
              </div>
              <h3 className="text-headline text-xl font-bold mb-4">Image Integrity Scanner</h3>
              <p className="text-sm text-on-surface-variant font-light">Metadata and pixel-level forensic analysis to verify origin and detect generative AI manipulation.</p>
              <div className="mt-8 border-t border-outline-variant/20 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-outline uppercase font-label">Neural Artifacts</span>
                  <span className="text-xs text-secondary">None Detected</span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-secondary"></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 bg-gradient-to-br from-surface-container-low to-surface-container-highest rounded-xl p-10 flex flex-col md:flex-row items-center gap-12" id="security">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-sm bg-primary/20 text-[10px] font-bold text-primary tracking-widest uppercase mb-4">Proprietary Architecture</div>
                <h3 className="text-headline text-3xl font-bold mb-4">100% Offline by Design</h3>
                <p className="text-on-surface-variant font-light leading-relaxed">Most AI tools require the cloud. Reality Shield runs exclusively on your device hardware. Your voice, your face, and your data never touch a server. We don't just protect you; we preserve your privacy.</p>
              </div>
              <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-secondary/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
                <span className="material-symbols-outlined text-5xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats/CTA Section */}
        <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-headline text-4xl font-bold mb-6">Unrivaled Performance. Unbreakable Trust.</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-16 font-light">Join the vanguard of digital protection. Secure your communication ecosystem today with Reality Shield.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
              <div>
                <div className="text-4xl font-headline font-bold text-primary mb-2">99.9%</div>
                <div className="text-[10px] text-outline uppercase tracking-widest">Detection Rate</div>
              </div>
              <div>
                <div className="text-4xl font-headline font-bold text-primary mb-2">&lt;15ms</div>
                <div className="text-[10px] text-outline uppercase tracking-widest">Inference Time</div>
              </div>
              <div>
                <div className="text-4xl font-headline font-bold text-primary mb-2">0</div>
                <div className="text-[10px] text-outline uppercase tracking-widest">Cloud Dependencies</div>
              </div>
              <div>
                <div className="text-4xl font-headline font-bold text-primary mb-2">AES-256</div>
                <div className="text-[10px] text-outline uppercase tracking-widest">Local Encryption</div>
              </div>
            </div>
            
            <div className="bg-surface-container-high max-w-4xl mx-auto p-12 rounded-xl border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-headline text-2xl font-bold mb-8">Ready to secure your digital reality?</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to="/signup" className="flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-[#002e3a] px-10 py-5 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(60,215,255,0.3)] transition-all">
                    Download Reality Shield
                  </Link>
                  <button className="bg-surface-bright/50 backdrop-blur-md px-10 py-5 rounded-xl font-bold text-sm uppercase tracking-widest border border-outline-variant/30 hover:border-primary/50 transition-all">
                    Request Enterprise Demo
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 p-2 opacity-20">
                <div className="w-16 h-16 border-r-2 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#041329] full-width py-12 border-t border-[#414754]/15 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="text-lg font-black text-[#d6e3ff] font-headline mb-2">Reality Shield</div>
            <div className="font-['Inter'] text-xs text-[#d6e3ff]/50">© 2024 Reality Shield. Advanced Atmospheric Protection.</div>
          </div>
          <div className="flex gap-8">
            <a className="font-['Inter'] text-xs text-[#d6e3ff]/50 hover:text-[#3cd7ff] transition-colors" href="#">Privacy Policy</a>
            <a className="font-['Inter'] text-xs text-[#d6e3ff]/50 hover:text-[#3cd7ff] transition-colors" href="#">Terms of Service</a>
            <a className="font-['Inter'] text-xs text-[#d6e3ff]/50 hover:text-[#3cd7ff] transition-colors" href="#">Security Whitepaper</a>
            <a className="font-['Inter'] text-xs text-[#d6e3ff]/50 hover:text-[#3cd7ff] transition-colors" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
