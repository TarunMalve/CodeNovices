const getBills = (req, res) => {
  res.json({
    bills: [
      { id: 'ELEC001', type: 'Electricity', provider: 'BESCOM', consumerNo: 'BES7823456', amount: 2340, dueDate: '2024-02-15', status: 'Unpaid', units: 210 },
      { id: 'WAT001', type: 'Water', provider: 'BWSSB', consumerNo: 'BWS9012345', amount: 456, dueDate: '2024-02-20', status: 'Unpaid', units: 18 },
      { id: 'PROP001', type: 'Property Tax', provider: 'BBMP', consumerNo: 'BBP1234567', amount: 8900, dueDate: '2024-03-31', status: 'Unpaid', units: null },
    ]
  });
};

const payBill = (req, res) => {
  const { billId, amount } = req.body;
  res.json({ success: true, transactionId: `TXN${Date.now()}`, billId, amount, message: 'Payment successful', timestamp: new Date().toISOString() });
};

const getUsage = (req, res) => {
  res.json({
    electricity: [
      { month: 'Aug', units: 185 }, { month: 'Sep', units: 210 }, { month: 'Oct', units: 195 },
      { month: 'Nov', units: 220 }, { month: 'Dec', units: 265 }, { month: 'Jan', units: 210 },
    ],
    water: [
      { month: 'Aug', kl: 15 }, { month: 'Sep', kl: 18 }, { month: 'Oct', kl: 16 },
      { month: 'Nov', kl: 17 }, { month: 'Dec', kl: 19 }, { month: 'Jan', kl: 18 },
    ],
  });
};

module.exports = { getBills, payBill, getUsage };
