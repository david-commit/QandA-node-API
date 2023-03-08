const express = require('express')
const router = express.Router()
const {
  getQuestions,
  getQuestion,
  getTest,
  postQuestion,
} = require('../controllers/routesController');

router.post('/questions', postQuestion);
router.get('/questions', getQuestions)
router.get('/questions/:id', getQuestion)
router.get('/test', getTest)

module.exports = router