import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';

const utilities = [
  {
    id: 'electricity',
    name: 'Electricity',
    icon: '⚡',
    provider: 'BSES Rajdhani Power Ltd',
    consumerNo: 'BR-2024-00193847',
    amount: 2340,
    dueDate: '2024-06-25',
    color: 'bg-yellow-50 border-yellow-300',
    accent: 'text-yellow-600',
    btnColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    id: 'water',
    name: 'Water',
    icon: '💧',
    provider: 'Delhi Jal Board',
    consumerNo: 'DJB-W-00487293',
    amount: 480,
    dueDate: '2024-06-30',
    color: 'bg-blue-50 border-blue-300',
    accent: 'text-blue-600',
    btnColor: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'property',
    name: 'Property Tax',
    icon: '🏠',
    provider: 'South Delhi Municipal Corp.',
    consumerNo: 'SDMC-PT-0038472',
    amount: 8500,
    dueDate: '2024-07-15',
    color: 'bg-green-50 border-green-300',
    accent: 'text-green-700',
    btnColor: 'bg-india-green hover:bg-green-700',
  },
];

const electricityUsage = [
  { month: 'Jan', units: 310 },
  { month: 'Feb', units: 280 },
  { month: 'Mar', units: 260 },
  { month: 'Apr', units: 340 },
  { month: 'May', units: 420 },
  { month: 'Jun', units: 390 },
];

const maxUnits = Math.max(...electricityUsage.map(m => m.units));

export default function Utilities() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [autoPay, setAutoPay] = useState({ electricity: false, water: false, property: false });
  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  const toggleAutoPay = (id) => setAutoPay(p => ({ ...p, [id]: !p[id] }));

  const handlePay = (name, amount) => {
    alert(`✅ Payment of ₹${amount.toLocaleString('en-IN')} for ${name} initiated successfully!\n\nTransaction ID: TXN${Date.now()}`);
  };

  return (
    <>
      <Head><title>Smart Utility Dashboard | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <div className="bg-navy text-white py-10 px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">🔌 Smart Utility Dashboard</h1>
            <p className="text-gray-300 max-w-xl mx-auto">Manage all your utility bills, enable auto-pay, and track consumption — in one place.</p>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Utility Cards */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Your Utilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {utilities.map(u => (
                  <div key={u.id} className={`bg-white rounded-2xl border-2 ${u.color} shadow-md p-6 flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{u.icon}</span>
                        <h3 className="font-bold text-gray-800 text-lg">{u.name}</h3>
                      </div>
                      {/* Auto-Pay Toggle */}
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 mb-1">Auto-Pay</span>
                        <button onClick={() => toggleAutoPay(u.id)}
                          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${autoPay[u.id] ? 'bg-india-green' : 'bg-gray-300'}`}>
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${autoPay[u.id] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 flex-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Provider</span>
                        <span className="font-medium text-gray-800 text-right max-w-[55%]">{u.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consumer No.</span>
                        <span className="font-mono text-xs text-gray-700">{u.consumerNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date</span>
                        <span className="font-medium text-gray-800">{u.dueDate}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500">Amount Due</div>
                          <div className={`text-2xl font-black ${u.accent}`}>
                            ₹{u.amount.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <button onClick={() => handlePay(u.name, u.amount)}
                          className={`${u.btnColor} text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm`}>
                          Pay Now
                        </button>
                      </div>
                      {autoPay[u.id] && (
                        <div className="mt-2 text-xs text-india-green font-medium bg-green-50 rounded-lg px-2 py-1 text-center">
                          ✅ Auto-pay enabled — bill will be paid automatically
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Electricity Usage Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-navy">⚡ Electricity Consumption</h2>
                  <p className="text-sm text-gray-500 mt-1">6-month usage (Units / kWh)</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Avg / month</div>
                  <div className="font-bold text-yellow-600 text-lg">
                    {Math.round(electricityUsage.reduce((s, m) => s + m.units, 0) / electricityUsage.length)} kWh
                  </div>
                </div>
              </div>

              {/* CSS Bar Chart */}
              <div className="flex items-end justify-around gap-3 h-48">
                {electricityUsage.map(m => {
                  const heightPct = Math.round((m.units / maxUnits) * 100);
                  return (
                    <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
                      <div className="text-xs font-semibold text-yellow-700">{m.units}</div>
                      <div className="w-full flex items-end" style={{ height: '160px' }}>
                        <div
                          className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg transition-all"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{m.month}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t text-center text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Lowest</div>
                  <div className="font-bold text-india-green">{Math.min(...electricityUsage.map(m => m.units))} kWh</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Highest</div>
                  <div className="font-bold text-red-500">{maxUnits} kWh</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Total (6M)</div>
                  <div className="font-bold text-navy">{electricityUsage.reduce((s, m) => s + m.units, 0)} kWh</div>
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
