const User = require('../../models/User');

// User pfofile
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -__v -role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
    }
}

// Update user profile
exports.updateMe = async (req, res) => {
    try {
        const { name, username, state_id, district_id, city_id } = req.body;
        const updateData = { name, username, state_id, district_id, city_id };

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user details', error: error.message });
    }
}

// Get user properties
exports.getUserProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('properties');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.properties);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user properties', error: error.message });
    }
}