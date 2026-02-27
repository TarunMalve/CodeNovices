import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { dbtAPI } from '../utils/api';

export default function DBTTracker() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dbtStatuses, setDbtStatuses] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      dbtAPI.getStatus().then(d => setDbtStatuses(d.dbtStatuses || [])).catch(() => {});
    }
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  const statusColor = {
    'Disbursed': 'bg-green-100 text-india-green border-india-green',
    'Verified': 'bg-blue-100 text-navy border-navy',
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-400',
  };

  return (
    <>
      <Head><title>DBT Tracker | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">📊 DBT Tracker</h1>
            <p className="text-gray-500 mt-2">Blockchain-verified Direct Benefit Transfer tracking</p>
          </div>

          <div className="space-y-6">
            {dbtStatuses.map(dbt => (
              <div key={dbt.id} className={`bg-white rounded-xl shadow-md border-l-4 ${dbt.status === 'Disbursed' ? 'border-india-green' : dbt.status === 'Verified' ? 'border-navy' : 'border-yellow-400'} p-6`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-navy">{dbt.scheme}</h2>
                    <p className="text-2xl font-bold text-saffron mt-1">₹{dbt.amount.toLocaleString('en-IN')}</p>
                    {dbt.blockchainHash && (
                      <p className="text-xs text-gray-400 font-mono mt-2">🔗 {dbt.blockchainHash}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColor[dbt.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {dbt.status}
                  </span>
                </div>

                {/* Timeline */}
                <div className="mt-4">
                  <div className="flex items-center gap-0">
                    {dbt.timeline.map((step, index) => (
                      <div key={step.stage} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${step.completed ? 'bg-india-green border-india-green text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                            {step.completed ? '✓' : index + 1}
                          </div>
                          <span className="text-xs text-gray-500 mt-1 whitespace-nowrap">{step.stage}</span>
                          {step.date && <span className="text-xs text-gray-400">{step.date}</span>}
                        </div>
                        {index < dbt.timeline.length - 1 && (
                          <div className={`flex-1 h-0.5 mb-5 ${dbt.timeline[index + 1].completed ? 'bg-india-green' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
