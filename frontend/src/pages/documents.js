import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const mockDocuments = [
  { id: 1, name: 'Aadhaar Card', type: 'Identity', status: 'Verified', date: '2023-06-15', size: '1.2 MB', icon: '🪪' },
  { id: 2, name: 'PAN Card', type: 'Identity', status: 'Verified', date: '2023-07-20', size: '0.8 MB', icon: '📋' },
  { id: 3, name: 'Birth Certificate', type: 'Personal', status: 'Verified', date: '2023-05-10', size: '1.5 MB', icon: '📜' },
  { id: 4, name: 'Income Certificate', type: 'Financial', status: 'Pending', date: '2024-01-05', size: '0.9 MB', icon: '💼' },
  { id: 5, name: 'Caste Certificate', type: 'Personal', status: 'Verified', date: '2023-08-12', size: '1.1 MB', icon: '📑' },
  { id: 6, name: 'Land Records', type: 'Property', status: 'Verified', date: '2023-09-30', size: '3.2 MB', icon: '🏡' },
  { id: 7, name: 'PM Kisan Certificate', type: 'Scheme', status: 'Verified', date: '2024-01-15', size: '0.5 MB', icon: '🌾' },
  { id: 8, name: 'Driving License', type: 'Identity', status: 'Verified', date: '2023-11-25', size: '1.0 MB', icon: '🚗' },
];

const categories = ['All', 'Identity', 'Personal', 'Financial', 'Property', 'Scheme'];

export default function Documents() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? mockDocuments : mockDocuments.filter(d => d.type === filter);

  return (
    <>
      <Head><title>Documents | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-navy">📁 Document Vault</h1>
              <p className="text-gray-500 mt-1">Securely store and access your government documents</p>
            </div>
            <button className="bg-saffron text-navy font-semibold px-5 py-2 rounded-lg hover:bg-orange-400 transition-colors">
              + Upload Document
            </button>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(doc => (
              <div key={doc.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${doc.status === 'Verified' ? 'bg-green-100 text-india-green' : 'bg-yellow-100 text-yellow-700'}`}>
                    {doc.status === 'Verified' ? '✓ ' : '⏳ '}{doc.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{doc.name}</h3>
                <p className="text-xs text-gray-400 mb-1">Type: {doc.type}</p>
                <p className="text-xs text-gray-400 mb-4">Uploaded: {doc.date} · {doc.size}</p>
                <div className="flex gap-2">
                  <button className="flex-1 text-center py-1.5 bg-navy text-white text-xs rounded-lg hover:bg-blue-900 transition-colors">View</button>
                  <button className="flex-1 text-center py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors">Download</button>
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
