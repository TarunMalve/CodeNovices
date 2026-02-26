const { getDb } = require('../database/db');

const getBills = (req, res) => {
  const db = getDb();
  const userId = req.user ? req.user.id : null;
  const bills = userId
    ? db.prepare('SELECT * FROM bills WHERE user_id = ? ORDER BY due_date').all(userId)
    : db.prepare('SELECT * FROM bills ORDER BY due_date').all();
  const mapped = bills.map(b => ({
    id: b.id,
    type: b.type,
    provider: b.provider,
    consumerNo: b.consumer_no,
    amount: b.amount,
    dueDate: b.due_date,
    status: b.status,
    units: b.units,
  }));
  res.json({ bills: mapped });
};

const payBill = (req, res) => {
  const { billId, amount } = req.body;
  const db = getDb();
  db.prepare('UPDATE bills SET status = ? WHERE id = ?').run('Paid', billId);
  res.json({ success: true, transactionId: `TXN${Date.now()}`, billId, amount, message: 'Payment successful', timestamp: new Date().toISOString() });
};

const getUsage = (req, res) => {
  const db = getDb();
  const userId = req.user ? req.user.id : null;
  const elecRows = userId
    ? db.prepare("SELECT month, value as units FROM usage_data WHERE type = 'electricity' AND user_id = ? ORDER BY id").all(userId)
    : db.prepare("SELECT month, value as units FROM usage_data WHERE type = 'electricity' ORDER BY id").all();
  const waterRows = userId
    ? db.prepare("SELECT month, value as kl FROM usage_data WHERE type = 'water' AND user_id = ? ORDER BY id").all(userId)
    : db.prepare("SELECT month, value as kl FROM usage_data WHERE type = 'water' ORDER BY id").all();
  res.json({ electricity: elecRows, water: waterRows });
};

module.exports = { getBills, payBill, getUsage };
