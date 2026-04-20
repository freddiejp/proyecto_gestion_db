const express = require('express');
const router = express.Router();

const {
  saveTranscription,
  getTranscriptionsByClass
} = require('../controllers/transcriptionController');

const { verifyToken } = require('../middlewares/authMiddleware');

// Guardar texto
router.post('/', verifyToken, saveTranscription);

// Obtener textos por clase
router.get('/:classId', verifyToken, getTranscriptionsByClass);

module.exports = router;