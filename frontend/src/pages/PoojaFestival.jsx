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
          திருவிழா / Festival Board
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {festivals.map((fest) => {
              return (
                <div 
                  key={fest._id}
                  className="bg-white dark:bg-slate-900 border border-[#cca43b]/30 rounded-2xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 p-6 space-y-4"
                >
                  {/* Header badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#4a080a] text-[#cca43b] text-xs font-bold px-3 py-1.5 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(fest.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    {fest.nameTA && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-slate-800 text-temple-goldDark dark:text-temple-gold text-xs font-bold px-3 py-1.5 rounded-lg border border-[#cca43b]/20">
                        <Clock className="w-3.5 h-3.5" />
                        {fest.nameTA}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider">விவரங்கள் / Details:</span>
                    <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line font-medium">
                      {language === 'en' ? fest.descriptionEN : fest.descriptionTA}
                    </p>
                  </div>
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
