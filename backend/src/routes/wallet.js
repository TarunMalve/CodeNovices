const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getBalance, getTransactions } = require('../controllers/walletController');
const authMiddleware = require('../middleware/auth');

const walletLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/balance', walletLimiter, authMiddleware, getBalance);
router.get('/transactions', walletLimiter, authMiddleware, getTransactions);

module.exports = router;
