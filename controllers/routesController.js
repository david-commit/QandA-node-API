const { PrismaClient } = require('@prisma/client');
const { user, question, answer } = new PrismaClient

const getTest = async (req, res) => {
  const users = await user.findMany({
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

const getQuestions = async (req, res) => {
 const questions = await question.findMany({
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

module.exports = { getQuestions, getQuestion, getTest };
