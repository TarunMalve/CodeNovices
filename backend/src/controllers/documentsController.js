const { getDb } = require('../database/db');

const uploadDocument = (req, res) => {
  const { documentType, fileName } = req.body;
  const db = getDb();
  const docId = `DOC${Date.now()}`;
  const uploadedAt = new Date().toISOString();
  const userId = req.user ? req.user.id : null;
  db.prepare(
    'INSERT INTO documents (id, user_id, type, file_name, uploaded_at, verified, category) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(docId, userId, documentType || 'General', fileName || 'document.pdf', uploadedAt, 0, 'General');
  res.json({
    success: true,
    documentId: docId,
    documentType: documentType || 'General',
    fileName: fileName || 'document.pdf',
    ocrExtracted: {
      name: 'Rajesh Kumar Sharma',
      dateOfBirth: '1990-05-15',
      documentNumber: `${documentType === 'Aadhaar' ? '9876 5432 1098' : 'ABCDE1234F'}`,
      address: 'Flat 302, Sector 15, Noida, Uttar Pradesh - 201301',
    },
    uploadedAt,
  });
};

const listDocuments = (req, res) => {
  const db = getDb();
  const userId = req.user ? req.user.id : null;
  const documents = userId
    ? db.prepare('SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC').all(userId)
    : db.prepare('SELECT * FROM documents ORDER BY uploaded_at DESC').all();
  const mapped = documents.map(d => ({
    id: d.id,
    type: d.type,
    fileName: d.file_name,
    uploadedAt: d.uploaded_at,
    verified: !!d.verified,
    category: d.category,
  }));
  res.json({ documents: mapped });
};

module.exports = { uploadDocument, listDocuments };
