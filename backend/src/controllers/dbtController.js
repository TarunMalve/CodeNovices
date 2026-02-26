const getDBTStatus = (req, res) => {
  const dbtStatuses = [
    {
      id: 'DBT001',
      scheme: 'PM Kisan Samman Nidhi',
      amount: 6000,
      status: 'Disbursed',
      blockchainHash: '0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b',
      timeline: [
        { stage: 'Applied', date: '2024-01-01', completed: true },
        { stage: 'Verified', date: '2024-01-05', completed: true },
        { stage: 'Approved', date: '2024-01-10', completed: true },
        { stage: 'Disbursed', date: '2024-01-15', completed: true },
      ],
    },
    {
      id: 'DBT002',
      scheme: 'Pradhan Mantri Awas Yojana',
      amount: 250000,
      status: 'Verified',
      blockchainHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
      timeline: [
        { stage: 'Applied', date: '2024-01-10', completed: true },
        { stage: 'Verified', date: '2024-01-18', completed: true },
        { stage: 'Approved', date: null, completed: false },
        { stage: 'Disbursed', date: null, completed: false },
      ],
    },
    {
      id: 'DBT003',
      scheme: 'LPG Subsidy',
      amount: 2500,
      status: 'Disbursed',
      blockchainHash: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b',
      timeline: [
        { stage: 'Applied', date: '2024-01-02', completed: true },
        { stage: 'Verified', date: '2024-01-04', completed: true },
        { stage: 'Approved', date: '2024-01-08', completed: true },
        { stage: 'Disbursed', date: '2024-01-10', completed: true },
      ],
    },
    {
      id: 'DBT004',
      scheme: 'National Scholarship Portal',
      amount: 3000,
      status: 'Pending',
      blockchainHash: null,
      timeline: [
        { stage: 'Applied', date: '2024-01-20', completed: true },
        { stage: 'Verified', date: null, completed: false },
        { stage: 'Approved', date: null, completed: false },
        { stage: 'Disbursed', date: null, completed: false },
      ],
    },
  ];
  res.json({ dbtStatuses, total: dbtStatuses.length });
};

module.exports = { getDBTStatus };
