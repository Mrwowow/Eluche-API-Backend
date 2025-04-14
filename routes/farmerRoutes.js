const express = require('express');
const { farmerValidationRules, validateRequest } = require('../middleware/validation');
const { authenticate } = require('../middleware/authMiddleware');
const { registerFarmer } = require('../controllers/farmerController'); 

const router = express.Router();
router.post('/register', authenticate, registerFarmer);

module.exports = router;

