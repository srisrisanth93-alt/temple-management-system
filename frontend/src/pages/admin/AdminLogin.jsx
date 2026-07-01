import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { apiCall } from '../../utils/api';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  Key,
  Mail,
  Phone
} from 'lucide-react';

const AdminLogin = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Screen state machine: 'login' | 'forgot' | 'verify' | 'reset' | 'success'
  const [screen, setScreen] = useState('login');

  // Input states
  const [username, setUsername] = useState(''); // Email or Phone
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot password flow states
  const [recoveryId, setRecoveryId] = useState(''); // Email or Phone
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);

  // General UI states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Refs for OTP input focusing
  const otpRefs = useRef([]);

  // Timer countdown for OTP expiry/resend
  useEffect(() => {
    let interval = null;
    if (screen === 'verify' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [screen, otpTimer]);

  // Load "Remember Me" credential if saved
  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
      return;
    }

    const savedUsername = localStorage.getItem('rememberedAdmin');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, [navigate]);

  // Format error messages nicely
  const showError = (msg) => {
    setErrorMsg(msg);
    setInfoMsg('');
    // Auto-scroll to error
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format success messages nicely
  const showInfo = (msg) => {
    setInfoMsg(msg);
    setErrorMsg('');
  };

  // Perform client-side validations
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone) || /^\d{10}$/.test(phone);
  };

  // Handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showError(language === 'en' ? 'Please fill in all fields.' : 'தயவுசெய்து அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்.');
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

      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem('rememberedAdmin', username.trim());
      } else {
        localStorage.removeItem('rememberedAdmin');
      }

      // Save credentials and JWT token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUsername', data.username);
      
      // Navigate to admin panel
      navigate('/admin/dashboard');
    } catch (err) {
      showError(err.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!recoveryId.trim()) {
      showError(language === 'en' ? 'Please enter your email or phone number.' : 'தயவுசெய்து மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiCall('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ identifier: recoveryId.trim() }),
      });

      showInfo(data.message);
      // Move to OTP verify state
      setOtpTimer(60);
      setCanResend(false);
      setOtpArray(['', '', '', '', '', '']);
      setScreen('verify');
    } catch (err) {
      showError(err.message || 'Error requesting reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otpArray];
    newOtp[index] = element.value;
    setOtpArray(newOtp);

    // Focus next input automatically
    if (element.value !== '' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Backspace: focus previous input if empty
    if (e.key === 'Backspace' && otpArray[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (pastedData.length === 6 && !isNaN(pastedData)) {
      const pasteArray = pastedData.split('');
      setOtpArray(pasteArray);
      otpRefs.current[5].focus();
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otpArray.join('');
    if (otpCode.length < 6) {
      showError(language === 'en' ? 'Please enter the complete 6-digit code.' : 'தயவுசெய்து 6-இலக்க குறியீட்டை முழுமையாக உள்ளிடவும்.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiCall('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          identifier: recoveryId.trim(),
          otp: otpCode,
        }),
      });

      showInfo(data.message);
      // Move to new password state
      setNewPassword('');
      setConfirmPassword('');
      setScreen('reset');
    } catch (err) {
      showError(err.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiCall('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ identifier: recoveryId.trim() }),
      });

      showInfo(language === 'en' ? 'A new verification code has been generated.' : 'புதிய சரிபார்ப்புக் குறியீடு அனுப்பப்பட்டுள்ளது.');
      setOtpTimer(60);
      setCanResend(false);
      setOtpArray(['', '', '', '', '', '']);
    } catch (err) {
      showError(err.message || 'Error resending verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showError(language === 'en' ? 'Password must be at least 6 characters long.' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError(language === 'en' ? 'Passwords do not match.' : 'கடவுச்சொற்கள் பொருந்தவில்லை.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const otpCode = otpArray.join('');
      await apiCall('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          identifier: recoveryId.trim(),
          otp: otpCode,
          newPassword: newPassword,
        }),
      });

      setScreen('success');
    } catch (err) {
      showError(err.message || 'Error resetting password. Please start over.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength visual check
  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, text: '', color: 'bg-stone-700' };
    let strength = 0;
    if (newPassword.length >= 6) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;

    switch (strength) {
      case 1: return { score: 25, text: language === 'en' ? 'Weak' : 'பலவீனமானது', color: 'bg-red-500' };
      case 2: return { score: 50, text: language === 'en' ? 'Fair' : 'சுமாரானது', color: 'bg-orange-500' };
      case 3: return { score: 75, text: language === 'en' ? 'Good' : 'நல்லது', color: 'bg-yellow-500' };
      case 4: return { score: 100, text: language === 'en' ? 'Strong' : 'வலிமையானது', color: 'bg-emerald-500' };
      default: return { score: 0, text: '', color: 'bg-stone-700' };
    }
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center px-4 py-16 bg-gradient-to-br from-[#120001] via-[#350204] to-[#0f0102] transition-colors duration-300">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cca43b]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a080a]/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-[#4a080a]/20 dark:bg-black/45 backdrop-blur-md border border-[#cca43b]/30 rounded-[30px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-350 hover:border-[#cca43b]/50">
        
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
          <div className="mb-6 flex items-start gap-2.5 bg-red-950/45 border border-red-800/80 text-red-300 px-4 py-3 rounded-2xl text-xs leading-relaxed animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && (
          <div className="mb-6 flex items-start gap-2.5 bg-[#4a080a]/60 border border-[#cca43b]/40 text-slate-100 px-4 py-3 rounded-2xl text-xs leading-relaxed animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#cca43b]" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* 1. LOGIN SCREEN */}
        {screen === 'login' && (
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
                  placeholder={language === 'en' ? 'email@example.com or phone' : 'e.g. 6383661817'}
                  className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest">
                  {t('passwordLabel')}
                </label>
                <button
                  type="button"
                  onClick={() => setScreen('forgot')}
                  className="text-[11px] font-semibold text-[#cca43b] hover:underline transition cursor-pointer"
                >
                  {language === 'en' ? 'Forgot Password?' : 'கடவுச்சொல் மறந்துவிட்டதா?'}
                </button>
              </div>
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
                  className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-11 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-800 text-[#cca43b] bg-black/40 focus:ring-[#cca43b]/30 focus:ring-offset-0 focus:ring-2"
              />
              <label htmlFor="remember_me" className="ml-2 text-xs font-semibold text-slate-350 select-none cursor-pointer">
                {language === 'en' ? 'Remember me on this device' : 'இந்த சாதனத்தில் என்னை நினைவில் கொள்'}
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] hover:from-[#e5c158] hover:to-[#cca43b] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <span className="tracking-widest uppercase text-xs">{t('loginBtn')}</span>
              )}
            </button>
          </form>
        )}

        {/* 2. FORGOT PASSWORD SCREEN */}
        {screen === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#cca43b] font-serif">
                {language === 'en' ? 'Find Admin Account' : 'அட்மின் கணக்கைக் கண்டறி'}
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed">
                {language === 'en' 
                  ? 'Enter your registered email address or phone number. We will send a 6-digit OTP code to verify identity.'
                  : 'பதிவுசெய்யப்பட்ட மின்னஞ்சல் அல்லது மொபைல் எண்ணை உள்ளிடவும். அட்மின் சரிபார்ப்பிற்கான 6-இலக்க OTP குறியீட்டை அனுப்புவோம்.'}
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest block">
                {language === 'en' ? 'Email or Mobile Number' : 'மின்னஞ்சல் அல்லது மொபைல் எண்'}
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-3.5 w-4 h-4 text-[#cca43b]/60" />
                <input
                  type="text"
                  required
                  value={recoveryId}
                  onChange={(e) => setRecoveryId(e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder={language === 'en' ? 'e.g. muniyappankovil07@gmail.com' : 'e.g. 6383661817'}
                  className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="tracking-widest uppercase text-xs">
                    {language === 'en' ? 'Send OTP Code' : 'OTP குறியீடு அனுப்பு'}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setScreen('login')}
                className="w-full py-3 rounded-2xl border border-stone-800 hover:bg-white/5 text-slate-350 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'en' ? 'Back to Login' : 'உள்நுழைவுப் பக்கத்திற்குச் செல்'}</span>
              </button>
            </div>
          </form>
        )}

        {/* 3. VERIFY OTP SCREEN */}
        {screen === 'verify' && (
          <form onSubmit={handleVerifyOtpSubmit} className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#cca43b] font-serif">
                {language === 'en' ? 'Verify OTP Code' : 'OTP குறியீட்டைச் சரிபார்'}
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed">
                {language === 'en' 
                  ? `Enter the 6-digit OTP verification code generated for ${recoveryId}.`
                  : `${recoveryId} அட்ரஸிற்கு அனுப்பப்பட்ட 6-இலக்க குறியீட்டை உள்ளிடவும்.`}
              </p>
            </div>

            {/* OTP Inputs grid */}
            <div className="flex justify-between items-center gap-2" onPaste={handleOtpPaste}>
              {otpArray.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-12 h-12 text-center bg-black/45 border border-stone-850 hover:border-[#cca43b]/50 rounded-xl text-lg font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b] focus:border-[#cca43b] transition-all"
                />
              ))}
            </div>

            {/* Timer and Resend option */}
            <div className="text-center space-y-2">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-xs font-semibold text-[#cca43b] hover:underline cursor-pointer transition-all"
                >
                  {language === 'en' ? 'Resend Verification Code' : 'மீண்டும் குறியீட்டை அனுப்பு'}
                </button>
              ) : (
                <p className="text-xs text-slate-400 font-medium">
                  {language === 'en' 
                    ? `Resend code in ${otpTimer} seconds` 
                    : `குறியீட்டை மீண்டும் பெற ${otpTimer} வினாடிகள் காத்திருக்கவும்`}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="tracking-widest uppercase text-xs">
                    {language === 'en' ? 'Verify Code' : 'சரிபார்க்கவும்'}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setScreen('forgot')}
                className="w-full py-3 rounded-2xl border border-stone-800 hover:bg-white/5 text-slate-350 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'en' ? 'Change Email / Phone' : 'மின்னஞ்சல்/போன் எண் மாற்று'}</span>
              </button>
            </div>
          </form>
        )}

        {/* 4. NEW PASSWORD SCREEN */}
        {screen === 'reset' && (
          <form onSubmit={handleResetPasswordSubmit} className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#cca43b] font-serif">
                {language === 'en' ? 'Create New Password' : 'புதிய கடவுச்சொல் உருவாக்கு'}
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed">
                {language === 'en' 
                  ? 'Please select a strong password. Mix letters, numbers, and symbols.'
                  : 'புதிய கடவுச்சொல் அமைத்துக் கொள்ளவும். இதில் எழுத்துக்கள், எண்கள் மற்றும் குறியீடுகளை கலக்கவும்.'}
              </p>
            </div>

            {/* New password input */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest block">
                {language === 'en' ? 'New Password' : 'புதிய கடவுச்சொல்'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-[#cca43b]/60" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-11 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-[#cca43b]"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {newPassword && (
                <div className="space-y-1 pt-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-stone-400">{language === 'en' ? 'Strength:' : 'வலிமை:'}</span>
                    <span className="font-bold text-[#cca43b]">{strengthInfo.text}</span>
                  </div>
                  <div className="w-full bg-stone-850 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${strengthInfo.color}`} 
                      style={{ width: `${strengthInfo.score}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm password input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#cca43b]/70 uppercase tracking-widest block">
                {language === 'en' ? 'Confirm New Password' : 'கடவுச்சொல்லை உறுதிப்படுத்து'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-[#cca43b]/60" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/35 border border-stone-800 hover:border-[#cca43b]/40 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#cca43b]/30 focus:border-[#cca43b] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <span className="tracking-widest uppercase text-xs">
                  {language === 'en' ? 'Reset Password' : 'கடவுச்சொல்லை மாற்று'}
                </span>
              )}
            </button>
          </form>
        )}

        {/* 5. SUCCESS SCREEN */}
        {screen === 'success' && (
          <div className="text-center space-y-6 animate-fade-in py-4">
            <div className="inline-flex bg-[#cca43b]/10 text-[#cca43b] p-4 rounded-full border border-[#cca43b]/45 animate-scale-up">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#cca43b] font-serif">
                {language === 'en' ? 'Reset Successful!' : 'வெற்றிகரமாக மாற்றப்பட்டது!'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed px-2">
                {language === 'en' 
                  ? 'Your password has been reset successfully. You can now use your new password to log in.'
                  : 'அட்மின் கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது. புதிய கடவுச்சொல்லைப் பயன்படுத்தி லாகின் செய்யலாம்.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setScreen('login');
                setUsername('');
                setPassword('');
                setErrorMsg('');
                setInfoMsg('');
              }}
              className="w-full bg-gradient-to-r from-[#cca43b] via-[#e5c158] to-[#b08b30] text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,164,59,0.45)] flex items-center justify-center cursor-pointer uppercase tracking-widest text-xs"
            >
              {language === 'en' ? 'Return to Login' : 'உள்நுழைவுக்குத் திரும்பு'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminLogin;
