import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';
import { Printer, Download, Sparkles, Calendar, Clock, BookOpen, Volume2 } from 'lucide-react';

const Thiruvizha = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await apiCall('/festival-schedules');
        setScheduleData(data);
      } catch (error) {
        console.error('Error fetching festival schedules:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 print:p-0 print:max-w-full">
      
      {/* Action Buttons Ticker (Hidden during print) */}
      <div className="flex flex-wrap items-center justify-end gap-3 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4.5 py-2 bg-[#4a080a] hover:bg-[#6e0d10] text-white font-bold rounded text-xs uppercase tracking-wider transition-colors cursor-pointer shadow"
        >
          <Printer className="w-4 h-4 text-[#cca43b]" />
          அச்சிடு (Print)
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4.5 py-2 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded text-xs uppercase tracking-wider transition-colors cursor-pointer shadow"
        >
          <Download className="w-4 h-4 text-slate-950" />
          PDF பதிவிறக்கம்
        </button>
      </div>

      {/* Notice Board Main Frame */}
      <div className="bg-[#fdfaf2] border-4 border-double border-[#cca43b] rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 print:border-2 print:shadow-none print:p-4 print:bg-white animate-fade-in">
        
        {/* Notice Board Header with traditional decorations */}
        <div className="text-center space-y-3 pb-6 border-b-2 border-dashed border-[#cca43b]/40">
          <div className="flex justify-center items-center gap-4 text-2xl md:text-3xl">
            <span className="animate-pulse">🪔</span>
            <span className="animate-bounce text-[#cca43b]">🛕</span>
            <span className="animate-pulse">🔔</span>
          </div>
          
          <h1 className="text-xl md:text-3xl font-serif font-extrabold text-[#4a080a] tracking-wide leading-snug">
            அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில்
          </h1>
          <p className="text-xs md:text-sm font-bold tracking-widest text-[#cca43b] uppercase">
            9வது வார்டு, அண்ணாநகர், கீரிப்பட்டி கிராமம், சேலம் மாவட்டம்
          </p>
          
          <div className="inline-block bg-[#4a080a] text-[#cca43b] border border-[#cca43b]/40 px-6 py-2 rounded-full font-serif font-bold text-sm md:text-lg tracking-widest mt-2 uppercase shadow-sm">
            ஆவணி திருவிழா நிகழ்ச்சி நிரல்
          </div>
        </div>

        {/* Desktop View Table: Hidden on Mobile */}
        <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-[#cca43b]/60 shadow bg-white">
          <table className="w-full text-left border-collapse font-sans text-stone-900">
            <thead>
              <tr className="bg-[#4a080a] text-white font-serif font-bold text-[16px] md:text-[18px] border-b-2 border-[#cca43b]">
                <th className="p-5 border-r border-[#cca43b]/40 text-center w-1/4">
                  <span className="flex items-center justify-center gap-1.5"><Calendar className="w-4 h-4 text-[#cca43b]" /> நாள்</span>
                </th>
                <th className="p-5 border-r border-[#cca43b]/40 text-center w-1/4">
                  <span className="flex items-center justify-center gap-1.5"><Clock className="w-4 h-4 text-[#cca43b]" /> நிகழ்ச்சி நிரல்</span>
                </th>
                <th className="p-5 text-center w-2/4">
                  <span className="flex items-center justify-center gap-1.5"><BookOpen className="w-4 h-4 text-[#cca43b]" /> நிகழ்ச்சி</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cca43b]/20 font-medium">
              {loading ? (
                // Table Loading Skeletons
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse bg-stone-50/50">
                    <td className="p-5 border-r border-[#cca43b]/20 h-16 w-1/4">
                      <div className="h-4 bg-stone-200 dark:bg-slate-800 rounded w-4/5" />
                    </td>
                    <td className="p-5 border-r border-[#cca43b]/20 h-16 w-1/4">
                      <div className="h-4 bg-stone-200 dark:bg-slate-800 rounded w-3/5" />
                    </td>
                    <td className="p-5 h-16 w-2/4">
                      <div className="h-4 bg-stone-200 dark:bg-slate-800 rounded w-11/12" />
                    </td>
                  </tr>
                ))
              ) : scheduleData.length === 0 ? (
                // Table Empty Placeholder
                <tr>
                  <td colSpan="3" className="p-12 text-center text-slate-500 italic bg-[#fefcf8]">
                    திருவிழா கால அட்டவணை இன்னும் பதிவேற்றப்படவில்லை. (No schedule items uploaded yet.)
                  </td>
                </tr>
              ) : (
                // Actual Table Rows
                scheduleData.map((row, index) => (
                  <tr 
                    key={row._id || index} 
                    className={`transition-all duration-300 hover:bg-[#faf5e6] hover:scale-[1.005] ${
                      index % 2 === 0 ? 'bg-[#fefcf8]' : 'bg-[#faf6eb]'
                    }`}
                  >
                    <td className="p-5 border-r border-[#cca43b]/20 font-bold text-[#4a080a] text-[15px]">
                      {row.date}
                    </td>
                    <td className="p-5 border-r border-[#cca43b]/20 text-[#cca43b] font-bold text-[15px]">
                      {row.time}
                    </td>
                    <td className="p-5 text-[15px] leading-relaxed text-stone-805">
                      {row.program}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View Card Layout: Hidden on Desktop */}
        <div className="block md:hidden space-y-4">
          {loading ? (
            // Mobile Loading Skeletons
            [1, 2, 3].map((n) => (
              <div key={n} className="border border-stone-200 p-5 rounded-2xl bg-white space-y-3 animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-1/3" />
                <div className="h-4 bg-stone-200 rounded w-2/3" />
                <div className="h-4 bg-stone-200 rounded w-full" />
              </div>
            ))
          ) : scheduleData.length === 0 ? (
            // Mobile Empty Placeholder
            <div className="border border-[#cca43b]/20 p-8 rounded-2xl bg-white text-center text-slate-500 italic">
              திருவிழா கால அட்டவணை இன்னும் பதிவேற்றப்படவில்லை. (No schedule items uploaded yet.)
            </div>
          ) : (
            // Actual Mobile Cards
            scheduleData.map((row, index) => (
              <div 
                key={row._id || index} 
                className={`border border-[#cca43b]/30 p-5 rounded-2xl shadow-sm space-y-3.5 transition-all duration-300 hover:bg-[#faf5e6] ${
                  index % 2 === 0 ? 'bg-[#fefcf8]' : 'bg-[#faf6eb]'
                }`}
              >
                {/* Date Box */}
                <div className="flex items-start gap-2.5">
                  <div className="bg-[#4a080a] text-[#cca43b] p-1.5 rounded-lg shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#cca43b] font-bold uppercase tracking-widest">நாள்</span>
                    <span className="font-serif font-bold text-sm text-[#4a080a]">{row.date}</span>
                  </div>
                </div>

                {/* Time Box */}
                <div className="flex items-start gap-2.5">
                  <div className="bg-[#4a080a] text-[#cca43b] p-1.5 rounded-lg shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#cca43b] font-bold uppercase tracking-widest">நிகழ்ச்சி நிரல்</span>
                    <span className="font-serif font-bold text-sm text-[#4a080a]">{row.time}</span>
                  </div>
                </div>

                {/* Description Box */}
                <div className="flex items-start gap-2.5 pt-2 border-t border-[#cca43b]/10">
                  <div className="bg-[#cca43b]/20 text-[#4a080a] p-1.5 rounded-lg shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-widest">நிகழ்ச்சி விவரங்கள்</span>
                    <p className="text-xs font-semibold leading-relaxed text-stone-850">{row.program}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notice Board Footer */}
        <div className="text-center pt-6 border-t-2 border-dashed border-[#cca43b]/40 text-[#4a080a] font-serif font-bold text-xs md:text-sm tracking-wider leading-relaxed">
          ✦ அனைவரும் வருக! அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் & ஸ்ரீ முனியப்பன் சுவாமி அருள் பெறுக! ✦
        </div>

      </div>
    </div>
  );
};

export default Thiruvizha;
