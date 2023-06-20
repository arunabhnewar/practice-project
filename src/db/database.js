// External imports
const mongoose = require('mongoose');


// connect to db
const connectDatabase = () => {
    mongoose.connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database connected successfully!!");
        })
        .catch((err) => {

        });
};


// module exports
module.exports = connectDatabase;