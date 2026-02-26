const express = require('express');
const router = express.Router();
const { uploadDocument, listDocuments } = require('../controllers/documentsController');
const authMiddleware = require('../middleware/auth');
router.post('/upload', authMiddleware, uploadDocument);
router.get('/list', authMiddleware, listDocuments);
module.exports = router;
