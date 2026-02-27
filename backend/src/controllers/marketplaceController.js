const { getDb } = require('../database/db');

const getProducts = (req, res) => {
  const db = getDb();
  const { category } = req.query;
  let products;
  if (category && category !== 'All') {
    products = db.prepare('SELECT * FROM products WHERE category = ?').all(category);
  } else {
    products = db.prepare('SELECT * FROM products').all();
  }
  const mapped = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    artisan: p.artisan,
    location: p.location,
    category: p.category,
    rating: p.rating,
    sales: p.sales,
    madeInIndia: !!p.made_in_india,
    color: p.color,
  }));
  res.json({ products: mapped, total: mapped.length });
};

module.exports = { getProducts };
