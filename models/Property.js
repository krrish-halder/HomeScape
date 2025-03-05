const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    square_ft: { type: Number, required: true },
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
    selling_type: { type: String, enum: ['sale', 'rent'], required: true },
    property_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyType', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);