const getAnalytics = (req, res) => {
  res.json({
    overview: {
      totalCitizens: 1284750,
      fundsDistributed: 8420000000,
      grievancesResolved: 45230,
      schemesActive: 47,
    },
    revenueData: [
      { month: 'Aug', amount: 4200 },
      { month: 'Sep', amount: 5800 },
      { month: 'Oct', amount: 4900 },
      { month: 'Nov', amount: 7200 },
      { month: 'Dec', amount: 6800 },
      { month: 'Jan', amount: 9100 },
    ],
    departmentFunds: [
      { department: 'Agriculture', amount: 2500000000, percentage: 30 },
      { department: 'Education', amount: 1800000000, percentage: 21 },
      { department: 'Health', amount: 2100000000, percentage: 25 },
      { department: 'Infrastructure', amount: 1200000000, percentage: 14 },
      { department: 'Social Welfare', amount: 820000000, percentage: 10 },
    ],
    grievanceStats: {
      open: 1243,
      inProgress: 3421,
      resolved: 45230,
    },
    serviceDelivery: {
      averageResolutionDays: 4.2,
      satisfactionRate: 87.5,
      digitalAdoption: 76.3,
    },
  });
};

const getBlockchainData = (req, res) => {
  const transactions = [
    { hash: '0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b', block: 18945123, scheme: 'PM Kisan', amount: 6000, beneficiary: '0x742d35Cc6634C0532925a3b8D4C9D5f3b8E9A1c2', status: 'Confirmed', timestamp: '2024-01-15 10:23:45' },
    { hash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c', block: 18945089, scheme: 'PM Awas', amount: 250000, beneficiary: '0x8E3f9A2b4C6d8E0f2A4b6C8d0E2f4A6b8C0d2E4f', status: 'Confirmed', timestamp: '2024-01-14 15:45:12' },
    { hash: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b', block: 18944956, scheme: 'LPG Subsidy', amount: 2500, beneficiary: '0x3A5c7E9a1B3d5F7e9A1b3D5f7E9a1B3d5F7e9A1b', status: 'Confirmed', timestamp: '2024-01-13 09:12:33' },
    { hash: '0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e', block: 18944823, scheme: 'MNREGA', amount: 15000, beneficiary: '0x6B8d0F2a4C6e8A0b2D4f6A8c0E2b4F6a8C0e2B4f', status: 'Pending', timestamp: '2024-01-12 14:30:00' },
    { hash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b', block: 18944701, scheme: 'Scholarship', amount: 3000, beneficiary: '0x9C1e3A5b7c9d1E3f5A7b9C1e3A5b7c9d1E3f5A7b', status: 'Failed', timestamp: '2024-01-11 11:20:15' },
  ];
  res.json({ transactions, total: transactions.length });
};

module.exports = { getAnalytics, getBlockchainData };
