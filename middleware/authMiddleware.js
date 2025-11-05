const { verifyToken } = require('../utils/tokenUtils');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using your JWT secret
    const decoded = verifyToken(token);

    // Attach decoded user info to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;