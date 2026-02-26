const express = require('express');
const router = express.Router();
const { getFundTransparency } = require('../controllers/fundTransparencyController');
router.get('/', getFundTransparency);
module.exports = router;
