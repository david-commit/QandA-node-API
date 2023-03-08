const express = require('express');
const router = express.Router();
const {
  registerUser,
  userLogin,
  registerUserValidation,
  userLoginValidation,
} = require('../controllers/authController');

router.post('/register', registerUserValidation, registerUser);
router.post('/login', userLoginValidation, userLogin);


module.exports = router;
