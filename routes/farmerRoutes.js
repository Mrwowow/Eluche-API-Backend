const express = require('express');
const { farmerValidationRules, validateRequest } = require('../middleware/validation');
const { registerFarmer } = require('../controllers/farmerController'); 

const router = express.Router();
router.post('/register', validateRequest(farmerValidationRules), registerFarmer);

module.exports = router;

