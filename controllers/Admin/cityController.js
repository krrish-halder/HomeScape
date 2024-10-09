const City = require('../../models/City');
const District = require('../../models/District');

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

exports.getCitiesByDistrict = async (req, res) => {
    try {
        const cities = await City.find({ district: req.params.district_id }).populate('district', 'district_name');
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('district', 'district_name');
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCity = async (req, res) => {
    const { city_name, pincode, district_id } = req.body;
    const { id } = req.params;

    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        const district = await District.findById(district_id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }

        city.city_name = city_name;
        city.pincode = pincode;
        city.district = district_id;
        await city.save();
        res.status(200).json({ message: 'City updated successfully', city });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        await City.deleteOne({ _id: id });
        res.status(200).json({ message: 'City deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}