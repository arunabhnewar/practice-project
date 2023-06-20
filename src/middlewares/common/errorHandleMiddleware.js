// External imports
const createError = require('http-errors');


// 404 not found handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Sorry! Your requested content is not found!!'));
};


// default error handler
const errorHandler = (err, req, res, next) => {

    if (res.headersSent) {
        return next(err);

    } else {
        const status = res.status !== 200 ? res.status : 500;

        if (err.message) {
            res.status(status).json({
                status: "Failed",
                data: err.message
            });
        } else {
            res.status(status).json({
                status: "Failed",
                data: "Internal server error"
            });
        }
    }
};


// module exports
module.exports = { notFoundHandler, errorHandler };