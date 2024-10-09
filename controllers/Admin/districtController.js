const District = require('../../models/District');
const State = require('../../models/State');


exports.getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find().populate('state', 'state_name');
        res.status(200).json(districts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDistrictsByState = async (req, res) => {
    try {
        const districts = await District.find({ state: req.params.state_id }).populate('state', 'state_name');
        res.status(200).json(districts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addDistrict = async (req, res) => {
    const { district_name, state_id } = req.body;

    try {
        const state = await State.findById(state_id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        const newDistrict = new District({ district_name, state: state_id });
        await newDistrict.save();
        res.status(201).json({ message: 'District added successfully', district: newDistrict });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDistrict = async (req, res) => {
    const { district_name, state_id } = req.body;
    const { id } = req.params;

    try {
        const district = await District.findById(id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }

        const state = await State.findById(state_id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        district.district_name = district_name;
        district.state = state_id;
        await district.save();
        res.status(200).json({ message: 'District updated successfully', district });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteDistrict = async (req, res) => {
    const { id } = req.params;
    try {
        const district = await District.findById(id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }
        await District.deleteOne({ _id: id });
        res.status(200).json({ message: 'District deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}