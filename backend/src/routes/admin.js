const express = require('express');
const router = express.Router();
const { getAnalytics, getBlockchainData } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.get('/analytics', authMiddleware, getAnalytics);
router.get('/blockchain', authMiddleware, getBlockchainData);

module.exports = router;
