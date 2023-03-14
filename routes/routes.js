const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  getTest,
  postQuestion,
  deleteQuestion,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  updateAnswerValidation,
  postAnswerValidation,
  postQuestionValidation,
} = require('../controllers/routesController');
const checkAuth = require('../middleware/checkAuth');

router.get('/questions', getQuestions);
router.get('/questions/:questionId', getQuestion);
router.post('/questions', checkAuth, postQuestionValidation, postQuestion);
router.delete('/questions/:questionId', checkAuth, deleteQuestion);
router.post(
  '/questions/:questionId/answers',
  checkAuth,
  postAnswerValidation,
  postAnswer
);
router.put(
  '/questions/:questionId/answers/:answerId',
  checkAuth,
  updateAnswerValidation,
  updateAnswer
);
router.delete('/questions/:questionId/answers/:answerId', checkAuth, deleteAnswer);
router.get('/test', getTest);

module.exports = router;
