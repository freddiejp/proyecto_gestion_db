const express = require('express');
const router = express.Router();

const {
  startClass,
  joinClass,
  endClass
} = require('../controllers/classController');

const { verifyToken, isProfesor } = require('../middlewares/authMiddleware');

// Iniciar clase (profesor)
router.post('/start', verifyToken, isProfesor, startClass);

// Entrar a clase (estudiantes)
router.get('/join/:classId', verifyToken, joinClass);

// Finalizar clase
router.post('/end/:classId', verifyToken, isProfesor, endClass);

module.exports = router;