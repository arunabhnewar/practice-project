// External imports
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            },
            message: 'Invalid email address',
        },
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (mobile) {

                if (mobile.length !== 11) {
                    return false;
                } else {
                    return true;
                }
            },
        },
    },
    address: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 64,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true, versionKey: false });


const User = mongoose.model('User', userSchema);


// module exports
module.exports = User;