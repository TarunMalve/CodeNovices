const { getDb } = require('../database/db');

const checkEligibility = (req, res) => {
  const { income, age, category, state, occupation } = req.query;
  const db = getDb();
  const schemeRows = db.prepare('SELECT * FROM schemes ORDER BY id').all();
  const schemes = schemeRows.map(s => {
    let match = 20;
    let eligible = false;

    // Check occupation match
    if (s.occupation_match && occupation === s.occupation_match) {
      match = s.name === 'PM-KISAN' ? 95 : s.name === 'PM Mudra Yojana' ? 88 : s.name === 'Startup India' ? 75 : 80;
      eligible = true;
    }

    // Check income threshold
    if (s.income_threshold && Number(income) < s.income_threshold) {
      if (s.name === 'Ayushman Bharat PM-JAY') { match = 90; eligible = true; }
      else if (s.name === 'PM Awas Yojana') { match = Number(income) < 300000 ? 85 : 25; eligible = true; }
      else if (s.name === 'MNREGA') { match = Number(income) < 200000 ? 80 : 10; eligible = true; }
    }

    // Handle special cases
    if (s.eligible_occupations) {
      const eligibleOccs = s.eligible_occupations.split(',');
      if (eligibleOccs.includes(occupation)) {
        eligible = true;
      }
    }

    // Handle combined criteria (National Scholarship Portal)
    if (s.name === 'National Scholarship Portal' && occupation === 'Student' && Number(income) < (s.income_threshold || Infinity)) {
      match = 92;
      eligible = true;
    }

    // Handle Startup India special case
    if (s.name === 'Startup India' && occupation === 'Business' && Number(income) > 100000) {
      match = 75;
      eligible = true;
    }

    return {
      id: s.id,
      name: s.name,
      description: s.description,
      benefit: s.benefit,
      match,
      eligible,
    };
  });
  const sorted = schemes.sort((a, b) => b.match - a.match);
  res.json({ schemes: sorted, totalEligible: sorted.filter(s => s.eligible).length });
};

module.exports = { checkEligibility };
