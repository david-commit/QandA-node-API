const express = require('express')
const router = express.Router()
const {
  getQuestions,
  getQuestion,
  getTest
} = require('../controllers/routesController');

router.get('/questions', getQuestions)
router.get('/questions/:id', getQuestion)
router.get('/test', getTest)

module.exports = router