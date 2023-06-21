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



// Module exports
module.exports = { userRegister };