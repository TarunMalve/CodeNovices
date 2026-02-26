const getFundTransparency = (req, res) => {
  res.json({
    totalBudget: 5000000000000,
    totalAllocated: 4800000000000,
    totalDistributed: 4250000000000,
    departments: [
      { name: 'Agriculture & Farmers', allocated: 1200000000000, distributed: 1150000000000, schemes: 8 },
      { name: 'Education', allocated: 950000000000, distributed: 880000000000, schemes: 12 },
      { name: 'Health & Family Welfare', allocated: 1050000000000, distributed: 980000000000, schemes: 7 },
      { name: 'Infrastructure & Roads', allocated: 800000000000, distributed: 710000000000, schemes: 5 },
      { name: 'Social Welfare', allocated: 600000000000, distributed: 560000000000, schemes: 9 },
      { name: 'Women & Child Development', allocated: 400000000000, distributed: 370000000000, schemes: 6 },
    ],
    recentTransactions: [
      { hash: '0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b', scheme: 'PM Kisan', amount: 600000000, state: 'Uttar Pradesh', date: '2024-01-15' },
      { hash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c', scheme: 'PM Awas Yojana', amount: 25000000000, state: 'Rajasthan', date: '2024-01-14' },
      { hash: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b', scheme: 'Ayushman Bharat', amount: 15000000000, state: 'Bihar', date: '2024-01-13' },
    ],
  });
};

module.exports = { getFundTransparency };
