import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall } from '../utils/api';
import { Calendar, Bell, Clock, Phone, MapPin, ChevronRight, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { language, t } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await apiCall('/announcements');
        // Show up to 4 announcements on home page
        setAnnouncements(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching announcements:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url('/temple_hero_banner.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />
        
        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-wide drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-temple-goldLight">
            {t('templeName')}
          </h1>
        </div>

        {/* Bottom Curve wave */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 dark:bg-slate-950 clip-wave" />
      </section>

      {/* Welcome Message Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-temple-gold/20 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-temple-gold/10 to-transparent rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-temple-saffron/10 to-transparent rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Greeting Icon Box */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-temple-maroon to-temple-saffron p-0.5 shadow-lg">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                  <span className="text-4xl">🙏</span>
                  <span className="text-xs font-bold text-temple-maroon dark:text-temple-gold uppercase tracking-wider mt-2">
                    வணக்கம்
                  </span>
                </div>
              </div>
            </div>

            {/* Message Text */}
            <div className="lg:col-span-9 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-temple-maroon dark:text-temple-gold">
                அருள்மிகு ஸ்ரீ முனியப்பன் திருக்கோவிலுக்கு உங்களை வரவேற்கிறோம்
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
                நமது பாரம்பரிய கோவிலின் தெய்வீக அருளையும் அமைதியான சூழலையும் அனுபவியுங்கள். வரலாற்று முக்கியத்துவம் வாய்ந்த இக்கோவில், ஸ்ரீ முனியப்பனின் பாதுகாப்பு மற்றும் ஆசிகளை நாடி வரும் ஆயிரக்கணக்கான பக்தர்களுக்கு ஆன்மீக புகலிடமாக விளங்குகிறது.
              </p>
              <div>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-sm font-semibold text-temple-saffron dark:text-temple-gold hover:text-temple-maroon dark:hover:text-white transition-colors"
                >
                  <span>கோவில் வரலாறு அறிய</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotional Stuthis (Divine Hymns) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50/20 via-orange-50/10 to-amber-50/20 dark:from-slate-900/50 dark:to-slate-900/50 border-y border-slate-200 dark:border-slate-850 py-10 px-6 rounded-3xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-temple-maroon dark:text-temple-gold flex items-center justify-center gap-2">
              <span className="text-temple-saffron">✦</span> தெய்வீகத் துதிகள் <span className="text-temple-saffron">✦</span>
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Parvathi Stuthi */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden flex flex-col justify-center min-h-[170px]">
              <div className="absolute top-3 left-3 text-amber-500/15 text-4xl font-serif">❝</div>
              <h4 className="font-bold font-serif text-temple-maroon dark:text-temple-gold text-base md:text-lg mb-3">
                ஸ்ரீ பார்வதி ஸ்துதி
              </h4>
              <p className="text-slate-700 dark:text-slate-350 italic font-serif leading-relaxed text-[14px] md:text-[15px] px-2">
                அன்னையாய் வந்து காக்கும் அபிராமி தாயே போற்றி ! உண்மையாய் எந்த ஒளியே போற்றி ! உலகின் தாயே போற்றி ! முன்னவள் முக்கட் செல்வம் முறுவலில் மகிழும் காளி ! இன்னருள் தருவாய் போற்றி ஏசுநாயகியே போற்றி ! போற்றி !!
              </p>
              <div className="absolute bottom-3 right-3 text-amber-500/15 text-4xl font-serif">❞</div>
            </div>

            {/* Mahamuni Stuthi */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden flex flex-col justify-center min-h-[170px]">
              <div className="absolute top-3 left-3 text-amber-500/15 text-4xl font-serif">❝</div>
              <h4 className="font-bold font-serif text-temple-maroon dark:text-temple-gold text-base md:text-lg mb-3">
                ஸ்ரீ மகாமுனி ஸ்துதி
              </h4>
              <p className="text-slate-700 dark:text-slate-350 italic font-serif leading-relaxed text-[14px] md:text-[15px] px-2">
                கீரை மகாநகரிலே நொட்டக்கல் தனிலே தோன்றிய முனியப்ப துரையே கம்பு கட்டாறி, ஈட்டி, கேடயம் ஏந்தி காற்றாய் பரந்த முனியே பெண்களை கன்னமிடும் பித்தனே பேய்போல் திரிந்த முனியே வாமுனி, செம்முனி வளர்ந்த சடாமுனி வரவேண்டும் ராயப்ப துரையே
              </p>
              <div className="absolute bottom-3 right-3 text-amber-500/15 text-4xl font-serif">❞</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Announcements & Timings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col 1 & 2: Announcements */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Bell className="w-6 h-6 text-temple-saffron" />
            <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-800 dark:text-white">
              {t('announcements')}
            </h3>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((n) => (
                <div key={n} className="bg-slate-100 dark:bg-slate-800 h-28 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-slate-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <p>{t('noAnnouncements')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div 
                  key={ann._id} 
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden ${
                    ann.pinned 
                      ? 'border-temple-gold/50 bg-gradient-to-r from-temple-gold/5 to-transparent' 
                      : 'border-slate-100 dark:border-slate-850'
                  }`}
                >
                  {ann.pinned && (
                    <span className="absolute top-0 right-0 bg-temple-gold text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      ★ {t('pinned')}
                    </span>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-50 dark:bg-slate-800 text-temple-saffron p-3 rounded-xl flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium">
                        {new Date(ann.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {language === 'en' ? ann.titleEN : ann.titleTA}
                      </h4>
                      <p className="text-sm text-slate-555 dark:text-slate-300 leading-relaxed pt-1">
                        {language === 'en' ? ann.contentEN : ann.contentTA}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Col 3: Quick Contacts */}
        <div className="space-y-8">

          {/* Quick Contact Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-md transition-colors space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Phone className="w-5 h-5 text-temple-saffron" />
              <h4 className="text-base font-bold text-slate-800 dark:text-white font-serif">
                {t('contactQuickInfo')}
              </h4>
            </div>
            <div className="space-y-4 text-sm text-slate-650 dark:text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-temple-gold mt-0.5 flex-shrink-0" />
                <span>
                  {t('templeAddress')}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <span>+91 4282 234567</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <Link to="/contact" className="text-temple-saffron dark:text-temple-gold hover:underline font-semibold">
                  {language === 'en' ? 'Send an Inquiry' : 'விசாரணை அனுப்ப'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
