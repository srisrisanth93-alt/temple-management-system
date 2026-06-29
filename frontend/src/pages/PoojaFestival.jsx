import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall, BACKEND_URL } from '../utils/api';
import { Calendar, Clock, Bell, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const PoojaFestival = () => {
  const { language, t } = useLanguage();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFestival, setExpandedFestival] = useState(null);

  const translateTime = (timeStr) => {
    let translated = timeStr;
    translated = translated.replace('10-09-2025 (Wed) 5:00 AM - 9:00 AM', 'ஆவணி 25 (10-09-2025) புதன்கிழமை அதிகாலை 5:00 - 9:00 மணிக்குள்');
    translated = translated.replace('12-09-2025 (Fri) 12:00 PM', 'ஆவணி 27 (12-09-2025) வெள்ளிக்கிழமை பகல் 12:00 மணிக்கு');
    translated = translated.replace('12-09-2025 (Fri) 5:00 PM', 'மாலை 5:00 மணிக்கு');
    translated = translated.replace('13-09-2025 (Sat) 8:00 AM', 'ஆவணி 28 (13-09-2025) சனிக்கிழமை காலை 8:00 மணிக்கு');
    translated = translated.replace('13-09-2025 (Sat) 12:00 AM (Midnight)', 'இரவு 12:00 மணிக்கு (நள்ளிரவு)');
    translated = translated.replace('14-09-2025 (Sun) 6:00 AM - 11:00 AM', 'ஆவணி 29 (14-09-2025) ஞாயிற்றுக்கிழமை காலை 6:00 - 11:00 மணிக்குள்');
    translated = translated.replace('15-09-2025 (Mon) 6:00 AM onwards', 'ஆவணி 30 (15-09-2025) திங்கட்கிழமை காலை 6:00 மணிக்குமேல்');
    translated = translated.replace('16-09-2025 (Tue) 9:00 AM onwards', 'ஆவணி 31 (16-09-2025) செவ்வாய்க்கிழமை காலை 9:00 மணிக்குமேல்');
    translated = translated.replace('16-09-2025 (Tue) 2:00 PM', 'பகல் 2:00 மணிக்கு');
    return translated;
  };

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const data = await apiCall('/festivals');
        setFestivals(data);
      } catch (error) {
        console.error('Error fetching festivals:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFestivals();
  }, []);


  const toggleFestival = (id) => {
    setExpandedFestival(expandedFestival === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-temple-maroon dark:text-temple-gold tracking-wide">
          திருவிழா
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
      </div>

      {/* Upcoming Festivals Section */}
      <section className="space-y-6">

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-slate-100 dark:bg-slate-800 h-44 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : festivals.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl">
            <Sparkles className="w-8 h-8 text-temple-gold mx-auto mb-2" />
            <p>{t('noFestivals')}</p>
          </div>
        ) : (
          <div className="space-y-10">
            {festivals.map((fest) => {
              const isExpanded = expandedFestival === fest._id;
              const hasTimings = fest.poojaTimings && fest.poojaTimings.length > 0;
              return (
                <div 
                  key={fest._id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {fest.image && (
                      <img 
                        src={fest.image.startsWith('/uploads/') ? `${BACKEND_URL}${fest.image}` : fest.image} 
                        alt={fest.nameEN} 
                        className="w-full h-56 md:h-72 object-cover border-b border-slate-100 dark:border-slate-850"
                      />
                    )}
                     <div className="p-6 space-y-3">
                      <span className="inline-block bg-orange-50 dark:bg-slate-800 text-temple-saffron text-xs font-semibold px-3 py-1 rounded-full">
                        {new Date(fest.date).toLocaleDateString('ta-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-white">
                        {fest.nameTA}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {fest.descriptionTA}
                      </p>
                    </div>
                  </div>

                  {/* Pooja timings list inside festival if available */}
                  {hasTimings && (
                    <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                      <h4 className="text-xs font-bold text-temple-maroon dark:text-temple-gold uppercase tracking-wider mb-3">
                        {language === 'en' ? 'Festival Program Schedule' : 'திருவிழா நிகழ்ச்சி நிரல்'}
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner">
                        <table className="w-full text-left text-[14px] md:text-[16px] border-collapse">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-205 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-serif font-bold text-[15px] md:text-[18px]">
                              <th className="p-4 md:p-5 whitespace-nowrap">{language === 'en' ? 'Date & Time' : 'நாள் & நேரம்'}</th>
                              <th className="p-4 md:p-5">{language === 'en' ? 'Event / Ritual' : 'நிகழ்ச்சி / அர்ச்சனை'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-800 dark:text-slate-200">
                            {fest.poojaTimings.map((timeItem, tIdx) => (
                              <tr key={tIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                                <td className="p-4 md:p-5 font-bold text-temple-saffron dark:text-temple-gold leading-relaxed">
                                  {translateTime(timeItem.time)}
                                </td>
                                <td className="p-4 md:p-5 leading-relaxed font-medium">
                                  {timeItem.nameTA}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default PoojaFestival;
