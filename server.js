require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const userRoutes = require('./src/routes/userRoutes');
const classRoutes = require('./src/routes/classRoutes');
const transcriptionRoutes = require('./src/routes/transcriptionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/transcriptions', transcriptionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Conexión a MongoDB
connectDB();

// Puerto desde .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});