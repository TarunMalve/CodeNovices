import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', aadhaar: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      router.push('/dashboard/citizen');
    } catch (err) {
      setError(err?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <Head><title>Register | Aatmanirbhar E-Governance</title></Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="text-4xl">🇮🇳</Link>
            <h1 className="text-2xl font-bold text-navy mt-4">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Join Aatmanirbhar Bharat Portal</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-india-green">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rahul@example.com' },
                { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                { name: 'aadhaar', label: 'Aadhaar Number', type: 'text', placeholder: 'XXXX-XXXX-XXXX' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.name !== 'aadhaar'}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-india-green"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-india-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating Account...' : '✅ Register'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Already registered? <Link href="/login" className="text-saffron font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
