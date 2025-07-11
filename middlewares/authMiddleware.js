const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware di protezione delle rotte tramite JWT
 * Verifica che il token sia presente e valido
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Estrazione token dall'header Authorization
      token = req.headers.authorization.split(' ')[1];
      
      // Verifica e decodifica del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Recupero utente senza password e lo assegno a req.user
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Non autorizzato, token non valido');
    }
  }

  // Se manca il token
  if (!token) {
    res.status(401);
    throw new Error('Non autorizzato, nessun token');
  }
};

module.exports = protect;