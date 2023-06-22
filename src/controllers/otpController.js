// External imports
const createError = require('http-errors');



// Internal imports
const OTP = require('../models/otp');
const timeGenerate = require('../helpers/timeGenerate');
const sendEmail = require('../helpers/sendMail');


// send otp controller
const sendOTP = async (req, res, next) => {
    try {
        // create random otp number 
        let randomOtp = Math.floor(100000 + Math.random() * 900000);

        // create otp object
        const otpObj = {
            email: req?.body['email'],
            otp: randomOtp,
            expireIn: timeGenerate(),
        };

        // otp object save in db
        const newOtp = new OTP(otpObj);
        const result = await newOtp?.save();


        // send otp to user via email
        if (result?._id && typeof result === 'object') {
            const mailText = `
            <h3>Your OTP is <strong>${randomOtp}<strong>. Expires in 3 minutes.</h3>
            `;

            // email info
            const mailInfo = { emailReceivers: [result?.email], emailText: mailText, emailSubject: `Verify your OTP` };

            // send otp into user email
            const sendOTPMail = sendEmail(mailInfo);

            // Response after sending mail
            if (sendOTPMail?.messageId) {
                res.status(200).json({
                    status: "success", data: result, message: "OTP was sent"
                })
            }

        } else {
            res.status(400).json({
                status: "failed", data: "Internal server error!!"
            })
        }

    } catch (err) {
        next(createError(400, err.message))
    }
};


// verify otp
const verifyOTP = async (req, res, next) => {
    try {
        // otp query
        const query = { email: req?.body?.email, otp: req?.body?.otp };
        const filterOTP = await OTP.findOne(query);


        // checking otp status
        if (filterOTP?.status === true) {
            return next(createError(401, 'OTP already used'))
        };


        // verify otp
        if (filterOTP?._id && (filterOTP?.expireIn > Date.now()) && filterOTP?.status == false) {

            const result = await OTP.findOneAndUpdate(query, { $set: { status: true } }, { new: true });

            res.status(200).json({
                status: "success", data: result
            })
        } else {
            next(createError(400, "Your OTP has expired. Please try again."));
        }

    } catch (err) {
        next(createError(400, err.message))
    }
};


// Module exports
module.exports = { sendOTP, verifyOTP };