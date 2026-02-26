import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const schemes = [
  {
    id: 1,
    name: 'PM Mudra Yojana',
    description: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Categorized into Shishu (up to ₹50K), Kishore (₹50K-5L), Tarun (₹5L-10L).',
    eligibility: 'Small businesses, artisans, shopkeepers, and self-employed individuals',
    amount: '₹50,000 - ₹10,00,000',
    status: 'Active',
    icon: '🏦',
    category: 'Financial',
    applied: false,
  },
  {
    id: 2,
    name: 'Startup India',
    description: 'Flagship initiative to build a strong ecosystem for nurturing innovation and startups in India. Tax exemptions, fast-track patent examination, and funding support.',
    eligibility: 'Startups incorporated ≤ 10 years with annual turnover ≤ ₹100 crore',
    amount: 'Tax benefits + ₹10,000 Cr Fund of Funds',
    status: 'Active',
    icon: '🚀',
    category: 'Business',
    applied: true,
  },
  {
    id: 3,
    name: 'Make in India',
    description: 'Transform India into a global manufacturing hub. Focus on 27 sectors with facilitation for domestic and foreign investment.',
    eligibility: 'Manufacturing companies, MSMEs, and large industries',
    amount: 'PLI schemes up to ₹1.97 lakh crore',
    status: 'Active',
    icon: '🏭',
    category: 'Manufacturing',
    applied: false,
  },
  {
    id: 4,
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support of ₹6,000 per year to farmer families, transferred in three equal installments directly to bank accounts.',
    eligibility: 'All land holding farmer families across India',
    amount: '₹6,000 per year (₹2,000 per installment)',
    status: 'Active',
    icon: '🌾',
    category: 'Agriculture',
    applied: true,
  },
  {
    id: 5,
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for all by 2022. Financial assistance to all eligible rural/urban households for construction of pucca houses.',
    eligibility: 'Households without pucca house, EWS/LIG/MIG categories',
    amount: '₹1.2 - 2.67 lakh subsidy',
    status: 'Active',
    icon: '🏠',
    category: 'Housing',
    applied: false,
  },
  {
    id: 6,
    name: 'Digital India',
    description: 'Transform India into a digitally empowered society. Broadband highways, universal mobile connectivity, and digital literacy.',
    eligibility: 'All citizens, businesses, and government departments',
    amount: '₹13,000 Cr investment',
    status: 'Active',
    icon: '💻',
    category: 'Technology',
    applied: false,
  },
];

const categories = ['All', 'Financial', 'Business', 'Manufacturing', 'Agriculture', 'Housing', 'Technology'];

export default function Schemes() {
  const [filter, setFilter] = useState('All');
  const [appliedSchemes, setAppliedSchemes] = useState(new Set(schemes.filter(s => s.applied).map(s => s.id)));
  const [applyingId, setApplyingId] = useState(null);

  const filtered = filter === 'All' ? schemes : schemes.filter(s => s.category === filter);

  const handleApply = (id) => {
    setApplyingId(id);
    setTimeout(() => {
      setAppliedSchemes(prev => new Set([...prev, id]));
      setApplyingId(null);
    }, 1500);
  };

  return (
    <>
      <Head><title>Government Schemes | Aatmanirbhar Bharat</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {/* Hero */}
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">📋 Government Schemes</h1>
            <p className="text-blue-200 text-lg">Explore and apply for Aatmanirbhar Bharat schemes</p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">47 Active Schemes</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">12.8L+ Beneficiaries</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat ? 'bg-navy text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-navy'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(scheme => {
              const isApplied = appliedSchemes.has(scheme.id);
              const isApplying = applyingId === scheme.id;
              return (
                <div key={scheme.id} className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 ${isApplied ? 'border-india-green' : 'border-saffron'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{scheme.icon}</span>
                      <div>
                        <h3 className="font-bold text-navy text-lg">{scheme.name}</h3>
                        <span className="text-xs bg-blue-100 text-navy px-2 py-0.5 rounded-full">{scheme.category}</span>
                      </div>
                    </div>
                    {isApplied && <span className="text-xs bg-green-100 text-india-green px-3 py-1 rounded-full font-semibold">✓ Applied</span>}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{scheme.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1"><span className="font-semibold text-gray-700">Eligibility:</span> {scheme.eligibility}</p>
                    <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Benefit:</span> <span className="text-india-green font-bold">{scheme.amount}</span></p>
                  </div>
                  <button
                    onClick={() => !isApplied && handleApply(scheme.id)}
                    disabled={isApplied || isApplying}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${isApplied ? 'bg-green-100 text-india-green cursor-default' : isApplying ? 'bg-saffron text-navy opacity-70 cursor-wait' : 'bg-saffron text-navy hover:bg-orange-400'}`}
                  >
                    {isApplied ? '✓ Application Submitted' : isApplying ? 'Applying...' : '📝 Apply Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
