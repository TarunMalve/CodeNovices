const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set. Using insecure default. Set JWT_SECRET in production.');
}
const SECRET = JWT_SECRET || 'egovernance-secret-key';

const mockUsers = [
  { id: 1, email: 'citizen@example.com', passwordHash: bcrypt.hashSync('password123', 10), name: 'Rahul Sharma', role: 'citizen', aadhaar: '1234-5678-9012' },
  { id: 2, email: 'admin@example.com', passwordHash: bcrypt.hashSync('admin123', 10), name: 'Priya Singh', role: 'admin', department: 'Finance Ministry' },
];

const login = (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
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
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = { id: mockUsers.length + 1, email, passwordHash, name, role: 'citizen', aadhaar };
  mockUsers.push(newUser);
  const token = jwt.sign({ id: newUser.id, email, role: 'citizen' }, SECRET, { expiresIn: '24h' });
  res.status(201).json({ token, user: { id: newUser.id, name, email, role: 'citizen' } });
};

module.exports = { login, register };
