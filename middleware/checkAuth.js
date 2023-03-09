const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // Grab the token from the header
  const token = req.header('Authorization');

  // Check if token is present in the header request
  if (!token) {
    return res.status(403).json({
      msg: 'Not authorized, please log in',
    });
  }

  // Verify the token against the secret
  try {
    let user = await JWT.verify(token, process.env.SECRET);
    req.user = user.email
    next()
  } catch (error) {
    return res.status(403).json({
      msg: 'Invalid token',
    });
  }
};
