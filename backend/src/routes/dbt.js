const express = require('express');
const router = express.Router();
const { getDBTStatus } = require('../controllers/dbtController');
const authMiddleware = require('../middleware/auth');

router.get('/status', authMiddleware, getDBTStatus);

module.exports = router;
