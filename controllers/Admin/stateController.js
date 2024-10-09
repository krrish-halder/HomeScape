const State = require('../../models/State');


exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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

exports.updateState = async (req, res) => {
    const { state_name } = req.body;
    const { id } = req.params;

    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        state.state_name = state_name;
        await state.save();
        res.status(200).json({ message: 'State updated successfully', state });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteState = async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        await State.deleteOne({ _id: id });
        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}