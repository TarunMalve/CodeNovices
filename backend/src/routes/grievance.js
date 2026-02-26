const express = require('express');
const router = express.Router();
const { createGrievance, listGrievances } = require('../controllers/grievanceController');
const authMiddleware = require('../middleware/auth');
const { validateGrievance } = require('../middleware/validation');

router.post('/create', authMiddleware, validateGrievance, createGrievance);
router.get('/list', authMiddleware, listGrievances);

module.exports = router;
