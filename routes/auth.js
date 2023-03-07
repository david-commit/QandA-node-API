const express = require('express');
const router = express.Router();
const { postQuestion } = require('../controllers/authController')

router.post('/', postQuestion);

module.exports = router;
