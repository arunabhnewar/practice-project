// External imports
const express = require('express');
const { userRegister } = require('../controllers/userController');
const router = express.Router();



// user register
router.post('/register', userRegister);



// module exports
module.exports = router;

