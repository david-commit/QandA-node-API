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
    return res.status(404).json({
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
      created_at: true,
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
    return res.status(404).json({
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
    return res.status(404).json({
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

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  //  Check if the question exists
  let question = await prisma.question.findUnique({
    where: {
      id: parseInt(q_id),
    },
  });

  if (!question) {
    return res.status(404).json({
      msg: 'Question does not exist',
    });
  }

  const newAnswer = await prisma.answer.create({
    data: { answer, question_id: parseInt(q_id), created_at },
  });

  res.json(newAnswer);
};
const postAnswerValidation = [
  check('answer', 'Name must be more than 5 characters')
    .trim()
    .isLength({ min: 5 }),
];

// ====> Update answer controller & Validation
const updateAnswer = async (req, res) => {
  const errors = validationResult(req);
  const { answer } = req.body;
  const { a_id } = req.params;

  // Validate the response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Find email by ID, Proceed to update record
  const editAnswer = await prisma.answer.update({
    where: {
      id: parseInt(a_id),
    },
    data: {
      answer,
    },
  });

  res.json(editAnswer);
};
const updateAnswerValidation = [
  check('answer', 'Answer must be a more than 5 characters').isLength({
    min: 5,
  }),
];

// ====> Delete answer controller & Validation
const deleteAnswer = async (req, res) => {
  const { a_id } = req.params;

  // Check if answer exists
  const answerExists = await prisma.answer.findUnique({
    where: {
      id: parseInt(a_id),
    },
  });

  // Throw error if it doesnt exist
  if (!answerExists) {
    return res.status(404).json({
      msg: 'Answer does not exist',
    });
  }

  // Proceed to delete
  await prisma.answer.delete({
    where: {
      id: parseInt(a_id),
    },
  });

  res.json({
    msg: 'Answer deleted succesfully',
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
