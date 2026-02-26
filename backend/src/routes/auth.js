const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, register } = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation');

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

router.post('/login', authLimiter, validateLogin, login);
router.post('/register', authLimiter, validateRegister, register);

module.exports = router;
