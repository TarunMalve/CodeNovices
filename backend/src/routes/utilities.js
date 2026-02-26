const express = require('express');
const router = express.Router();
const { getBills, payBill, getUsage } = require('../controllers/utilitiesController');
router.get('/bills', getBills);
router.post('/pay', payBill);
router.get('/usage', getUsage);
module.exports = router;
