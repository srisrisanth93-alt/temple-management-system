import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { Plus, Edit2, Trash2, Calendar, Clock, BookOpen, AlertCircle, Save, X, ArrowUp, ArrowDown } from 'lucide-react';

const FestivalScheduleManager = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    program: '',
    order: 0
  });

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/festival-schedules');
      setSchedules(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'order' ? parseInt(e.target.value) || 0 : e.target.value
    });
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      date: item.date,
      time: item.time,
      program: item.program,
      order: item.order || 0
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ date: '', time: '', program: '', order: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.program) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      if (editingId) {
        // Update request
        await apiCall(`/festival-schedules/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        // Create request
        await apiCall('/festival-schedules', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }

      handleCancel();
      fetchSchedules();
    } catch (err) {
      alert('Failed to save schedule item: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule item?')) return;
    try {
      await apiCall(`/festival-schedules/${id}`, {
        method: 'DELETE'
      });
      fetchSchedules();
    } catch (err) {
      alert('Failed to delete schedule item: ' + err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 dark:border-slate-800 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Festival Schedule (திருவிழா கால அட்டவணை)</h2>
          <p className="text-xs text-slate-500 mt-1">Manage the row-by-row programs displayed on the notice board.</p>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => {
              setIsEditing(true);
              setEditingId(null);
              setFormData({ date: '', time: '', program: '', order: schedules.length + 1 });
            }}
            className="flex items-center gap-1 bg-[#4a080a] text-[#cca43b] border border-[#cca43b]/40 hover:bg-[#6e0d10] font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Schedule Item
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3 text-red-700 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Interactive Form panel */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-[#cca43b]/20 p-6 rounded-2xl shadow-sm space-y-4 animate-fade-in max-w-2xl">
          <h3 className="font-serif font-bold text-[#4a080a] dark:text-[#cca43b] text-base border-b border-stone-100 dark:border-slate-850 pb-2">
            {editingId ? 'Edit Schedule Item' : 'Add New Schedule Item'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Date / Day Input */}
            <div className="md:col-span-8 space-y-1">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">நாள் (Date & Day)</label>
              <input 
                type="text" 
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                placeholder="e.g. ஆவணி மாதம் கடைசி புதன்கிழமை (10-09-2025)"
                className="w-full px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
              />
            </div>

            {/* Display Order */}
            <div className="md:col-span-4 space-y-1">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Sort Order (Number)</label>
              <input 
                type="number" 
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
              />
            </div>

            {/* Time Details */}
            <div className="md:col-span-12 space-y-1">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">நிகழ்ச்சி நேரம் (Time Details)</label>
              <input 
                type="text" 
                name="time"
                required
                value={formData.time}
                onChange={handleInputChange}
                placeholder="e.g. அதிகாலை 5:00 மணிக்குமேல் 9:00 மணிக்குள்"
                className="w-full px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm"
              />
            </div>

            {/* Program / Description */}
            <div className="md:col-span-12 space-y-1">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">நிகழ்ச்சி (Program details in Tamil)</label>
              <textarea 
                name="program"
                required
                rows="3"
                value={formData.program}
                onChange={handleInputChange}
                placeholder="e.g. சுவாமிக்கு காப்பு கட்டுதல், சுவாமிக்கு பூ போடுதல்..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 focus:border-[#cca43b] outline-none text-sm resize-none"
              />
            </div>

          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button 
              type="button" 
              onClick={handleCancel}
              className="flex items-center gap-1 border border-stone-200 text-stone-600 hover:bg-stone-50 px-4.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center gap-1 bg-[#4a080a] text-[#cca43b] hover:bg-[#6e0d10] px-4.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer"
            >
              <Save className="w-4 h-4" /> {editingId ? 'Update Item' : 'Save Item'}
            </button>
          </div>
        </form>
      )}

      {/* Schedule Items Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading schedules...</div>
      ) : schedules.length === 0 ? (
        <div className="py-20 text-center text-slate-450 border-2 border-dashed border-stone-200 dark:border-slate-800 rounded-2xl">
          No schedule items found. Click 'Add Schedule Item' to begin.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
          <table className="w-full text-left border-collapse text-xs md:text-sm text-slate-700 dark:text-stone-300">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
                <th className="p-4 w-12 text-center">Order</th>
                <th className="p-4 w-1/4">நாள் (Date/Day)</th>
                <th className="p-4 w-1/4">நிகழ்ச்சி நேரம் (Time)</th>
                <th className="p-4 w-2/4">நிகழ்ச்சி (Program)</th>
                <th className="p-4 w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-medium">
              {schedules.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                  <td className="p-4 font-bold text-center text-[#cca43b]">
                    {item.order}
                  </td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">
                    {item.date}
                  </td>
                  <td className="p-4 font-semibold text-stone-600 dark:text-stone-400">
                    {item.time}
                  </td>
                  <td className="p-4 leading-relaxed max-w-sm line-clamp-2">
                    {item.program}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-1.5">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 text-stone-450 hover:text-[#cca43b] hover:bg-stone-50 dark:hover:bg-slate-950 rounded-lg transition-colors cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 text-stone-450 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default FestivalScheduleManager;
