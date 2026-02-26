import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { walletAPI } from '../utils/api';

export default function Wallet() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      walletAPI.getBalance().then(d => setBalance(d)).catch(() => {});
      walletAPI.getTransactions().then(d => setTransactions(d.transactions || [])).catch(() => {});
    }
  }, [user]);

  const filtered = filter === 'All' ? transactions : transactions.filter(t => t.type === filter.toLowerCase());

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  return (
    <>
      <Head><title>Wallet | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <h1 className="text-2xl font-bold text-navy mb-6">💰 Fintech Wallet</h1>

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
                  <p className="text-gray-400 text-xs mt-1">Government Wallet</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button className="bg-saffron text-navy font-semibold px-6 py-2 rounded-lg text-sm hover:bg-orange-400 transition-colors">+ Add Money</button>
                <button className="border border-white text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-white hover:text-navy transition-colors">↗ Send Money</button>
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
