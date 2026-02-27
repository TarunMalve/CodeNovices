const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { checkEligibility } = require('../controllers/eligibilityController');

const eligibilityLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/check', eligibilityLimiter, checkEligibility);
module.exports = router;
