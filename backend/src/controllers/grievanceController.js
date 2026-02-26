const { getDb } = require('../database/db');

const createGrievance = (req, res) => {
  const { title, description, category } = req.body;
  const db = getDb();
  const count = db.prepare('SELECT COUNT(*) as count FROM grievances').get().count;
  const id = `GRV${String(count + 1).padStart(3, '0')}`;
  const date = new Date().toISOString().split('T')[0];
  const userId = req.user ? req.user.id : null;
  db.prepare(
    'INSERT INTO grievances (id, user_id, title, description, category, status, date, resolved_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, userId, title, description, category, 'Open', date, null);
  const newGrievance = { id, title, description, category, status: 'Open', date, resolvedDate: null };
  res.status(201).json({ grievance: newGrievance, message: 'Grievance filed successfully' });
};

const listGrievances = (req, res) => {
  const { status } = req.query;
  const db = getDb();
  let grievances;
  if (status) {
    grievances = db.prepare('SELECT * FROM grievances WHERE status = ?').all(status);
  } else {
    grievances = db.prepare('SELECT * FROM grievances').all();
  }
  const mapped = grievances.map(g => ({
    id: g.id,
    title: g.title,
    description: g.description,
    category: g.category,
    status: g.status,
    date: g.date,
    resolvedDate: g.resolved_date,
  }));
  res.json({ grievances: mapped, total: mapped.length });
};

const CATEGORY_KEYWORDS = {
  Payment: ['payment', 'money', 'fund', 'wallet', 'transaction', 'transfer', 'dbt', 'subsidy', 'disbursement', 'amount', 'refund'],
  KYC: ['kyc', 'aadhaar', 'pan', 'identity', 'verification', 'document', 'id proof', 'biometric'],
  Technical: ['login', 'password', 'error', 'bug', 'crash', 'app', 'website', 'loading', 'otp', 'server', 'timeout'],
  Scheme: ['scheme', 'yojana', 'eligibility', 'application', 'enrollment', 'benefit', 'scholarship', 'pension'],
  Infrastructure: ['road', 'bridge', 'water supply', 'electricity supply', 'drainage', 'construction', 'building', 'sanitation'],
};

const PRIORITY_MAP = {
  Payment: { priority: 'High', days: 3 },
  KYC: { priority: 'Medium', days: 5 },
  Technical: { priority: 'Low', days: 2 },
  Scheme: { priority: 'High', days: 5 },
  Infrastructure: { priority: 'Medium', days: 8 },
  General: { priority: 'Low', days: 7 },
};

const classifyGrievance = (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  const text = description.toLowerCase();
  let bestCategory = 'General';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const matches = keywords.filter(kw => text.includes(kw)).length;
    const score = matches / keywords.length;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  const confidence = bestScore > 0 ? Math.round(Math.min(bestScore * 100 + 40, 95)) : 30;
  const { priority, days } = PRIORITY_MAP[bestCategory];

  res.json({
    category: bestCategory,
    confidence,
    suggestedPriority: priority,
    estimatedResolutionDays: days,
  });
};

module.exports = { createGrievance, listGrievances, classifyGrievance };
