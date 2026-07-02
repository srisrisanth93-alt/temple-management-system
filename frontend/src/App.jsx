import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import PoojaFestival from './pages/PoojaFestival';
import Pooja from './pages/Pooja';
import Thiruvizha from './pages/Thiruvizha';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import { useLanguage } from './context/LanguageContext';
import { Globe } from 'lucide-react';

const FloatingLanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-[90] bg-gradient-to-r from-temple-saffron to-temple-gold text-slate-950 px-4.5 py-3 rounded-full font-bold text-xs tracking-wider shadow-2xl hover:scale-105 transform active:scale-95 transition-all flex items-center gap-2 border border-white/20 cursor-pointer hover:shadow-temple-gold/30 hover:shadow-lg"
      title={language === 'en' ? 'Change to Tamil / தமிழ்' : 'Change to English'}
    >
      <Globe className="w-4 h-4 text-slate-900" />
      <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
    </button>
  );
};

// Scroll Reset Component for navigation transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { language } = useLanguage();

  React.useEffect(() => {
    // Add page-fade-in to the main container
    const mainDiv = document.getElementById('main-app-container');
    if (mainDiv) {
      mainDiv.classList.add('page-fade-in');
    }

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Initial observe
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    // MutationObserver to capture client-side navigated/rendered elements
    const mutationObserver = new MutationObserver(() => {
      const unobserved = document.querySelectorAll('.scroll-reveal:not(.active)');
      unobserved.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div id="main-app-container" className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        {/* Header / Navbar */}
        <Navbar />

        {/* Scrolling Announcement Ticker */}
        <div className="bg-gradient-to-r from-amber-500 via-temple-saffron to-temple-gold text-slate-950 font-serif font-bold text-[14px] md:text-[15px] py-1.5 border-b border-temple-gold/30 shadow-inner select-none flex items-center">
          <marquee behavior="scroll" direction="left" scrollamount="5" className="w-full">
            ✦ ஒவ்வொரு வெள்ளிக்கிழமையும் சிறப்பு பூஜை நடைபெறும். அனைத்து பக்தர்களும் கலந்து கொள்ள அன்புடன் அழைக்கப்படுகிறார்கள். ✦
          </marquee>
        </div>

        {/* Main Stage */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pooja" element={<Pooja />} />
            <Route path="/pooja-festivals" element={<PoojaFestival />} />
            <Route path="/thiruvizha" element={<Thiruvizha />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Portals */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Language Switcher Option */}
        <FloatingLanguageToggle />
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
