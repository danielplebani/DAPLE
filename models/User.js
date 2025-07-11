const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Email non valida'], // Validazione email
  },
  resetToken: { type: String },
  resetTokenExpire: { type: Date },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Campi createdAt e updatedAt automatici
});

// Middleware pre-save per hashare la password se modificata
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metodo istanza per confrontare password inserita con quella hashata
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);