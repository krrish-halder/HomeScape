const District = require('../../models/District');
const State = require('../../models/State');


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


exports.getDistrictsByState = async (req, res) => {
    try {
        const districts = await District.find({ state: req.params.state_id }).populate('state', 'state_name');
        res.status(200).json(districts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
