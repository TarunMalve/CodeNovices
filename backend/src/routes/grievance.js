const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createGrievance, listGrievances, classifyGrievance } = require('../controllers/grievanceController');
const authMiddleware = require('../middleware/auth');
const { validateGrievance } = require('../middleware/validation');

const grievanceLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.post('/create', grievanceLimiter, authMiddleware, validateGrievance, createGrievance);
router.get('/list', grievanceLimiter, authMiddleware, listGrievances);
router.post('/classify', grievanceLimiter, classifyGrievance);

module.exports = router;
