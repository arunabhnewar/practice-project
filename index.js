// External imports
const dotenv = require('dotenv');
dotenv.config();


// Internal imports
const app = require('./app');
const connectDatabase = require('./src/db/database');


// connect db
connectDatabase();


// create server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});