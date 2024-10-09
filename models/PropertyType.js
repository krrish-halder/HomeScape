const mongoose = require('mongoose');

const PropertyTypeSchema = new mongoose.Schema({
    property_type_name: {
        type: String,
        required: [true, 'Property type name is required'],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PropertyType', PropertyTypeSchema);
