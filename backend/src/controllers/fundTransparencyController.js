const { getDb } = require('../database/db');

const getFundTransparency = (req, res) => {
  const db = getDb();
  const overviewRows = db.prepare('SELECT key, value FROM fund_transparency_overview').all();
  const overview = {};
  overviewRows.forEach(r => { overview[r.key] = r.value; });

  const departments = db.prepare(
    'SELECT name, allocated, distributed, schemes_count as schemes FROM departments ORDER BY id'
  ).all();

  const recentTransactions = db.prepare(
    'SELECT hash, scheme, amount, state, date FROM fund_transparency_transactions ORDER BY date DESC'
  ).all();

  res.json({
    totalBudget: overview.totalBudget || 0,
    totalAllocated: overview.totalAllocated || 0,
    totalDistributed: overview.totalDistributed || 0,
    departments,
    recentTransactions,
  });
};

module.exports = { getFundTransparency };
