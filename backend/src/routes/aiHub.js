const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getRecommendations } = require('../controllers/aiHubController');
const authMiddleware = require('../middleware/auth');

const aiHubLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/recommendations', aiHubLimiter, authMiddleware, getRecommendations);

module.exports = router;
