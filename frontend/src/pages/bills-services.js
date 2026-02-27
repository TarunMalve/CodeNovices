import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BillCard from '../components/common/BillCard';
import { useAuth } from '../context/AuthContext';
import { utilitiesAPI, walletAPI } from '../utils/api';

const billTypes = [
  { type: 'Electricity', icon: '⚡', provider: 'State Electricity Board' },
  { type: 'Water', icon: '💧', provider: 'Municipal Water Supply' },
  { type: 'Property Tax', icon: '🏠', provider: 'Municipal Corporation' },
  { type: 'Land Tax', icon: '📜', provider: 'Revenue Department' },
  { type: 'Piped Gas', icon: '🌿', provider: 'City Gas Distribution' },
  { type: 'Professional Tax', icon: '💼', provider: 'State Tax Authority' },
];

const govServices = [
  { href: '/aatmanirbhar/schemes', icon: '📋', label: 'Government Schemes' },
  { href: '/dbt-tracker', icon: '🏦', label: 'DBT Tracker' },
  { href: '/eligibility', icon: '✅', label: 'Eligibility Check' },
  { href: '/fund-transparency', icon: '📈', label: 'Fund Transparency' },
  { href: '/grievance', icon: '📢', label: 'File Grievance' },
  { href: '/documents', icon: '📁', label: 'Document Vault' },
];

export default function BillsServices() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bills, setBills] = useState([]);
  const [paying, setPaying] = useState(null);
  const [toast, setToast] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      utilitiesAPI.getBills()
        .then(d => setBills(d.bills || []))
        .catch(() => {
          setBills(billTypes.map((b, i) => ({
            id: `BILL-${i + 1}`,
            type: b.type,
            provider: b.provider,
            consumerNumber: `CN${100000 + i}`,
            amount: (Math.floor(Math.random() * 5000) + 500),
            dueDate: '2024-02-28',
            status: i === 0 ? 'Paid' : 'Unpaid',
          })));
        })
        .finally(() => setFetching(false));
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePay = async (bill) => {
    setPaying(bill.id);
    try {
      await walletAPI.makePayment({ billId: bill.id, amount: bill.amount, type: bill.type });
      setBills(prev => prev.map(b => b.id === bill.id ? { ...b, status: 'Paid' } : b));
      showToast(`₹${bill.amount.toLocaleString('en-IN')} paid for ${bill.type} successfully!`);
    } catch {
      showToast('Payment failed. Please try again.', 'error');
    } finally {
      setPaying(null);
    }
  };

  const detectedServices = bills.filter(b => b.status === 'Unpaid');

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  return (
    <>
      <Head><title>Bills & Services | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Toast */}
        {toast && (
          <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === 'error' ? 'bg-red-500' : 'bg-india-green'}`}>
            {toast.message}
          </div>
        )}

        {/* Hero */}
        <section className="bg-navy text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">📋 Bills & Services Hub</h1>
            <p className="text-gray-300">Manage all your utility bills and government services in one place</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {/* Detected Services */}
          {detectedServices.length > 0 && (
            <div className="mb-8">
              <div className="bg-orange-50 border border-saffron rounded-xl p-4 mb-4">
                <h2 className="text-lg font-bold text-navy mb-1">🔔 Detected Pending Bills</h2>
                <p className="text-sm text-gray-600">{detectedServices.length} unpaid bill{detectedServices.length > 1 ? 's' : ''} found in your profile</p>
              </div>
            </div>
          )}

          {/* All Bills */}
          <h2 className="text-xl font-bold text-navy mb-4">Utility Bills</h2>
          {fetching ? (
            <div className="flex items-center justify-center py-12"><div className="animate-spin text-4xl">⚙️</div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {bills.map(bill => (
                <BillCard key={bill.id} bill={bill} onPay={handlePay} paying={paying === bill.id} />
              ))}
            </div>
          )}

          {/* Government Services */}
          <h2 className="text-xl font-bold text-navy mb-4">Government Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {govServices.map(svc => (
              <Link key={svc.href} href={svc.href} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow group border border-gray-100">
                <div className="text-2xl mb-2">{svc.icon}</div>
                <p className="text-xs font-medium text-gray-700 group-hover:text-saffron transition-colors">{svc.label}</p>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
