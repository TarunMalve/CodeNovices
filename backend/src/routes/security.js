const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getSessions, toggleMFA } = require('../controllers/securityController');
const authMiddleware = require('../middleware/auth');

const securityLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });

router.get('/sessions', securityLimiter, authMiddleware, getSessions);
router.post('/mfa/toggle', securityLimiter, authMiddleware, toggleMFA);
module.exports = router;
