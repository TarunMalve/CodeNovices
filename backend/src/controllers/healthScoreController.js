const { getDb } = require('../database/db');

const getHealthScore = (req, res) => {
  const db = getDb();
  const userId = req.user.id;

  const wallet = db.prepare('SELECT * FROM wallets WHERE user_id = ?').get(userId);
  const transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ?').all(userId);
  const bills = db.prepare('SELECT * FROM bills WHERE user_id = ?').all(userId);
  const dbtStatuses = db.prepare('SELECT * FROM dbt_statuses WHERE user_id = ?').all(userId);

  // Payment punctuality (0-25): based on bills paid on time
  const totalBills = bills.length;
  const paidBills = bills.filter(b => b.status === 'Paid').length;
  // Default score of 15 for users with no bills (neutral starting point)
  const paymentHistory = totalBills > 0 ? Math.round((paidBills / totalBills) * 25) : 15;

  // Scheme utilization (0-25): based on active DBT schemes
  const disbursedSchemes = dbtStatuses.filter(d => d.status === 'Disbursed').length;
  const totalSchemes = dbtStatuses.length;
  const schemeUtilization = totalSchemes > 0 ? Math.round((disbursedSchemes / totalSchemes) * 25) : 0;

  // Transaction activity (0-25): based on transaction count
  const txnCount = transactions.length;
  const transactionActivity = Math.min(25, Math.round((txnCount / 10) * 25));

  // Wallet health (0-25): based on balance
  const balance = wallet ? wallet.balance : 0;
  const walletHealth = Math.min(25, Math.round((balance / 50000) * 25));

  const score = paymentHistory + schemeUtilization + transactionActivity + walletHealth;

  const recommendations = [];
  if (paymentHistory < 20) recommendations.push('Pay your utility bills on time to improve your score.');
  if (schemeUtilization < 15) recommendations.push('Apply for eligible government schemes to increase benefits.');
  if (transactionActivity < 15) recommendations.push('Use your GovPay Wallet for more government transactions.');
  if (walletHealth < 15) recommendations.push('Maintain a healthy wallet balance for emergencies.');

  res.json({
    score,
    breakdown: { paymentHistory, schemeUtilization, transactionActivity, walletHealth },
    recommendations,
    lastUpdated: new Date().toISOString(),
  });
};

module.exports = { getHealthScore };
