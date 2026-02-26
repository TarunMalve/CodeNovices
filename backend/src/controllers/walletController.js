const getBalance = (req, res) => {
  res.json({
    balance: 45250.75,
    currency: 'INR',
    accountNumber: 'XXXX-XXXX-4521',
    lastUpdated: new Date().toISOString(),
  });
};

const getTransactions = (req, res) => {
  const transactions = [
    { id: 'TXN001', type: 'credit', amount: 6000, description: 'PM Kisan Samman Nidhi', date: '2024-01-15', status: 'completed', category: 'DBT' },
    { id: 'TXN002', type: 'credit', amount: 2500, description: 'LPG Subsidy', date: '2024-01-10', status: 'completed', category: 'DBT' },
    { id: 'TXN003', type: 'debit', amount: 1200, description: 'Insurance Premium', date: '2024-01-08', status: 'completed', category: 'Payment' },
    { id: 'TXN004', type: 'credit', amount: 15000, description: 'MNREGA Wages', date: '2024-01-05', status: 'completed', category: 'DBT' },
    { id: 'TXN005', type: 'debit', amount: 500, description: 'Utility Bill', date: '2024-01-03', status: 'completed', category: 'Payment' },
    { id: 'TXN006', type: 'credit', amount: 3000, description: 'Scholarship Payment', date: '2023-12-28', status: 'pending', category: 'DBT' },
  ];
  res.json({ transactions, total: transactions.length });
};

module.exports = { getBalance, getTransactions };
