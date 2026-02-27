const getRecommendations = (req, res) => {
  const { income } = req.query;
  const annualIncome = Number(income) || 1000000;
  const taxableIncome = annualIncome;
  let taxBefore = 0;
  if (taxableIncome <= 250000) taxBefore = 0;
  else if (taxableIncome <= 500000) taxBefore = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000) taxBefore = 12500 + (taxableIncome - 500000) * 0.20;
  else taxBefore = 112500 + (taxableIncome - 1000000) * 0.30;

  res.json({
    income: annualIncome,
    taxBefore: Math.round(taxBefore),
    sections: [
      {
        section: '80C',
        title: 'Section 80C - Investments',
        limit: 150000,
        utilized: Math.min(annualIncome * 0.10, 150000),
        options: ['PPF', 'ELSS Mutual Fund', 'Life Insurance Premium', 'NSC', 'Tax-Saving FD'],
        description: 'Invest in PPF, ELSS, LIC and save up to ₹1.5 Lakh',
      },
      {
        section: '80D',
        title: 'Section 80D - Health Insurance',
        limit: 25000,
        utilized: 12000,
        options: ['Health Insurance Premium', 'Preventive Health Checkup'],
        description: 'Health insurance for self and family',
      },
      {
        section: '80G',
        title: 'Section 80G - Donations',
        limit: Math.round(annualIncome * 0.10),
        utilized: 5000,
        options: ['PM Relief Fund', 'National Defence Fund', 'Registered Charitable Trusts'],
        description: 'Donate to approved charities and get 50-100% deduction',
      },
      {
        section: '80CCD',
        title: 'Section 80CCD(1B) - NPS',
        limit: 50000,
        utilized: 0,
        options: ['National Pension Scheme (NPS)'],
        description: 'Additional ₹50,000 deduction for NPS investment',
      },
    ],
    estimatedSavings: Math.round(taxBefore * 0.25),
  });
};

module.exports = { getRecommendations };
