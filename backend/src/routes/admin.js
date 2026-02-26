const express = require('express');
const router = express.Router();
const { getAnalytics, getBlockchainData, getHeatmap, classifyGrievances, getRevenueTrends } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.get('/analytics', authMiddleware, getAnalytics);
router.get('/blockchain', authMiddleware, getBlockchainData);
router.get('/heatmap', authMiddleware, getHeatmap);
router.get('/grievance/classify', authMiddleware, classifyGrievances);
router.get('/revenue-trends', authMiddleware, getRevenueTrends);

module.exports = router;
