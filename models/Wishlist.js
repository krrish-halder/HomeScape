const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Wishlist', wishlistSchema);