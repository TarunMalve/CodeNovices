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

const APPROVED_CATEGORIES = {
  electricity: 'State Power Board',
  water: 'Municipal Corp',
  property_tax: 'City Council',
  professional_tax: 'Professional Tax',
  national_tax: 'National Taxes',
  land_tax: 'Land Revenue',
  piped_gas: 'Gas Authority',
};

const addFunds = (req, res) => {
  const { amount } = req.body;
  if (!amount || typeof amount !== 'number' || amount <= 0 || amount > 10000000) {
    return res.status(400).json({ error: 'Valid amount is required (max ₹1,00,00,000)' });
  }
  const db = getDb();
  const wallet = db.prepare('SELECT * FROM wallets WHERE user_id = ?').get(req.user.id);
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  const newBalance = wallet.balance + amount;
  db.prepare('UPDATE wallets SET balance = ? WHERE user_id = ?').run(newBalance, req.user.id);
  res.json({ balance: newBalance, message: 'Funds added successfully' });
};

const makePayment = (req, res) => {
  const { amount, category, description } = req.body;
  if (!amount || typeof amount !== 'number' || amount <= 0 || !category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Valid amount and category are required' });
  }
  if (!APPROVED_CATEGORIES[category]) {
    return res.status(403).json({
      error: 'Payment rejected. GovPay Wallet funds are restricted to government-approved payments only.',
      approvedCategories: Object.keys(APPROVED_CATEGORIES),
    });
  }
  const db = getDb();
  const wallet = db.prepare('SELECT * FROM wallets WHERE user_id = ?').get(req.user.id);
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  if (wallet.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  const newBalance = wallet.balance - amount;
  const date = new Date().toISOString().split('T')[0];
  const txnDescription = description || `${APPROVED_CATEGORIES[category]} Payment`;

  const updateAndInsert = db.transaction(() => {
    const txnCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
    const txnId = `TXN${String(txnCount + 1).padStart(3, '0')}`;
    db.prepare('UPDATE wallets SET balance = ? WHERE user_id = ?').run(newBalance, req.user.id);
    db.prepare(
      'INSERT INTO transactions (id, user_id, type, amount, description, date, status, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(txnId, req.user.id, 'debit', amount, txnDescription, date, 'completed', 'Payment');
    return txnId;
  });
  const txnId = updateAndInsert();

  res.json({ balance: newBalance, transactionId: txnId, message: 'Payment processed successfully' });
};

module.exports = { getBalance, getTransactions, addFunds, makePayment };
