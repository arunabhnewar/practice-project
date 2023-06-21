// External imports
const mongoose = require('mongoose');


const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (email) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            },
            message: 'Invalid email address',
        },
    },
    otp: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    expireIn: {
        type: Number,
        required: true,
    },
}, { timestamps: true });



const OTP = mongoose.model('otp', otpSchema);


// Module Export
module.exports = OTP;