const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getHealthScore } = require('../controllers/healthScoreController');
const authMiddleware = require('../middleware/auth');

const healthScoreLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/', healthScoreLimiter, authMiddleware, getHealthScore);

module.exports = router;
