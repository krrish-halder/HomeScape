const User = require('../../models/User');
const Property = require('../../models/Property');
const State = require('../../models/State');
const City = require('../../models/City');
const District = require('../../models/District');

exports.getStats = async (req, res) => {
    try {
        // Fetching statistics data
        const totalUsers = await User.countDocuments();
        const totalProperties = await Property.countDocuments();
        const totalStates = await State.countDocuments();
        const totalCities = await City.countDocuments();
        const totalDistricts = await District.countDocuments();

        // Returning statistics
        res.status(200).json({
            totalUsers,
            totalProperties,
            totalStates,
            totalCities,
            totalDistricts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard statistics', error: error.message });
    }
};
