import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';

const mockSessions = [
  { id: 1, device: 'Chrome / Windows 11', location: 'New Delhi, India', lastActive: '2 minutes ago', current: true },
  { id: 2, device: 'Safari / iPhone 14', location: 'Mumbai, India', lastActive: '3 hours ago', current: false },
  { id: 3, device: 'Firefox / Ubuntu', location: 'Bengaluru, India', lastActive: 'Yesterday, 9:41 PM', current: false },
];

const mockActivity = [
  { date: '2024-06-10 10:32', action: 'Login', ip: '103.21.58.12', status: 'Success' },
  { date: '2024-06-10 08:15', action: 'Password Change', ip: '103.21.58.12', status: 'Success' },
  { date: '2024-06-09 22:04', action: 'Login', ip: '45.67.89.201', status: 'Failed' },
  { date: '2024-06-09 18:30', action: 'Document Upload', ip: '103.21.58.12', status: 'Success' },
  { date: '2024-06-08 14:12', action: 'MFA Toggle', ip: '103.21.58.12', status: 'Success' },
];

function Toggle({ enabled, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-india-green' : 'bg-gray-300'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function Security() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mfa, setMfa] = useState({ sms: true, email: false, authenticator: false });
  const [biometric, setBiometric] = useState({ fingerprint: false, face: false });
  const [sessions, setSessions] = useState(mockSessions);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState('');
  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⚙️</div></div>;

  const toggleMfa = (key) => setMfa(p => ({ ...p, [key]: !p[key] }));
  const toggleBiometric = (key) => setBiometric(p => ({ ...p, [key]: !p[key] }));
  const revokeSession = (id) => setSessions(p => p.filter(s => s.id !== id));

  const handlePwSubmit = (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg('❌ New passwords do not match.'); return; }
    if (pwForm.newPw.length < 8) { setPwMsg('❌ Password must be at least 8 characters.'); return; }
    setPwMsg('✅ Password changed successfully!');
    setPwForm({ current: '', newPw: '', confirm: '' });
  };

  return (
    <>
      <Head><title>Security Settings | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-navy">🔐 Security Settings</h1>
            <p className="text-gray-500 mt-1">Manage your authentication, sessions and account security.</p>
          </div>

          {/* MFA */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Multi-Factor Authentication</h2>
            <div className="space-y-4">
              {[
                { key: 'sms', label: 'SMS OTP', desc: 'Receive a one-time password via SMS', icon: '📱' },
                { key: 'email', label: 'Email OTP', desc: 'Receive a one-time password via email', icon: '📧' },
                { key: 'authenticator', label: 'Google Authenticator', desc: 'Use a TOTP authenticator app', icon: '🔑' },
              ].map(({ key, label, desc, icon }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{label}</div>
                      <div className="text-sm text-gray-500">{desc}</div>
                    </div>
                  </div>
                  <Toggle enabled={mfa[key]} onToggle={() => toggleMfa(key)} />
                </div>
              ))}
            </div>
          </section>

          {/* Biometric */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Biometric Authentication</h2>
            <div className="space-y-4">
              {[
                { key: 'fingerprint', label: 'Fingerprint', desc: 'Authenticate using fingerprint sensor', icon: '👆' },
                { key: 'face', label: 'Face Recognition', desc: 'Authenticate using facial recognition', icon: '🤳' },
              ].map(({ key, label, desc, icon }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{label}</div>
                      <div className="text-sm text-gray-500">{desc}</div>
                    </div>
                  </div>
                  <Toggle enabled={biometric[key]} onToggle={() => toggleBiometric(key)} />
                </div>
              ))}
            </div>
          </section>

          {/* Active Sessions */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Active Sessions</h2>
            <div className="space-y-3">
              {sessions.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                  <div>
                    <div className="font-medium text-gray-800 flex items-center gap-2">
                      💻 {s.device}
                      {s.current && <span className="text-xs bg-india-green text-white px-2 py-0.5 rounded-full">Current</span>}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">📍 {s.location} · 🕐 {s.lastActive}</div>
                  </div>
                  {!s.current && (
                    <button onClick={() => revokeSession(s.id)}
                      className="text-red-600 hover:bg-red-50 border border-red-300 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Change Password */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Change Password</h2>
            <form onSubmit={handlePwSubmit} className="space-y-4 max-w-md">
              {[
                { name: 'current', label: 'Current Password', key: 'current' },
                { name: 'newPw', label: 'New Password', key: 'newPw' },
                { name: 'confirm', label: 'Confirm New Password', key: 'confirm' },
              ].map(({ name, label, key }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type="password" value={pwForm[key]} onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                    required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron" />
                </div>
              ))}
              {pwMsg && <p className={`text-sm font-medium ${pwMsg.startsWith('✅') ? 'text-india-green' : 'text-red-600'}`}>{pwMsg}</p>}
              <button type="submit" className="bg-navy hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Update Password
              </button>
            </form>
          </section>

          {/* Activity Log */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Recent Activity Log</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-left">
                    <th className="px-4 py-3 rounded-l-lg">Date & Time</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockActivity.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{a.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{a.action}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono">{a.ip}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.status === 'Success' ? 'bg-green-100 text-india-green' : 'bg-red-100 text-red-600'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
