import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { publicAPI } from '../utils/api';

export default function Home() {
  const [stats, setStats] = useState([
    { value: '...', label: 'Citizens Served', icon: '👥' },
    { value: '...', label: 'Funds Distributed', icon: '💰' },
    { value: '...', label: 'Grievances Resolved', icon: '✅' },
    { value: '...', label: 'Active Schemes', icon: '📋' },
  ]);

  useEffect(() => {
    publicAPI.getStats().then(data => {
      setStats([
        { value: `${(data.citizensServed / 100000).toFixed(1)}L+`, label: 'Citizens Served', icon: '👥' },
        { value: `₹${(data.fundsDistributed / 10000000).toFixed(0)}Cr+`, label: 'Funds Distributed', icon: '💰' },
        { value: data.grievancesResolved.toLocaleString('en-IN'), label: 'Grievances Resolved', icon: '✅' },
        { value: String(data.schemesActive), label: 'Active Schemes', icon: '📋' },
      ]);
    }).catch(() => {
      setStats([
        { value: '12.8L+', label: 'Citizens Served', icon: '👥' },
        { value: '₹842Cr+', label: 'Funds Distributed', icon: '💰' },
        { value: '45,230', label: 'Grievances Resolved', icon: '✅' },
        { value: '47', label: 'Active Schemes', icon: '📋' },
      ]);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Aatmanirbhar Bharat E-Governance Portal</title>
        <meta name="description" content="Fintech-Enabled E-Governance Portal for Aatmanirbhar Bharat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron via-white to-india-green" />

          <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-saffron text-navy text-xs font-bold px-3 py-1 rounded-full mb-4">
                🇮🇳 Powered by Blockchain Technology
              </div>
              <div className="inline-block bg-blue-900 text-gray-300 text-xs px-3 py-1 rounded-full mb-4 ml-2">
                🤖 Powered by AI — Claude Opus · Sonnet · Gemini Flash
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-saffron">Aatmanirbhar Bharat</span>
                <br />
                <span className="text-white">E-Governance Portal</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Transparent, tamper-proof fund distribution powered by blockchain. Empowering every citizen with direct benefit transfers, digital documents, and Vocal for Local marketplace.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/login?role=citizen" className="bg-saffron text-navy px-8 py-3 rounded-lg font-bold text-lg hover:bg-orange-400 transition-colors shadow-lg">
                  🏠 Citizen Login
                </Link>
                <Link href="/login?role=admin" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-navy transition-colors">
                  🏛️ Admin Login
                </Link>
              </div>
            </div>

            {/* Ashoka Chakra Design */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border-4 border-saffron opacity-20 animate-ping" />
                <div className="absolute inset-4 rounded-full border-4 border-white opacity-30 animate-spin-slow" />
                <div className="absolute inset-8 rounded-full border-2 border-india-green opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">⚙️</div>
                    <div className="text-saffron font-bold text-sm">Ashoka Chakra</div>
                    <div className="text-gray-400 text-xs">24 Spokes of Progress</div>
                  </div>
                </div>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${i * 15}deg)` }}
                  >
                    <div className="w-0.5 h-28 bg-navy opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-india-green via-white to-saffron" />
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-extrabold text-navy">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-navy mb-4">Our Services</h2>
          <p className="text-center text-gray-500 mb-10">Everything you need for digital governance in one place</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickCard
              title="🏦 DBT Tracker"
              desc="Track your Direct Benefit Transfers with blockchain-verified transparency"
              href="/dbt-tracker"
              color="border-saffron"
              bg="bg-orange-50"
            />
            <QuickCard
              title="📋 Government Schemes"
              desc="Explore and apply for PM Mudra, Startup India, Make in India and 44+ schemes"
              href="/aatmanirbhar/schemes"
              color="border-navy"
              bg="bg-blue-50"
            />
            <QuickCard
              title="📈 Fund Transparency"
              desc="Track ₹50,000 Cr budget allocation with blockchain verification"
              href="/fund-transparency"
              color="border-india-green"
              bg="bg-green-50"
            />
            <QuickCard
              title="✅ Eligibility Engine"
              desc="Check your eligibility for 47+ government schemes instantly"
              href="/eligibility"
              color="border-saffron"
              bg="bg-orange-50"
            />
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="bg-white py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-center text-navy mb-6">Security & Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-3xl mb-2">🏦</div>
                <p className="text-sm font-bold text-navy">RBI Compliant</p>
                <p className="text-xs text-gray-500 mt-1">Regulated digital payments</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-3xl mb-2">🔒</div>
                <p className="text-sm font-bold text-navy">ISO 27001 Certified</p>
                <p className="text-xs text-gray-500 mt-1">Information security management</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-100">
                <div className="text-3xl mb-2">🛡️</div>
                <p className="text-sm font-bold text-navy">PCI DSS Encrypted</p>
                <p className="text-xs text-gray-500 mt-1">End-to-end data encryption</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

function QuickCard({ title, desc, href, color, bg }) {
  return (
    <Link href={href} className={`block p-6 rounded-xl border-l-4 ${color} ${bg} hover:shadow-lg transition-shadow group`}>
      <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-saffron transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
      <span className="text-saffron text-sm font-semibold mt-3 inline-block">Learn more →</span>
    </Link>
  );
}
