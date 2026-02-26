const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { uploadDocument, listDocuments } = require('../controllers/documentsController');
const authMiddleware = require('../middleware/auth');

const docsLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.post('/upload', docsLimiter, authMiddleware, uploadDocument);
router.get('/list', docsLimiter, authMiddleware, listDocuments);
module.exports = router;
