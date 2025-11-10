const { verifyToken } = require('../utils/tokenUtils.js');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

 const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);
    req.user = payload; // { id, role? }
    next();
  } catch(err){
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;