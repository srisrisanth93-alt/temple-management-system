import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Image, Upload, Trash, Film, Check, Plus, RefreshCw } from 'lucide-react';

const GalleryManager = () => {
  const { language, t } = useLanguage();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    titleEN: '',
    titleTA: '',
    mediaType: 'photo',
    category: 'general',
    url: '',
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/gallery');
      setMediaItems(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      setFormData(prev => ({ 
        ...prev, 
        url: result.url,
        mediaType: file.type.startsWith('video/') ? 'video' : 'photo',
      }));
    } catch (error) {
      alert(error.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url) {
      alert('Please upload a file or specify a media URL first.');
      return;
    }

    try {
      await apiCall('/gallery', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Reset
      setFormData({
        titleEN: '',
        titleTA: '',
        mediaType: 'photo',
        category: 'general',
        url: '',
      });
      fetchGallery();
    } catch (error) {
      alert(error.message || 'Saving media item failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiCall(`/gallery/${id}`, {
        method: 'DELETE',
      });
      fetchGallery();
    } catch (error) {
      alert(error.message || 'Deletion failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Image className="w-5 h-5 text-temple-saffron" />
          <span>{t('manageGalleryBtn')} Manager</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
          <h4 className="font-serif font-bold text-slate-800 dark:text-white text-base">
            Upload Media (Photo/Video)
          </h4>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-slate-250 dark:border-slate-800 rounded-xl p-6 text-center cursor-pointer hover:border-temple-gold bg-white dark:bg-slate-950 transition-colors relative">
            <input 
              type="file" 
              onChange={handleFileUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="image/*,video/*"
              disabled={uploading}
            />
            {uploading ? (
              <div className="space-y-2">
                <RefreshCw className="w-8 h-8 text-temple-gold animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-semibold">Uploading to server...</p>
              </div>
            ) : formData.url ? (
              <div className="space-y-2">
                <Check className="w-8 h-8 text-green-500 mx-auto" />
                <p className="text-xs text-green-600 font-bold">File uploaded successfully!</p>
                <p className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] mx-auto">{formData.url}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-slate-450 mx-auto" />
                <p className="text-xs text-slate-500 font-semibold">
                  Drag & Drop or Click to Upload
                </p>
                <p className="text-[9px] text-slate-400">
                  Accepts JPG, PNG, GIF, MP4, WEBM (Max 50MB)
                </p>
              </div>
            )}
          </div>

          {/* Title Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('titleEnLabel')}</label>
              <input
                type="text"
                required
                value={formData.titleEN}
                onChange={(e) => setFormData({ ...formData, titleEN: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('titleTaLabel')}</label>
              <input
                type="text"
                required
                value={formData.titleTA}
                onChange={(e) => setFormData({ ...formData, titleTA: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
          </div>

          {/* Media Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('mediaTypeLabel')}</label>
              <select
                value={formData.mediaType}
                onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              >
                <option value="photo">Photo / Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('categoryLabel')}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              >
                <option value="general">General</option>
                <option value="deity">Deity</option>
                <option value="festivals">Festivals</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !formData.url}
            className="w-full bg-gradient-to-r from-temple-saffron to-temple-saffronDark disabled:from-slate-300 disabled:to-slate-400 text-white py-2.5 rounded-xl font-bold cursor-pointer transition-colors shadow flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publish to Gallery</span>
          </button>
        </form>

        {/* Media Feed / List */}
        <div className="lg:col-span-7 max-h-[70vh] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-sm text-slate-400">Loading...</p>
          ) : mediaItems.length === 0 ? (
            <p className="text-sm text-slate-500">No media uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mediaItems.map((item) => (
                <div 
                  key={item._id}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-2.5 space-y-2 relative group overflow-hidden transition-colors shadow-sm"
                >
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    {item.mediaType === 'photo' ? (
                      <img 
                        src={item.url.startsWith('/uploads/') ? `http://localhost:5000${item.url}` : item.url} 
                        alt={item.titleEN} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Film className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h6 className="font-bold text-slate-800 dark:text-white text-xs truncate">
                      {item.titleEN}
                    </h6>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-temple-saffron font-bold uppercase">{item.category}</span>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title={t('deleteBtn')}
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
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

export default GalleryManager;
