const State = require('../../models/State');
const District = require('../../models/District');
const City = require('../../models/City');

// Get all states
exports.getStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch states', error: error.message });
    }
};

// Get districts by state ID
exports.getDistrictsByState = async (req, res) => {
    const { stateId } = req.params;
    try {
        const districts = await District.find({ state: stateId });
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch districts', error: error.message });
    }
};

// Get cities by district ID
exports.getCitiesByDistrict = async (req, res) => {
    const { districtId } = req.params;
    try {
        const cities = await City.find({ district: districtId });
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
    }
};
