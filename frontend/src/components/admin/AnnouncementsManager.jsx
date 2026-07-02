import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Edit, Trash, Check, X, Megaphone, Star } from 'lucide-react';

const AnnouncementsManager = () => {
  const { language, t } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  
  const [formData, setFormData] = useState({
    titleEN: '',
    titleTA: '',
    contentEN: '',
    contentTA: '',
    pinned: true,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/announcements');
      setAnnouncements(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ann) => {
    setIsEditing(true);
    setActiveId(ann._id);
    setFormData({
      titleEN: ann.titleEN,
      titleTA: ann.titleTA,
      contentEN: ann.contentEN,
      contentTA: ann.contentTA,
      pinned: true,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setActiveId(null);
    setFormData({
      titleEN: '',
      titleTA: '',
      contentEN: '',
      contentTA: '',
      pinned: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && activeId) {
        await apiCall(`/announcements/${activeId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiCall('/announcements', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      handleCancel();
      fetchAnnouncements();
    } catch (error) {
      alert(error.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiCall(`/announcements/${id}`, {
        method: 'DELETE',
      });
      fetchAnnouncements();
    } catch (error) {
      alert(error.message || 'Deletion failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-temple-saffron" />
          <span>Announcement Ticker Manager</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="xl:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
          <h4 className="font-serif font-bold text-slate-800 dark:text-white text-base">
            {isEditing ? 'Edit Announcement Info' : 'Set Ticker Date & Time'}
          </h4>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">தேதி / Date (Ticker Header)</label>
            <input
              type="text"
              required
              placeholder="e.g. 10-09-2025"
              value={formData.titleTA}
              onChange={(e) => setFormData({ ...formData, titleTA: e.target.value, titleEN: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-temple-gold text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">நேரம் / Time (Ticker Subtext)</label>
            <input
              type="text"
              required
              placeholder="e.g. அதிகாலை 5:00 மணி"
              value={formData.contentTA}
              onChange={(e) => setFormData({ ...formData, contentTA: e.target.value, contentEN: e.target.value })}
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
        <div className="xl:col-span-7 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-sm text-slate-400">Loading...</p>
          ) : announcements.length === 0 ? (
            <p className="text-sm text-slate-500">No active announcements.</p>
          ) : (
            announcements.map((ann) => (
              <div 
                key={ann._id} 
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-4 flex items-start justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-semibold">{new Date(ann.createdAt).toLocaleDateString()}</span>
                    <span className="bg-temple-gold/20 text-temple-goldDark border border-temple-gold/30 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 uppercase">
                      <Star className="w-2.5 h-2.5 fill-current" /> Active Ticker
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-800 dark:text-white text-base">
                    தேதி / Date: <span className="font-normal text-slate-650 dark:text-slate-300">{ann.titleTA}</span>
                  </h5>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                    நேரம் / Time: <span className="font-normal text-slate-650 dark:text-slate-300">{ann.contentTA}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(ann)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-indigo-500 cursor-pointer"
                    title={t('editBtn')}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ann._id)}
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

export default AnnouncementsManager;
