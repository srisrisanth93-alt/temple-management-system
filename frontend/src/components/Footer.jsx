import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-temple-gold transition-colors duration-300">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: Temple Info */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-white tracking-wide border-b border-temple-gold/30 pb-2">
              {t('templeName')}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('templeSubtitle')}
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social links */}
              {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-temple-gold hover:text-slate-900 transition-all duration-300 capitalize text-xs"
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-temple-gold/30 pb-2">
              {language === 'en' ? 'Quick Navigation' : 'வழிசெலுத்தல்'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/pooja" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navPoojaOnly')}
                </Link>
              </li>
              <li>
                <Link to="/thiruvizha" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navPooja')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navGallery')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#cca43b] transition-colors block py-0.5">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-temple-gold/30 pb-2">
              {t('timingsHeader')}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-temple-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-300">{t('dailyTimings')}</p>
                  <p>{t('morningTimings')}</p>
                  <p>{t('eveningTimings')}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-normal italic">
                {language === 'en' 
                  ? "*Timings may change on festival days and special auspicious occasions."
                  : "*திருவிழாக்கள் மற்றும் விசேஷ நாட்களில் தரிசன நேரங்கள் மாறக்கூடும்."}
              </p>
            </div>
          </div>

          {/* Col 4: Address Info */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-temple-gold/30 pb-2">
              {t('contactQuickInfo')}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
               <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-temple-gold mt-0.5 flex-shrink-0" />
                <span className="leading-snug">
                  {t('templeAddress')}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <span>+91 4282 234567</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <span>contact@munniyappankovil.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-slate-950 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {t('templeName')}.{' '}
            {language === 'en' ? 'All rights reserved.' : 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
          </p>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <Link to="/admin/login" className="hover:text-temple-gold transition-colors flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('navAdmin')} Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
