const express = require('express');
const router = express.Router();
const cityController = require('../../controllers/Admin/cityController');

// Admin route to add a city
router.post('/city', cityController.addCity);

// Admin route to get cities by district
router.get('/cities/:district_id', cityController.getCitiesByDistrict);

// Optional: Admin route to get all cities
router.get('/cities', cityController.getAllCities);


module.exports = router;
