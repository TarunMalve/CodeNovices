const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getDBTStatus } = require('../controllers/dbtController');
const authMiddleware = require('../middleware/auth');

const dbtLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/status', dbtLimiter, authMiddleware, getDBTStatus);

module.exports = router;
