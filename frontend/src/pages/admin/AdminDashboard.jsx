import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { apiCall } from '../../utils/api';

// Subcomponents
import AnnouncementsManager from '../../components/admin/AnnouncementsManager';
import FestivalsManager from '../../components/admin/FestivalsManager';
import GalleryManager from '../../components/admin/GalleryManager';
import DonationsLog from '../../components/admin/DonationsLog';
import MessagesLog from '../../components/admin/MessagesLog';

// Icons
import { Megaphone, Calendar, Image, Heart, Mail, LogOut, Grid, ShieldAlert, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    announcements: 0,
    festivals: 0,
    gallery: 0,
    donations: 0,
    messages: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [adminUser, setAdminUser] = useState('Admin');

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    setAdminUser(localStorage.getItem('adminUsername') || 'Admin');
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      // Fetch lists in parallel to extract counts
      const [annList, festList, galList, donList, msgList] = await Promise.all([
        apiCall('/announcements'),
        apiCall('/festivals'),
        apiCall('/gallery'),
        apiCall('/donations'),
        apiCall('/contact'),
      ]);

      setStats({
        announcements: annList.length,
        festivals: festList.length,
        gallery: galList.length,
        donations: donList.length,
        messages: msgList.length,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error.message);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <BarChart className="w-4 h-4" /> },
    { id: 'announcements', name: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'festivals', name: 'Festivals & Poojas', icon: <Calendar className="w-4 h-4" /> },
    { id: 'gallery', name: 'Gallery Media', icon: <Image className="w-4 h-4" /> },
    { id: 'donations', name: 'Donations Log', icon: <Heart className="w-4 h-4" /> },
    { id: 'messages', name: 'Contact Inquiries', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col lg:flex-row">
      
      {/* Sidebar Frame */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-850 p-6 flex flex-col justify-between shrink-0 transition-colors">
        <div className="space-y-6">
          {/* Admin title */}
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-2 rounded-xl border border-red-200 dark:border-red-900">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Dashboard</h3>
              <p className="text-[11px] text-slate-450">Active: {adminUser}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 py-2 lg:py-0 no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap lg:w-full ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-temple-maroon/10 to-temple-saffron/10 text-temple-saffron dark:text-temple-gold border border-temple-gold/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout at bottom */}
        <button
          onClick={handleLogout}
          className="mt-6 lg:mt-0 flex items-center justify-center lg:justify-start space-x-2 text-slate-500 hover:text-red-650 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/10 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Header */}
            <div className="border-b border-slate-200 dark:border-slate-850 pb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-temple-saffron" />
                <span>Dashboard Overview</span>
              </h3>
              <button 
                onClick={loadStats}
                className="text-xs font-semibold text-temple-saffron hover:underline"
              >
                Refresh Data
              </button>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { label: 'Announcements', count: stats.announcements, icon: <Megaphone className="text-blue-500" />, tab: 'announcements' },
                { label: 'Festivals', count: stats.festivals, icon: <Calendar className="text-orange-500" />, tab: 'festivals' },
                { label: 'Gallery Items', count: stats.gallery, icon: <Image className="text-purple-500" />, tab: 'gallery' },
                { label: 'Donations Logs', count: stats.donations, icon: <Heart className="text-red-500" />, tab: 'donations' },
                { label: 'Unread Inquiries', count: stats.messages, icon: <Mail className="text-indigo-500" />, tab: 'messages' },
              ].map((card, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveTab(card.tab)}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                      {loadingStats ? '...' : card.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-temple-maroon to-temple-maroonDark text-white p-8 rounded-3xl shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-44 h-44 bg-white/5 rounded-full translate-y-12 translate-x-12" />
              <div className="space-y-3 relative z-10 max-w-xl">
                <h4 className="text-2xl font-bold font-serif">Welcome back, {adminUser}!</h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Use this secure panel to manage all administrative aspects of Arulmigu Sri Siddhi Vinayagar Temple. You can update daily routines, post news alerts, inspect transactions, and reply to messages.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && <AnnouncementsManager />}
        {activeTab === 'festivals' && <FestivalsManager />}
        {activeTab === 'gallery' && <GalleryManager />}
        {activeTab === 'donations' && <DonationsLog />}
        {activeTab === 'messages' && <MessagesLog />}
      </main>
    </div>
  );
};

export default AdminDashboard;
