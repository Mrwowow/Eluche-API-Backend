const pool = require('../config/db'); 
const { generateToken } = require('../utils/jwt'); 
const { verifyPassword } = require('../utils/bcrypt');
const { formatError } = require('../utils/response'); 


async function login(req, res) {
  const { email, password } = req.body;

  try {
    const sql = `SELECT id, email, password_hash, stakeholder_type FROM users WHERE email = ?`;
    const [rows] = await pool.query(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json(formatError('Invalid email or password.'));
    }

    const user = rows[0];

    
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json(formatError('Invalid email or password.'));
    }

    
    const token = generateToken({
      id: user.id,
      email: user.email,
      stakeholderType: user.stakeholder_type,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError('Failed to login.'));
  }
}

module.exports = { login };