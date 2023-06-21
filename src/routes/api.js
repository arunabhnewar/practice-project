// External imports
const express = require('express');

// Internal imports
const { userRegister, userLogin, getUserDetails } = require('../controllers/userController');
const authVerifyMiddleware = require('../middlewares/authVerifyMiddleware');



const router = express.Router();


// user register
router.post('/register', userRegister);

// user login
router.post('/login', userLogin);


// user profile details
router.get('/profile-details', authVerifyMiddleware, getUserDetails)


// module exports
module.exports = router;

