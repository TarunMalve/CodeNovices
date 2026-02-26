const uploadDocument = (req, res) => {
  const { documentType, fileName } = req.body;
  res.json({
    success: true,
    documentId: `DOC${Date.now()}`,
    documentType: documentType || 'General',
    fileName: fileName || 'document.pdf',
    ocrExtracted: {
      name: 'Rajesh Kumar Sharma',
      dateOfBirth: '1990-05-15',
      documentNumber: `${documentType === 'Aadhaar' ? '9876 5432 1098' : 'ABCDE1234F'}`,
      address: 'Flat 302, Sector 15, Noida, Uttar Pradesh - 201301',
    },
    uploadedAt: new Date().toISOString(),
  });
};

const listDocuments = (req, res) => {
  res.json({
    documents: [
      { id: 'DOC001', type: 'Aadhaar Card', fileName: 'aadhaar.pdf', uploadedAt: '2024-01-10', verified: true, category: 'Identity' },
      { id: 'DOC002', type: 'PAN Card', fileName: 'pan_card.pdf', uploadedAt: '2024-01-11', verified: true, category: 'Identity' },
      { id: 'DOC003', type: 'Income Certificate', fileName: 'income_cert.pdf', uploadedAt: '2024-01-12', verified: false, category: 'Income' },
      { id: 'DOC004', type: 'Caste Certificate', fileName: 'caste_cert.pdf', uploadedAt: '2024-01-13', verified: true, category: 'Identity' },
      { id: 'DOC005', type: 'Land Records', fileName: 'land_record.pdf', uploadedAt: '2024-01-14', verified: false, category: 'Property' },
      { id: 'DOC006', type: 'Birth Certificate', fileName: 'birth_cert.pdf', uploadedAt: '2024-01-15', verified: true, category: 'Identity' },
      { id: 'DOC007', type: 'Degree Certificate', fileName: 'degree.pdf', uploadedAt: '2024-01-16', verified: false, category: 'Education' },
      { id: 'DOC008', type: 'Ration Card', fileName: 'ration_card.pdf', uploadedAt: '2024-01-17', verified: true, category: 'Welfare' },
    ]
  });
};

module.exports = { uploadDocument, listDocuments };
