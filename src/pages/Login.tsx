import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'abc@123') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-layout bg-surface text-on-surface font-body selection:bg-primary/30">
      {/* Hero Background Element */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-md">
          {/* Brand Anchor */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center justify-center p-4 rounded-full bg-surface-container-highest mb-6 shadow-2xl shadow-black/40 hover:scale-105 transition-transform cursor-pointer">
              <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>shield_lock</span>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tighter text-on-surface mb-2">Reality Shield</h1>
            <p className="font-label text-on-surface-variant tracking-widest uppercase text-[10px]">Atmospheric Protection Protocol</p>
          </div>

          {/* Login Container */}
          <div className="glass-panel p-8 rounded-xl shadow-2xl relative border border-outline-variant/15 overflow-hidden">
            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            
            <div className="mb-8">
              <h2 className="font-headline text-xl font-medium text-on-surface">Secure Identity Access</h2>
              <p className="text-on-surface-variant text-sm mt-1">Verify your credentials to enter the secure perimeter.</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-error/10 border border-error/20 rounded-md p-3 text-sm text-error flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-lg">error</span>
                  {error}
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest ml-1" htmlFor="username">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">person</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-highest border-none rounded-sm py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary focus:bg-surface-bright transition-all focus:outline-none" 
                    id="username" 
                    name="username" 
                    placeholder="Sentinel ID" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest ml-1" htmlFor="password">Password</label>
                  <a className="text-[10px] text-outline hover:text-primary transition-colors uppercase tracking-tighter" href="#">Cipher Lost?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">key</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-highest border-none rounded-sm py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary focus:bg-surface-bright transition-all focus:outline-none" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Security Options */}
              <div className="flex items-center">
                <input className="w-4 h-4 rounded-sm bg-surface-container-highest border-none text-primary focus:ring-0 focus:ring-offset-0" id="remember" type="checkbox" />
                <label className="ml-2 text-xs text-on-surface-variant cursor-pointer" htmlFor="remember">Persistent Session Token</label>
              </div>

              {/* Primary Action */}
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-[#002e3a] font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
                <span>Sign In</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-outline-variant/15 flex flex-col items-center gap-4">
              <p className="text-xs text-on-surface-variant">New operative in the field?</p>
              <Link to="/signup" className="font-headline text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-2">
                Create an Account
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </Link>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="mt-12 flex justify-center gap-8 opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-[10px] font-label uppercase tracking-widest">Quantum Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">language</span>
              <span className="text-[10px] font-label uppercase tracking-widest">Global Node Access</span>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Corner Accents */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/20 pointer-events-none"></div>
    </div>
  );
}
