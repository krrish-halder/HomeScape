const express = require('express');
const router = express.Router();
const districtController = require('../../controllers/Admin/districtController');

router.get('/:state_id', districtController.getDistrictsByState);
router.get('/', districtController.getAllDistricts);
router.post('/', districtController.addDistrict);
router.put('/:id', districtController.updateDistrict);
router.delete('/:id', districtController.deleteDistrict);

module.exports = router;

