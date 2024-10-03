const express = require('express');
const router = express.Router();
const districtController = require('../../controllers/admin/districtController');

router.post('/district', districtController.addDistrict);
router.get('/districts/:state_id', districtController.getDistrictsByState);

module.exports = router;
