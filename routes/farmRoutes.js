const express = require('express');
const { authenticate } = require('../middleware/authMiddleware'); 
const farmController = require('../controllers/farmController');

const router = express.Router();

router.post('/create', authenticate, farmController.createFarm);
router.get('/', authenticate, farmController.getFarms);
router.put('/update', authenticate, farmController.updateFarm);
router.delete('/delete', authenticate, farmController.deleteFarm);

module.exports = router;