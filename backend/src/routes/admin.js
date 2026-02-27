const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getAnalytics, getBlockchainData, getHeatmap, classifyGrievances, getRevenueTrends } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/analytics', adminLimiter, authMiddleware, getAnalytics);
router.get('/blockchain', adminLimiter, authMiddleware, getBlockchainData);
router.get('/heatmap', adminLimiter, authMiddleware, getHeatmap);
router.get('/grievance/classify', adminLimiter, authMiddleware, classifyGrievances);
router.get('/revenue-trends', adminLimiter, authMiddleware, getRevenueTrends);

module.exports = router;
