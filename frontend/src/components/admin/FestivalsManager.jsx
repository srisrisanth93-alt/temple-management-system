import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, Trash, Edit, Check, X } from 'lucide-react';

const FestivalsManager = () => {
  const { language, t } = useLanguage();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Simplified Form states
  const [formData, setFormData] = useState({
    nameEN: '',
    nameTA: '',
    descriptionEN: '',
    descriptionTA: '',
    date: '',
    image: '',
  });

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
      image: '',
    });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        poojaTimings: [], // simplified to empty
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
            {isEditing ? 'Edit Board Details' : 'Create New Festival Board'}
          </h4>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">{language === 'en' ? 'Festival Date' : 'விழா தேதி'}</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">நேரம் / Time (Ritual Timings)</label>
            <input
              type="text"
              required
              placeholder="e.g. மதியம் 12:00 மணி"
              value={formData.nameTA}
              onChange={(e) => setFormData({ ...formData, nameTA: e.target.value, nameEN: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">விளக்கம் / Description</label>
            <textarea
              required
              rows="4"
              placeholder="e.g. சுவாமிக்கு சிறப்பு அபிஷேகம், தீபாராதனை மற்றும் அன்னதானம் நடைபெறும்."
              value={formData.descriptionTA}
              onChange={(e) => setFormData({ ...formData, descriptionTA: e.target.value, descriptionEN: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold text-slate-900 dark:text-white font-medium"
            />
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
            <p className="text-sm text-slate-500">No festival boards yet.</p>
          ) : (
            festivals.map((fest) => (
              <div 
                key={fest._id}
                className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-2xl p-5 flex items-start gap-4 transition-colors shadow-sm"
              >
                <div className="flex-grow space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4a080a] text-[#cca43b] text-[10px] font-bold px-2.5 py-1 rounded">
                      தேதி / Date: {new Date(fest.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-800 dark:text-white text-base">
                    நேரம் / Time: <span className="font-normal text-slate-650 dark:text-slate-300">{fest.nameTA}</span>
                  </h5>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                    விவரங்கள் / Details: <span className="font-normal text-slate-600 dark:text-slate-350">{fest.descriptionTA}</span>
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
