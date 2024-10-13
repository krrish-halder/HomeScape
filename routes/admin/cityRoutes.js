const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const cityController = require('../../controllers/Admin/cityController');

router.get('/:district_id',protect, adminOnly, cityController.getCitiesByDistrict);
router.get('/',protect, adminOnly, cityController.getAllCities);
router.post('/',protect, adminOnly, cityController.addCity);
router.put('/:id',protect, adminOnly, cityController.updateCity);
router.delete('/:id',protect, adminOnly, cityController.deleteCity);  

module.exports = router;
