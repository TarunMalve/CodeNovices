import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { walletAPI, dbtAPI, grievanceAPI } from '../../utils/api';

export default function CitizenDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [dbtStatuses, setDbtStatuses] = useState([]);
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      walletAPI.getBalance().then(d => setBalance(d)).catch(() => {});
      walletAPI.getTransactions().then(d => setTransactions(d.transactions?.slice(0, 4) || [])).catch(() => {});
      dbtAPI.getStatus().then(d => setDbtStatuses(d.dbtStatuses?.slice(0, 3) || [])).catch(() => {});
      grievanceAPI.list().then(d => setGrievances(d.grievances?.slice(0, 3) || [])).catch(() => {});
    }
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  const statusColor = {
    'Disbursed': 'bg-green-100 text-india-green',
    'Verified': 'bg-blue-100 text-navy',
    'Pending': 'bg-yellow-100 text-yellow-700',
  };

  return (
    <>
      <Head><title>Citizen Dashboard | E-Governance Portal</title></Head>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">नमस्ते, {user.name}! 🙏</h1>
            <p className="text-gray-500 mt-1">Welcome to your E-Governance Dashboard</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon="💰" value={balance ? `₹${balance.balance.toLocaleString('en-IN')}` : '...'} label="Wallet Balance" color="saffron" trend="Updated today" />
            <StatCard icon="📊" value={dbtStatuses.length} label="Active DBT Schemes" color="green" />
            <StatCard icon="📁" value="8" label="Stored Documents" color="navy" />
            <StatCard icon="📢" value={grievances.length} label="Grievances Filed" color="red" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Wallet Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">💰 Fintech Wallet</h2>
                <Link href="/wallet" className="text-saffron text-sm font-medium hover:underline">View All →</Link>
              </div>
              {balance && (
                <div className="bg-gradient-to-r from-navy to-blue-700 rounded-xl p-5 text-white mb-4">
                  <p className="text-sm text-gray-300">Available Balance</p>
                  <p className="text-3xl font-bold mt-1">₹{balance.balance.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-400 mt-2">Acc: {balance.accountNumber}</p>
                </div>
              )}
              <div className="space-y-3">
                {transactions.map(txn => (
                  <div key={txn.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{txn.description}</p>
                      <p className="text-xs text-gray-400">{txn.date}</p>
                    </div>
                    <span className={`text-sm font-bold ${txn.type === 'credit' ? 'text-india-green' : 'text-red-500'}`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DBT Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">📊 DBT Status</h2>
                <Link href="/dbt-tracker" className="text-saffron text-sm font-medium hover:underline">View All →</Link>
              </div>
              <div className="space-y-4">
                {dbtStatuses.map(dbt => (
                  <div key={dbt.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-semibold text-gray-800">{dbt.scheme}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[dbt.status] || 'bg-gray-100 text-gray-600'}`}>{dbt.status}</span>
                    </div>
                    <p className="text-lg font-bold text-navy">₹{dbt.amount.toLocaleString('en-IN')}</p>
                    {dbt.blockchainHash && <p className="text-xs text-gray-400 mt-1 font-mono truncate">🔗 {dbt.blockchainHash}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { href: '/aatmanirbhar/schemes', icon: '📋', label: 'Apply for Schemes' },
              { href: '/aatmanirbhar/marketplace', icon: '🛒', label: 'Marketplace' },
              { href: '/grievance', icon: '📢', label: 'File Grievance' },
              { href: '/documents', icon: '📁', label: 'My Documents' },
              { href: '/ai-hub', icon: '🤖', label: 'AI Hub' },
              { href: '/bills-services', icon: '📋', label: 'Bills & Services' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow group border border-gray-100">
                <div className="text-3xl mb-2">{link.icon}</div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-saffron transition-colors">{link.label}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
