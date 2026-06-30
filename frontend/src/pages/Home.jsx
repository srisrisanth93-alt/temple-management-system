import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { apiCall, BACKEND_URL } from '../utils/api';
import { 
  Calendar, 
  Bell, 
  Clock, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Image as ImageIcon, 
  Flame, 
  Sparkles,
  Volume2
} from 'lucide-react';

const Home = () => {
  const { language, t } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Live Countdown Timer State (Target: September 10, 2025)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-09-10T08:00:00+05:30'); // Festival Start Date
    
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await apiCall('/announcements');
        setAnnouncements(data.slice(0, 3)); // Display top 3 announcements
      } catch (error) {
        console.error('Error fetching announcements:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Slide Images Array
  const slides = [
    {
      image: '/temple_hero_banner.jpg',
      titleEN: 'MUNIYAPPAN',
      subtitleEN: 'SWAMY TEMPLE',
      quoteTA: 'அருள் செய்பவன் முனியப்பன்\nஅனைவரையும் காக்கும் தெய்வம்'
    }
  ];

  return (
    <div className="w-full bg-[#fcfaf7] dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO CAROUSEL / BANNER */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Slide background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-103"
          style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

        {/* Hero Content Overlay */}
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white space-y-6 animate-fade-in z-10 pt-8">
          <span className="text-[11px] md:text-sm font-serif tracking-widest text-[#cca43b] uppercase font-bold">
            Welcome to
          </span>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-7.5xl font-serif font-extrabold tracking-widest text-white leading-none">
              MUNIYAPPAN
            </h1>
            <h2 className="text-xl md:text-4xl font-serif tracking-widest text-[#cca43b] font-bold uppercase mt-1">
              SWAMY TEMPLE
            </h2>
          </div>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto my-3" />
          
          <p className="text-[14px] md:text-[18px] text-slate-200 font-serif leading-relaxed whitespace-pre-line italic drop-shadow-md">
            {slides[currentSlide].quoteTA}
          </p>

          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-block px-7 py-3 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded shadow-lg transition-all text-xs md:text-sm uppercase tracking-widest"
            >
              KNOW MORE
            </Link>
          </div>
        </div>

        {/* Carousel controls */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-[#cca43b] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer z-10 hidden sm:flex">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-[#cca43b] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer z-10 hidden sm:flex">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Wave vector divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#fcfaf7] dark:bg-slate-950 clip-wave z-10" />
      </section>

      {/* 2. QUICK LINKS BANNER OVERLAY */}
      <section className="relative z-20 -mt-10 md:-mt-16 max-w-7xl mx-auto px-4">
        <div className="bg-[#4a080a] border border-[#cca43b]/30 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#cca43b]/20">
          
          {/* Link 1: About */}
          <Link to="/about" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-colors">
            <Info className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-105 transition-transform" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">ABOUT TEMPLE</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">History & Importance</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 2: Festival */}
          <Link to="/thiruvizha" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-colors">
            <Calendar className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-105 transition-transform" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">FESTIVAL</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Event & Celebration</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 3: Gallery */}
          <Link to="/gallery" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-colors">
            <ImageIcon className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-105 transition-transform" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">GALLERY</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Photos & Videos</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 4: Pooja */}
          <Link to="/pooja" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-colors">
            <Flame className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-105 transition-transform" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">POOJAI</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Daily & Special Timings</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 5: Contact */}
          <Link to="/contact" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-colors">
            <Phone className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-105 transition-transform" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">CONTACT</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Get In Touch</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

        </div>
      </section>

      {/* 3. ABOUT OUR TEMPLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#cca43b]" />
              <span className="text-xs font-bold text-[#cca43b] tracking-widest uppercase">About Our Temple</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b] leading-tight">
              Muniyappan Swamy Temple
            </h2>
            <p className="text-slate-655 dark:text-slate-350 text-[15px] leading-relaxed">
              Muniyappan Swamy Temple is a divine place of power and blessings. This temple has a rich history and is believed to fulfill the wishes of the devotees. அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில், கீரிப்பட்டி கிராமத்தின் பிரதான காவல் தெய்வமாக அருள் பாலித்து வருகிறது.
            </p>

            <div className="pt-2">
              <Link 
                to="/about"
                className="px-6 py-3 bg-[#4a080a] text-white hover:bg-[#6e0d10] font-bold rounded text-xs uppercase tracking-widest shadow-md transition-colors"
              >
                READ MORE
              </Link>
            </div>
          </div>

          {/* Right side row of 4 rounded-corner images */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-stone-200/50 hover:shadow-lg transition-shadow">
              <img src="/temple_hero_banner.jpg" alt="Deity Closeup" className="w-full h-full object-cover hover:scale-103 transition-transform" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-stone-200/50 translate-y-3 hover:shadow-lg transition-shadow">
              <img src="/temple_hero_banner.jpg" alt="Temple Shrine" className="w-full h-full object-cover hover:scale-103 transition-transform" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-stone-200/50 hover:shadow-lg transition-shadow">
              <img src="/temple_hero_banner.jpg" alt="Gopuram Structure" className="w-full h-full object-cover hover:scale-103 transition-transform" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-stone-200/50 translate-y-3 hover:shadow-lg transition-shadow">
              <img src="/temple_hero_banner.jpg" alt="Devotional Items" className="w-full h-full object-cover hover:scale-103 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. UPCOMING FESTIVAL & TEMPLE TIMINGS */}
      <section className="bg-[#f5f1e8] dark:bg-slate-900/40 border-y border-[#cca43b]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Col A (Countdown Timer): width 4/12 */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-[#cca43b]/10 p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#cca43b] uppercase tracking-widest">Auspicious Event Countdown</span>
                <h3 className="text-xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">Upcoming Festival</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner">
                  <span className="block text-2xl md:text-3xl font-bold font-serif">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Days</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner">
                  <span className="block text-2xl md:text-3xl font-bold font-serif">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Hours</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner">
                  <span className="block text-2xl md:text-3xl font-bold font-serif">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Mins</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner">
                  <span className="block text-2xl md:text-3xl font-bold font-serif">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Secs</span>
                </div>
              </div>

            </div>

            {/* Col B (Festival Info & Circular image): width 4/12 */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-[#cca43b]/10 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-between text-center space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">திருவிழா</h4>
                <p className="text-[11px] font-bold text-[#cca43b] uppercase tracking-wider"> Sep 2026-  Sep 2026</p>
              </div>

              {/* Circular Deity Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#cca43b] shadow-md">
                <img src="/temple_hero_banner.jpg" alt="Deity Miniature" className="w-full h-full object-cover" />
              </div>


              <Link 
                to="/thiruvizha"
                className="px-6 py-2.5 bg-[#4a080a] hover:bg-[#6e0d10] text-white font-bold rounded text-[10px] uppercase tracking-widest transition-colors shadow-sm"
              >
                VIEW DETAILS
              </Link>
            </div>

            {/* Col C (Temple Timings): width 4/12 */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-[#cca43b]/10 p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-5">
              <div className="border-b border-stone-100 dark:border-stone-800 pb-2">
                <h4 className="text-lg font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">Temple Timings</h4>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-50 dark:border-stone-850">
                  <span className="font-semibold text-slate-800 dark:text-white uppercase tracking-wider">Morning</span>
                  <span className="text-[#cca43b] font-bold">06:00 AM - 06:00 PM</span>
                </div>
               
              
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST ANNOUNCEMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center space-x-3 border-b border-stone-200 dark:border-slate-800 pb-3 justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#cca43b]" />
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4a080a] dark:text-[#cca43b]">
              {language === 'en' ? 'Announcements' : 'அறிவிப்புகள்'}
            </h3>
          </div>
          <Link to="/contact" className="text-xs font-bold text-[#cca43b] hover:text-[#4a080a] tracking-widest uppercase flex items-center gap-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-stone-50 dark:bg-slate-900 h-28 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-10 text-slate-500 italic">
            {t('noAnnouncements')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((post) => (
              <div 
                key={post._id} 
                className="bg-white dark:bg-slate-900 border border-[#cca43b]/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                {post.isPinned && (
                  <span className="absolute top-0 right-0 bg-[#cca43b] text-slate-950 text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-bl">
                    {t('pinned')}
                  </span>
                )}
                <div className="space-y-3">
                  <h4 className="text-base font-bold font-serif text-slate-950 dark:text-white leading-snug">
                    {language === 'en' ? post.titleEN : post.titleTA}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-3 leading-relaxed">
                    {language === 'en' ? post.contentEN : post.contentTA}
                  </p>
                </div>
                <div className="border-t border-stone-50 dark:border-stone-850 pt-3 mt-4 text-[10px] text-stone-400 flex items-center justify-between">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.audioUrl && (
                    <span className="text-[#cca43b] flex items-center gap-0.5 font-semibold">
                      <Volume2 className="w-3.5 h-3.5" /> Audio
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. DEVOTIONAL STUTHIS SECTION */}
      <section className="bg-[#4a080a] text-white py-16 border-t border-[#cca43b]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#cca43b] flex items-center justify-center gap-2">
              <span className="text-[#cca43b]">✦</span> தெய்வீகத் துதிகள் <span className="text-[#cca43b]">✦</span>
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Parvathi Stuthi */}
            <div className="bg-[#3d0608] border border-[#cca43b]/20 p-6 rounded-2xl shadow-inner text-center relative overflow-hidden flex flex-col justify-center min-h-[170px]">
              <div className="absolute top-3 left-3 text-[#cca43b]/10 text-4xl font-serif">❝</div>
              <h4 className="font-bold font-serif text-[#cca43b] text-base md:text-lg mb-3">
                ஸ்ரீ பாரதி ஸ்துதி
              </h4>
              <p className="text-stone-300 italic font-serif leading-relaxed text-[14px] md:text-[15px] px-2">
                அன்னையாய் வந்து காக்கும் அபிராமி தாயே போற்றி ! உண்மையாய் எந்த ஒளியே போற்றி ! உலகின் தாயே போற்றி ! முன்னவள் முக்கட் செல்வம் முறுவலில் மகிழும் காளி ! இன்னருள் தருவாய் போற்றி ஏசுநாயகியே போற்றி ! போற்றி !!
              </p>
              <div className="absolute bottom-3 right-3 text-[#cca43b]/10 text-4xl font-serif">❞</div>
            </div>

            {/* Mahamuni Stuthi */}
            <div className="bg-[#3d0608] border border-[#cca43b]/20 p-6 rounded-2xl shadow-inner text-center relative overflow-hidden flex flex-col justify-center min-h-[170px]">
              <div className="absolute top-3 left-3 text-[#cca43b]/10 text-4xl font-serif">❝</div>
              <h4 className="font-bold font-serif text-[#cca43b] text-base md:text-lg mb-3">
                ஸ்ரீ மகாமுனி ஸ்துதி
              </h4>
              <p className="text-stone-300 italic font-serif leading-relaxed text-[14px] md:text-[15px] px-2">
                கீரை மகாநகரிலே நொட்டக்கல் தனிலே தோன்றிய முனியப்ப துரையே கம்பு கட்டாறி, ஈட்டி, கேடயம் ஏந்தி காற்றாய் பரந்த முனியே பெண்களை கன்னமிடும் பித்தனே பேய்போல் திரிந்த முனியே வாமுனி, செம்முனி வளர்ந்த சடாமுனி வரவேண்டும் ராயப்ப துரையே
              </p>
              <div className="absolute bottom-3 right-3 text-[#cca43b]/10 text-4xl font-serif">❞</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
