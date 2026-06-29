import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { apiCall } from '../../utils/api';
import { ShieldCheck, Lock, User, RefreshCw } from 'lucide-react';

const AdminLogin = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      // Save token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUsername', data.username);
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-8 shadow-xl space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="inline-flex bg-gradient-to-br from-temple-maroon to-temple-saffron p-3.5 rounded-2xl text-white shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-800 dark:text-white">
            {t('adminLoginTitle')}
          </h2>
          <div className="w-16 h-0.5 bg-temple-gold mx-auto rounded-full" />
        </div>

        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-650 px-4 py-3 rounded-xl text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('usernameLabel')}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('passwordLabel')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-temple-maroon to-temple-maroonLight text-white py-3 rounded-xl font-bold hover:from-temple-gold hover:to-temple-goldDark hover:text-slate-950 transition-all cursor-pointer shadow flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <span>{t('loginBtn')}</span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-450 leading-relaxed italic border-t border-slate-100 dark:border-slate-850 pt-4">
          {language === 'en' 
            ? "Default seed credentials are admin / admin123" 
            : "இயல்புநிலை பயனர் பெயர்: admin / கடவுச்சொல்: admin123"}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
