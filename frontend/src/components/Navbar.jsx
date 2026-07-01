import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe, ShieldAlert, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setIsAdmin(false);
    navigate('/');
  };

  const navItems = [
    { name: language === 'en' ? 'HOME' : 'முகப்பு', path: '/' },
    { name: language === 'en' ? 'ABOUT TEMPLE' : 'கோவில் பற்றி', path: '/about' },
    { name: language === 'en' ? 'FESTIVAL' : 'திருவிழா', path: '/thiruvizha' },
    { name: language === 'en' ? 'GALLERY' : 'புகைப்படங்கள்', path: '/gallery' },
    { name: language === 'en' ? 'CONTACT' : 'தொடர்புக்கு', path: '/contact' },
  ];

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 shadow-md">
      {/* 1. Header Topbar (Black strip) */}
      <div className="bg-[#120d0a] text-slate-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-stone-800 transition-colors flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left Side: Phone & Email */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-[#cca43b] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#cca43b]" />
            <span>+91 98765 43210</span>
          </a>
          <a href="mailto:muniyappankovil07@gmail.com" className="flex items-center gap-1.5 hover:text-[#cca43b] transition-colors border-l border-stone-800 pl-4">
            <Mail className="w-3.5 h-3.5 text-[#cca43b]" />
            <span>muniyappankovil07@gmail.com</span>
          </a>
        </div>

        {/* Right Side: Social links */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3.5 text-stone-400">
            <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-500 font-semibold">Follow Us :</span>
            <a href="https://instagram.com/young_stars_keeripatti" target="_blank" rel="noopener noreferrer" className="hover:text-[#cca43b] transition-colors">
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Navbar Main Header (Maroon background) */}
      <nav className="bg-[#4a080a] text-white border-b border-[#cca43b]/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Temple Name */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#cca43b]/40 shadow-md transform group-hover:rotate-12 transition-transform duration-300 bg-amber-950/20">
              <img src="/temple_logo.png" alt="Muniyappan Swamy Temple Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-serif font-extrabold tracking-widest text-[#cca43b] uppercase">
                MUNIYAPPAN
              </span>
              <span className="text-[10px] sm:text-xs font-serif tracking-widest text-slate-100 uppercase font-bold mt-0.5">
                SWAMY TEMPLE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[13px] font-bold tracking-widest uppercase transition-all duration-300 relative py-2 ${
                  location.pathname === item.path
                    ? 'text-[#cca43b]'
                    : 'text-slate-200 hover:text-[#cca43b]'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#cca43b] rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Language & Theme Controls */}
            <div className="flex items-center space-x-3 border-l border-[#cca43b]/20 pl-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-slate-200 hover:text-[#cca43b] font-bold text-xs px-2.5 py-1.5 rounded-lg hover:bg-black/10 transition-all cursor-pointer uppercase tracking-wider"
              >
                <Globe className="w-3.5 h-3.5 text-[#cca43b]" />
                <span>{t('langToggle')}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-black/10 text-slate-200 hover:text-[#cca43b] transition-all cursor-pointer"
                title={theme === 'dark' ? t('themeLight') : t('themeDark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>
            </div>

            {/* Admin / Logout */}
            {isAdmin && (
              <div className="flex items-center space-x-3 border-l border-[#cca43b]/20 pl-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center text-[10px] font-bold tracking-wider bg-red-950/40 text-red-400 border border-red-900/50 px-3 py-1.5 rounded uppercase"
                >
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-stone-400 hover:text-white uppercase cursor-pointer"
                >
                  {t('logout')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu & Toggle Buttons */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="p-1.5 text-[10px] font-bold border border-[#cca43b]/30 text-[#cca43b] rounded uppercase"
            >
              {t('langToggle')}
            </button>
            <button onClick={toggleTheme} className="p-1.5 text-slate-200 hover:text-[#cca43b]">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-200 hover:bg-black/10 border border-slate-700/50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#4a080a] text-white border-t border-[#cca43b]/20 px-4 pt-2 pb-6 space-y-2 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all ${
                location.pathname === item.path
                  ? 'bg-black/20 text-[#cca43b]'
                  : 'text-slate-100 hover:bg-black/10'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {isAdmin && (
            <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-red-950/20 text-red-400 border border-red-900/30 rounded-lg text-sm font-bold uppercase tracking-wider"
              >
                <span>Admin Dashboard</span>
                <ShieldAlert className="w-5 h-5" />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-stone-400 hover:text-white font-bold text-sm uppercase cursor-pointer"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
