const mongoose = require('mongoose');


const stateSchema = new mongoose.Schema({
    state_name: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('State', stateSchema);