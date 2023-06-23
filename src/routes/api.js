// External imports
const express = require('express');



// Internal imports
const { userRegister, userLogin, getUserDetails, updateProfile, verifyEmail } = require('../controllers/userController');
const authVerifyMiddleware = require('../middlewares/authVerifyMiddleware');
const { sendOTP, verifyOTP } = require('../controllers/otpController');
const { createNewTask, deleteTask } = require('../controllers/taskController');


const router = express.Router();



// user register
router.post('/register', userRegister);
router.get('/verifyUser/:id', verifyEmail);

// user login
router.post('/login', userLogin);



// user profile details
router.get('/profile-details', authVerifyMiddleware, getUserDetails);

// user profile update
router.post('/profile-update', authVerifyMiddleware, updateProfile);

// send otp
router.post('/send-otp', sendOTP);

// verify otp
router.post('/otp-verify', verifyOTP);

// add new task
router.post('/add-task', authVerifyMiddleware, createNewTask);

// delete a task
router.post('/delete-task/:id', authVerifyMiddleware, deleteTask);

// module exports
module.exports = router;

