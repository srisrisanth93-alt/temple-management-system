import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe, ShieldAlert } from 'lucide-react';

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
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navPoojaOnly'), path: '/pooja' },
    { name: t('navPooja'), path: '/pooja-festivals' },
    { name: t('navGallery'), path: '/gallery' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 border-b border-temple-gold/20 shadow-md backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Temple Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-temple-gold to-temple-saffron p-2 rounded-full shadow-md transform group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  {/* Elegant Ganesha Outline / Kalash Icon */}
                  <path d="M12,2A3,3 0 0,0 9,5C9,6.07 9.56,7 10.4,7.5C9.3,8.23 8.5,9.5 8.1,11C7.5,10.6 6.8,10.3 6,10.3A3,3 0 0,0 3,13.3C3,14.7 3.9,15.9 5.1,16.3C4.4,17.4 4,18.6 4,20A1,1 0 0,0 5,21H19A1,1 0 0,0 20,20C20,18.6 19.6,17.4 18.9,16.3C20.1,15.9 21,14.7 21,13.3A3,3 0 0,0 18,10.3C17.2,10.3 16.5,10.6 15.9,11C15.5,9.5 14.7,8.23 13.6,7.5C14.44,7 15,6.07 15,5A3,3 0 0,0 12,2M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M12,8.5C13.66,8.5 15,10.84 15,13.7C15,16.3 13.66,17.5 12,17.5C10.34,17.5 9,16.3 9,13.7C9,10.84 10.34,8.5 12,8.5M6,12.3A1,1 0 0,1 7,13.3A1,1 0 0,1 6,14.3A1,1 0 0,1 5,13.3A1,1 0 0,1 6,12.3M18,12.3A1,1 0 0,1 19,13.3A1,1 0 0,1 18,14.3A1,1 0 0,1 17,13.3A1,1 0 0,1 18,12.3Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif font-bold text-temple-maroon dark:text-temple-gold tracking-wide transition-colors">
                  {t('templeName')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-sans tracking-widest uppercase">
                  {language === 'en' ? 'Temple Office' : 'திருக்கோவில்'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[15px] font-medium tracking-wide transition-all duration-300 relative py-2 ${
                  location.pathname === item.path
                    ? 'text-temple-saffron dark:text-temple-gold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-temple-maroon dark:hover:text-temple-goldLight'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-temple-gold to-temple-saffron rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Admin Dashboard / Logout Indicator */}
            {isAdmin ? (
              <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="text-[13px] font-semibold text-slate-400 hover:text-temple-gold transition-colors pl-2"
              >
                {t('navAdmin')}
              </Link>
            )}

            {/* Settings Toggles */}
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-temple-saffron dark:hover:text-temple-gold font-medium text-sm px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                title="Change Language / மொழியை மாற்ற"
              >
                <Globe className="w-4 h-4 text-temple-gold" />
                <span className="text-xs">{t('langToggle')}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-temple-gold transition-all cursor-pointer"
                title={theme === 'dark' ? t('themeLight') : t('themeDark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu & Toggle Buttons */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Quick Lang Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-1.5 text-xs font-semibold border border-temple-gold/30 text-temple-maroon dark:text-temple-gold rounded"
            >
              {t('langToggle')}
            </button>

            {/* Quick Theme Toggle */}
            <button onClick={toggleTheme} className="p-1.5 text-slate-600 dark:text-slate-300">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 px-4 pt-2 pb-6 space-y-2 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-temple-maroon/10 to-temple-saffron/10 text-temple-saffron dark:text-temple-gold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="border-t border-slate-100 dark:border-slate-900 pt-4 mt-4 space-y-2">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-lg text-base font-medium"
                >
                  <span>{t('navAdmin')} Dashboard</span>
                  <ShieldAlert className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-base cursor-pointer"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-500 hover:text-temple-gold rounded-lg text-base font-medium"
              >
                {t('navAdmin')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
