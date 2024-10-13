const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const propertyTypeController = require('../../controllers/Admin/propertyTypeController');

router.get('/', protect, adminOnly, propertyTypeController.getAllPropertyTypes);
router.post('/', protect, adminOnly, propertyTypeController.addPropertyType);
router.put('/:id', protect, adminOnly, propertyTypeController.updatePropertyType);
router.delete('/:id', protect, adminOnly, propertyTypeController.deletePropertyType);

module.exports = router;
