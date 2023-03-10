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
router.get('/questions/:q_id', getQuestion);
router.post('/questions', checkAuth, postQuestionValidation, postQuestion);
router.delete('/questions/:q_id', checkAuth, deleteQuestion);
router.post(
  '/questions/:q_id/answers',
  checkAuth,
  postAnswerValidation,
  postAnswer
);
router.put(
  '/questions/:q_id/answers/:a_id',
  checkAuth,
  updateAnswerValidation,
  updateAnswer
);
router.delete('/questions/:q_id/answers/:a_id', checkAuth, deleteAnswer);
router.get('/test', getTest);

module.exports = router;
