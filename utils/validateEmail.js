const validator = require('validator');

/**
 * Verifica se una stringa è una email valida
 * @param {string} email - Email da validare
 * @returns {boolean} true se l'email è valida, false altrimenti
 */
const validateEmail = (email) => {
  return validator.isEmail(email);
};

module.exports = validateEmail;