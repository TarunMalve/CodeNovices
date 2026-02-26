const { getDb } = require('../database/db');

const verifyLand = (req, res) => {
  const { surveyNumber, district, state } = req.query;
  if (!surveyNumber) {
    return res.status(400).json({ error: 'Survey number is required' });
  }
  const db = getDb();
  let record = db.prepare('SELECT * FROM land_records WHERE survey_number = ?').get(surveyNumber);
  if (!record) {
    // Return a dynamically generated record for unknown survey numbers
    return res.json({
      surveyNumber: surveyNumber,
      ownerName: 'Record Not Found',
      fatherName: 'N/A',
      area: 'N/A',
      landType: 'Unknown',
      district: district || 'Unknown',
      state: state || 'Unknown',
      registrationDate: null,
      taxStatus: 'Unknown',
      lastTaxPaid: 'N/A',
      blockchainHash: null,
      verified: false,
    });
  }
  res.json({
    surveyNumber: record.survey_number,
    ownerName: record.owner_name,
    fatherName: record.father_name,
    area: record.area,
    landType: record.land_type,
    district: record.district,
    state: record.state,
    registrationDate: record.registration_date,
    taxStatus: record.tax_status,
    lastTaxPaid: record.last_tax_paid,
    blockchainHash: record.blockchain_hash,
    verified: !!record.verified,
  });
};

module.exports = { verifyLand };
