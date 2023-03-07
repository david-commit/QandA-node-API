const express = require('express');
const router = express.Router();
const {
  registerUser,
  userLogin,
  postQuestion,
  deleteQuestion,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  registerUserValidation,
  userLoginValidation,
  updateAnswerValidation,
} = require('../controllers/authController');

router.post('/register', registerUserValidation, registerUser);
router.post('/login', userLoginValidation, userLogin);
router.post('/questions', postQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post(' /questions/:id/answers', postAnswer);
router.put('/questions/:id/answers/:id', updateAnswerValidation, updateAnswer);
router.delete('/questions/:id/answers/:id', deleteAnswer);

module.exports = router;
