const pool = require('../config/db');

async function createUser(user) {
  const sql = `INSERT INTO users (email, password_hash, first_name, last_name, stakeholder_type) 
               VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    user.email,
    user.passwordHash,
    user.firstName,
    user.lastName,
    user.stakeholderType,
  ]);
  return result.insertId; 
}

module.exports = { createUser };