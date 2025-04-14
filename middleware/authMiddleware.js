const { verifyToken } = require('../utils/jwt');
const { formatError } = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(formatError('Authentication token is missing or invalid.'));
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = verifyToken(token); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json(formatError('Invalid or expired token.'));
  }
}

module.exports = { authenticate };