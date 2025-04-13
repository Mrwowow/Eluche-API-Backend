const express = require('express');
const { processorValidationRules, validateRequest } = require('../middleware/validation'); 
const { registerProcessor } = require('../controllers/processorController'); 

const router = express.Router();


router.post('/register', validateRequest(processorValidationRules), registerProcessor);

module.exports = router;