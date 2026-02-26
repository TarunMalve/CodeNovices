const express = require('express');
const router = express.Router();
const { verifyLand } = require('../controllers/landController');
router.get('/verify', verifyLand);
module.exports = router;
