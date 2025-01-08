const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const propertyController = require('../../controllers/Users/propertyController');

router.get('/manage-properties', protect, propertyController.getUserProperties); // Get properties listed by the logged-in user
router.get('/get-property-types', propertyController.getPropertyTypes);    // Get all property types
router.get('/', propertyController.getProperties);     // Get all properties
router.get('/:id', propertyController.getPropertyById);    // Get property by ID

router.post('/', protect, propertyController.createProperty);    // Create a new property

router.put('/:id', protect, propertyController.updateProperty);    // Update a property
router.delete('/:id', protect, propertyController.deleteProperty);    // Delete a property


module.exports = router;