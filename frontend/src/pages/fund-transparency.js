import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const departments = [
  { name: 'Agriculture', icon: '🌾', allocated: 12000, distributed: 10800 },
  { name: 'Education', icon: '🎓', allocated: 9500, distributed: 8740 },
  { name: 'Health', icon: '🏥', allocated: 10500, distributed: 9450 },
  { name: 'Infrastructure', icon: '🏗️', allocated: 8000, distributed: 6400 },
  { name: 'Social Welfare', icon: '🤝', allocated: 6000, distributed: 5400 },
  { name: 'Women & Child', icon: '👩‍👧', allocated: 4000, distributed: 3600 },
];

const mockHashes = {
  'Agriculture': '0x4a3f2b1c9e8d7f6a5b4c3d2e1f0a9b8c',
  'Education': '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
  'Health': '0xdeadbeef1234567890abcdef12345678',
  'Infrastructure': '0xabcdef1234567890deadbeef12345678',
  'Social Welfare': '0x9f8e7d6c5b4a3210fedcba9876543210',
  'Women & Child': '0xfedcba9876543210abcdef1234567890',
};

const totalBudget = 50000;
const totalAllocated = departments.reduce((s, d) => s + d.allocated, 0);
const totalDistributed = departments.reduce((s, d) => s + d.distributed, 0);

export default function FundTransparency() {
  const [toast, setToast] = useState('');

  const verify = (dept) => {
    setToast(`✅ Blockchain Verified — ${dept}\n${mockHashes[dept]}`);
    setTimeout(() => setToast(''), 4000);
  };

  const fmt = (n) => '₹' + n.toLocaleString('en-IN') + ' Cr';

  return (
    <>
      <Head><title>Fund Transparency | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-4 z-50 bg-navy text-white px-5 py-4 rounded-xl shadow-2xl max-w-sm text-sm font-mono animate-pulse">
            {toast.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </div>
        )}

        <main className="flex-1">
          {/* Hero */}
          <div className="bg-navy text-white py-12 px-4 text-center">
            <div className="inline-block bg-saffron text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              Live Blockchain Data
            </div>
            <h1 className="text-4xl font-bold mb-2">Public Fund Transparency</h1>
            <p className="text-gray-300 max-w-xl mx-auto">Every rupee tracked. Every allocation verified on the blockchain.</p>
            <div className="mt-6 text-5xl font-black text-saffron">
              {fmt(totalBudget)}
            </div>
            <div className="text-gray-400 text-sm mt-1">Total Union Budget 2024-25</div>
          </div>

          {/* Summary Cards */}
          <div className="bg-white border-b">
            <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-saffron">{fmt(totalAllocated)}</div>
                <div className="text-gray-600 mt-1 font-medium">Total Allocated</div>
                <div className="text-xs text-gray-400 mt-1">{((totalAllocated / totalBudget) * 100).toFixed(1)}% of total budget</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-3xl font-bold text-india-green">{fmt(totalDistributed)}</div>
                <div className="text-gray-600 mt-1 font-medium">Total Distributed</div>
                <div className="text-xs text-gray-400 mt-1">{((totalDistributed / totalAllocated) * 100).toFixed(1)}% utilization rate</div>
              </div>
            </div>
          </div>

          {/* Department Table */}
          <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-navy mb-6">Department-wise Fund Utilization</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left">
                      <th className="px-5 py-4">Department</th>
                      <th className="px-5 py-4">Allocated</th>
                      <th className="px-5 py-4">Distributed</th>
                      <th className="px-5 py-4 min-w-[180px]">Utilization</th>
                      <th className="px-5 py-4 text-center">Verify</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {departments.map((d) => {
                      const pct = Math.round((d.distributed / d.allocated) * 100);
                      const barColor = pct >= 90 ? 'bg-india-green' : pct >= 75 ? 'bg-saffron' : 'bg-red-400';
                      return (
                        <tr key={d.name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 font-medium text-gray-800">
                              <span className="text-xl">{d.icon}</span> {d.name}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-700">{fmt(d.allocated)}</td>
                          <td className="px-5 py-4 text-gray-700">{fmt(d.distributed)}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                              </div>
                              <span className={`text-xs font-bold w-9 text-right ${pct >= 90 ? 'text-india-green' : pct >= 75 ? 'text-saffron' : 'text-red-500'}`}>
                                {pct}%
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button onClick={() => verify(d.name)}
                              className="bg-navy hover:bg-blue-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors">
                              ⛓️ Verify
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-india-green inline-block" /> ≥90% — Excellent</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-saffron inline-block" /> 75-89% — Good</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> &lt;75% — Needs Attention</span>
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-navy/5 border border-navy/20 rounded-2xl p-5 flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <div className="font-semibold text-navy">Blockchain Verification</div>
                <div className="text-sm text-gray-600 mt-1">All fund disbursements are recorded on India&apos;s Government Blockchain Network. Click &quot;Verify&quot; on any department to retrieve the immutable transaction hash confirming fund transfer.</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
