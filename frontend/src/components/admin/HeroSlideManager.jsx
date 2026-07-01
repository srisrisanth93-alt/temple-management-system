import React, { useState, useEffect } from 'react';
import { apiCall, BACKEND_URL } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Upload, Trash, Plus, RefreshCw, Quote, Image as ImageIcon } from 'lucide-react';

const HeroSlideManager = () => {
  const { language } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    image: '',
    quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.',
  });

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/hero-slides');
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('media', file);

    try {
      const result = await apiCall('/gallery/upload', {
        method: 'POST',
        body: uploadData,
        isUpload: true,
      });
      setFormData((prev) => ({
        ...prev,
        image: result.url,
      }));
    } catch (error) {
      alert(error.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image first');
      return;
    }

    try {
      await apiCall('/hero-slides', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      fetchSlides();
      // Reset form
      setFormData({
        image: '',
        quoteTA: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.',
      });
    } catch (error) {
      alert(error.message || 'Failed to create banner slide');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this slide?' : 'இந்தப் பேனர் படத்தைத் தட்டச்சு செய்ய விரும்புகிறீர்களா?')) return;

    try {
      await apiCall(`/hero-slides/${id}`, {
        method: 'DELETE',
      });
      fetchSlides();
    } catch (error) {
      alert(error.message || 'Failed to delete slide');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-800 dark:text-white">
            {language === 'en' ? 'Homepage Banner Images' : 'முகப்புப் பக்க பேனர் படங்கள்'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en' 
              ? 'Upload and manage images rotating in the main homepage banner slider.' 
              : 'முகப்புப் பக்கத்தில் சுழலும் பிரதான பேனர் படங்களை நிர்வகிக்கவும்.'}
          </p>
        </div>
        <button
          onClick={fetchSlides}
          className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
          <h3 className="text-md font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-temple-saffron" />
            {language === 'en' ? 'Add New Banner Image' : 'புதிய பேனர் படம் சேர்க்க'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">
                {language === 'en' ? 'Banner Image' : 'பேனர் படம்'}
              </label>

              {formData.image ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group h-48 bg-slate-900 flex items-center justify-center">
                  <img
                    src={`${BACKEND_URL}${formData.image}`}
                    alt="Uploaded preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs uppercase transition"
                    >
                      {language === 'en' ? 'Change Image' : 'படம் மாற்றுக'}
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-temple-gold dark:hover:border-temple-gold rounded-xl cursor-pointer bg-slate-50/50 dark:bg-slate-900/50 transition">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center p-6">
                    <Upload className="w-8 h-8 text-slate-400 animate-bounce" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-350">
                      {uploading ? (language === 'en' ? 'Uploading...' : 'அப்லோடு ஆகிறது...') : (language === 'en' ? 'Upload Image' : 'படம் பதிவேற்று')}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      JPEG, JPG, PNG or GIF (Max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
            </div>

            {/* Custom Tamil Devotional Quote */}
            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">
                {language === 'en' ? 'Tamil Quote / Text' : 'தமிழ் வாசகம்'}
              </label>
              <textarea
                value={formData.quoteTA}
                onChange={(e) => setFormData({ ...formData, quoteTA: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent text-sm focus:border-temple-gold focus:ring-1 focus:ring-temple-gold outline-none text-slate-800 dark:text-white"
                placeholder="எ.கா: நம்பி வந்த பக்தர்களை..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !formData.image}
              className="w-full py-3 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {language === 'en' ? 'Add Slide' : 'பேனர் சேர்க்க'}
            </button>
          </form>
        </div>

        {/* Slides Grid View */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-md font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-temple-saffron" />
            {language === 'en' ? 'Current Slide List' : 'தற்போதைய பேனர் படங்கள்'}
          </h3>

          {loading ? (
            <div className="text-center py-12 text-slate-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-temple-gold" />
              <p className="text-xs">{language === 'en' ? 'Loading slides...' : 'லோடு ஆகிறது...'}</p>
            </div>
          ) : slides.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-500">
              <p className="text-xs">
                {language === 'en' 
                  ? 'No custom slides uploaded. Using default hardcoded photos.' 
                  : 'விபரங்கள் இல்லை. வெப்சைட் தானாகவே டிஃபால்ட் பேனர் படங்களைக் காட்டும்.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slides.map((slide) => (
                <div
                  key={slide._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-slate-900">
                    <img
                      src={`${BACKEND_URL}${slide.image}`}
                      alt="Banner slide preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="p-2 bg-red-650 hover:bg-red-750 text-white rounded-full transition shadow-md hover:scale-105"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-850 flex-grow flex items-start gap-2">
                    <Quote className="w-4 h-4 text-temple-gold flex-shrink-0 mt-1 rotate-180" />
                    <p className="text-[12px] text-slate-600 dark:text-slate-350 leading-relaxed font-serif italic">
                      {slide.quoteTA}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSlideManager;
