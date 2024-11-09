const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/Admin/propertyController');
const { protect, adminOnly } = require('../../middleware/authMiddleware');

router.get('/', protect, adminOnly, propertyController.getAllProperties);
router.post('/', protect, adminOnly, propertyController.createProperty);
router.get('/:id', protect, adminOnly, propertyController.getPropertyById);
router.put('/:id', protect, adminOnly, propertyController.updateProperty);
router.delete('/:id', protect, adminOnly, propertyController.deleteProperty);

module.exports = router;