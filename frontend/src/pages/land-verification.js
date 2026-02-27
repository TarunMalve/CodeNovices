import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const indianStates = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi',
];

const districtsByState = {
  'Uttar Pradesh': ['Lucknow','Agra','Varanasi','Prayagraj','Kanpur'],
  'Maharashtra': ['Pune','Mumbai','Nagpur','Nashik','Aurangabad'],
  'Karnataka': ['Bengaluru','Mysuru','Mangaluru','Hubballi','Belagavi'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Salem','Trichy'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Ajmer','Kota'],
  default: ['District 1','District 2','District 3','District 4','District 5'],
};

const mockResults = {
  '123/45': {
    ownerName: 'Ramesh Kumar Sharma',
    area: '2.45',
    landType: 'Agricultural',
    taxStatus: 'Paid',
    registrationDate: '15-Mar-2019',
    blockchainHash: '0x4f3a2b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e',
  },
  '678/90': {
    ownerName: 'Priya Devi Patel',
    area: '0.75',
    landType: 'Residential',
    taxStatus: 'Pending',
    registrationDate: '02-Nov-2021',
    blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
  },
  '321/12': {
    ownerName: 'Mohammed Iqbal Khan',
    area: '5.10',
    landType: 'Commercial',
    taxStatus: 'Paid',
    registrationDate: '20-Jan-2018',
    blockchainHash: '0xdeadbeef1234567890abcdef1234567890abcdef1234567890',
  },
};

export default function LandVerification() {
  const [surveyNo, setSurveyNo] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const districts = districtsByState[state] || districtsByState['default'];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const found = mockResults[surveyNo] || null;
      setResult(found);
      setSearched(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Head><title>Land Verification | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <div className="bg-navy text-white py-10 px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">🗺️ Land Record Verification</h1>
            <p className="text-gray-300 max-w-xl mx-auto">Verify land ownership, tax status and registration details using blockchain-secured records.</p>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Search Panel */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h2 className="text-lg font-bold text-navy mb-5">Search Land Records</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                      <input value={surveyNo} onChange={e => setSurveyNo(e.target.value)} required
                        placeholder="e.g. 123/45, 678/90, 321/12"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <select value={state} onChange={e => { setState(e.target.value); setDistrict(''); }} required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron">
                        <option value="">Select State</option>
                        {indianStates.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <select value={district} onChange={e => setDistrict(e.target.value)} required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron">
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-saffron hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
                      {loading ? '🔍 Searching...' : '🔍 Search Records'}
                    </button>
                  </div>
                </form>

                {/* Results */}
                {searched && (
                  result ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-india-green">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-2xl">✅</span>
                        <h3 className="text-lg font-bold text-india-green">Record Found</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Owner Name', value: result.ownerName, icon: '👤' },
                          { label: 'Area', value: `${result.area} acres`, icon: '📐' },
                          { label: 'Land Type', value: result.landType, icon: '🏞️' },
                          { label: 'Registration Date', value: result.registrationDate, icon: '📅' },
                        ].map(({ label, value, icon }) => (
                          <div key={label} className="bg-gray-50 rounded-xl p-4">
                            <div className="text-xs text-gray-500 mb-1">{icon} {label}</div>
                            <div className="font-semibold text-gray-800">{value}</div>
                          </div>
                        ))}
                        <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4">
                          <div className="text-xs text-gray-500 mb-1">💰 Tax Status</div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${result.taxStatus === 'Paid' ? 'bg-green-100 text-india-green' : 'bg-red-100 text-red-600'}`}>
                            {result.taxStatus}
                          </span>
                        </div>
                        <div className="sm:col-span-2 bg-navy/5 rounded-xl p-4 border border-navy/20">
                          <div className="text-xs text-gray-500 mb-1">⛓️ Blockchain Hash</div>
                          <div className="font-mono text-xs text-navy break-all">{result.blockchainHash}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
                      <div className="text-5xl mb-3">🔎</div>
                      <p className="font-medium">No record found for survey number <strong>{surveyNo}</strong>.</p>
                      <p className="text-sm mt-1">Try: <code>123/45</code>, <code>678/90</code>, or <code>321/12</code></p>
                    </div>
                  )
                )}
              </div>

              {/* Map Panel */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                  <h3 className="text-sm font-bold text-navy mb-3 text-center">India — Land Registry Map</h3>
                  <svg viewBox="0 0 400 450" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Simplified India outline path */}
                    <path d="M185 20 L210 25 L235 20 L260 40 L275 60 L290 55 L300 75 L295 95 L310 110 L305 130 L320 145 L315 165 L330 180 L325 200 L340 220 L330 245 L315 260 L300 280 L285 295 L270 310 L255 325 L240 345 L230 370 L220 395 L215 420 L210 440 L205 420 L200 395 L190 375 L175 355 L165 335 L155 315 L140 300 L125 285 L110 265 L100 245 L95 225 L85 205 L80 185 L90 165 L85 145 L95 130 L90 110 L100 95 L115 80 L120 60 L135 45 L155 30 Z"
                      fill="#e8f5e9" stroke="#138808" strokeWidth="2" />
                    {/* Kashmir */}
                    <path d="M155 30 L165 15 L185 10 L200 20 L185 20 Z" fill="#c8e6c9" stroke="#138808" strokeWidth="1.5" />
                    {/* Northeast */}
                    <path d="M300 75 L320 65 L340 80 L335 100 L310 110 Z" fill="#dcedc8" stroke="#138808" strokeWidth="1.5" />
                    {/* Sri Lanka */}
                    <ellipse cx="232" cy="450" rx="12" ry="18" fill="#fff9c4" stroke="#138808" strokeWidth="1.5" />
                    {/* Andaman islands */}
                    <circle cx="360" cy="300" r="5" fill="#b2dfdb" stroke="#138808" strokeWidth="1" />
                    <circle cx="365" cy="315" r="4" fill="#b2dfdb" stroke="#138808" strokeWidth="1" />
                    {/* Capital marker */}
                    <circle cx="210" cy="145" r="6" fill="#FF9933" />
                    <text x="218" y="149" fontSize="9" fill="#000080" fontWeight="bold">Delhi</text>
                    {/* State borders (approximate) */}
                    <line x1="185" y1="20" x2="155" y2="200" stroke="#138808" strokeWidth="0.5" strokeDasharray="4,3" />
                    <line x1="210" y1="25" x2="270" y2="200" stroke="#138808" strokeWidth="0.5" strokeDasharray="4,3" />
                    <line x1="130" y1="200" x2="320" y2="200" stroke="#138808" strokeWidth="0.5" strokeDasharray="4,3" />
                    <line x1="120" y1="280" x2="310" y2="280" stroke="#138808" strokeWidth="0.5" strokeDasharray="4,3" />
                  </svg>
                  <div className="mt-3 text-xs text-gray-500 text-center">🔵 Illustrative reference only</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
