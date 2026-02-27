const { getDb } = require('../database/db');

const getAnalytics = (req, res) => {
  const db = getDb();
  const overviewRows = db.prepare('SELECT key, value FROM analytics_overview').all();
  const overview = {};
  overviewRows.forEach(r => { overview[r.key] = r.value; });

  const revenueData = db.prepare('SELECT month, amount FROM revenue_data ORDER BY id').all();

  const departmentFunds = db.prepare('SELECT name as department, allocated as amount, percentage FROM departments ORDER BY id').all();

  const grievanceStats = {
    open: overview.grievancesOpen || 0,
    inProgress: overview.grievancesInProgress || 0,
    resolved: overview.grievancesResolved || 0,
  };

  const serviceDelivery = {
    averageResolutionDays: overview.averageResolutionDays || 0,
    satisfactionRate: overview.satisfactionRate || 0,
    digitalAdoption: overview.digitalAdoption || 0,
  };

  res.json({
    overview: {
      totalCitizens: overview.totalCitizens || 0,
      fundsDistributed: overview.fundsDistributed || 0,
      grievancesResolved: overview.grievancesResolved || 0,
      schemesActive: overview.schemesActive || 0,
    },
    revenueData,
    departmentFunds,
    grievanceStats,
    serviceDelivery,
  });
};

const getBlockchainData = (req, res) => {
  const db = getDb();
  const transactions = db.prepare(
    'SELECT hash, block_number as block, scheme, amount, beneficiary, status, timestamp FROM blockchain_transactions ORDER BY id'
  ).all();
  res.json({ transactions, total: transactions.length });
};

const getHeatmap = (req, res) => {
  const db = getDb();
  const states = db.prepare('SELECT state, funds, beneficiaries, intensity FROM heatmap_data ORDER BY id').all();
  res.json({ states });
};

const classifyGrievances = (req, res) => {
  const db = getDb();
  const categories = db.prepare(
    'SELECT name, count, priority, avg_resolution as avgResolution FROM grievance_categories ORDER BY id'
  ).all();
  const recent = db.prepare(
    'SELECT g.id, g.title, u.name as citizen, g.category, g.status, g.date FROM grievances g LEFT JOIN users u ON g.user_id = u.id ORDER BY g.date DESC LIMIT 4'
  ).all();
  res.json({ categories, recent });
};

const getRevenueTrends = (req, res) => {
  const db = getDb();
  const monthly = db.prepare(
    'SELECT month, disbursed, beneficiaries, schemes_count as schemes FROM revenue_data ORDER BY id'
  ).all();
  const schemeDistribution = db.prepare(
    'SELECT scheme, percentage FROM scheme_distribution ORDER BY id'
  ).all();
  res.json({ monthly, schemeDistribution });
};

module.exports = { getAnalytics, getBlockchainData, getHeatmap, classifyGrievances, getRevenueTrends };
