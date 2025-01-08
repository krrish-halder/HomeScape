const express = require('express');
const router = express.Router();
const locationController = require('../../controllers/Users/locationController');

// Get all states
router.get('/states', locationController.getStates);

// Get districts by state ID
router.get('/districts/:stateId', locationController.getDistrictsByState);

// Get cities by district ID
router.get('/cities/:districtId', locationController.getCitiesByDistrict);

module.exports = router;
