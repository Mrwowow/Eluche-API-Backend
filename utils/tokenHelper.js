const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '24h' });
}

function generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = { generateAccessToken, generateRefreshToken };