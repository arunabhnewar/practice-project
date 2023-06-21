// External imports
const jwt = require('jsonwebtoken');
const createError = require('http-errors');


const authVerifyMiddleware = async (req, res, next) => {
    try {
        let token = req.headers['token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.data?._id) {
            req.email = decoded?.data?.email;
            next();
        }

    } catch (err) {
        next(createError(401, err.message))
    }
};


// module exports
module.exports = authVerifyMiddleware;