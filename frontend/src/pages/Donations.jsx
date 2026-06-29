import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiCall } from '../utils/api';
import { Landmark, Heart, ShieldCheck, Download, CheckCircle, RefreshCw, Printer } from 'lucide-react';

const Donations = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '',
    purpose: 'General',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const purposes = [
    { value: 'General', label: language === 'en' ? 'General Maintenance' : 'பொது பராமரிப்பு' },
    { value: 'Pooja', label: language === 'en' ? 'Daily Pooja / Archanai' : 'தினசரி பூஜை / அர்ச்சனை' },
    { value: 'Festival', label: language === 'en' ? 'Festival Celebrations' : 'திருவிழா நன்கொடை' },
    { value: 'Renovation', label: language === 'en' ? 'Temple Renovation (Kumbhabhishekam)' : 'திருப்பணி நன்கொடை' },
    { value: 'Annadhanam', label: language === 'en' ? 'Annadhanam (Free Meals Scheme)' : 'அன்னதான நன்கொடை' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const donationData = {
        ...formData,
        amount: Number(formData.amount),
      };

      const result = await apiCall('/donations', {
        method: 'POST',
        body: JSON.stringify(donationData),
      });

      setSuccessReceipt(result);
      // Reset form
      setFormData({
        donorName: '',
        email: '',
        phone: '',
        amount: '',
        purpose: 'General',
        address: '',
      });
    } catch (error) {
      setErrorMessage(error.message || 'Payment simulation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-print-area').innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Simple print iframe window creation to avoid replacing parent window context
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${successReceipt?.transactionId}</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #333; }
            .receipt-box { border: 4px double #D4AF37; padding: 30px; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #6B1D2F; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #6B1D2F; margin: 0; }
            .subtitle { font-size: 14px; color: #555; margin-top: 5px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; border-bottom: 1px dashed #eee; padding-bottom: 4px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #000; text-align: right; }
            .thank-you { text-align: center; margin-top: 30px; font-size: 12px; font-style: italic; color: #666; }
            .footer-sig { margin-top: 40px; text-align: right; font-size: 12px; font-weight: bold; color: #6b1d2f; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <div class="header">
              <h1 class="title">${t('receiptSubtitle')}</h1>
              <p class="subtitle">Official Donation Receipt</p>
            </div>
            <div class="row"><span class="label">Receipt Date:</span><span class="value">${new Date(successReceipt?.date).toLocaleDateString()}</span></div>
            <div class="row"><span class="label">Transaction ID:</span><span class="value" style="font-family: monospace;">${successReceipt?.transactionId}</span></div>
            <div class="row"><span class="label">Donor Name:</span><span class="value">${successReceipt?.donorName}</span></div>
            <div class="row"><span class="label">Email:</span><span class="value">${successReceipt?.email}</span></div>
            <div class="row"><span class="label">Phone:</span><span class="value">${successReceipt?.phone}</span></div>
            <div class="row"><span class="label">Donation Purpose:</span><span class="value">${successReceipt?.purpose}</span></div>
            <div class="row" style="font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 8px; margin-top: 20px;"><span class="label" style="color: #6B1D2F;">Amount Paid:</span><span class="value" style="font-weight: bold; color: #6B1D2F;">₹${successReceipt?.amount}.00</span></div>
            <div class="row"><span class="label">Payment Status:</span><span class="value" style="color: green; font-weight: bold;">${successReceipt?.paymentStatus}</span></div>
            
            <p class="thank-you">${t('thankYouMsg')}</p>
            <div class="footer-sig">
              <p>For Temple Trust</p>
              <br/><br/>
              <p>Authorized Signatory</p>
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-temple-maroon dark:text-temple-gold">
          {t('donationsHeader')}
        </h1>
        <p className="text-sm md:text-base text-slate-550 dark:text-slate-400 max-w-2xl mx-auto">
          {t('donationsSub')}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-saffron mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Bank Transfer Info & Trust Badge */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trust Badge */}
          <div className="bg-gradient-to-br from-temple-gold/10 to-temple-saffron/10 border border-temple-gold/30 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-gradient-to-br from-temple-gold to-temple-saffron p-3 rounded-2xl text-slate-950 shadow-md flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-slate-800 dark:text-white text-base">
                {language === 'en' ? 'Tax Exempted Contributions' : 'வரி விலக்கு பங்களிப்புகள்'}
              </h4>
              <p className="text-xs md:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en' 
                  ? 'All donations made to the temple trust are exempt from income tax under Section 80G of the Income Tax Act.'
                  : 'கோவில் அறக்கட்டளைக்கு வழங்கப்படும் அனைத்து நன்கொடைகளுக்கும் வருமான வரிச் சட்டம் பிரிவு 80G-ன் கீழ் வரி விலக்கு உண்டு.'}
              </p>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl p-6 shadow-sm space-y-6 transition-colors">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Landmark className="w-5 h-5 text-temple-saffron" />
              <h3 className="font-bold font-serif text-slate-800 dark:text-white text-lg">
                {t('bankDetailsTitle')}
              </h3>
            </div>
            <div className="space-y-4 text-sm text-slate-650 dark:text-slate-350">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 border border-slate-200/50 dark:border-slate-800">
                <p className="font-semibold text-slate-800 dark:text-white">{t('bankName')}</p>
                <p><span className="font-semibold">{language === 'en' ? 'Account No: ' : 'கணக்கு எண்: '}</span><span className="font-mono text-temple-saffron dark:text-temple-gold">{t('accNumber')}</span></p>
                <p><span className="font-semibold">{language === 'en' ? 'IFSC: ' : 'ஐஎஃப்எஸ்சி: '}</span><span className="font-mono">{t('ifscCode')}</span></p>
                <p><span className="font-semibold">{language === 'en' ? 'Branch: ' : 'கிளை: '}</span>{t('branchName')}</p>
              </div>
              <p className="text-xs text-slate-500 italic leading-normal">
                {language === 'en' 
                  ? "*Please share direct bank transfer screenshots to our email for official receipt dispatch."
                  : "*வங்கி நேரடிப் பரிமாற்ற விவரங்களை ரசீது பெற எங்கள் மின்னஞ்சலுக்கு அனுப்பவும்."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Donation Form / Simulated Payment / Success Receipt */}
        <div className="lg:col-span-7">
          {successReceipt ? (
            /* Success Receipt Stage */
            <div className="bg-white dark:bg-slate-900 border-2 border-temple-gold rounded-3xl p-6 md:p-8 shadow-xl space-y-6 transition-colors">
              <div className="text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold font-serif text-slate-800 dark:text-white">
                  {t('donationSuccess')}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'en' ? 'A copy of the receipt has been logged in our databases.' : 'ரசீது எங்கள் தரவுத்தளத்தில் பதிவு செய்யப்பட்டுள்ளது.'}
                </p>
              </div>

              {/* Invisible Print Layout Wrapper (For Reference) */}
              <div id="receipt-print-area" className="hidden">
                {/* Same details as dynamic display */}
              </div>

              {/* Display Receipt Card */}
              <div className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
                <div className="text-center border-b border-temple-gold/20 pb-4">
                  <h4 className="font-serif font-bold text-temple-maroon dark:text-temple-gold text-lg">
                    {t('receiptSubtitle')}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">{t('receiptHeader')}</p>
                </div>
                <div className="text-sm space-y-2 divide-y divide-slate-100 dark:divide-slate-800/50">
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">{t('dateLabel')}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {new Date(successReceipt.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">{t('txnIdLabel')}</span>
                    <span className="font-mono font-semibold text-slate-850 dark:text-slate-200">
                      {successReceipt.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">{t('donorNameLabel')}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">{successReceipt.donorName}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">{t('donorPurposeLabel')}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {purposes.find(p => p.value === successReceipt.purpose)?.label || successReceipt.purpose}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-base border-b border-temple-gold/30">
                    <span className="font-bold text-temple-maroon dark:text-temple-gold">Amount:</span>
                    <span className="font-bold text-temple-maroon dark:text-temple-gold">₹{successReceipt.amount}.00</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handlePrint}
                  className="w-full bg-gradient-to-r from-temple-maroon to-temple-maroonLight hover:from-temple-gold hover:to-temple-goldDark hover:text-slate-950 text-white py-3 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('receiptDownloadBtn')}</span>
                </button>
                <button
                  onClick={() => setSuccessReceipt(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Make Another Donation' : 'மீண்டும் நன்கொடை செய்க'}
                </button>
              </div>
            </div>
          ) : (
            /* Donation Form Stage */
            <form 
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-md space-y-5 transition-colors"
            >
              <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3">
                {t('donationFormTitle')}
              </h3>

              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-650 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Donor Name & Amount Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('donorNameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="donorName"
                    required
                    value={formData.donorName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('donorAmountLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    min="10"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Min ₹10"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('donorEmailLabel')} <span className="text-red-500">*</span>
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
                    {t('donorPhoneLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                  />
                </div>
              </div>

              {/* Purpose Selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('donorPurposeLabel')}
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
                >
                  {purposes.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Residential Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('donorAddressLabel')}
                </label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-temple-saffron to-temple-saffronDark text-white py-3 rounded-xl font-bold hover:from-temple-gold hover:to-temple-goldDark hover:text-slate-950 transition-all cursor-pointer shadow flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{language === 'en' ? 'Processing Secure Payment...' : 'பாதுகாப்பான கட்டணம் செலுத்தப்படுகிறது...'}</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-current" />
                    <span>{t('submitDonation')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donations;
