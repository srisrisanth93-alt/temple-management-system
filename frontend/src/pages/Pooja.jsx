import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Calendar, Clock } from 'lucide-react';

const Pooja = () => {
  const { language, t } = useLanguage();

  return (
    <div className="w-full bg-[#fcfaf7] dark:bg-slate-950 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-reveal">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-1.5 text-[#cca43b] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-[#cca43b]" />
            <span>Divine Timing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
            {language === 'en' ? 'Poojai' : 'பூஜை வழிபாடுகள்'}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-2" />
        </div>

        {/* Devotional Timings Cards Container */}
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          
          {/* Card 1: Friday Special Pooja */}
          <div className="bg-white dark:bg-slate-900 border border-[#cca43b]/35 p-6 md:p-8 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col md:flex-row items-center md:items-start gap-5 relative overflow-hidden scroll-reveal">
            <div className="absolute top-0 left-0 w-3 h-full bg-[#4a080a]" />
            
            <div className="bg-[#4a080a] text-[#cca43b] p-4 rounded-2xl shrink-0 shadow-inner border border-[#cca43b]/25">
              <Calendar className="w-6 h-6" />
            </div>
            
            <div className="space-y-3.5 text-center md:text-left">
              <div className="space-y-1">
                <span className="block text-[10px] text-[#cca43b] font-bold tracking-wider uppercase">Weekly Special Ritual</span>
                <h3 className="font-serif font-bold text-[#4a080a] dark:text-[#cca43b] text-lg md:text-xl">
                  வெள்ளிக்கிழமை சிறப்பு பூஜை 
                </h3>
              </div>
              
              <div className="w-12 h-0.5 bg-stone-100 dark:bg-stone-800 mx-auto md:mx-0" />
              
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                "ஒவ்வொரு வெள்ளிக்கிழமையும் மதியம் 12.00 மணிக்கு மேல் பூஜை நடைபெறும்."
              </p>
            </div>
          </div>

          {/* Card 2: Pournami Special Pooja */}
          <div className="bg-white dark:bg-slate-900 border border-[#cca43b]/35 p-6 md:p-8 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col md:flex-row items-center md:items-start gap-5 relative overflow-hidden scroll-reveal">
            <div className="absolute top-0 left-0 w-3 h-full bg-[#4a080a]" />
            
            <div className="bg-[#4a080a] text-[#cca43b] p-4 rounded-2xl shrink-0 shadow-inner border border-[#cca43b]/25">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <div className="space-y-3.5 text-center md:text-left">
              <div className="space-y-1">
                <span className="block text-[10px] text-[#cca43b] font-bold tracking-wider uppercase">Monthly Auspicious Event</span>
                <h3 className="font-serif font-bold text-[#4a080a] dark:text-[#cca43b] text-lg md:text-xl">
                  பௌர்ணமி சிறப்பு பூஜை 
                </h3>
              </div>
              
              <div className="w-12 h-0.5 bg-stone-100 dark:bg-stone-800 mx-auto md:mx-0" />
              
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                ஒவ்வொரு பௌர்ணமி அன்றும் மதியம் 12.00 மணிக்குப் பிறகு சிறப்பு பூஜை நடைபெறும்." பக்தர்கள் அனைவரும் தங்களின் குடும்பத்தினருடன் வந்து சுவாமி தரிசனம் பெற வேண்டுகிறோம்.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Pooja;
