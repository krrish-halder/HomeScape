const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    city_name: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'District',
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('City', citySchema);
