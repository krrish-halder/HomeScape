const Wishlist = require('../../models/Wishlist');

// Toggle Wishlist
exports.toggleWishlist = async (req, res) => {
    try {
        const { property_id } = req.body;
        const user_id = req.user._id;

        if (!property_id) {
            return res.status(400).json({ message: 'Property ID is required.' });
        }

        const existingWishlist = await Wishlist.findOne({ user_id, property_id });

        if (existingWishlist) {
            await Wishlist.deleteOne({ user_id, property_id });
            return res.status(200).json({ message: 'Property removed from wishlist.' });
        }

        const wishlist = new Wishlist({ user_id, property_id });
        await wishlist.save();

        return res.status(201).json({ message: 'Property added to wishlist.', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle wishlist.', error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const user_id = req.user._id;

        const wishlist = await Wishlist.find({ user_id }).populate({
            path: 'property_id',
            populate: [
                { path: 'user_id', select: '-password' }, 
                { path: 'state_id' },
                { path: 'district_id' },
                { path: 'city_id' },
                { path: 'property_type_id' },
            ],
        });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wishlist.', error: error.message });
    }
};
