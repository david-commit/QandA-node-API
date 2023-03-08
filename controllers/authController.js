const { check, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcrypt')

// ====> Register controller & Validation
const registerUser = async (req, res) => {
  const { full_name, email, phone, role, password, questions } = req.body;
  // Validate the input request
  const errors = validationResult(req);
  
  // Chech for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    }); 
  }
  
  // Check if user exists
  const userExists = await user.findUnique({
    where: {
      email,
    },
  });
  
  // Avoiding duplicate users by checking emails
  if (userExists) {
    return res.status(400).json({ msg: 'Email has been taken' });
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Send to DB
  const createUser = await user.create({
    data: { full_name, email, phone, role, password: hashedPassword, questions },
  });

  res.json(createUser);
};
const registerUserValidation = [
  check('full_name', 'Name must be more than 3 characters')
    .trim()
    .isLength({ min: 3 }),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must contain more than 6 characters').isLength({
    min: 6,
  }),
  check('role', 'Please state your role in/to the community').isLength({
    min: 2,
  }),
];

// ====> Login controller & Validation
const userLogin = (req, res) => {
  const { email, password } = req.body;
  // Validate the input request
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array()
    })
  }

  // Validate if user exist
  const userExists = user.findUnique({
    where: {
      email
    }
  })
  if (!userExists) {
    res.status(400).json({
      msg: "User does not exist"
    })
  }

  res.json({
    message: "You're logging in a user",
  });
};
const userLoginValidation = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must contain more than 6 characters').isLength({
    min: 6,
  }),
];

// ====> Post question controller & Validation
const postQuestion = (req, res) => {
  res.json({
    message: "You're posting a question",
  });
};

// ====> Delete question controller & Validation
const deleteQuestion = (req, res) => {
  res.json({
    message: "You're deteting a question",
  });
};

// ====> Post answer controller & Validation
const postAnswer = (req, res) => {
  res.json({
    message: "You're posting an answer to a question",
  });
};

// ====> Update answer controller & Validation
const updateAnswer = (req, res) => {
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
