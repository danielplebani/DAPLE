const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: { // Riferimento all'utente proprietario dell'item
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true, // Campi createdAt e updatedAt automatici
});

module.exports = mongoose.model('Item', ItemSchema);