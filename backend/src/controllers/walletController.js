const { getDb } = require('../database/db');

const getBalance = (req, res) => {
  const db = getDb();
  const wallet = db.prepare('SELECT * FROM wallets WHERE user_id = ?').get(req.user.id);
  if (!wallet) {
    return res.json({ balance: 0, currency: 'INR', accountNumber: 'N/A', lastUpdated: new Date().toISOString() });
  }
  res.json({
    balance: wallet.balance,
    currency: wallet.currency,
    accountNumber: wallet.account_number,
    lastUpdated: new Date().toISOString(),
  });
};

const getTransactions = (req, res) => {
  const db = getDb();
  const transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC').all(req.user.id);
  res.json({ transactions, total: transactions.length });
};

module.exports = { getBalance, getTransactions };
