import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe, ShieldAlert, Phone, Mail, Play } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  const navItems = [
    { name: language === 'en' ? 'HOME' : 'முகப்பு', path: '/' },
    { name: language === 'en' ? 'ABOUT TEMPLE' : 'கோவில் பற்றி', path: '/about' },
    { name: language === 'en' ? 'POOJAI' : 'பூஜை', path: '/pooja' },
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
          <a href="mailto:contact@muniyappankovil.org" className="flex items-center gap-1.5 hover:text-[#cca43b] transition-colors border-l border-stone-800 pl-4">
            <Mail className="w-3.5 h-3.5 text-[#cca43b]" />
            <span>contact@muniyappankovil.org</span>
          </a>
        </div>

        {/* Right Side: Social links & Live Darshan Button */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3.5 text-stone-400">
            <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-500 font-semibold">Follow Us :</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#cca43b] transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-2.8 0-5 2.2-5 5v2z" />
              </svg>
            </a>
            <a href="https://instagram.com/young_stars_keeripatti" target="_blank" rel="noopener noreferrer" className="hover:text-[#cca43b] transition-colors">
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#cca43b] transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.4c-1.1.3-1.9 1.2-2.2 2.3-.4 2-.4 6.2-.4 6.2s0 4.2.4 6.2c.3 1.1 1.1 2 2.2 2.3 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.3 1.9-1.2 2.2-2.3.4-2 .4-6.2.4-6.2s0-4.2-.4-6.2zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" />
              </svg>
            </a>
          </div>

          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 px-3.5 py-1.5 rounded font-bold text-[10px] sm:text-xs tracking-widest uppercase transition-all flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            Live Darshan
          </a>
        </div>
      </div>

      {/* 2. Navbar Main Header (Maroon background) */}
      <nav className="bg-[#4a080a] text-white border-b border-[#cca43b]/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Temple Name */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="bg-gradient-to-br from-[#cca43b] to-[#b08b30] p-2 rounded-full shadow-md transform group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A3,3 0 0,0 9,5C9,6.07 9.56,7 10.4,7.5C9.3,8.23 8.5,9.5 8.1,11C7.5,10.6 6.8,10.3 6,10.3A3,3 0 0,0 3,13.3C3,14.7 3.9,15.9 5.1,16.3C4.4,17.4 4,18.6 4,20A1,1 0 0,0 5,21H19A1,1 0 0,0 20,20C20,18.6 19.6,17.4 18.9,16.3C20.1,15.9 21,14.7 21,13.3A3,3 0 0,0 18,10.3C17.2,10.3 16.5,10.6 15.9,11C15.5,9.5 14.7,8.23 13.6,7.5C14.44,7 15,6.07 15,5A3,3 0 0,0 12,2M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M12,8.5C13.66,8.5 15,10.84 15,13.7C15,16.3 13.66,17.5 12,17.5C10.34,17.5 9,16.3 9,13.7C9,10.84 10.34,8.5 12,8.5M6,12.3A1,1 0 0,1 7,13.3A1,1 0 0,1 6,14.3A1,1 0 0,1 5,13.3A1,1 0 0,1 6,12.3M18,12.3A1,1 0 0,1 19,13.3A1,1 0 0,1 18,14.3A1,1 0 0,1 17,13.3A1,1 0 0,1 18,12.3Z" />
              </svg>
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
