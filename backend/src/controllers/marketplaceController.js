const getProducts = (req, res) => {
  const products = [
    { id: 'P001', name: 'Handwoven Banarasi Silk Saree', price: 4500, artisan: 'Ramesh Kumar', location: 'Varanasi, UP', category: 'Textiles', rating: 4.8, sales: 234, madeInIndia: true, color: '#FF9933' },
    { id: 'P002', name: 'Madhubani Painting Set', price: 1200, artisan: 'Sunita Devi', location: 'Madhubani, Bihar', category: 'Handicrafts', rating: 4.9, sales: 156, madeInIndia: true, color: '#138808' },
    { id: 'P003', name: 'Organic Darjeeling Tea', price: 850, artisan: 'Rajesh Tea Estate', location: 'Darjeeling, WB', category: 'Food', rating: 4.7, sales: 890, madeInIndia: true, color: '#8B4513' },
    { id: 'P004', name: 'Chikankari Embroidered Kurta', price: 2200, artisan: 'Zarina Begum', location: 'Lucknow, UP', category: 'Textiles', rating: 4.6, sales: 312, madeInIndia: true, color: '#FFD700' },
    { id: 'P005', name: 'Thanjavur Brass Lamp', price: 3500, artisan: 'Murugesan Works', location: 'Thanjavur, TN', category: 'Handicrafts', rating: 4.9, sales: 78, madeInIndia: true, color: '#DAA520' },
    { id: 'P006', name: 'Kashmiri Walnut Wood Box', price: 2800, artisan: 'Mohammad Yusuf', location: 'Srinagar, JK', category: 'Handicrafts', rating: 4.7, sales: 145, madeInIndia: true, color: '#8B4513' },
    { id: 'P007', name: 'Solar LED Lamp (Make in India)', price: 650, artisan: 'GreenTech Solutions', location: 'Pune, MH', category: 'Electronics', rating: 4.5, sales: 1234, madeInIndia: true, color: '#FFD700' },
    { id: 'P008', name: 'Organic Moringa Powder', price: 450, artisan: 'Natural Farms Co-op', location: 'Coimbatore, TN', category: 'Food', rating: 4.8, sales: 567, madeInIndia: true, color: '#228B22' },
  ];
  
  const { category } = req.query;
  const filtered = category && category !== 'All' ? products.filter(p => p.category === category) : products;
  res.json({ products: filtered, total: filtered.length });
};

module.exports = { getProducts };
