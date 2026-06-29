import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

const Pooja = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-temple-maroon dark:text-temple-gold tracking-wide">
          பூஜை வழிபாடுகள்
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
      </div>

      {/* Devotional Timings Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
        
        {/* Friday Special Pooja Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-temple-saffron dark:border-temple-gold p-6 md:p-8 rounded-r-3xl shadow-sm hover:shadow-md transition-all flex items-start gap-4">
          <div className="bg-orange-50 dark:bg-slate-800 text-temple-saffron p-3.5 rounded-2xl shrink-0 shadow-inner">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-temple-saffron uppercase tracking-widest">வெள்ளிக்கிழமை வழிபாடு</span>
            <p className="text-slate-850 dark:text-white font-serif font-bold text-lg md:text-xl leading-relaxed">
              ஒவ்வொரு வெள்ளிக்கிழமையும் பகல் 12:00 மணிக்கு மேல் சிறப்பு பூஜை நடைபெறும்.
            </p>
          </div>
        </div>

        {/* Pournami Special Pooja Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-temple-saffron dark:border-temple-gold p-6 md:p-8 rounded-r-3xl shadow-sm hover:shadow-md transition-all flex items-start gap-4">
          <div className="bg-orange-50 dark:bg-slate-800 text-temple-saffron p-3.5 rounded-2xl shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-temple-saffron uppercase tracking-widest">பௌர்ணமி வழிபாடு</span>
            <p className="text-slate-850 dark:text-white font-serif font-bold text-lg md:text-xl leading-relaxed">
              பௌர்ணமி அன்று சிறப்பு பூஜை நடைபெறும்.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pooja;
