const express = require('express');
const { distributorValidationRules, validateRequest } = require('../middleware/validation');
const { registerDistributor } = require('../controllers/distributorController'); 

const router = express.Router();

router.post('/register', validateRequest(distributorValidationRules), registerDistributor);

module.exports = router;