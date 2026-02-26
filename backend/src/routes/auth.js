const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validation');

router.post('/login', validateLogin, login);
router.post('/register', register);

module.exports = router;
