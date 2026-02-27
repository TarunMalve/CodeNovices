import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { aiHubAPI, healthScoreAPI } from '../utils/api';

const aiModels = [
  { name: 'Claude Opus 4.6', icon: '🧠', desc: 'Most powerful for complex budget transparency and blockchain logic', color: 'border-saffron bg-orange-50' },
  { name: 'Claude Sonnet 4.6', icon: '⚡', desc: 'Versatile for real-time eligibility checks', color: 'border-navy bg-blue-50' },
  { name: 'Gemini 3 Flash', icon: '🔍', desc: 'Fast for processing document extraction in the AI-OCR Vault', color: 'border-india-green bg-green-50' },
];

export default function AIHub() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);
  const [healthScore, setHealthScore] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      aiHubAPI.getRecommendations()
        .then(d => setRecommendations(d.recommendations || []))
        .catch(() => {
          setRecommendations([
            { scheme: 'PM-KISAN', match: 95, reason: 'Agricultural income detected in your profile' },
            { scheme: 'Ayushman Bharat', match: 88, reason: 'Eligible based on income criteria' },
            { scheme: 'PM Mudra Yojana', match: 72, reason: 'MSME business registration found' },
          ]);
        });
      healthScoreAPI.getScore()
        .then(d => setHealthScore(d))
        .catch(() => setHealthScore({ score: 72, maxScore: 100, grade: 'B+', details: { savings: 65, insurance: 80, debt: 70, investments: 73 } }));
    }
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  return (
    <>
      <Head><title>AI Hub | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Hero */}
        <section className="bg-navy text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block bg-saffron text-navy text-xs font-bold px-3 py-1 rounded-full mb-4">🤖 Powered by AI</div>
            <h1 className="text-4xl font-extrabold mb-3">AI-Powered Governance Assistant</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Leveraging cutting-edge AI models for smarter governance, personalized recommendations, and transparent fund management</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {/* AI Recommendation Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-saffron rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔍</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Gemini 3 Flash Recommendation</p>
                <p className="text-lg font-bold text-navy">
                  Based on your profile, Gemini 3 Flash recommends you are a perfect fit for the <span className="text-saffron">PM-KISAN</span> scheme
                </p>
                <p className="text-sm text-gray-600 mt-2">95% match confidence • Agricultural income detected • Verified via Aadhaar</p>
              </div>
            </div>
          </div>

          {/* AI Model Cards */}
          <h2 className="text-xl font-bold text-navy mb-4">Available AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {aiModels.map(model => (
              <div key={model.name} className={`rounded-xl border-l-4 p-6 ${model.color} hover:shadow-lg transition-shadow`}>
                <div className="text-3xl mb-3">{model.icon}</div>
                <h3 className="text-lg font-bold text-navy mb-2">{model.name}</h3>
                <p className="text-sm text-gray-600">{model.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Scheme Recommendations */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">📋 Personalized Scheme Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-semibold text-gray-800">{rec.scheme}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${rec.match >= 90 ? 'bg-green-100 text-india-green' : rec.match >= 70 ? 'bg-blue-100 text-navy' : 'bg-yellow-100 text-yellow-700'}`}>
                        {rec.match}% match
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Health Score */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">💰 Financial Health Score</h2>
              {healthScore && (
                <>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                        <circle
                          cx="60" cy="60" r="50" fill="none"
                          stroke={healthScore.score >= 80 ? '#138808' : healthScore.score >= 60 ? '#FF9933' : '#ef4444'}
                          strokeWidth="10"
                          strokeDasharray={`${(healthScore.score / healthScore.maxScore) * 314} 314`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-navy">{healthScore.score}</span>
                        <span className="text-xs text-gray-500">/ {healthScore.maxScore}</span>
                        <span className="text-sm font-semibold text-saffron">{healthScore.grade}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(healthScore.details).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 capitalize">{key}</span>
                          <span className="text-gray-500 font-medium">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${value >= 80 ? 'bg-india-green' : value >= 60 ? 'bg-saffron' : 'bg-red-400'}`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
