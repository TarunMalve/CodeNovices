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

module.exports = { createGrievance, listGrievances };
