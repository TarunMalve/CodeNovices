import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-saffron font-bold text-lg mb-4">🇮🇳 Aatmanirbhar Bharat</h3>
            <p className="text-gray-300 text-sm">
              Building a self-reliant India through digital governance, transparent fund distribution, and empowering citizens.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-saffron">Home</Link></li>
              <li><Link href="/aatmanirbhar/schemes" className="hover:text-saffron">Schemes</Link></li>
              <li><Link href="/aatmanirbhar/marketplace" className="hover:text-saffron">Marketplace</Link></li>
              <li><Link href="/grievance" className="hover:text-saffron">File Grievance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/dbt-tracker" className="hover:text-saffron">DBT Tracker</Link></li>
              <li><Link href="/wallet" className="hover:text-saffron">Wallet</Link></li>
              <li><Link href="/documents" className="hover:text-saffron">Documents</Link></li>
              <li><Link href="/aatmanirbhar/swadeshi-dashboard" className="hover:text-saffron">Swadeshi Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 1800-xxx-xxxx (Toll Free)</li>
              <li>✉️ support@egov.gov.in</li>
              <li>🏛️ Ministry of Electronics &amp; IT</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs">
            © 2024 Government of India. All rights reserved. | This is a demo portal for Hackathon purposes.
          </p>
          <p className="text-saffron text-sm font-semibold mt-2">
            &quot;Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas&quot; 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
