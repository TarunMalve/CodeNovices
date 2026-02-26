const express = require('express');
const router = express.Router();
const { getSessions, toggleMFA } = require('../controllers/securityController');
const authMiddleware = require('../middleware/auth');
router.get('/sessions', authMiddleware, getSessions);
router.post('/mfa/toggle', authMiddleware, toggleMFA);
module.exports = router;
