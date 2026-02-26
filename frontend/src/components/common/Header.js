import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-navy shadow-lg tricolor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-saffron flex items-center justify-center bg-white">
              <span className="text-navy font-bold text-xs">🇮🇳</span>
            </div>
            <div>
              <div className="text-saffron font-bold text-lg leading-tight">Aatmanirbhar</div>
              <div className="text-white text-xs">E-Governance Portal</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-saffron transition-colors text-sm">Home</Link>
            <Link href="/fund-transparency" className="text-white hover:text-saffron transition-colors text-sm">Fund Transparency</Link>
            <Link href="/eligibility" className="text-white hover:text-saffron transition-colors text-sm">Schemes</Link>
            <Link href="/aatmanirbhar/marketplace" className="text-white hover:text-saffron transition-colors text-sm">Marketplace</Link>
            <Link href="/grievance" className="text-white hover:text-saffron transition-colors text-sm">Grievance</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/citizen'} className="text-saffron hover:text-white transition-colors text-sm font-medium">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-saffron text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-400 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-saffron text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-400 transition-colors">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
