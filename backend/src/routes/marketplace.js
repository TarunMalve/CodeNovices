const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getProducts } = require('../controllers/marketplaceController');

const marketplaceLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.get('/products', marketplaceLimiter, getProducts);

module.exports = router;
