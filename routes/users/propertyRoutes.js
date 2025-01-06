const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const propertyController = require('../../controllers/Users/propertyController');

router.get('/', propertyController.getProperties);     // Get all properties
router.get('/:id', propertyController.getPropertyById);    // Get property by ID

router.post('/', protect, propertyController.createProperty);    // Create a new property
router.put('/:id', protect, propertyController.updateProperty);    // Update a property

router.delete('/:id', protect, propertyController.deleteProperty);    // Delete a property

module.exports = router;