import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const schemes = [
  {
    id: 1, name: 'PM Kisan Samman Nidhi', icon: '🌾',
    description: 'Direct income support of ₹6,000/year to farmer families.',
    check: (f) => f.occupation === 'Farmer' && f.income <= 200000,
    base: 95,
  },
  {
    id: 2, name: 'Ayushman Bharat – PMJAY', icon: '🏥',
    description: 'Health insurance cover of ₹5 lakh per family per year.',
    check: (f) => f.income <= 300000 && ['SC','ST','OBC','EWS'].includes(f.category),
    base: 90,
  },
  {
    id: 3, name: 'PM MUDRA Yojana', icon: '💼',
    description: 'Collateral-free loans up to ₹10 lakh for small businesses.',
    check: (f) => ['Business','Unemployed'].includes(f.occupation) && f.income <= 500000,
    base: 85,
  },
  {
    id: 4, name: 'National Scholarship Portal', icon: '🎓',
    description: 'Merit-cum-means scholarships for students from minority/OBC/SC/ST.',
    check: (f) => f.occupation === 'Student' && f.income <= 250000 && f.age <= 30,
    base: 92,
  },
  {
    id: 5, name: 'PM Awas Yojana (Urban)', icon: '🏠',
    description: 'Subsidy on home loans for EWS/LIG/MIG categories.',
    check: (f) => f.income <= 600000 && ['EWS','OBC','SC','ST'].includes(f.category),
    base: 80,
  },
  {
    id: 6, name: 'MGNREGA', icon: '⛏️',
    description: 'Guarantee of 100 days of wage employment per year to rural households.',
    check: (f) => ['Farmer','Unemployed'].includes(f.occupation) && f.income <= 150000,
    base: 88,
  },
];

function calcMatch(scheme, form) {
  let score = scheme.base;
  if (form.income <= 100000) score = Math.min(score + 5, 100);
  if (['SC','ST'].includes(form.category)) score = Math.min(score + 3, 100);
  return score;
}

export default function Eligibility() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ income: '', age: '', category: 'General', state: '', occupation: 'Farmer' });
  const [results, setResults] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = { ...form, income: Number(form.income), age: Number(form.age) };
    const eligible = schemes
      .filter(s => s.check(f))
      .map(s => ({ ...s, match: calcMatch(s, f) }))
      .sort((a, b) => b.match - a.match);
    setResults(eligible);
    setStep(2);
  };

  return (
    <>
      <Head><title>Smart Eligibility Engine | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <div className="bg-navy text-white py-10 px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">🎯 Smart Eligibility Engine</h1>
            <p className="text-gray-300 max-w-xl mx-auto">Answer a few questions to discover government schemes you qualify for.</p>
            <div className="flex justify-center mt-6 gap-2">
              {[1,2].map(s => (
                <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= s ? 'bg-saffron border-saffron text-white' : 'border-gray-500 text-gray-400'}`}>{s}</div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-10">
            {step === 1 && (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-xl font-semibold text-navy mb-2">Your Profile</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
                    <input type="number" name="income" value={form.income} onChange={handle} required min="0"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron"
                      placeholder="e.g. 180000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" name="age" value={form.age} onChange={handle} required min="1" max="120"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron"
                      placeholder="e.g. 28" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="category" value={form.category} onChange={handle}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron">
                      {['General','OBC','SC','ST','EWS'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select name="state" value={form.state} onChange={handle} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron">
                      <option value="">Select State</option>
                      {indianStates.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <select name="occupation" value={form.occupation} onChange={handle}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron">
                      {['Farmer','Student','Business','Employee','Unemployed'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <button type="submit"
                  className="w-full bg-saffron hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors text-lg">
                  Check Eligibility →
                </button>
              </form>
            )}

            {step === 2 && results !== null && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-navy">
                    {results.length > 0 ? `🎉 ${results.length} Schemes Found` : '😔 No Matching Schemes'}
                  </h2>
                  <button onClick={() => { setStep(1); setResults(null); }}
                    className="text-sm text-saffron hover:underline font-medium">← Edit Profile</button>
                </div>

                {results.length === 0 && (
                  <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
                    <div className="text-5xl mb-3">🔍</div>
                    <p>No schemes matched your current profile. Try adjusting your details.</p>
                  </div>
                )}

                <div className="space-y-4">
                  {results.map(scheme => (
                    <div key={scheme.id} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-saffron hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{scheme.icon}</span>
                            <h3 className="text-lg font-bold text-navy">{scheme.name}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full bg-india-green" style={{ width: `${scheme.match}%` }} />
                            </div>
                            <span className="text-india-green font-bold text-sm whitespace-nowrap">{scheme.match}% Match</span>
                          </div>
                        </div>
                        <button className="bg-india-green hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
