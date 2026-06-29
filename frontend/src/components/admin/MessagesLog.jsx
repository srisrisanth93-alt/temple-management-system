import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Check, Trash, CheckSquare, Search, MessageSquare } from 'lucide-react';

const MessagesLog = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [replyDraft, setReplyDraft] = useState({ id: null, text: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/contact');
      setMessages(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiCall(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchMessages();
    } catch (error) {
      alert(error.message || 'Status change failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiCall(`/contact/${id}`, {
        method: 'DELETE',
      });
      fetchMessages();
    } catch (error) {
      alert(error.message || 'Deletion failed');
    }
  };

  const handleSendMockReply = async (e, id) => {
    e.preventDefault();
    if (!replyDraft.text) return;
    
    // Simulate sending mail
    alert(`Mock email response dispatched successfully to the donor's address!`);
    
    // Mark as replied
    await handleStatusChange(id, 'replied');
    setReplyDraft({ id: null, text: '' });
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-temple-saffron" />
          <span>{t('totalMessages')} Log</span>
        </h3>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-450" />
        <input
          type="text"
          placeholder="Search inquiries by sender name, subject, message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
        />
      </div>

      {/* Messages listing */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-slate-400">Loading messages...</p>
        ) : filteredMessages.length === 0 ? (
          <p className="text-sm text-slate-500">No contact messages received.</p>
        ) : (
          filteredMessages.map((msg) => (
            <div 
              key={msg._id}
              className={`bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4 transition-all relative overflow-hidden ${
                msg.status === 'unread' ? 'border-l-4 border-l-temple-saffron' : ''
              }`}
            >
              {/* Top Meta info */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-850 dark:text-white text-sm">{msg.name}</p>
                  <p className="text-slate-400">{msg.email} | {msg.phone || 'No phone'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-semibold">{new Date(msg.date).toLocaleDateString()}</span>
                  
                  {/* Status Dropdown */}
                  <select
                    value={msg.status}
                    onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded px-2 py-1 font-semibold text-[10px] uppercase"
                  >
                    <option value="unread" className="text-red-500 font-bold">Unread</option>
                    <option value="read" className="text-slate-500">Read</option>
                    <option value="replied" className="text-green-500">Replied</option>
                  </select>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-red-500 cursor-pointer"
                    title={t('deleteBtn')}
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-250 text-sm">
                  Sub: {msg.subject}
                </p>
                <p className="text-slate-650 dark:text-slate-350 text-xs leading-relaxed">
                  {msg.message}
                </p>
              </div>

              {/* Reply Simulator trigger/form */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-900 flex flex-col items-start gap-3">
                {replyDraft.id === msg._id ? (
                  <form 
                    onSubmit={(e) => handleSendMockReply(e, msg._id)}
                    className="w-full space-y-2.5 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Compose Reply Email</label>
                    <textarea
                      required
                      rows="2"
                      value={replyDraft.text}
                      onChange={(e) => setReplyDraft({ ...replyDraft, text: e.target.value })}
                      placeholder="Type email body here..."
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg p-2.5 text-xs focus:outline-none focus:border-temple-gold"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="bg-temple-saffron hover:bg-temple-saffronDark text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyDraft({ id: null, text: '' })}
                        className="bg-slate-200 dark:bg-slate-850 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  msg.status !== 'replied' && (
                    <button
                      onClick={() => setReplyDraft({ id: msg._id, text: '' })}
                      className="text-xs font-bold text-temple-saffron hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      ✉ Send Email Reply
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesLog;
