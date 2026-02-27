const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getBalance, getTransactions, addFunds, makePayment } = require('../controllers/walletController');
const authMiddleware = require('../middleware/auth');

const walletLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/balance', walletLimiter, authMiddleware, getBalance);
router.get('/transactions', walletLimiter, authMiddleware, getTransactions);
router.post('/add-funds', walletLimiter, authMiddleware, addFunds);
router.post('/pay', walletLimiter, authMiddleware, makePayment);

module.exports = router;
