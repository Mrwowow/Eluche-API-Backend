const bcrypt = require('bcrypt');

/**
 * 
 * @param {string} password 
 * @returns {Promise<string>} 
 */
async function hashPassword(password) {
  try {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Compare a plain-text password with a hashed password
 * @param {string} password - Plain-text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} - Result of comparison
 */
async function verifyPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error verifying password');
  }
}

module.exports = { hashPassword, verifyPassword };