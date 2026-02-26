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

const getHeatmap = (req, res) => {
  res.json({
    states: [
      { state: 'Uttar Pradesh', funds: 85000, beneficiaries: 125000, intensity: 90 },
      { state: 'Maharashtra', funds: 72000, beneficiaries: 98000, intensity: 78 },
      { state: 'Bihar', funds: 45000, beneficiaries: 89000, intensity: 65 },
      { state: 'Rajasthan', funds: 38000, beneficiaries: 56000, intensity: 55 },
      { state: 'Madhya Pradesh', funds: 42000, beneficiaries: 67000, intensity: 60 },
      { state: 'Gujarat', funds: 55000, beneficiaries: 72000, intensity: 70 },
      { state: 'Karnataka', funds: 48000, beneficiaries: 61000, intensity: 63 },
      { state: 'West Bengal', funds: 35000, beneficiaries: 78000, intensity: 58 },
      { state: 'Tamil Nadu', funds: 52000, beneficiaries: 68000, intensity: 68 },
      { state: 'Telangana', funds: 29000, beneficiaries: 42000, intensity: 45 },
    ]
  });
};

const classifyGrievances = (req, res) => {
  res.json({
    categories: [
      { name: 'Financial/DBT', count: 1245, priority: 'High', avgResolution: 3.2 },
      { name: 'Document Verification', count: 876, priority: 'Medium', avgResolution: 5.1 },
      { name: 'Scheme Application', count: 654, priority: 'High', avgResolution: 4.8 },
      { name: 'Technical Issues', count: 432, priority: 'Low', avgResolution: 2.1 },
      { name: 'Corruption/Fraud', count: 123, priority: 'Critical', avgResolution: 7.5 },
      { name: 'Infrastructure', count: 345, priority: 'Medium', avgResolution: 8.2 },
    ],
    recent: [
      { id: 'GRV001', title: 'Delayed DBT Payment', citizen: 'Ramesh Kumar', category: 'Financial/DBT', priority: 'High', status: 'Resolved', date: '2024-01-15' },
      { id: 'GRV002', title: 'Aadhaar Linking Issue', citizen: 'Sunita Devi', category: 'Document Verification', priority: 'Medium', status: 'In Progress', date: '2024-01-14' },
      { id: 'GRV003', title: 'PM Awas Application Rejected', citizen: 'Mohan Lal', category: 'Scheme Application', priority: 'High', status: 'Open', date: '2024-01-13' },
      { id: 'GRV004', title: 'Portal Login Error', citizen: 'Priya Sharma', category: 'Technical Issues', priority: 'Low', status: 'Resolved', date: '2024-01-12' },
    ]
  });
};

const getRevenueTrends = (req, res) => {
  res.json({
    monthly: [
      { month: 'Aug 2023', disbursed: 4200, beneficiaries: 12400, schemes: 38 },
      { month: 'Sep 2023', disbursed: 5800, beneficiaries: 15600, schemes: 40 },
      { month: 'Oct 2023', disbursed: 4900, beneficiaries: 13200, schemes: 39 },
      { month: 'Nov 2023', disbursed: 7200, beneficiaries: 18900, schemes: 42 },
      { month: 'Dec 2023', disbursed: 6800, beneficiaries: 17100, schemes: 41 },
      { month: 'Jan 2024', disbursed: 9100, beneficiaries: 22300, schemes: 47 },
    ],
    schemeDistribution: [
      { scheme: 'PM Kisan', percentage: 28 },
      { scheme: 'Ayushman Bharat', percentage: 22 },
      { scheme: 'PM Awas', percentage: 18 },
      { scheme: 'MNREGA', percentage: 15 },
      { scheme: 'Scholarship', percentage: 10 },
      { scheme: 'Others', percentage: 7 },
    ],
  });
};

module.exports = { getAnalytics, getBlockchainData, getHeatmap, classifyGrievances, getRevenueTrends };
