const express = require('express')
const router = express.Router()
const {
  getQuestions,
  getQuestion
} = require('../controllers/routesController');

router.get('/questions', getQuestions)
router.get('/questions/:id', getQuestion)

module.exports = router