const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDb } = require('../database/db');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set. Using insecure default. Set JWT_SECRET in production.');
}
const SECRET = JWT_SECRET || 'egovernance-secret-key';

const login = (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

const register = (req, res) => {
  const { name, email, password, aadhaar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db.prepare(
    'INSERT INTO users (email, password_hash, name, role, aadhaar) VALUES (?, ?, ?, ?, ?)'
  ).run(email, passwordHash, name, 'citizen', aadhaar || null);
  const newUserId = result.lastInsertRowid;
  // Create wallet for new user
  db.prepare(
    'INSERT INTO wallets (user_id, balance, currency, account_number) VALUES (?, ?, ?, ?)'
  ).run(newUserId, 0, 'INR', `XXXX-XXXX-${String(newUserId).padStart(4, '0')}`);
  const token = jwt.sign({ id: newUserId, email, role: 'citizen' }, SECRET, { expiresIn: '24h' });
  res.status(201).json({ token, user: { id: newUserId, name, email, role: 'citizen' } });
};

module.exports = { login, register };
