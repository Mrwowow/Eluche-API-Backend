const express = require('express');
const { authenticate } = require('../middleware/authMiddleware'); 
const consumerController = require('../controllers/consumerController');

const router = express.Router();

router.post('/create', authenticate, consumerController.createConsumerProfile);
router.get('/', authenticate, consumerController.queryConsumerProfiles);
router.put('/update', authenticate, consumerController.updateConsumerProfile);
router.delete('/delete', authenticate, consumerController.deleteConsumerProfile);

module.exports = router;