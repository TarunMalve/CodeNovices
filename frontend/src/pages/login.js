import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      router.push(data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/citizen');
    } catch (err) {
      setError(err?.error || 'Invalid credentials. Try citizen@example.com / password123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Login | Aatmanirbhar E-Governance</title></Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="text-4xl">🇮🇳</Link>
            <h1 className="text-2xl font-bold text-navy mt-4">Aatmanirbhar Bharat Portal</h1>
            <p className="text-gray-500 mt-2">Secure Government Login</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-saffron">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-saffron text-navy font-bold py-3 rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing In...' : '🔐 Sign In'}
              </button>
            </form>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-gray-600">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>👤 Citizen: citizen@example.com / password123</p>
              <p>🏛️ Admin: admin@example.com / admin123</p>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              New user? <Link href="/register" className="text-saffron font-medium hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
