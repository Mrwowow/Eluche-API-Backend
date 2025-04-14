const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'default_fallback_secret';
/**
 * Generate a JWT Token.
 * @param {object} payload - Data to include in the token.
 * @returns {string} - Generated JWT token.
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

/**
 * Verify a JWT Token.
 * @param {string} token - JWT token to verify.
 * @returns {object} - Decoded token payload.
 */
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };