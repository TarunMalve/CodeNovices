const verifyLand = (req, res) => {
  const { surveyNumber, district, state } = req.query;
  if (!surveyNumber) {
    return res.status(400).json({ error: 'Survey number is required' });
  }
  const mockData = {
    surveyNumber: surveyNumber || 'SY-2024-001',
    ownerName: 'Rajesh Kumar Sharma',
    fatherName: 'Ram Prasad Sharma',
    area: '2.5 acres',
    landType: 'Agricultural',
    district: district || 'Nashik',
    state: state || 'Maharashtra',
    registrationDate: '2018-03-15',
    taxStatus: 'Paid',
    lastTaxPaid: '₹4,500 (FY 2023-24)',
    blockchainHash: '0x' + Math.random().toString(16).substring(2, 42).padEnd(40, '0'),
    verified: true,
  };
  res.json(mockData);
};

module.exports = { verifyLand };
