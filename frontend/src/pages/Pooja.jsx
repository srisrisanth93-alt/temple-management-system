import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Calendar, Clock, Heart, ClipboardCheck, Phone, User, CheckCircle2 } from 'lucide-react';

const Pooja = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    poojaType: 'Archana',
    rasi: 'Mesham',
    nakshatram: 'Aswini',
    bookingDate: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const poojaPrices = [
    { nameEN: 'Archana', nameTA: 'அர்ச்சனை', price: '₹101', descEN: 'Offer prayers with flowers and coconut.', descTA: 'தேங்காய், பழம் மற்றும் பூக்களுடன் அர்ச்சனை செய்தல்.' },
    { nameEN: 'Abhishekham', nameTA: 'அபிஷேகம்', price: '₹501', descEN: 'Sacred bathing ritual for the deity.', descTA: 'பால், பன்னீர், இளநீர் கொண்டு சுவாமிக்கு அபிஷேகம்.' },
    { nameEN: 'Special Pooja', nameTA: 'சிறப்பு பூஜை', price: '₹1001', descEN: 'Exclusive family prayers on your special day.', descTA: 'குடும்ப நலம் மற்றும் விசேஷ நாட்களுக்கான சிறப்பு பூஜை.' },
    { nameEN: 'Alankaram', nameTA: 'அலங்காரம்', price: '₹1501', descEN: 'Grand cosmetic decoration of the deity.', descTA: 'வண்ண மலர்கள் மற்றும் ஆபரணங்களால் சுவாமிக்கு அலங்காரம்.' },
    { nameEN: 'Annadhanam', nameTA: 'அன்னதானம்', price: '₹5001', descEN: 'Provide food for 50+ devotees at the temple.', descTA: 'கோவிலுக்கு வரும் 50+ பக்தர்களுக்கு அன்னதானம் வழங்குதல்.' }
  ];

  const rasialist = [
    'Mesham (மேஷம்)', 'Rishabham (ரிஷபம்)', 'Mithunam (மிதுனம்)', 'Kadagam (கடகம்)',
    'Simham (சிம்மம்)', 'Kanni (கன்னி)', 'Thulam (துலாம்)', 'Viruchigam (விருச்சிகம்)',
    'Dhanusu (தனுசு)', 'Magaram (மகரம்)', 'Kumbham (கும்பம்)', 'Meenam (மீனம்)'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.bookingDate) {
      alert(language === 'en' ? 'Please fill all required fields.' : 'தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.');
      return;
    }
    // Generate random booking ID
    const randomId = 'MUNI-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#fcfaf7] dark:bg-slate-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-1.5 text-[#cca43b] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Divine Offerings</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
            {language === 'en' ? 'Pooja Services & Booking' : 'பூஜை வழிபாடுகள் & முன்பதிவு'}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-2" />
        </div>

        {/* Weekly & Monthly Schedule banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Friday card */}
          <div className="bg-[#4a080a] border border-[#cca43b]/30 p-6 rounded-2xl shadow flex items-center gap-4 text-white">
            <div className="bg-[#3d0608] text-[#cca43b] p-3.5 rounded-xl border border-[#cca43b]/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] text-[#cca43b] font-bold tracking-wider uppercase">Weekly Worship</span>
              <h4 className="font-serif font-bold text-base md:text-lg">வெள்ளிக்கிழமை சிறப்பு பூஜை</h4>
              <p className="text-xs text-stone-300">ஒவ்வொரு வெள்ளிக்கிழமையும் மாலை 06:00 மணிக்கு நடைபெறும்.</p>
            </div>
          </div>

          {/* Pournami card */}
          <div className="bg-[#4a080a] border border-[#cca43b]/30 p-6 rounded-2xl shadow flex items-center gap-4 text-white">
            <div className="bg-[#3d0608] text-[#cca43b] p-3.5 rounded-xl border border-[#cca43b]/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] text-[#cca43b] font-bold tracking-wider uppercase">Monthly Auspicious</span>
              <h4 className="font-serif font-bold text-base md:text-lg">பௌர்ணமி சிறப்பு பூஜை</h4>
              <p className="text-xs text-stone-300">ஒவ்வொரு பௌர்ணமி அன்றும் மாலை சிறப்பு அபிஷேகம் நடைபெறும்.</p>
            </div>
          </div>
        </div>

        {/* Pricing List & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pricing List (7/12) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-[#cca43b]/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-850 pb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-[#cca43b]" />
              <h3 className="text-xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
                {language === 'en' ? 'Pooja Rates' : 'பூஜை கட்டணங்கள்'}
              </h3>
            </div>

            <div className="space-y-4">
              {poojaPrices.map((pooja, index) => (
                <div 
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-stone-100 dark:border-stone-850 bg-stone-50/50 dark:bg-slate-950/20 hover:border-[#cca43b]/30 transition-all gap-2"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#4a080a] dark:text-white text-base">
                      {language === 'en' ? pooja.nameEN : pooja.nameTA}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'en' ? pooja.descEN : pooja.descTA}
                    </p>
                  </div>
                  <div className="bg-[#4a080a] text-[#cca43b] border border-[#cca43b]/30 px-4 py-1.5 rounded-lg font-bold text-sm shrink-0 self-end sm:self-center">
                    {pooja.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Booking Form (5/12) */}
          <div className="lg:col-span-5">
            {!submitted ? (
              <form 
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 border border-[#cca43b]/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-5"
              >
                <div className="border-b border-stone-100 dark:border-stone-850 pb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#cca43b]" />
                  <h3 className="text-xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
                    {language === 'en' ? 'Book Your Pooja' : 'பூஜை முன்பதிவு படிவம்'}
                  </h3>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                    {language === 'en' ? 'Devotee Name *' : 'பக்தர் பெயர் *'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? 'Enter full name' : 'முழு பெயரை உள்ளிடவும்'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] focus:ring-1 focus:ring-[#cca43b] outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                    {language === 'en' ? 'Phone Number *' : 'கைபேசி எண் *'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] focus:ring-1 focus:ring-[#cca43b] outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Pooja Type Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                    {language === 'en' ? 'Pooja Type' : 'பூஜை வகை'}
                  </label>
                  <select 
                    name="poojaType"
                    value={formData.poojaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
                  >
                    {poojaPrices.map((p, idx) => (
                      <option key={idx} value={p.nameEN}>
                        {language === 'en' ? p.nameEN : p.nameTA}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rasi & Nakshatram Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                      {language === 'en' ? 'Rasi (Zodiac)' : 'ராசி'}
                    </label>
                    <select 
                      name="rasi"
                      value={formData.rasi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
                    >
                      {rasialist.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                      {language === 'en' ? 'Nakshatram (Star)' : 'நட்சத்திரம்'}
                    </label>
                    <input 
                      type="text" 
                      name="nakshatram"
                      value={formData.nakshatram}
                      onChange={handleInputChange}
                      placeholder="e.g. Aswini"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] focus:ring-1 focus:ring-[#cca43b] outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Booking Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                    {language === 'en' ? 'Pooja Date *' : 'பூஜை நாள் *'}
                  </label>
                  <input 
                    type="date" 
                    name="bookingDate"
                    required
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#4a080a] hover:bg-[#6e0d10] text-[#cca43b] hover:text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow cursor-pointer mt-2"
                >
                  {language === 'en' ? 'BOOK NOW' : 'முன்பதிவு செய்'}
                </button>
              </form>
            ) : (
              // Successful Booking Receipt Card
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-[#cca43b] p-6 md:p-8 rounded-3xl shadow-xl space-y-6 text-center animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#cca43b]/10 rounded-bl-full flex items-center justify-center text-xs font-bold text-[#cca43b] uppercase tracking-widest pl-6 pb-6">
                  Receipt
                </div>

                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                
                <div className="space-y-1.5">
                  <h3 className="text-xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
                    {language === 'en' ? 'Booking Confirmed!' : 'முன்பதிவு உறுதியானது!'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'en' ? 'Please present this receipt code at the temple office.' : 'இந்த ரசீதை கோவில் அலுவலகத்தில் காண்பிக்கவும்.'}
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-stone-50 dark:bg-slate-950 p-4 rounded-2xl border border-stone-150 dark:border-slate-850 text-left space-y-3.5 text-xs font-medium">
                  <div className="flex justify-between border-b border-stone-200/50 pb-2">
                    <span className="text-slate-400">Booking ID:</span>
                    <span className="font-bold text-[#4a080a] dark:text-[#cca43b] tracking-wider">{bookingId}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/50 pb-2">
                    <span className="text-slate-400">Devotee:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/50 pb-2">
                    <span className="text-slate-400">Pooja Type:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{formData.poojaType}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/50 pb-2">
                    <span className="text-slate-400">Rasi / Nakshatram:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{formData.rasi} / {formData.nakshatram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Date:</span>
                    <span className="font-bold text-[#cca43b]">{new Date(formData.bookingDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-stone-100 dark:bg-slate-800 hover:bg-[#cca43b] hover:text-slate-950 text-slate-700 dark:text-stone-300 font-bold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {language === 'en' ? 'Book Another' : 'புதிய பதிவு'}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Pooja;
