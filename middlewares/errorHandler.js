/**
 * Middleware di gestione degli errori
 * @param {Error} err - Oggetto errore
 * @param {Request} req - Oggetto richiesta Express
 * @param {Response} res - Oggetto risposta Express
 * @param {Function} next - Funzione next middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Errore]', err);

  // Se lo status è 200 (OK) lo imposto a 500 (Internal Server Error)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🔒' : err.stack,
  });
};

module.exports = errorHandler;