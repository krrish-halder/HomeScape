const State = require('../../models/State');

exports.addState = async (req, res) => {
    const { state_name } = req.body;

    try {
        const newState = new State({ state_name });
        await newState.save();
        res.status(201).json({ message: 'State added successfully', state: newState });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
