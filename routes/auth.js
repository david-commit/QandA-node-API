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
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/questions', postQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post(' /questions/:id/answers', postAnswer);
router.put('/questions/:id/answers/:id', updateAnswer);
router.delete('/questions/:id/answers/:id', deleteAnswer);

module.exports = router;
