const express = require('express')
const router = express.Router()
const { getQuestions } = require('../controllers/routesController')

router.get('/questions', getQuestions)

module.exports = router