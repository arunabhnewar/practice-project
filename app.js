// External imports
const express = require('express');
const cors = require('cors');


//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');



// express app initialization
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Security middleware initialization
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());

//Request Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);



// module exports
module.exports = app;