// External imports
const jwt = require('jsonwebtoken');
const createError = require('http-errors');



// Internal imports
const User = require('../models/user');


// user register controller
const userRegister = async (req, res, next) => {

    try {
        const userInfo = req.body;
        const newUser = new User(userInfo);
        const result = await newUser.save();

        if (result._id && typeof result === 'object') {
            res.status(200).json({
                status: "success", data: result
            })
        } else {
            res.status(400).json({
                status: "failed", data: "Internal server error!!"
            })
        }

    } catch (err) {
        if (err.message.includes(`E11000 duplicate key error collection`)) {
            next(createError(409, `User already exists`))
        } else {
            next(createError(400, err.message));
        }
    }
};



// user login controller
const userLogin = async (req, res, next) => {
    try {
        const email = req.body["email"];
        const password = req.body["password"];

        // query 
        let query = {
            email: email, password: password
        };

        // projection
        const projections = { "password": 0, "createdAt": 0, "updatedAt": 0 }

        // find user
        const existingUser = await User.findOne(query, projections);

        if (existingUser?._id && typeof existingUser === 'object') {
            // create token
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: existingUser._id
            }, `${process.env.JWT_SECRET}`);

            // send response after creating token
            res.status(200).json({
                status: "success", token
            });

        } else {
            next(createError(404, "User not found"));
        }

    } catch (err) {
        next(createError(400, err.message));
    }
}

// Module exports
module.exports = { userRegister, userLogin };