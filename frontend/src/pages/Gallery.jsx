import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall, BACKEND_URL } from '../utils/api';
import { Image, Video, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const Gallery = () => {
  const { language, t } = useLanguage();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await apiCall('/gallery');
        setMediaItems(data);
      } catch (error) {
        console.error('Error fetching gallery:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    { key: 'all', label: t('all') },
    { key: 'deity', label: t('filterDeity') },
    { key: 'festivals', label: t('filterFestivals') },
    { key: 'general', label: t('filterGeneral') },
  ];

  const filteredItems = activeFilter === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.category.toLowerCase() === activeFilter);

  const openLightbox = (item, idx) => {
    setLightboxItem(item);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    setLightboxIndex(-1);
  };

  const navigateLightbox = (direction) => {
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) newIndex = filteredItems.length - 1;
    if (newIndex >= filteredItems.length) newIndex = 0;
    
    setLightboxIndex(newIndex);
    setLightboxItem(filteredItems[newIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 scroll-reveal">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-temple-maroon dark:text-temple-gold">
          {t('galleryHeader')}
        </h1>
        <p className="text-sm md:text-base text-slate-550 dark:text-slate-405 max-w-2xl mx-auto">
          {t('gallerySub')}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all cursor-pointer btn-premium-glow ${
              activeFilter === cat.key
                ? 'bg-gradient-to-r from-temple-maroon to-temple-saffron text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:border-temple-gold'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-slate-100 dark:bg-slate-800 h-56 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-lg mx-auto">
          <Image className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p>{t('noMedia')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item._id}
              onClick={() => openLightbox(item, idx)}
              className="group relative aspect-video sm:aspect-square bg-slate-900 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 scroll-reveal"
            >
              {/* Media Element */}
              {item.mediaType === 'photo' ? (
                <img
                  src={item.url.startsWith('/uploads/') ? `${BACKEND_URL}${item.url}` : item.url}
                  alt={item.titleEN}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                  {/* Video Thumbnail (can be an image placeholder or direct element) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                    <Video className="w-10 h-10 text-white drop-shadow" />
                  </div>
                  <video
                    src={item.url.startsWith('/uploads/') ? `${BACKEND_URL}${item.url}` : item.url}
                    className="w-full h-full object-cover opacity-70"
                    muted
                    playsInline
                  />
                </div>
              )}

              {/* Hover overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
                <span className="text-[10px] font-bold text-temple-gold uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-white font-serif font-bold text-base leading-snug">
                  {language === 'en' ? item.titleEN : item.titleTA}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2.5 rounded-full border border-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={() => navigateLightbox(-1)}
            className="absolute left-4 bg-slate-900/60 hover:bg-slate-800/80 text-white p-2.5 rounded-full border border-slate-800 cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigateLightbox(1)}
            className="absolute right-4 bg-slate-900/60 hover:bg-slate-800/80 text-white p-2.5 rounded-full border border-slate-800 cursor-pointer hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Media Stage */}
          <div className="max-w-4xl w-full max-h-[70vh] flex items-center justify-center p-2">
            {lightboxItem.mediaType === 'photo' ? (
              <img
                src={lightboxItem.url.startsWith('/uploads/') ? `${BACKEND_URL}${lightboxItem.url}` : lightboxItem.url}
                alt={lightboxItem.titleEN}
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-slate-800"
              />
            ) : (
              <video
                src={lightboxItem.url.startsWith('/uploads/') ? `${BACKEND_URL}${lightboxItem.url}` : lightboxItem.url}
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-slate-800"
                controls
                autoPlay
              />
            )}
          </div>

          {/* Details footer */}
          <div className="max-w-xl text-center text-white mt-6 space-y-2 px-4">
            <span className="inline-block bg-temple-gold text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {lightboxItem.category}
            </span>
            <h3 className="text-xl font-bold font-serif">
              {language === 'en' ? lightboxItem.titleEN : lightboxItem.titleTA}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Uploaded on: ' : 'பதிவேற்றப்பட்டது: '}
              {new Date(lightboxItem.date).toLocaleDateString()}
            </p>
            {/* Quick Swipe controls for Mobile */}
            <div className="flex sm:hidden justify-center space-x-6 pt-3">
              <button 
                onClick={() => navigateLightbox(-1)} 
                className="px-4 py-1.5 bg-slate-800 text-xs rounded border border-slate-700 cursor-pointer"
              >
                ◀ Prev
              </button>
              <button 
                onClick={() => navigateLightbox(1)} 
                className="px-4 py-1.5 bg-slate-800 text-xs rounded border border-slate-700 cursor-pointer"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
