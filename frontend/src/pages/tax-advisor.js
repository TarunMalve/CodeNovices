import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const sections = [
  {
    id: '80C',
    title: 'Section 80C',
    icon: '💰',
    limit: 150000,
    color: 'saffron',
    barColor: 'bg-orange-400',
    instruments: [
      { name: 'PPF (Public Provident Fund)', desc: 'Lock-in 15 years, tax-free returns' },
      { name: 'ELSS Mutual Funds', desc: '3-year lock-in, market-linked returns' },
      { name: 'LIC Life Insurance Premium', desc: 'Life cover + tax saving' },
    ],
  },
  {
    id: '80D',
    title: 'Section 80D',
    icon: '🏥',
    limit: 25000,
    color: 'india-green',
    barColor: 'bg-green-500',
    instruments: [
      { name: 'Health Insurance Premium', desc: 'For self, spouse & children' },
      { name: 'Preventive Health Check-up', desc: 'Up to ₹5,000 sub-limit' },
    ],
  },
  {
    id: '80G',
    title: 'Section 80G',
    icon: '🤝',
    limit: 50000,
    color: 'navy',
    barColor: 'bg-blue-600',
    instruments: [
      { name: 'PM Relief Fund', desc: '100% deduction' },
      { name: 'Charitable Institutions', desc: '50% deduction (with 10% income cap)' },
    ],
  },
  {
    id: '80CCD1B',
    title: 'NPS – Section 80CCD(1B)',
    icon: '🧓',
    limit: 50000,
    color: 'saffron',
    barColor: 'bg-yellow-500',
    instruments: [
      { name: 'National Pension System (NPS)', desc: 'Additional ₹50K over 80C limit' },
      { name: 'Atal Pension Yojana', desc: 'Government co-contribution for eligible' },
    ],
  },
];

function calcTax(income) {
  if (income <= 250000) return 0;
  if (income <= 500000) return (income - 250000) * 0.05;
  if (income <= 1000000) return 12500 + (income - 500000) * 0.2;
  return 112500 + (income - 1000000) * 0.3;
}

function utilizedAmount(income, limit) {
  const base = income * 0.15;
  return Math.min(Math.round(base), limit);
}

export default function TaxAdvisor() {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = (e) => {
    e.preventDefault();
    const inc = Number(income);
    const breakdown = sections.map(s => {
      const utilized = utilizedAmount(inc, s.limit);
      return { ...s, utilized, remaining: s.limit - utilized };
    });
    const totalSaving = breakdown.reduce((sum, s) => sum + s.utilized, 0);
    const taxBefore = calcTax(inc);
    const taxAfter = calcTax(Math.max(0, inc - totalSaving));
    setResult({ breakdown, totalSaving, taxBefore, taxAfter, saved: taxBefore - taxAfter });
  };

  const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');

  return (
    <>
      <Head><title>Tax Saving Advisor | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <div className="bg-navy text-white py-10 px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">📊 Tax Saving Advisor</h1>
            <p className="text-gray-300 max-w-xl mx-auto">Enter your annual income to get a personalised tax-saving roadmap under the Income Tax Act.</p>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Income Input */}
            <form onSubmit={handleCalc} className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)} required min="0"
                  placeholder="e.g. 1200000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-saffron" />
              </div>
              <button type="submit"
                className="bg-saffron hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-xl transition-colors text-lg whitespace-nowrap">
                Calculate Savings
              </button>
            </form>

            {result && (
              <>
                {/* Summary Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Tax Without Savings', value: fmt(result.taxBefore), color: 'text-red-600', bg: 'bg-red-50', icon: '📉' },
                    { label: 'Tax After Savings', value: fmt(result.taxAfter), color: 'text-india-green', bg: 'bg-green-50', icon: '📈' },
                    { label: 'Total Tax Saved', value: fmt(result.saved), color: 'text-saffron', bg: 'bg-orange-50', icon: '🎉' },
                  ].map(({ label, value, color, bg, icon }) => (
                    <div key={label} className={`${bg} rounded-2xl p-5 text-center shadow`}>
                      <div className="text-3xl mb-1">{icon}</div>
                      <div className={`text-2xl font-bold ${color}`}>{value}</div>
                      <div className="text-sm text-gray-600 mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Sections */}
                <div className="space-y-5">
                  {result.breakdown.map(s => {
                    const pct = Math.round((s.utilized / s.limit) * 100);
                    return (
                      <div key={s.id} className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{s.icon}</span>
                            <div>
                              <h3 className="font-bold text-navy text-lg">{s.title}</h3>
                              <p className="text-sm text-gray-500">Maximum limit: {fmt(s.limit)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-india-green font-bold">{fmt(s.utilized)} <span className="text-xs font-normal text-gray-500">utilized</span></div>
                            <div className="text-gray-500 text-sm">{fmt(s.remaining)} remaining</div>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>₹0</span><span>{pct}% used</span><span>{fmt(s.limit)}</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-3">
                            <div className={`h-3 rounded-full ${s.barColor} transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        {/* Instruments */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {s.instruments.map(inst => (
                            <div key={inst.name} className="bg-gray-50 rounded-xl p-3">
                              <div className="font-medium text-gray-800 text-sm">💡 {inst.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{inst.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total Savings */}
                <div className="mt-6 bg-navy text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-300">Total Deductions Claimed</div>
                    <div className="text-3xl font-bold text-saffron">{fmt(result.totalSaving)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-300">Effective Tax Rate</div>
                    <div className="text-3xl font-bold text-india-green">
                      {result.taxAfter > 0 ? ((result.taxAfter / Number(income)) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                  <button className="bg-saffron hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    Download Report 📥
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
