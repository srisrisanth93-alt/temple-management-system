import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, Trash, Edit, Plus, Check, X, Clock, Upload } from 'lucide-react';

const FestivalsManager = () => {
  const { language, t } = useLanguage();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    nameEN: '',
    nameTA: '',
    descriptionEN: '',
    descriptionTA: '',
    date: '',
    image: '',
  });

  // Pooja timings list state inside form
  const [poojaList, setPoojaList] = useState([]);
  const [newPooja, setNewPooja] = useState({ time: '', nameEN: '', nameTA: '' });

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/festivals');
      setFestivals(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fest) => {
    setIsEditing(true);
    setActiveId(fest._id);
    setFormData({
      nameEN: fest.nameEN,
      nameTA: fest.nameTA,
      descriptionEN: fest.descriptionEN,
      descriptionTA: fest.descriptionTA,
      date: fest.date ? fest.date.substring(0, 10) : '',
      image: fest.image || '',
    });
    setPoojaList(fest.poojaTimings || []);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setActiveId(null);
    setFormData({
      nameEN: '',
      nameTA: '',
      descriptionEN: '',
      descriptionTA: '',
      date: '',
      image: '',
    });
    setPoojaList([]);
    setNewPooja({ time: '', nameEN: '', nameTA: '' });
  };

  const handleAddPooja = () => {
    if (!newPooja.time || !newPooja.nameEN || !newPooja.nameTA) {
      alert('Please fill in all ritual sub-fields');
      return;
    }
    setPoojaList([...poojaList, newPooja]);
    setNewPooja({ time: '', nameEN: '', nameTA: '' });
  };

  const handleRemovePooja = (idx) => {
    setPoojaList(poojaList.filter((_, i) => i !== idx));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const uploadData = new FormData();
    uploadData.append('media', file);

    try {
      const result = await apiCall('/gallery/upload', {
        method: 'POST',
        body: uploadData,
        isUpload: true,
      });
      setFormData({ ...formData, image: result.url });
    } catch (error) {
      alert(error.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        poojaTimings: poojaList,
      };

      if (isEditing && activeId) {
        await apiCall(`/festivals/${activeId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiCall('/festivals', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      handleCancel();
      fetchFestivals();
    } catch (error) {
      alert(error.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiCall(`/festivals/${id}`, {
        method: 'DELETE',
      });
      fetchFestivals();
    } catch (error) {
      alert(error.message || 'Deletion failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-temple-saffron" />
          <span>{t('upcomingFestivalsTitle')} Manager</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 max-h-[80vh] overflow-y-auto pr-3">
          <h4 className="font-serif font-bold text-slate-800 dark:text-white text-base">
            {isEditing ? 'Edit Festival Details' : 'Create New Festival Board'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('nameEnLabel')}</label>
              <input
                type="text"
                required
                value={formData.nameEN}
                onChange={(e) => setFormData({ ...formData, nameEN: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{t('nameTaLabel')}</label>
              <input
                type="text"
                required
                value={formData.nameTA}
                onChange={(e) => setFormData({ ...formData, nameTA: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">{t('descEnLabel')}</label>
            <textarea
              required
              rows="2"
              value={formData.descriptionEN}
              onChange={(e) => setFormData({ ...formData, descriptionEN: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">{t('descTaLabel')}</label>
            <textarea
              required
              rows="2"
              value={formData.descriptionTA}
              onChange={(e) => setFormData({ ...formData, descriptionTA: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{language === 'en' ? 'Festival Date' : 'விழா தேதி'}</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold"
              />
            </div>
            
            {/* Custom File Upload field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">{language === 'en' ? 'Festival Image' : 'படம் பதிவேற்று'}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Image path or upload"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-temple-gold"
                />
                <label className="absolute right-2 top-2 hover:text-temple-gold text-slate-400 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>

          {/* Pooja Timings Section inside the form */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === 'en' ? 'Sub Pooja Timings (Optional)' : 'விசேஷ பூஜை நேரங்கள் (தேவைப்பட்டால்)'}
            </span>

            {/* List of current added timings */}
            {poojaList.length > 0 && (
              <div className="space-y-1 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-150 dark:border-slate-850">
                {poojaList.map((pj, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 dark:border-slate-900 last:border-b-0">
                    <span><strong className="text-temple-saffron">{pj.time}</strong> - {pj.nameEN}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemovePooja(idx)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Timings Inline Entry */}
            <div className="bg-slate-200/50 dark:bg-slate-950/30 p-3 rounded-lg space-y-2 border border-slate-200 dark:border-slate-850">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="e.g. 9:00 AM"
                  value={newPooja.time}
                  onChange={(e) => setNewPooja({ ...newPooja, time: e.target.value })}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Ritual Name (EN)"
                  value={newPooja.nameEN}
                  onChange={(e) => setNewPooja({ ...newPooja, nameEN: e.target.value })}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="சடங்கு பெயர் (TA)"
                  value={newPooja.nameTA}
                  onChange={(e) => setNewPooja({ ...newPooja, nameTA: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPooja}
                  className="bg-temple-gold text-slate-950 px-3 py-1 rounded text-xs font-bold hover:bg-temple-goldDark transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-temple-saffron to-temple-saffronDark text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t('saveBtn')}</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('cancelBtn')}</span>
            </button>
          </div>
        </form>

        {/* List View */}
        <div className="lg:col-span-7 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-sm text-slate-400">Loading...</p>
          ) : festivals.length === 0 ? (
            <p className="text-sm text-slate-500">No festivals yet.</p>
          ) : (
            festivals.map((fest) => (
              <div 
                key={fest._id}
                className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-2xl p-4 flex items-start gap-4 transition-colors"
              >
                {fest.image && (
                  <img 
                    src={fest.image.startsWith('/uploads/') ? `http://localhost:5000${fest.image}` : fest.image} 
                    alt={fest.nameEN} 
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-grow space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-semibold">{new Date(fest.date).toLocaleDateString()}</span>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-205 px-2 py-0.5 rounded uppercase">
                      {fest.poojaTimings?.length || 0} rituals
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-800 dark:text-white text-base">
                    {fest.nameEN} <span className="text-xs text-slate-450 font-normal">({fest.nameTA})</span>
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {fest.descriptionEN}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(fest)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-indigo-500 cursor-pointer"
                    title={t('editBtn')}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fest._id)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-red-500 cursor-pointer"
                    title={t('deleteBtn')}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FestivalsManager;
