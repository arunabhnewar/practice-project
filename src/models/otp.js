// External imports
const mongoose = require('mongoose');


const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
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
        type: Date,
        required: true,
    },
}, { timestamps: true });



const OTP = mongoose.model('otp', otpSchema);


// Module Export
module.exports = OTP;