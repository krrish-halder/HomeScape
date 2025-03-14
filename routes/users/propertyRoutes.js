const express = require('express');
const router = express.Router();
const { protect, optionalAuth } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/multerMiddleware');
const propertyController = require('../../controllers/Users/propertyController');

router.get('/manage-properties', protect, propertyController.getUserProperties); // Get properties listed by the logged-in user
router.get('/get-property-types', propertyController.getPropertyTypes);    // Get all property types
router.get('/', optionalAuth, propertyController.getProperties);     // Get all properties
router.get('/:id', optionalAuth, propertyController.getPropertyById);    // Get property by ID

router.post('/', protect, upload.array('images', 10), propertyController.createProperty);    // Create a new property

router.put('/:id', protect, propertyController.updateProperty);    // Update a property
router.delete('/:id', protect, propertyController.deleteProperty);    // Delete a property

router.post('/upload-images', protect, upload.array('images', 10), propertyController.uploadImages); // Upload up to 10 images

module.exports = router;