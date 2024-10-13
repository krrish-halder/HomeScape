const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const districtController = require('../../controllers/Admin/districtController');

router.get('/:state_id', protect, adminOnly, districtController.getDistrictsByState);
router.get('/', protect, adminOnly, districtController.getAllDistricts);
router.post('/', protect, adminOnly, districtController.addDistrict);
router.put('/:id', protect, adminOnly, districtController.updateDistrict);
router.delete('/:id', protect, adminOnly, districtController.deleteDistrict);

module.exports = router;

