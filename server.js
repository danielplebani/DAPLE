require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const path = require('path');
const PORT = process.env.PORT || 5000;

const cors = require('cors');
const app = express();

// ✅ Middleware CORS
app.use(cors({
  origin: 'http://localhost:3000', // frontend
  credentials: true // true solo se usi cookie
}));

// Connessione al database
connectDB();

// Middleware per il parsing del body JSON
app.use(express.json());

// Rotte API
app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

// Middleware per la gestione degli errori (va posizionato dopo le rotte)
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});

// Serve file React in produzione
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}