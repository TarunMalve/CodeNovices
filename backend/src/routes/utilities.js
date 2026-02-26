const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getBills, payBill, getUsage } = require('../controllers/utilitiesController');

const utilitiesLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/bills', utilitiesLimiter, getBills);
router.post('/pay', utilitiesLimiter, payBill);
router.get('/usage', utilitiesLimiter, getUsage);
module.exports = router;
