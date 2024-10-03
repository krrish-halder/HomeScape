const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    district_name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }
});

module.exports = mongoose.model('District', DistrictSchema);
