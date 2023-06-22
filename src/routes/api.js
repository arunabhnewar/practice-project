// External imports
const express = require('express');



// Internal imports
const { userRegister, userLogin, getUserDetails, updateProfile } = require('../controllers/userController');
const authVerifyMiddleware = require('../middlewares/authVerifyMiddleware');


const router = express.Router();


/*==== before login routes==== */

// user register
router.post('/register', userRegister);

// user login
router.post('/login', userLogin);



/*==== after login routes ==== */

// user profile details
router.get('/profile-details', authVerifyMiddleware, getUserDetails);

// user profile update
router.post('/profile-update', authVerifyMiddleware, updateProfile);

// module exports
module.exports = router;

