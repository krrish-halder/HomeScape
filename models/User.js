const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State', 
        default: null, 
    },
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District', 
        default: null, 
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City', 
        default: null, 
    },
    profile_photo: {
        type: String,
        default: null,
    },

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;