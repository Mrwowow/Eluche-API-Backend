const pool = require('../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function createUser({ email, password, firstName, lastName, stakeholderType, phoneNumber }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const query = `
        INSERT INTO users (email, password_hash, first_name, last_name, stakeholder_type, phone_number, verification_status, is_active, created_at, verification_token) 
        VALUES (?, ?, ?, ?, ?, ?, 'unverified', 1, NOW(), ?)`;

    const [result] = await pool.query(query, [
        email, hashedPassword, firstName, lastName, stakeholderType, phoneNumber, verificationToken
    ]);

    return { userId: result.insertId, verificationToken };
}

async function verifyUser(token) {
    const query = `UPDATE users SET verification_status = 'verified' WHERE verification_token = ?`;
    const [result] = await pool.query(query, [token]);

    return result.affectedRows > 0;
}

async function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.query(query, [email]);

    return rows.length ? rows[0] : null;
}

async function storeRefreshToken(userId, refreshToken) {
    const query = `UPDATE users SET refresh_token = ? WHERE id = ?`;
    await pool.query(query, [refreshToken, userId]);
}

module.exports = { createUser, verifyUser, getUserByEmail, storeRefreshToken };