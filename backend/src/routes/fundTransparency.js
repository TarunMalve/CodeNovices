const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getFundTransparency } = require('../controllers/fundTransparencyController');

const fundLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/', fundLimiter, getFundTransparency);
module.exports = router;
