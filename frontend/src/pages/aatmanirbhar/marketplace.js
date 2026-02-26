import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { marketplaceAPI } from '../../utils/api';

const categories = ['All', 'Handicrafts', 'Textiles', 'Food', 'Electronics'];

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    marketplaceAPI.getProducts(filter).then(d => { setProducts(d.products || []); setLoading(false); }).catch(() => setLoading(false));
  }, [filter]);

  return (
    <>
      <Head><title>Vocal for Local Marketplace | E-Governance Portal</title></Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {/* Hero */}
          <div className="bg-gradient-to-r from-saffron to-orange-400 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">🛒 Vocal for Local Marketplace</h1>
            <p className="text-orange-100 text-lg">Support Indian artisans and MSMEs — Buy Local, Go Global!</p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🏭 6.3 Cr+ MSMEs</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🇮🇳 100% Made in India</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">✅ Quality Certified</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${filter === cat ? 'bg-navy text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-navy'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400 text-lg">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="h-40 flex items-center justify-center" style={{ backgroundColor: product.color + '20', borderBottom: `3px solid ${product.color}` }}>
                    <div className="text-center">
                      <div className="text-5xl mb-1">{product.category === 'Textiles' ? '🧵' : product.category === 'Handicrafts' ? '🏺' : product.category === 'Food' ? '🌿' : '⚡'}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-saffron transition-colors">{product.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">🧑‍🎨 {product.artisan}</p>
                    <p className="text-xs text-gray-400 mb-2">📍 {product.location}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-navy">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-yellow-600">⭐ {product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-india-green text-white text-xs px-2 py-0.5 rounded-full font-semibold">🇮🇳 Made in India</span>
                      <span className="text-xs text-gray-400">{product.sales} sold</span>
                    </div>
                    <button className="w-full bg-saffron text-navy font-semibold py-2 rounded-lg text-sm hover:bg-orange-400 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
