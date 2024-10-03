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
});

module.exports = mongoose.model('City', citySchema);
