import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    
    // Simulate API request and redirect to login after delay
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div className="auth-layout bg-surface font-body text-on-surface selection:bg-primary/30 selection:text-primary min-h-screen">
      <main className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Background Atmospheric Element */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl shadow-black/40 border border-outline-variant/15 relative z-10">
          
          {/* Branding/Value Prop Section */}
          <section className="hidden md:flex flex-col justify-between p-12 bg-surface-container-low relative">
            <div className="relative z-10">
              <Link to="/" className="font-headline text-3xl font-bold tracking-tighter text-primary mb-8 hover:opacity-80 transition-opacity inline-block cursor-pointer">Reality Shield</Link>
              <div className="space-y-6">
                <h2 className="font-headline text-4xl font-medium leading-tight text-on-surface">
                  Establish your <span className="text-secondary">Atmospheric Protection</span>.
                </h2>
                <p className="text-on-surface-variant text-lg max-w-md">
                  Join the elite layer of digital defense. Our neural-mesh encryption starts with your unique signature.
                </p>
              </div>
            </div>
            
            <div className="mt-12 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                </div>
                <div>
                  <p className="font-headline text-sm font-bold uppercase tracking-widest text-secondary">Trust Score Peak</p>
                  <p className="text-xs text-on-surface-variant">Validated Security Infrastructure</p>
                </div>
              </div>
              <div className="h-[1px] w-full bg-outline-variant/10 mb-8"></div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>End-to-end encrypted identity provisioning</span>
              </div>
            </div>
            
            {/* Abstract Visual */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img className="w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8fyV1Z7BbJnekDLMgXzLUxi1h-4RSDKyAEyW0LC7y1vRXkijxbcdkPW-gV5dG1gfSFuUPeNy39h07Nk4jzvadfRqazWPgN4B4KLjPHZH98wmQRhwV_sSZNFUsQT8FMHNnLSS2l17WMlR7Msjf-XCDJFGu-vchQEApNcudPhobk5t6sikFx9gobgYo-kcwaQsE96CaWjjqzjniV2eajI85s4wOqa69W80x8NFvaZaJYvO27Ul-asHqFamElijbCUryfoplegEghI" alt="Neural Grid" />
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-surface-container-high p-8 md:p-16 flex flex-col justify-center relative">
            {/* Success State Overlay */}
            {success && (
              <div className="absolute inset-0 z-50 glass-panel flex flex-col items-center justify-center p-8 text-center animate-in" id="success-state">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6 shield-glow">
                  <span className="material-symbols-outlined text-secondary text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Account successfully created!</h3>
                <p className="text-on-surface-variant mb-8 max-w-[280px]">Your security profile has been provisioned. Redirecting to login...</p>
                <div className="w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-[2000ms] ease-linear w-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            )}

            <header className="mb-10">
              <div className="md:hidden font-headline text-xl font-bold tracking-tighter text-primary mb-6">Reality Shield</div>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Create Identity</h2>
              <p className="text-on-surface-variant text-sm">Initialize your secure access credentials</p>
            </header>

            <form className="space-y-6" onSubmit={handleSignup}>
              {/* Username */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-outline" htmlFor="username">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">fingerprint</span>
                  </div>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary focus:bg-surface-bright transition-all focus:outline-none" id="username" name="username" placeholder="unique_identifier" type="text" required />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-outline" htmlFor="password">New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">key</span>
                  </div>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary focus:bg-surface-bright transition-all focus:outline-none" id="password" name="password" placeholder="••••••••••••" type="password" required />
                  <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline/50 hover:text-on-surface" type="button">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-outline" htmlFor="confirm_password">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">enhanced_encryption</span>
                  </div>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary focus:bg-surface-bright transition-all focus:outline-none" id="confirm_password" name="confirm_password" placeholder="••••••••••••" type="password" required />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-[#002e3a] font-headline font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/10" type="submit">
                  Create Account
                </button>
              </div>

              <div className="pt-6 flex flex-col gap-4 text-center">
                <p className="text-xs text-on-surface-variant">
                  By proceeding, you agree to the <a className="text-primary hover:underline" href="#">Sentinel Protocols</a> and <a className="text-primary hover:underline" href="#">Privacy Logic</a>.
                </p>
                <div className="h-[1px] w-full bg-outline-variant/10"></div>
                <p className="text-sm text-on-surface-variant">
                  Already have an identity? <Link to="/login" className="text-primary font-medium hover:text-primary-fixed transition-colors">Login</Link>
                </p>
              </div>
            </form>
          </section>
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
