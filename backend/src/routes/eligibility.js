const express = require('express');
const router = express.Router();
const { checkEligibility } = require('../controllers/eligibilityController');
router.get('/check', checkEligibility);
module.exports = router;
