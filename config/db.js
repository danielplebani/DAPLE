const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connesso!');
  } catch (error) {
    console.error('❌ Errore connessione MongoDB:', error.message);
    process.exit(1); // Ferma il server se la connessione fallisce
  }
};

module.exports = connectDB;
