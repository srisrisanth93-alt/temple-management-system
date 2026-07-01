import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Trash2, BookOpen, RefreshCw, AlignLeft, AlertCircle } from 'lucide-react';

const HistoryManager = () => {
  const { language } = useLanguage();
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State
  const [content, setContent] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchPoints = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/history-points');
      setPoints(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching history points');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setAdding(true);
    try {
      // Calculate order as the next index in list
      const nextOrder = points.length + 1;
      await apiCall('/history-points', {
        method: 'POST',
        body: JSON.stringify({ content: content.trim(), order: nextOrder }),
      });
      setContent('');
      fetchPoints();
    } catch (err) {
      alert(err.message || 'Failed to add history milestone');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this history point?' : 'இந்த வரலாற்று குறிப்பை நீக்க விரும்புகிறீர்களா?')) return;

    try {
      await apiCall(`/history-points/${id}`, {
        method: 'DELETE',
      });
      fetchPoints();
    } catch (err) {
      alert(err.message || 'Failed to delete history point');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-850 pb-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-800 dark:text-white">
            {language === 'en' ? 'Temple History Manager' : 'கோவில் வரலாற்று மேலாளர்'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en'
              ? 'Add and delete points that describe the historical origin and significance of Sri Muniyappan Temple.'
              : 'ஸ்ரீ முனியப்பன் கோவிலின் தோற்றம், முக்கியத்துவம் பற்றிய குறிப்புகளை இங்கே சேர்க்கலாம் அல்லது நீக்கலாம்.'}
          </p>
        </div>
        <button
          onClick={fetchPoints}
          className="p-2 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
          <h3 className="text-md font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-temple-saffron" />
            {language === 'en' ? 'Add History Point' : 'புதிய வரலாற்று குறிப்பு சேர்க்க'}
          </h3>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-150 text-red-650 text-xs mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Content (Tamil)' : 'குறிப்பு உள்ளடக்கம் (தமிழ்)'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent text-sm focus:border-temple-gold focus:ring-1 focus:ring-temple-gold outline-none text-slate-800 dark:text-white leading-relaxed"
                placeholder={language === 'en' ? 'e.g., முனியப்பன் சாமி...' : 'எ.கா: முனியப்பன் சாமி கிராம காவல் தெய்வம்...'}
                required
              />
            </div>

            <button
              type="submit"
              disabled={adding || !content.trim()}
              className="w-full py-3 bg-[#cca43b] hover:bg-[#b08b30] text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {adding ? 'Saving...' : (language === 'en' ? 'Save Point' : 'சேமிக்க')}
            </button>
          </form>
        </div>

        {/* List View */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-md font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-temple-saffron" />
            {language === 'en' ? 'History Points List' : 'வரலாற்று குறிப்புகள் பட்டியல்'}
          </h3>

          {loading ? (
            <div className="text-center py-12 text-slate-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-temple-gold" />
              <p className="text-xs">{language === 'en' ? 'Loading milestones...' : 'லோடு ஆகிறது...'}</p>
            </div>
          ) : points.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900 text-slate-500">
              <p className="text-xs">
                {language === 'en' ? 'No history points found.' : 'வரலாற்று குறிப்புகள் எதுவும் இல்லை.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {points.map((point, index) => (
                <div
                  key={point._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-4 rounded-xl shadow-sm flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-800 transition"
                >
                  <div className="bg-gradient-to-br from-temple-maroon to-temple-maroonLight text-white font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                      {point.content}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(point._id)}
                    className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryManager;
