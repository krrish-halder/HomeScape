const express = require('express');
const router = express.Router();
const cityController = require('../../controllers/Admin/cityController');

router.get('/:district_id', cityController.getCitiesByDistrict);
router.get('/', cityController.getAllCities);
router.post('/', cityController.addCity);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);  

module.exports = router;
