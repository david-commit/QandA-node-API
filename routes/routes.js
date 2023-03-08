const express = require('express')
const router = express.Router()
const {
  getQuestions,
  getQuestion,
  getTest,
  postQuestion,
  deleteQuestion,
} = require('../controllers/routesController');

router.get('/questions', getQuestions)
router.get('/questions/:q_id', getQuestion)
router.post('/questions', postQuestion);
router.delete('/questions/:q_id', deleteQuestion);
router.get('/test', getTest)

module.exports = router