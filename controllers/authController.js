const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('../utils/emailService');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenHelper');

async function register(req, res) {
    const { email, password, firstName, lastName, stakeholderType, phoneNumber } = req.body;

    
    if (!email || !password || !firstName || !lastName || !stakeholderType) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        const { userId, verificationToken } = await User.createUser({ 
            email, password, firstName, lastName, stakeholderType, phoneNumber 
        });

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register.' });
    }
}

async function verifyEmail(req, res) {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ error: 'Invalid token.' });
    }

    try {
        const verified = await User.verifyUser(token);

        if (!verified) {
            return res.status(400).json({ error: 'Verification failed or token expired.' });
        }

        res.redirect('/api/login');
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Verification failed.' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    
    const user = await User.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!user.is_verified) {
        return res.status(403).json({ error: 'Email not verified. Please check your inbox.' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await User.storeRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.json({ success: true, accessToken });
}

async function refreshToken(req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token missing.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const accessToken = generateAccessToken(decoded.userId);

        res.json({ success: true, accessToken });
    } catch {
        res.status(403).json({ error: 'Invalid refresh token.' });
    }
}

async function logout(req, res) {
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out successfully.' });
}

module.exports = { register, verifyEmail, login, refreshToken, logout };