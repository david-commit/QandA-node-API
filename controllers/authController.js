const { check, validationResult } = require('express-validator');

// Register controller & Validation
const registerUser = (req, res) => {
  const { full_name, email, phone, role, password } = req.body;
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  res.send({
    full_name: full_name,
  });
};
const registerUserValidation = [
  check('full_name').trim(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
];

// Login controller & Validation
const userLogin = (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: "You're logging in a user",
  });
};
const userLoginValidation = []

// Post question controller & Validation
const postQuestion = (req, res) => {
  res.json({
    message: "You're posting a question",
  });
};

// Delete question controller & Validation
const deleteQuestion = (req, res) => {
  res.json({
    message: "You're deteting a question",
  });
};

// Post answer controller & Validation
const postAnswer = (req, res) => {
  res.json({
    message: "You're posting an answer to a question",
  });
};

// Update answer controller & Validation
const updateAnswer = (req, res) => {
  res.json({
    message: "You're editing an answer to a question",
  });
};
const updateAnswerValidation = []

// Delee answer controller & Validation
const deleteAnswer = (req, res) => {
  res.json({
    message: "You're deleting an answer to a question",
  });
};

module.exports = {
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
};
