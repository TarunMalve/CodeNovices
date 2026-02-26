import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const citizenLinks = [
  { href: '/dashboard/citizen', label: '🏠 Dashboard' },
  { href: '/wallet', label: '💰 Wallet' },
  { href: '/dbt-tracker', label: '📊 DBT Tracker' },
  { href: '/documents', label: '📁 Documents' },
  { href: '/aatmanirbhar/schemes', label: '📋 Schemes' },
  { href: '/aatmanirbhar/marketplace', label: '🛒 Marketplace' },
  { href: '/grievance', label: '📢 Grievance' },
];

const adminLinks = [
  { href: '/dashboard/admin', label: '📊 Dashboard' },
  { href: '/aatmanirbhar/swadeshi-dashboard', label: '📈 Swadeshi Dashboard' },
  { href: '/grievance', label: '📢 Grievances' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const links = user?.role === 'admin' ? adminLinks : citizenLinks;

  return (
    <aside className="w-64 min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6 border-b border-blue-900">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-navy font-bold text-lg">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-semibold text-sm">{user?.name || 'User'}</div>
            <div className="text-gray-400 text-xs capitalize">{user?.role || 'citizen'}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                  router.pathname === link.href
                    ? 'bg-saffron text-navy font-semibold'
                    : 'text-gray-300 hover:bg-blue-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-900">
        <button
          onClick={() => { logout(); router.push('/'); }}
          className="w-full bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
