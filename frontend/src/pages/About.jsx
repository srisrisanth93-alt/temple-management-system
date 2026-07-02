import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall } from '../utils/api';

const About = () => {
  const { t, language } = useLanguage();
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultHistoryPoints = [
    "முனியப்பன் சாமி தமிழ்நாட்டின் கிராமப்புறங்களில் வழிபடப்படும் சக்தி வாய்ந்த காவல் தெய்வமாக கருதப்படுகிறார்.",
    "கிராம மக்களை தீய சக்திகள் மற்றும் இயற்கை பேரிடர்களிலிருந்து காப்பவர் என்று நம்பப்படுகிறது.",
    "முனியப்பன் சாமி நீதியையும் தர்மத்தையும் காக்கும் தெய்வமாக போற்றப்படுகிறார்.",
    "கிராம எல்லைகளில் முனியப்பன் கோவில்கள் அதிகமாக அமைக்கப்பட்டுள்ளன.",
    "பக்தர்களின் வேண்டுதல்களை நிறைவேற்றும் அருள்மிகு தெய்வமாக மக்கள் நம்பிக்கை கொண்டுள்ளனர்.",
    "விவசாயம் செழிக்கவும், மழை பொழியவும் முனியப்பன் சாமியிடம் பிரார்த்தனை செய்யும் வழக்கம் உள்ளது.",
    "ஆண்டுதோறும் சிறப்பு பூஜைகள் மற்றும் திருவிழாக்கள் சிறப்பாக நடத்தப்படுகின்றன.",
    "வெள்ளிக்கிழமைகளிலும், அமாவாசை நாட்களிலும் பக்தர்கள் அதிக அளவில் வழிபாடு செய்கின்றனர்.",
    "முனியப்பன் சாமி பக்தர்களுக்கு தைரியம், நம்பிக்கை மற்றும் பாதுகாப்பை அளிப்பவர் என கருதப்படுகிறார்.",
    "அதனால் முனியப்பன் சாமி தமிழர் பாரம்பரியத்தின் முக்கியமான காவல் தெய்வங்களில் ஒருவராக இன்று வரை பக்தியுடன் வழிபடப்பட்டு வருகிறார். 🙏🛕"
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await apiCall('/history-points');
        setPoints(data);
      } catch (error) {
        console.error('Error fetching history:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const activePoints = points.length > 0 ? points.map(p => p.content) : defaultHistoryPoints;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 scroll-reveal">
      {/* Deity Image Card */}
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-temple-saffron to-temple-gold rounded-3xl blur-md opacity-25 -m-1" />
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-3 rounded-3xl shadow-xl overflow-hidden">
          <img 
            src="/temple_hero_banner.jpg" 
            alt="Arulmigu Sri Muniyappan Deities" 
            className="w-full h-64 md:h-[400px] object-cover rounded-2xl shadow transition-transform duration-700 hover:scale-103"
          />
          <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 bg-slate-950/85 backdrop-blur-md p-2.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl border border-white/10 text-white flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-r from-temple-gold to-temple-saffron text-slate-950 p-1.5 md:p-2.5 rounded-lg md:rounded-xl shrink-0">
              <ShieldCheck className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[10px] sm:text-xs md:text-lg text-temple-gold line-clamp-2 leading-tight md:leading-normal">
                {t('templeName')}
              </h4>
              <p className="text-[9px] md:text-xs text-slate-300 truncate mt-0.5">
                9வது வார்டு, அண்ணாநகர், கீரிப்பட்டி கிராமம், சேலம் மாவட்டம்
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section Paragraph */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm space-y-3 scroll-reveal">
        <h2 className="text-xl md:text-2xl font-bold font-serif text-temple-maroon dark:text-temple-gold border-b border-slate-100 dark:border-slate-850 pb-2">
          {t('templeName')}
        </h2>
        <p className="text-slate-700 dark:text-slate-350 text-[15px] md:text-base leading-relaxed">
          அருள்மிகு ஸ்ரீ முனியப்பன் சுவாமி தமிழ்நாட்டின் கிராமப்புறங்களில் போற்றப்படும் காவல் தெய்வமாக விளங்குகிறார். கிராம எல்லைகளில் நின்று தீய சக்திகளிடமிருந்தும் பேரிடர்களிலிருந்தும் மக்களைக் காத்து, தர்மத்தை நிலைநாட்டும் மாபெரும் காவல் தெய்வமாக இன்று வரை மக்களால் பக்தியுடன் வழிபடப்பட்டு வருகிறார்.
        </p>
      </div>

      {/* History 10 Points List */}
      <div className="max-w-4xl mx-auto space-y-6 scroll-reveal">
        <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-temple-saffron" />
          முனியப்பன் சாமி வரலாறு (கோவில் குறிப்புகள்)
        </h3>
        
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-temple-gold" />
            <p className="text-xs">வரலாறு லோடு ஆகிறது...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {activePoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 border border-slate-150/70 dark:border-slate-850 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 hover:border-temple-gold/40 hover:-translate-y-0.5 duration-300"
              >
                <div className="bg-gradient-to-br from-temple-maroon to-temple-maroonLight text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-slate-350 text-[15px] md:text-base leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
