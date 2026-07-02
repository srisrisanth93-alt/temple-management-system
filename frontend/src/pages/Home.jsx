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

  const [upcomingFestival, setUpcomingFestival] = useState(null);
  const [customSlides, setCustomSlides] = useState([]);

  // Default slides fallback
  const defaultSlides = [
    {
      image: '/hero_slide1.jpg',
      titleEN: 'MUNIYAPPAN',
      subtitleEN: 'SWAMY TEMPLE',
      quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.'
    },
    {
      image: '/hero_slide2.jpg',
      titleEN: 'MUNIYAPPAN',
      subtitleEN: 'SWAMY TEMPLE',
      quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.'
    },
    {
      image: '/hero_slide3.jpg',
      titleEN: 'MUNIYAPPAN',
      subtitleEN: 'SWAMY TEMPLE',
      quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.'
    },
    {
      image: '/hero_slide4.jpg',
      titleEN: 'MUNIYAPPAN',
      subtitleEN: 'SWAMY TEMPLE',
      quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.'
    }
  ];

  // Map slide images to backend URL if they are uploads
  const slides = (customSlides.length > 0 ? customSlides : defaultSlides).map(slide => ({
    ...slide,
    image: slide.image.startsWith('/uploads/') ? `${BACKEND_URL}${slide.image}` : slide.image
  }));

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [annList, festList, slideList] = await Promise.all([
          apiCall('/announcements'),
          apiCall('/festivals'),
          apiCall('/hero-slides')
        ]);
        
        setAnnouncements(annList.slice(0, 3));
        setCustomSlides(slideList);
        
        // Find the closest future festival
        const futureFestivals = festList
          .filter(f => new Date(f.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        if (futureFestivals.length > 0) {
          setUpcomingFestival(futureFestivals[0]);
        }
      } catch (error) {
        console.error('Error fetching home dashboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  useEffect(() => {
    const targetDate = upcomingFestival 
      ? new Date(upcomingFestival.date) 
      : new Date('2026-09-10T08:00:00+05:30');
    
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
  }, [upcomingFestival]);

  // Auto Rotate Slider
  useEffect(() => {
    if (slides.length <= 1) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full bg-[#fcfaf7] dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* 1. HERO CAROUSEL / BANNER WITH DIVINE LIGHTS & FLOWERS */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Slide background with crossfade & Ken Burns effect */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100 animate-ken-burns' : 'opacity-0 scale-95 pointer-events-none'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
        
        {/* Cinematic dark gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/35" />
        
        {/* Divine Sun Rays Overlay */}
        <div className="absolute inset-0 divine-sunrays z-10" />

        {/* Floating Gold Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(12)].map((_, i) => {
            const delay = (i * 1.5).toFixed(1);
            const left = (10 + i * 8).toFixed(1);
            const size = (4 + (i % 3) * 3);
            return (
              <div 
                key={i} 
                className="dust-particle"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${12 + (i % 4) * 4}s`
                }}
              />
            );
          })}
        </div>
 
        {/* Floating Flower Petals (Rose & Marigold) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(14)].map((_, i) => {
            const delay = (i * 1.3).toFixed(1);
            const left = (5 + i * 7.5).toFixed(1);
            const isYellow = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`floating-petal ${isYellow ? 'floating-petal-yellow' : ''}`}
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  transform: `scale(${0.6 + (i % 5) * 0.18})`
                }}
              />
            );
          })}
        </div>
 
        {/* Hero Content Overlay */}
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white space-y-6 animate-fade-in z-10 pt-8">
          <span className="text-[11px] md:text-sm font-serif tracking-widest text-[#cca43b] uppercase font-bold flex items-center justify-center gap-2">
            <span className="animate-flicker text-sm">🪔</span> Welcome to <span className="animate-flicker text-sm">🪔</span>
          </span>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-7xl font-serif font-extrabold tracking-wide text-white leading-none text-shine">
              ஸ்ரீ முனியப்பன்
            </h1>
            <h2 className="text-xl md:text-3.5xl font-serif tracking-widest text-[#cca43b] font-bold uppercase mt-2">
              திருக்கோவில்
            </h2>
          </div>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto my-3 animate-scale-width" />
          
          <p className="text-[14px] md:text-[18px] text-slate-200 font-serif leading-relaxed whitespace-pre-line italic drop-shadow-md">
            {slides[currentSlide].quoteTA}
          </p>
 
          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-block px-8 py-3 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs md:text-sm uppercase tracking-widest cursor-pointer btn-premium-glow"
            >
              KNOW MORE
            </Link>
          </div>
        </div>
 
        {/* Carousel controls */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-[#cca43b] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer z-25 hidden sm:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-[#cca43b] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer z-25 hidden sm:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
 
        {/* Wave vector divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#fcfaf7] dark:bg-slate-950 clip-wave z-10" />
      </section>

      {/* 2. QUICK LINKS BANNER OVERLAY */}
      <section className="relative z-20 -mt-10 md:-mt-16 max-w-7xl mx-auto px-4">
        <div className="bg-[#4a080a] border border-[#cca43b]/30 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#cca43b]/20">
          
          {/* Link 1: About */}
          <Link to="/about" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-all">
            <Info className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">ABOUT TEMPLE</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">History & Importance</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 2: Festival */}
          <Link to="/thiruvizha" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-all">
            <Calendar className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">FESTIVAL</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Event & Celebration</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 3: Gallery */}
          <Link to="/gallery" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-all">
            <ImageIcon className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">GALLERY</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Photos & Videos</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 4: Pooja */}
          <Link to="/pooja" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-all">
            <Flame className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-110 transition-transform duration-300 animate-flicker" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">POOJAI</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Daily & Special Timings</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Link 5: Contact */}
          <Link to="/contact" className="p-6 flex flex-col items-center text-center group hover:bg-[#3d0608] transition-all">
            <Phone className="w-8 h-8 text-[#cca43b] mb-2.5 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-serif font-bold text-white text-[13px] tracking-wider uppercase">CONTACT</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Get In Touch</p>
            <span className="text-[9px] text-[#cca43b] font-bold mt-4 inline-flex items-center gap-0.5 tracking-widest uppercase group-hover:underline">
              READ MORE <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

        </div>
      </section>

      {/* 3. ABOUT OUR TEMPLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-reveal">
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
            <p className="text-slate-650 dark:text-slate-350 text-[15px] leading-relaxed">
              Muniyappan Swamy Temple is a divine place of power and blessings. This temple has a rich history and is believed to fulfill the wishes of the devotees. அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில், கீரிப்பட்டி கிராமத்தின் பிரதான காவல் தெய்வமாக அருள் பாலித்து வருகிறது.
            </p>

            <div className="pt-2">
              <Link 
                to="/about"
                className="inline-block px-7 py-3 bg-[#4a080a] text-[#cca43b] border border-[#cca43b]/40 hover:bg-[#6e0d10] font-bold rounded text-xs uppercase tracking-widest shadow-md transition-all hover:scale-105 cursor-pointer btn-premium-glow"
              >
                READ MORE
              </Link>
            </div>
          </div>

          {/* Right side row of 4 rounded-corner images with floating effects */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-[#cca43b]/30 float-slow hover:shadow-xl hover:scale-105 transition-all duration-500">
              <img src="/temple_hero_banner.jpg" alt="Deity Closeup" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-[#cca43b]/30 translate-y-3 hover:shadow-xl hover:scale-105 transition-all duration-500">
              <img src="/temple_hero_banner.jpg" alt="Temple Shrine" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-[#cca43b]/30 float-slow hover:shadow-xl hover:scale-105 transition-all duration-500">
              <img src="/temple_hero_banner.jpg" alt="Gopuram Structure" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow border border-[#cca43b]/30 translate-y-3 hover:shadow-xl hover:scale-105 transition-all duration-500">
              <img src="/temple_hero_banner.jpg" alt="Devotional Items" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. UPCOMING FESTIVAL & TEMPLE TIMINGS (CINEMATIC PARALLAX SECTION) */}
      <section 
        className="relative bg-parallax border-y border-[#cca43b]/15 py-20 overflow-hidden bg-cover bg-center scroll-reveal"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(74, 8, 10, 0.94), rgba(53, 5, 7, 0.94)), url('/temple_hero_banner.jpg')" }}
      >
        {/* Floating Petals Inside Parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => {
            const delay = (i * 2).toFixed(1);
            const left = (10 + i * 15).toFixed(1);
            return (
              <div 
                key={i} 
                className="floating-petal floating-petal-yellow"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  transform: `scale(${0.5 + (i % 3) * 0.2})`
                }}
              />
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Col A (Countdown Timer): width 4/12 (Glassmorphism) */}
            <div className="glass-card-gold lg:col-span-4 p-8 rounded-3xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#cca43b] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="animate-flicker">🪔</span> Auspicious Event Countdown
                </span>
                <h3 className="text-xl font-serif font-bold text-white">Upcoming Festival</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner border border-[#cca43b]/20">
                  <span className="block text-2xl md:text-3xl font-bold font-serif text-[#cca43b]">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Days</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner border border-[#cca43b]/20">
                  <span className="block text-2xl md:text-3xl font-bold font-serif text-[#cca43b]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Hours</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner border border-[#cca43b]/20">
                  <span className="block text-2xl md:text-3xl font-bold font-serif text-[#cca43b]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Mins</span>
                </div>
                <div className="bg-[#4a080a] text-white p-3.5 rounded-xl shadow-inner border border-[#cca43b]/20">
                  <span className="block text-2xl md:text-3xl font-bold font-serif text-[#cca43b]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#cca43b] font-bold">Secs</span>
                </div>
              </div>
            </div>

            {/* Col B (Festival Info & Circular image): width 4/12 (Glassmorphism) */}
            <div className="glass-card-gold lg:col-span-4 p-8 rounded-3xl flex flex-col items-center justify-between text-center space-y-6 relative overflow-hidden">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-white">
                  {upcomingFestival 
                    ? upcomingFestival.nameTA 
                    : 'ஸ்ரீ முனியப்பன் திருக்கோவில் ஆவணித் திருவிழா'}
                </h4>
                <p className="text-[11px] font-bold text-[#cca43b] uppercase tracking-wider">
                  {upcomingFestival 
                    ? new Date(upcomingFestival.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', { month: 'short', year: 'numeric' })
                    : 'Sep 2026'
                  }
                </p>
              </div>

              {/* Circular Deity Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#cca43b] shadow-md hover:scale-105 transition-transform duration-300">
                <img 
                  src={upcomingFestival && upcomingFestival.image 
                    ? `${BACKEND_URL}${upcomingFestival.image}` 
                    : '/temple_hero_banner.jpg'
                  } 
                  alt="Deity Miniature" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <Link 
                to="/thiruvizha"
                className="px-6 py-2.5 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded text-[10px] uppercase tracking-widest transition-all hover:scale-105 cursor-pointer btn-premium-glow"
              >
                VIEW DETAILS
              </Link>
            </div>

            {/* Col C (Temple Timings): width 4/12 (Glassmorphism) */}
            <div className="glass-card-gold lg:col-span-4 p-8 rounded-3xl flex flex-col justify-between space-y-5 relative overflow-hidden">
              <div className="border-b border-[#cca43b]/20 pb-2">
                <h4 className="text-lg font-serif font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#cca43b]" /> Temple Timings
                </h4>
              </div>

              <div className="space-y-3.5 text-xs text-slate-200">
                <div className="flex flex-col gap-1.5 items-center justify-center py-6 bg-[#4a080a]/60 rounded-xl border border-[#cca43b]/30 text-center shadow-inner">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#cca43b]">தினசரி தரிசன நேரம்</span>
                  <span className="font-extrabold text-[15px] sm:text-[18px] md:text-[20px] text-[#cca43b] mt-1.5 leading-relaxed font-serif tracking-wide block">
                    காலை 06:00 மணி முதல் மாலை 06:00 மணி வரை
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST ANNOUNCEMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 scroll-reveal">
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
                className="glass-card-gold p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between"
              >
                {post.isPinned && (
                  <span className="absolute top-0 right-0 bg-[#cca43b] text-slate-950 text-[8px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-bl-xl border-l border-b border-[#cca43b]/40">
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
                <div className="border-t border-stone-100 dark:border-slate-850 pt-3 mt-4 text-[10px] text-stone-400 flex items-center justify-between">
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
            {/* Parasakthi Stuthi */}
            <div className="bg-[#3d0608] border border-[#cca43b]/20 p-6 rounded-2xl shadow-inner text-center relative overflow-hidden flex flex-col justify-center min-h-[170px] hover:border-[#cca43b]/50 transition-colors duration-300">
              <div className="absolute top-3 left-3 text-[#cca43b]/10 text-4xl font-serif">❝</div>
              <h4 className="font-bold font-serif text-[#cca43b] text-base md:text-lg mb-3">
                ஸ்ரீ பராசக்தி ஸ்துதி
              </h4>
              <p className="text-stone-300 italic font-serif leading-relaxed text-[14px] md:text-[15px] px-2">
                அன்னையாய் வந்து காக்கும் அபிராமி தாயே போற்றி ! உண்மையாய் எந்த ஒளியே போற்றி ! உலகின் தாயே போற்றி ! முன்னவள் முக்கட் செல்வம் முறுவலில் மகிழும் காளி ! இன்னருள் தருவாய் போற்றி ஏசுநாயகியே போற்றி ! போற்றி !!
              </p>
              <div className="absolute bottom-3 right-3 text-[#cca43b]/10 text-4xl font-serif">❞</div>
            </div>

            {/* Mahamuni Stuthi */}
            <div className="bg-[#3d0608] border border-[#cca43b]/20 p-6 rounded-2xl shadow-inner text-center relative overflow-hidden flex flex-col justify-center min-h-[170px] hover:border-[#cca43b]/50 transition-colors duration-300">
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
