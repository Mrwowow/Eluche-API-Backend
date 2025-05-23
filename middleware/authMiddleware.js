const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { authenticate };