import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { walletAPI } from '../utils/api';

const APPROVED_CATEGORIES = [
  { key: 'electricity', label: 'Electricity Bill', icon: '⚡', provider: 'State Power Board' },
  { key: 'water', label: 'Water Bill', icon: '💧', provider: 'Municipal Corp' },
  { key: 'property_tax', label: 'Property Tax', icon: '🏠', provider: 'City Council' },
  { key: 'professional_tax', label: 'Professional Tax', icon: '💼', provider: 'State Tax Authority' },
  { key: 'national_tax', label: 'National Tax', icon: '🏛️', provider: 'Income Tax Dept' },
  { key: 'land_tax', label: 'Land Tax', icon: '📜', provider: 'Land Revenue' },
  { key: 'piped_gas', label: 'Piped Gas', icon: '🌿', provider: 'Gas Authority' },
];

export default function Wallet() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [addAmount, setAddAmount] = useState('');
  const [addingFunds, setAddingFunds] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payCategory, setPayCategory] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payDescription, setPayDescription] = useState('');
  const [paying, setPaying] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const fetchData = () => {
    walletAPI.getBalance().then(d => setBalance(d)).catch(() => {});
    walletAPI.getTransactions().then(d => setTransactions(d.transactions || [])).catch(() => {});
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddFunds = async () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) return;
    setAddingFunds(true);
    try {
      const result = await walletAPI.addFunds({ amount });
      setBalance(prev => ({ ...prev, balance: result.balance }));
      setAddAmount('');
      setShowAddModal(false);
      showToast(`₹${amount.toLocaleString('en-IN')} added to wallet successfully!`);
      fetchData();
    } catch (err) {
      showToast(err?.error || 'Failed to add funds', 'error');
    } finally {
      setAddingFunds(false);
    }
  };

  const handlePayment = async () => {
    const amount = parseFloat(payAmount);
    if (!amount || amount <= 0 || !payCategory) return;
    setPaying(true);
    try {
      const result = await walletAPI.makePayment({ amount, category: payCategory, description: payDescription || undefined });
      setBalance(prev => ({ ...prev, balance: result.balance }));
      setPayAmount('');
      setPayCategory('');
      setPayDescription('');
      setShowPayModal(false);
      showToast(`₹${amount.toLocaleString('en-IN')} payment processed! Txn: ${result.transactionId}`);
      fetchData();
    } catch (err) {
      showToast(err?.error || 'Payment failed', 'error');
    } finally {
      setPaying(false);
    }
  };

  const filtered = filter === 'All' ? transactions : transactions.filter(t => t.type === filter.toLowerCase());

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  return (
    <>
      <Head><title>GovPay Wallet | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Toast */}
        {toast && (
          <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === 'error' ? 'bg-red-500' : 'bg-india-green'}`}>
            {toast.message}
          </div>
        )}

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <h1 className="text-2xl font-bold text-navy mb-6">💰 GovPay Wallet</h1>

          {/* Wallet Card */}
          {balance && (
            <div className="bg-gradient-to-r from-navy via-blue-800 to-navy rounded-2xl p-8 text-white mb-8 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Available Balance</p>
                  <p className="text-4xl font-bold">₹{balance.balance.toLocaleString('en-IN')}</p>
                  <p className="text-gray-400 mt-2 text-sm">Account: {balance.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-saffron text-2xl">🏛️</p>
                  <p className="text-gray-400 text-xs mt-1">GovPay Wallet</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setShowAddModal(true)} className="bg-saffron text-navy font-semibold px-6 py-2 rounded-lg text-sm hover:bg-orange-400 transition-colors">+ Add Money</button>
                <button onClick={() => setShowPayModal(true)} className="border border-white text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-white hover:text-navy transition-colors">🏛️ Gov Payment</button>
              </div>
            </div>
          )}

          {/* Restricted Payment Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <p className="text-sm font-bold text-navy">Restricted GovPay Wallet</p>
                <p className="text-xs text-gray-600 mt-1">Funds in this wallet are strictly locked for government-approved payments only. Approved categories:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {APPROVED_CATEGORIES.map(cat => (
                    <span key={cat.key} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-gray-200 text-xs text-gray-700">
                      {cat.icon} {cat.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Add Money Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <h3 className="text-lg font-bold text-navy mb-4">+ Add Money to Wallet</h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={e => setAddAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div className="flex gap-3">
                  {[500, 1000, 5000, 10000].map(amt => (
                    <button key={amt} onClick={() => setAddAmount(String(amt))} className="flex-1 py-2 text-sm rounded-lg border border-gray-200 hover:border-navy hover:text-navy transition-colors">
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleAddFunds} disabled={addingFunds || !addAmount} className="flex-1 py-2 text-sm rounded-lg bg-saffron text-navy font-semibold hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {addingFunds ? 'Processing...' : 'Add Money'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gov Payment Modal */}
          {showPayModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <h3 className="text-lg font-bold text-navy mb-4">🏛️ Government Payment</h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Payment Category</label>
                  <select
                    value={payCategory}
                    onChange={e => setPayCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-navy"
                  >
                    <option value="">Select category...</option>
                    {APPROVED_CATEGORIES.map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.icon} {cat.label} — {cat.provider}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Description (optional)</label>
                  <input
                    type="text"
                    value={payDescription}
                    onChange={e => setPayDescription(e.target.value)}
                    placeholder="e.g. January electricity bill"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setShowPayModal(false)} className="flex-1 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={handlePayment} disabled={paying || !payCategory || !payAmount} className="flex-1 py-2 text-sm rounded-lg bg-navy text-white font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {paying ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="flex gap-3 mb-5">
            {['All', 'Credit', 'Debit'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-navy text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-navy'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-navy">Transaction History</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {filtered.map(txn => (
                <div key={txn.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${txn.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                      {txn.type === 'credit' ? '⬇️' : '⬆️'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{txn.description}</p>
                      <p className="text-xs text-gray-400">{txn.date} · {txn.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${txn.type === 'credit' ? 'text-india-green' : 'text-red-500'}`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${txn.status === 'completed' ? 'bg-green-100 text-india-green' : 'bg-yellow-100 text-yellow-700'}`}>
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
