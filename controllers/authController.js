const { check, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const SECRET = process.env.SECRET;

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
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Avoiding duplicate users by checking emails
  if (userExists) {
    return res.status(400).json({ msg: 'Email has been taken' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create token
  const token = await JWT.sign(
    {
      email,
    },
    SECRET,
    {
      expiresIn: '24h', // expires in 24 hours
    }
  );

  // Send to DB
  const newUser = await prisma.user.create({
    data: {
      full_name,
      email,
      phone,
      role,
      password: hashedPassword,
      questions,
    },
  });

  return res.json({ newUser, token });
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
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // Validate the input request
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  // Validate if user exists
  const userExists = prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Throw error if user doesnt exist on login attempt
  if (!userExists) {
    res.status(400).json({
      msg: 'Invaid email or password',
    });
  }

  // Compare incoming & stored password
  const matchedPassword = bcrypt.compare(password, userExists.password);

  // Throw error is passwords dont match
  if (!matchedPassword) {
    return res.status(400).json({
      error: {
        msg: 'Invalid email or password',
      },
    });
  }

  const token = JWT.sign({ email }, SECRET, { expiresIn: '24h' });

  res.json({ token });
};
const userLoginValidation = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must contain more than 6 characters').isLength({
    min: 6,
  }),
];

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
  // postQuestion,
  deleteQuestion,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  registerUserValidation,
  userLoginValidation,
  updateAnswerValidation,
};
