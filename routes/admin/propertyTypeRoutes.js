const express = require('express');
const router = express.Router();
const propertyTypeController = require('../../controllers/Admin/propertyTypeController');

router.get('/', propertyTypeController.getAllPropertyTypes);
router.post('/', propertyTypeController.addPropertyType);
router.put('/:id', propertyTypeController.updatePropertyType);
router.delete('/:id', propertyTypeController.deletePropertyType);

module.exports = router;
