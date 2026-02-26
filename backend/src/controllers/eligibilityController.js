const checkEligibility = (req, res) => {
  const { income, age, category, state, occupation } = req.query;
  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      description: 'Direct income support of ₹6,000/year to farmer families',
      benefit: '₹6,000/year',
      match: occupation === 'Farmer' ? 95 : 20,
      eligible: occupation === 'Farmer',
    },
    {
      id: 2,
      name: 'Ayushman Bharat PM-JAY',
      description: 'Health coverage of ₹5 lakh per family per year',
      benefit: '₹5 Lakh health cover',
      match: Number(income) < 500000 ? 90 : 30,
      eligible: Number(income) < 500000,
    },
    {
      id: 3,
      name: 'PM Mudra Yojana',
      description: 'Loans up to ₹10 lakh for non-farm income-generating activities',
      benefit: 'Loan up to ₹10 Lakh',
      match: occupation === 'Business' ? 88 : 40,
      eligible: occupation === 'Business' || occupation === 'Unemployed',
    },
    {
      id: 4,
      name: 'National Scholarship Portal',
      description: 'Merit-cum-means scholarships for higher education',
      benefit: '₹10,000 - ₹50,000/year',
      match: occupation === 'Student' && Number(income) < 800000 ? 92 : 15,
      eligible: occupation === 'Student',
    },
    {
      id: 5,
      name: 'PM Awas Yojana',
      description: 'Housing assistance for EWS/LIG families',
      benefit: '₹2.67 Lakh subsidy',
      match: Number(income) < 300000 ? 85 : 25,
      eligible: Number(income) < 600000,
    },
    {
      id: 6,
      name: 'MNREGA',
      description: '100 days guaranteed wage employment per year',
      benefit: '₹221/day guaranteed',
      match: Number(income) < 200000 ? 80 : 10,
      eligible: Number(income) < 300000,
    },
    {
      id: 7,
      name: 'Startup India',
      description: 'Tax benefits and funding for registered startups',
      benefit: '3-year tax exemption',
      match: occupation === 'Business' && Number(income) > 100000 ? 75 : 20,
      eligible: occupation === 'Business',
    },
  ];
  const sorted = schemes.sort((a, b) => b.match - a.match);
  res.json({ schemes: sorted, totalEligible: sorted.filter(s => s.eligible).length });
};

module.exports = { checkEligibility };
