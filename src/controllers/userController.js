// External imports
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');


// Internal imports
const User = require('../models/user');
const sendEmail = require('../helpers/sendMail');


// user register controller
const userRegister = async (req, res, next) => {

    let userId;

    try {
        // user password encrypted
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // new user create
        const newUser = await new User({
            ...req.body,
            password: hashPassword,
        });

        const result = await newUser.save();
        userId = result._id;

        // send verification link after create a user
        if (result?._id && typeof result === 'object') {

            // email info
            const mailInfo = { emailReceivers: [result?.email], emailText: `Verify this link => http://localhost:3000/api/v1/verifyUser/${result?._id}`, emailSubject: `Verify your account` };

            // send a verification link
            const mailVerificationLink = await sendEmail(mailInfo);

            // Response after sending mail
            if (mailVerificationLink?.messageId) {
                res.status(200).json({
                    status: "success", data: result, message: "Verification link was send"
                })
            } else {
                next(createError(500, "User was not created. Please try again"));
            }

        } else {
            res.status(400).json({
                status: "failed", data: "Internal server error!!"
            })
        }

    } catch (err) {
        if (err.message.includes(`E11000 duplicate key error collection`)) {
            next(createError(409, `User already exists`))
        } else {
            await User.findByIdAndDelete(userId);
            next(createError(400, err.message));
        }
    }
};


// Verify email controller
const verifyEmail = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const user = await User.findOne({ _id }, { isVerified: 1 });

        if (user?.isVerified) {
            res.status(200).json({
                message: "User already verified",
            });
        } else {
            const updateUser = await User.findOneAndUpdate({ _id }, { $set: { isVerified: true } }, { new: true });

            if (updateUser?._id && updateUser.isVerified) {
                res.status(200).json({
                    status: "updated", data: updateUser
                })
            } else {
                next(createError(400, "User could not verified"))
            }
        }

    } catch (err) {
        next(createError(400, err.message));
    }
}


// user login controller
const userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && user._id) {
            const matchedPassword = await bcrypt.compare(req.body.password, user.password)

            if (matchedPassword) {
                // create token
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: user
                }, `${process.env.JWT_SECRET}`);

                // send response after creating token
                res.status(200).json({
                    status: "success", token
                });

            } else {
                next(createError(404, "User not found"));
            }
        }

    } catch (err) {
        next(createError(400, err.message));
    }
}


// profile controller
const getUserDetails = async (req, res, next) => {
    try {
        // query
        const query = { email: req?.email };

        // projection
        const projection = { _id: 0, "password": 0, "isVerified": 0, "createdAt": 0, "updatedAt": 0 };

        // find user
        const user = await User.findOne(query, projection);

        // 
        if (user.email && typeof user === 'object') {
            res.status(200).json({
                status: "success", data: user
            });

        } else {
            next(createError(400, "Internal server error"));
        }

    } catch (err) {
        next(createError(404, err.message));
    }
};



// profile update controller
const updateProfile = async (req, res, next) => {

    try {
        // query
        const email = req?.email;
        // return console.log(email);
        const { username, address } = req.body;

        // update user
        const user = await User.updateOne({ email }, { $set: { username: username, address: address } }, { upsert: true, new: true });

        if (!user) {
            res.status(400).json({
                status: "failed", data: "User update failed!!"
            });
        } else {
            res.status(200).json({ status: "success", data: user })
        }

    } catch (err) {

        next(createError(404, err.message));
    }
}





// Module exports
module.exports = { userRegister, userLogin, getUserDetails, updateProfile, verifyEmail };