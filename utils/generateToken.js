const jwt = require('jsonwebtoken');

// Access Token valido 15 minuti
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Refresh Token valido 7 giorni
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};