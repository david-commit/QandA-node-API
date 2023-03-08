const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

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
    answers: true
  }
 })
 res.json(questions)
};

const getQuestion = async (req, res) => {
  const { q_id } = req.params

  // Find single question
  const questionExists = await prisma.question.findUnique({
    where: {
      id: parseInt(q_id),
    },
    select: {
      id: true,
      question: true,
      created_at: true,
      user_id: true,
      answers: true
    },
  });

  if (!questionExists) {
    return res.status(400).json({
      msg: "Question does not exist"
    })
  }
  
  res.json(questionExists);
};

const getTest = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true, 
      full_name: true,
      email: true, 
      phone: true,
      role: true,
      questions: true
    }
  })
  res.json(users)
}

module.exports = { getQuestions, getQuestion, getTest, postQuestion };
