const registerUser = (req, res) => {
  res.json({
    message: "You're registering a new user",
  });
};
const userLogin = (req, res) => {
  res.json({
    message: "You're logging in a user",
  });
};
const postQuestion = (req, res) => {
  res.json({
    message: "You're posting a question",
  });
};
const deleteQuestion = (req, res) => {
  res.json({
    message: "You're deteting a question",
  });
};
const postAnswer = (req, res) => {
  res.json({
    message: "You're posting an answer to a question",
  });
};
const updateAnswer = (req, res) => {
  res.json({
    message: "You're editing an answer to a question",
  });
};
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
};
