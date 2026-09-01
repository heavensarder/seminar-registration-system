import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { TsiLogo } from '../components/TsiLogo';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      if (username === 'main_admin' && password === 'Kizuna2026@#') {
        onLoginSuccess();
        navigate('/admin/dashboard');
      } else {
        setErrorMsg('Invalid username or password. Please try again.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#052322] flex flex-col items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden text-white font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#083331] to-transparent z-0"></div>

      <div className="w-full max-w-md z-10 relative">
        <div className="bg-[#083331]/80 backdrop-blur-xl border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="p-8 border-b border-[#16605b]/50 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-3 rounded-2xl mb-6 shadow-md">
              <TsiLogo size="md" />
            </div>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-widest text-white mb-1">
              Admin Portal
            </h2>
            <p className="text-teal-100/60 text-sm">
              Kizuna 2026 Seminar Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5 group">
              <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,43,50,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Secure Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-teal-200/60 hover:text-white text-xs transition-colors font-medium cursor-pointer"
          >
            ← Return to Public Site
          </button>
        </div>

      </div>
    </div>
  );
};
