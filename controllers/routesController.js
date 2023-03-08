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

  res.json(newQuestion);
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

const getQuestion = (req, res) => {
  res.json({
    id: 1,
    user_id: 1,
    question:
      'What is the average experience needed to be a Principal Software Engineer?',
    answers: [
      {
        id: 1,
        user_id: 2,
        answer: "I'd say 5 years on the job",
      },
      {
        id: 2,
        user_id: 3,
        answer: "I'd say 5 years on the job",
      },
      {
        id: 3,
        user_id: 2,
        answer: 'Correction, Indeed suggests 7 years',
      },
    ],
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
      questions: true
    }
  })
  res.json(users)
}

module.exports = { getQuestions, getQuestion, getTest, postQuestion };
