const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { check, validationResult } = require('express-validator');

// ====> Post question controller & Validation
const postQuestion = async (req, res) => {
  const { question, user_id } = req.body;

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  // Throw error id user doesnt exist
  if (!userExists) {
    return res.status(400).json({
      msg: 'User id does not exist',
    });
  }

  // Create question
  const newQuestion = await prisma.question.create({
    data: {
      question,
      user_id,
    },
  });

  res.status(200).json(newQuestion);
};

const getQuestions = async (req, res) => {
  const questions = await prisma.question.findMany({
    select: {
      id: true,
      question: true,
      user_id: true,
      answers: true,
    },
  });
  res.json(questions);
};

const getQuestion = async (req, res) => {
  const { q_id } = req.params;

  // Find single question
  const question = await prisma.question.findUnique({
    where: {
      id: parseInt(q_id),
    },
    select: {
      id: true,
      question: true,
      created_at: true,
      user_id: true,
      answers: true,
    },
  });

  if (!question) {
    return res.status(400).json({
      msg: 'Question does not exist',
    });
  }

  res.json(question);
};

// ====> Delete question controller & Validation
const deleteQuestion = async (req, res) => {
  const { q_id } = req.params;

  // Check if user is authenticated

  // Find question by ID
  const question = await prisma.question.findUnique({
    where: {
      id: parseInt(q_id),
    },
  });

  // Check if question exists
  if (!question) {
    return res.status(400).json({
      msg: 'Question does not exist',
    });
  }

  // Proceed to delete
  await prisma.question.delete({
    where: {
      id: parseInt(q_id),
    },
  });

  res.json({
    msg: 'Question deleted successfully',
  });
};

// ====> Post answer controller & Validation
const postAnswer = async (req, res) => {
  // Grab question ID from params
  const { q_id } = req.params;
  const { answer, question_id, created_at } = req.body;
  // Validate the input request
  const errors = validationResult(req);

  //  Check if the question exists
  let question = await prisma.question.findUnique({
    where: {
      id: parseInt(q_id),
    },
  });

  if (!question) {
    return res.status(400).json({
      msg: 'Question does not exist',
    });
  }

  const newAnswer = await prisma.answer.create({
    data: { answer, question_id: q_id, created_at },
  });

  res.json(newAnswer);
};
const postAnswerValidation = [
  check('answer', 'Name must be more than 3 characters')
    .trim()
    .isLength({ min: 3 }),
];

// ====> Update answer controller & Validation
const updateAnswer = (req, res) => {
  const errors = validationResult(req);

  res.json({
    message: "You're editing an answer to a question",
  });
};
const updateAnswerValidation = [
  check('full_name', 'Name must be more than 3 characters')
    .trim()
    .isLength({ min: 3 }),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must contain more than 6 characters').isLength({
    min: 6,
  }),
  check('role', 'Please stste your role in/to the community').isLength({
    min: 2,
  }),
];

// ====> Delete answer controller & Validation
const deleteAnswer = (req, res) => {
  res.json({
    message: "You're deleting an answer to a question",
  });
};

const getTest = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      full_name: true,
      email: true,
      phone: true,
      role: true,
      questions: true,
    },
  });
  res.json(users);
};

module.exports = {
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
};
