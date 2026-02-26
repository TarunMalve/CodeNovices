const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { verifyLand } = require('../controllers/landController');

const landLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/verify', landLimiter, verifyLand);
module.exports = router;
