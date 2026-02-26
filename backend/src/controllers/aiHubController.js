const { getDb } = require('../database/db');

const getRecommendations = (req, res) => {
  const db = getDb();
  const userId = req.user.id;

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  const transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC').all(userId);
  const dbtStatuses = db.prepare('SELECT * FROM dbt_statuses WHERE user_id = ?').all(userId);
  const schemes = db.prepare('SELECT * FROM schemes').all();

  const enrolledSchemeNames = dbtStatuses.map(d => d.scheme);
  const unenrolledSchemes = schemes.filter(s => !enrolledSchemeNames.includes(s.name));

  const recommendations = unenrolledSchemes.map(scheme => ({
    schemeId: scheme.id,
    name: scheme.name,
    description: scheme.description,
    benefit: scheme.benefit,
    matchReason: scheme.occupation_match
      ? `Matches your profile for ${scheme.occupation_match} occupation`
      : 'Based on your income and transaction profile',
    confidence: Math.round(60 + ((scheme.id * 7 + userId * 3) % 30)),
  }));

  res.json({
    model: { name: 'GovAI Recommender', version: '1.0.0', type: 'rule-based' },
    userId,
    userName: user ? user.name : 'Unknown',
    recommendations,
    transactionSummary: {
      totalTransactions: transactions.length,
      totalCredits: transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0),
      totalDebits: transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0),
    },
    generatedAt: new Date().toISOString(),
  });
};

module.exports = { getRecommendations };
