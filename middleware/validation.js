const { body, validationResult } = require('express-validator');

/**
 * Middleware to validate request data
 * @param {Array} validations - Array of validation rules
 * @returns {Function} - Middleware function
 */
const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run validation rules
    await Promise.all(validations.map(validation => validation.run(req)));

    // Extract validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors.array(),
      });
    }

    next(); 
  };
};

/**
 * Validation rules for Farmer Registration
 */
const farmerValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('farmName').notEmpty().withMessage('Farm name is required'),
  body('farmSize').isFloat({ min: 0.1 }).withMessage('Farm size must be a positive number'),
  body('farmType').isIn(['crop', 'livestock', 'mixed', 'other']).withMessage('Invalid farm type'),
  body('farmAddress').notEmpty().withMessage('Farm address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('region').notEmpty().withMessage('Region is required'),
  body('country').notEmpty().withMessage('Country is required'),
];

/**
 * Validation rules for Processor Registration
 */
const processorValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('facilityName').notEmpty().withMessage('Facility name is required'),
  body('processingType').isIn(['grains', 'dairy', 'meat', 'fruits', 'vegetables', 'other']).withMessage('Invalid processing type'),
  body('processingCapacity').isFloat({ min: 0.1 }).withMessage('Processing capacity must be a positive number'),
  body('facilityAddress').notEmpty().withMessage('Facility address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('region').notEmpty().withMessage('Region is required'),
  body('country').notEmpty().withMessage('Country is required'),
];

/**
 * Validation rules for Distributor Registration
 */
const distributorValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('distributionType').isIn(['local', 'regional', 'national', 'international']).withMessage('Invalid distribution type'),
  body('productsDistributed').notEmpty().withMessage('Products distributed are required'),
  body('businessAddress').notEmpty().withMessage('Business address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('region').notEmpty().withMessage('Region is required'),
  body('country').notEmpty().withMessage('Country is required'),
];

/**
 * Export validation utilities
 */
module.exports = {
  validateRequest,
  farmerValidationRules,
  processorValidationRules,
  distributorValidationRules,
};