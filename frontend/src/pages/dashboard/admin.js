import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../utils/api';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [blockchain, setBlockchain] = useState([]);
  const [grievanceFilter, setGrievanceFilter] = useState('All');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (!loading && user && user.role !== 'admin') router.push('/dashboard/citizen');
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      adminAPI.getAnalytics().then(d => setAnalytics(d)).catch(() => {});
      adminAPI.getBlockchain().then(d => setBlockchain(d.transactions || [])).catch(() => {});
    }
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  const mockGrievances = [
    { id: 'GRV001', title: 'Delayed DBT Payment', citizen: 'Ramesh Kumar', category: 'Finance', status: 'Resolved', date: '2024-01-05' },
    { id: 'GRV002', title: 'Document Verification Issue', citizen: 'Sunita Devi', category: 'Documents', status: 'In Progress', date: '2024-01-12' },
    { id: 'GRV003', title: 'Scheme Application Rejected', citizen: 'Mohan Lal', category: 'Schemes', status: 'Open', date: '2024-01-20' },
    { id: 'GRV004', title: 'Ration Card Update', citizen: 'Anita Singh', category: 'Documents', status: 'Open', date: '2024-01-22' },
  ];

  const filteredGrievances = grievanceFilter === 'All' ? mockGrievances : mockGrievances.filter(g => g.status === grievanceFilter);

  const statusColors = {
    'Resolved': 'bg-green-100 text-india-green',
    'In Progress': 'bg-blue-100 text-navy',
    'Open': 'bg-red-100 text-red-600',
    'Confirmed': 'bg-green-100 text-india-green',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Failed': 'bg-red-100 text-red-600',
  };

  return (
    <>
      <Head><title>Admin Dashboard | E-Governance Portal</title></Head>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Admin Dashboard 🏛️</h1>
            <p className="text-gray-500 mt-1">Monitor and manage government services</p>
          </div>

          {/* Stats */}
          {analytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon="👥" value={`${(analytics.overview.totalCitizens / 100000).toFixed(1)}L`} label="Citizens Served" color="navy" trend="12% this month" />
              <StatCard icon="💰" value={`₹${(analytics.overview.fundsDistributed / 10000000).toFixed(0)}Cr`} label="Funds Distributed" color="saffron" />
              <StatCard icon="✅" value={analytics.overview.grievancesResolved.toLocaleString('en-IN')} label="Grievances Resolved" color="green" />
              <StatCard icon="📋" value={analytics.overview.schemesActive} label="Active Schemes" color="navy" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart (CSS-based) */}
            {analytics && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-navy mb-4">📈 Revenue Collection (₹ Lakhs)</h2>
                <div className="flex items-end gap-2 h-40">
                  {analytics.revenueData.map((item) => {
                    const max = Math.max(...analytics.revenueData.map(d => d.amount));
                    const height = Math.round((item.amount / max) * 100);
                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">{item.amount}</span>
                        <div className="w-full bg-saffron rounded-t-sm transition-all" style={{ height: `${height}%` }} />
                        <span className="text-xs text-gray-500">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Department Fund Distribution */}
            {analytics && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-navy mb-4">🏛️ Department Fund Distribution</h2>
                <div className="space-y-3">
                  {analytics.departmentFunds.map((dept) => (
                    <div key={dept.department}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{dept.department}</span>
                        <span className="text-gray-500 font-medium">{dept.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-navy h-2 rounded-full transition-all" style={{ width: `${dept.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blockchain Explorer */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold text-navy mb-4">⛓️ Blockchain Explorer</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Transaction Hash</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Scheme</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {blockchain.map((txn) => (
                    <tr key={txn.hash} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-xs text-blue-600 truncate max-w-xs">{txn.hash.slice(0, 18)}...</td>
                      <td className="py-3 px-4 text-gray-700">{txn.scheme}</td>
                      <td className="py-3 px-4 font-semibold text-navy">₹{txn.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[txn.status] || 'bg-gray-100 text-gray-600'}`}>{txn.status}</span></td>
                      <td className="py-3 px-4 text-gray-400 text-xs">{txn.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grievance Management */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-navy">📢 Grievance Management</h2>
              <div className="flex gap-2">
                {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
                  <button
                    key={f}
                    onClick={() => setGrievanceFilter(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${grievanceFilter === f ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Citizen</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrievances.map(g => (
                    <tr key={g.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-xs text-gray-500">{g.id}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{g.title}</td>
                      <td className="py-3 px-4 text-gray-600">{g.citizen}</td>
                      <td className="py-3 px-4 text-gray-500">{g.category}</td>
                      <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[g.status] || ''}`}>{g.status}</span></td>
                      <td className="py-3 px-4 text-gray-400 text-xs">{g.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Regional Revenue Heatmap */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">🗺️ Regional Revenue Heatmap</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2 px-3 text-gray-600 font-medium">State</th>
                      <th className="text-left py-2 px-3 text-gray-600 font-medium">Fund (₹Cr)</th>
                      <th className="text-left py-2 px-3 text-gray-600 font-medium">Distribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { state: 'Maharashtra', fund: 8500, pct: 85 },
                      { state: 'Uttar Pradesh', fund: 7200, pct: 72 },
                      { state: 'Tamil Nadu', fund: 6100, pct: 61 },
                      { state: 'Karnataka', fund: 5800, pct: 58 },
                      { state: 'Gujarat', fund: 5400, pct: 54 },
                      { state: 'Rajasthan', fund: 4200, pct: 42 },
                    ].map(row => (
                      <tr key={row.state} className="border-t border-gray-100">
                        <td className="py-2 px-3 text-gray-700 font-medium">{row.state}</td>
                        <td className="py-2 px-3 text-gray-600">₹{row.fund.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-3">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${row.pct >= 70 ? 'bg-india-green' : row.pct >= 50 ? 'bg-saffron' : 'bg-red-400'}`}
                              style={{ width: `${row.pct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Public Fund Transparency */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">💰 Public Fund Transparency</h2>
              <p className="text-sm text-gray-500 mb-4">Total Budget Allocation: <span className="font-bold text-navy">₹50,000 Cr</span></p>
              <div className="space-y-4">
                {[
                  { sector: 'Infrastructure', amount: 18000, pct: 36, color: 'bg-navy' },
                  { sector: 'Healthcare', amount: 14000, pct: 28, color: 'bg-india-green' },
                  { sector: 'Education', amount: 12000, pct: 24, color: 'bg-saffron' },
                  { sector: 'Agriculture', amount: 6000, pct: 12, color: 'bg-blue-400' },
                ].map(item => (
                  <div key={item.sector}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.sector}</span>
                      <span className="text-gray-500 font-medium">₹{item.amount.toLocaleString('en-IN')} Cr ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className={`${item.color} h-3 rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scheme Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">📊 Scheme Distribution</h2>
              <div className="space-y-3">
                {[
                  { scheme: 'PM-KISAN', pct: 35, color: 'bg-india-green' },
                  { scheme: 'Ayushman Bharat', pct: 25, color: 'bg-navy' },
                  { scheme: 'PM Mudra Yojana', pct: 20, color: 'bg-saffron' },
                  { scheme: 'Startup India', pct: 12, color: 'bg-blue-400' },
                  { scheme: 'Others', pct: 8, color: 'bg-gray-400' },
                ].map(item => (
                  <div key={item.scheme}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.scheme}</span>
                      <span className="text-gray-500 font-medium">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini pie visual */}
              <div className="flex items-center justify-center mt-4">
                <div className="w-24 h-24 rounded-full" style={{ background: 'conic-gradient(#138808 0% 35%, #000080 35% 60%, #FF9933 60% 80%, #60a5fa 80% 92%, #9ca3af 92% 100%)' }} />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-navy mb-4">💳 Payment Methods Breakdown</h2>
              <div className="space-y-4">
                {[
                  { method: 'UPI', pct: 45, icon: '📱', color: 'bg-india-green' },
                  { method: 'Net Banking', pct: 28, icon: '🏦', color: 'bg-navy' },
                  { method: 'Debit Card', pct: 18, icon: '💳', color: 'bg-saffron' },
                  { method: 'Cash', pct: 9, icon: '💵', color: 'bg-gray-400' },
                ].map(item => (
                  <div key={item.method} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{item.method}</span>
                        <span className="text-gray-500">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
