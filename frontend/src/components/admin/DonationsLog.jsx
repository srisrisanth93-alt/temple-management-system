import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Search, Eye, Landmark, Calendar, Download } from 'lucide-react';

const DonationsLog = () => {
  const { language, t } = useLanguage();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/donations');
      setDonations(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (donation) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${donation.transactionId}</title>
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
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <div class="header">
              <h1 class="title">${t('receiptSubtitle')}</h1>
              <p class="subtitle">Official Donation Receipt</p>
            </div>
            <div class="row"><span class="label">Receipt Date:</span><span class="value">${new Date(donation.date).toLocaleDateString()}</span></div>
            <div class="row"><span class="label">Transaction ID:</span><span class="value" style="font-family: monospace;">${donation.transactionId}</span></div>
            <div class="row"><span class="label">Donor Name:</span><span class="value">${donation.donorName}</span></div>
            <div class="row"><span class="label">Email:</span><span class="value">${donation.email}</span></div>
            <div class="row"><span class="label">Phone:</span><span class="value">${donation.phone}</span></div>
            <div class="row"><span class="label">Donation Purpose:</span><span class="value">${donation.purpose}</span></div>
            <div class="row" style="font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 8px; margin-top: 20px;"><span class="label" style="color: #6B1D2F;">Amount Paid:</span><span class="value" style="font-weight: bold; color: #6B1D2F;">₹${donation.amount}.00</span></div>
            <div class="row"><span class="label">Payment Status:</span><span class="value" style="color: green; font-weight: bold;">${donation.paymentStatus}</span></div>
            
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

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(search.toLowerCase()) ||
    d.purpose.toLowerCase().includes(search.toLowerCase()) ||
    d.transactionId.toLowerCase().includes(search.toLowerCase())
  );

  const totalSum = donations.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-temple-saffron fill-current" />
          <span>{t('manageDonationsBtn')} Log</span>
        </h3>
        
        {/* Total stats */}
        <div className="bg-gradient-to-r from-temple-gold/10 to-temple-saffron/10 border border-temple-gold/30 px-4 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-temple-gold">
          Total Donated: <span className="font-mono text-temple-maroon dark:text-white">₹{totalSum.toLocaleString()}</span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by donor, purpose, or txn ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold"
        />
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 transition-colors">
        {loading ? (
          <p className="p-6 text-sm text-slate-400">Loading records...</p>
        ) : filteredDonations.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No donation records found.</p>
        ) : (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="p-4">Date</th>
                <th className="p-4">Donor Details</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-350">
              {filteredDonations.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                  <td className="p-4 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800 dark:text-white">{item.donorName}</p>
                    <p className="text-xs text-slate-450">{item.email} | {item.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-xs">
                      {item.purpose}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-800 dark:text-white">
                    ₹{item.amount}
                  </td>
                  <td className="p-4 font-mono text-xs">
                    {item.transactionId}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handlePrint(item)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-temple-saffron cursor-pointer"
                      title="View & Print Receipt"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DonationsLog;
