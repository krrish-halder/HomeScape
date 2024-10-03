const City = require('../../models/City');
const District = require('../../models/District');

// Add a new city
exports.addCity = async (req, res) => {
    const { city_name, pincode, district_id } = req.body;

    try {
        const district = await District.findById(district_id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }

        const newCity = new City({ city_name, pincode, district: district_id });
        await newCity.save();
        res.status(201).json({ message: 'City added successfully', city: newCity });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get cities by district
exports.getCitiesByDistrict = async (req, res) => {
    try {
        const cities = await City.find({ district: req.params.district_id }).populate('district', 'district_name');
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all cities (optional, for admin view)
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('district', 'district_name');
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
