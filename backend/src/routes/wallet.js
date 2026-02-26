const express = require('express');
const router = express.Router();
const { getBalance, getTransactions } = require('../controllers/walletController');
const authMiddleware = require('../middleware/auth');

router.get('/balance', authMiddleware, getBalance);
router.get('/transactions', authMiddleware, getTransactions);

module.exports = router;
