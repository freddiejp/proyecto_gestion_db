const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const userRoutes = require('./src/routes/userRoutes');
const classRoutes = require('./src/routes/classRoutes');
const transcriptionRoutes = require('./src/routes/transcriptionRoutes');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/transcriptions', transcriptionRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/voice_text_db')
  .then(() => {
    console.log('✅ MongoDB conectado');
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});