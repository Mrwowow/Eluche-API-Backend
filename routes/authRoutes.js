const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.get('/verify', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;











// const express = require('express');
// const { body } = require('express-validator');
// const { register } = require('../controllers/authController'); 
// const { validateRequest } = require('../middleware/validation');

// const router = express.Router();

// router.post('/register', validateRequest([
//   body('email').isEmail().withMessage('Invalid email format'),
//   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//   body('firstName').notEmpty().withMessage('First name is required'),
//   body('lastName').notEmpty().withMessage('Last name is required'),
//   body('role').notEmpty().withMessage('Role is required'),
// ]), register);

// module.exports = router;