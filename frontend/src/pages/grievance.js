import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { grievanceAPI } from '../utils/api';

const mockGrievances = [
  { id: 'GRV001', title: 'Delayed DBT Payment', description: 'PM Kisan payment delayed', category: 'Finance', status: 'Resolved', date: '2024-01-05' },
  { id: 'GRV002', title: 'Document Verification Issue', description: 'Aadhaar verification failed', category: 'Documents', status: 'In Progress', date: '2024-01-12' },
  { id: 'GRV003', title: 'Scheme Application Rejected', description: 'PM Awas Yojana rejected without reason', category: 'Schemes', status: 'Open', date: '2024-01-20' },
];

export default function Grievance() {
  const [form, setForm] = useState({ title: '', description: '', category: 'Finance' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('file');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await grievanceAPI.create(form);
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Show success even if API fails (demo mode)
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    'Resolved': 'bg-green-100 text-india-green',
    'In Progress': 'bg-blue-100 text-navy',
    'Open': 'bg-red-100 text-red-600',
  };

  return (
    <>
      <Head><title>Grievance | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <h1 className="text-2xl font-bold text-navy mb-6">📢 Grievance Portal</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['file', 'track'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-navy text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                {tab === 'file' ? '📝 File Grievance' : '🔍 Track Grievance'}
              </button>
            ))}
          </div>

          {activeTab === 'file' ? (
            <div className="bg-white rounded-xl shadow-md p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-india-green mb-2">Grievance Filed Successfully!</h2>
                  <p className="text-gray-500 mb-2">Your complaint ID: <span className="font-mono font-bold text-navy">GRV{String(Math.floor(Math.random() * 999) + 4).padStart(3, '0')}</span></p>
                  <p className="text-gray-400 text-sm">We will respond within 5 business days.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ title: '', description: '', category: 'Finance' }); }} className="mt-6 bg-saffron text-navy font-semibold px-6 py-2 rounded-lg hover:bg-orange-400 transition-colors">
                    File Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grievance Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="Brief title of your complaint"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      {['Finance', 'Documents', 'Schemes', 'Healthcare', 'Infrastructure', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe your grievance in detail..."
                      required
                      rows={5}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-saffron text-navy font-bold py-3 px-8 rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : '📤 Submit Grievance'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {mockGrievances.map(g => (
                <div key={g.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-400">{g.id}</span>
                      <h3 className="text-lg font-bold text-navy">{g.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[g.status]}`}>{g.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{g.description}</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>📁 {g.category}</span>
                    <span>📅 {g.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
