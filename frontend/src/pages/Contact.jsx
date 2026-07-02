import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall } from '../utils/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, RefreshCw } from 'lucide-react';

const Contact = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccess(false);

    try {
      await apiCall('/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage(error.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 scroll-reveal">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-temple-maroon dark:text-temple-gold">
          {t('contactHeader')}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6 scroll-reveal">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 transition-colors">
            <h3 className="text-lg font-serif font-bold text-slate-800 dark:text-white border-b border-slate-105 dark:border-slate-850 pb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-temple-saffron" />
              {t('contactQuickInfo')}
            </h3>

            <div className="space-y-4 text-slate-650 dark:text-slate-350 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-temple-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800 dark:text-white">{t('addressLabel')}</p>
                  <p className="leading-relaxed">
                    {t('templeAddress')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-100 dark:border-slate-850 pt-3">
                <Phone className="w-5 h-5 text-temple-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800 dark:text-white">{t('phoneLabel')}</p>
                  <a href="tel:+918072426442" className="hover:text-temple-gold transition-colors block text-slate-650 dark:text-slate-400">
                    +91 80724 26442
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-100 dark:border-slate-850 pt-3">
                <Mail className="w-5 h-5 text-temple-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800 dark:text-white">{t('emailLabel')}</p>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muniyappankovil07@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-temple-gold transition-colors block text-slate-600 dark:text-slate-400">
                    muniyappankovil07@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 scroll-reveal">
          <form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-md space-y-4 transition-colors"
          >
            <h3 className="text-xl font-serif font-bold text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3">
              {language === 'en' ? 'Send Message to Temple Trust' : 'அறக்கட்டளைக்கு செய்தி அனுப்பவும்'}
            </h3>

            {success && (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 text-green-700 dark:text-green-400 px-4 py-3.5 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{t('msgSuccess')}</span>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-650 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            {/* Name & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('formName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('formPhone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>
            </div>

            {/* Email & Subject Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('formEmail')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('formSubject')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t('formMessage')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-temple-saffron to-temple-saffronDark text-white py-3 rounded-xl font-bold hover:from-temple-gold hover:to-temple-goldDark hover:text-slate-950 transition-all cursor-pointer shadow flex items-center justify-center gap-2 btn-premium-glow"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('msgSending')}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('submitMessage')}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Map Iframe & Get Directions */}
      <section className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-white flex items-center gap-2">
              <span>📍</span> {language === 'en' ? 'Temple Location' : 'கோவில் இருப்பிடம்'}
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {language === 'en' ? 'Visit our temple easily using Google Maps.' : 'கூகுள் மேப்ஸ் பயன்படுத்தி எங்கள் கோவிலுக்கு எளிதாக வந்து சேருங்கள்.'}
            </p>
          </div>
          <div>
            <a
              href="https://maps.app.goo.gl/K1Ux1GcQmHoDdCbu7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-temple-saffron to-temple-saffronDark hover:from-temple-gold hover:to-temple-goldDark hover:text-slate-950 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5 btn-premium-glow"
            >
              {language === 'en' ? 'Get Directions' : 'வழிப்பாதையை பெறுங்கள்'}
            </a>
          </div>
        </div>
        
        <div className="relative w-full h-[400px] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner">
          <iframe
            title="Temple Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2281896791167!2d78.4951489!3d11.5118395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab990bbe1cebcd%3A0x3fc42413015db9d4!2sMuniyappan+Temple.+(Young+Star&#39;s)!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 bg-slate-100 dark:bg-slate-950"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
