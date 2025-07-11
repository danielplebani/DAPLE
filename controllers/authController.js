const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/email');
const validateEmail = require('../utils/validateEmail');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

/**
 * Genera JWT Access Token valido 7 giorni
 * @param {string} userId - ID utente
 * @returns {string} token JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Genera Refresh Token valido 30 giorni
 * @param {string} userId - ID utente
 * @returns {string} refresh token JWT
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

/**
 * Registrazione nuovo utente
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email e password sono obbligatorie');
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error('Email non valida');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Utente già registrato');
  }

  const user = await User.create({ email, password });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

/**
 * Login utente e creazione token di accesso e refresh token (cookie)
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Imposta cookie httpOnly con refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 giorni
    });

    res.json({
      _id: user._id,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Credenziali non valide');
  }


};

/**
 * Logout utente: cancella refresh token dal cookie
 */
const logoutUser = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.json({ message: 'Logout effettuato con successo' });
};

/**
 * Richiesta reset password: genera token e invia email
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email obbligatoria');
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error('Email non valida');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('Utente non trovato');
  }

  // Genera token random per reset password
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minuti

  await user.save();

  const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

  // Invia email reset password
  try {
    await sendResetEmail(email, resetUrl);
    res.json({ message: 'Email inviata per il reset della password' });
  } catch (error) {
    res.status(500);
    throw new Error('Errore nell\'invio dell\'email');
  }
};

/**
 * Reset password: verifica token valido e aggiorna password
 */
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Password obbligatoria');
  }

  // Cerca utente con token valido e non scaduto
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Token non valido o scaduto');
  }

  // Aggiorna password e rimuove token/resetTokenExpire
  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json({ message: 'Password aggiornata con successo' });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
};