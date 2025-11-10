const jwt = require('jsonwebtoken');

exports.generateToken =(userId, extra = {}) => {
  return jwt.sign({ id: userId , ...extra}, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};