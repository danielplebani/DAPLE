const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, logoutUser } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/login
router.post('/logout', logoutUser);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', resetPassword);

module.exports = router;
