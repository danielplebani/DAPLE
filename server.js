require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connessione DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Rotte
app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

// Middleware per errori (sempre alla fine)
app.use(errorHandler);

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});
