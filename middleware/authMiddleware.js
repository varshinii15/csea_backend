const { verifyToken } = require('../utils/tokenUtils.js');

const authMiddleware = (req, res, next) => {
  const authHeader = (req.headers.authorization || req.headers.Authorization || '').trim();

  // Expect "Bearer <token>"
  const [scheme, token] = authHeader.split(' ');

  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // { id, role, iat, exp }
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;