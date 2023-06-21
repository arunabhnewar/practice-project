// External imports
const express = require('express');

// Internal imports
const { userRegister, userLogin } = require('../controllers/userController');



const router = express.Router();


// user register
router.post('/register', userRegister);

// user login
router.post('/login', userLogin);


// module exports
module.exports = router;

