import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { apiCall, API_BASE_URL } from '../../utils/api';
import { ShieldCheck, Lock, User, Eye, EyeOff, RefreshCw, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg(language === 'en' ? 'Please fill in all fields.' : 'தயவுசெய்து அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUsername', data.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-16 bg-gradient-to-br from-[#120001] via-[#350204] to-[#0f0102] transition-colors duration-300">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cca43b]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a080a]/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-[#4a080a]/25 dark:bg-black/55 backdrop-blur-md border border-[#cca43b]/30 rounded-[30px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Logo and Brand Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex relative">
            <div className="absolute inset-0 bg-[#cca43b]/25 rounded-full blur-md animate-pulse" />
            <div className="relative bg-gradient-to-br from-[#4a080a] to-[#781215] border border-[#cca43b]/50 p-4 rounded-full text-[#cca43b] shadow-lg">
              <ShieldCheck className="w-9 h-9 filter drop-shadow-[0_2px_8px_rgba(204,164,59,0.3)]" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#cca43b] tracking-wider uppercase">
              {t('adminLoginTitle')}
            </h2>
            <p className="text-[10px] tracking-widest text-[#cca43b]/60 uppercase font-semibold">
              Sri Muniyappan Kovil Admin Panel
            </p>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto rounded-full" />
        </div>

        {/* Dynamic Alerts */}
        {errorMsg && (
          <div className="mb-6 flex items-start gap-2.5 bg-red-950/45 border border-red-800/80 text-red-300 px-4 py-3 rounded-2xl text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Identifier input (email/phone) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest block">
              {language === 'en' ? 'Email or Mobile Number' : 'மின்னஞ்சல் அல்லது மொபைல் எண்'}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-[#cca43b]/60" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
                placeholder={language === 'en' ? 'e.g. 6383661817' : 'எ.கா. 6383661817'}
                className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest block">
              {t('passwordLabel')}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-[#cca43b]/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="••••••••"
                className="w-full bg-black/35 border border-stone-850 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-11 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-stone-400 hover:text-[#cca43b]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] hover:from-[#e5c158] hover:to-[#cca43b] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <span className="tracking-widest uppercase text-xs">{t('loginBtn')}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-stone-500 font-mono tracking-wider">
            API Endpoint: {API_BASE_URL}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
