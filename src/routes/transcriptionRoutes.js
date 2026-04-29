const express = require('express');
const router = express.Router();

const { saveTranscription, getTranscriptionsByClass } = require('../controllers/transcriptionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { saveTranscriptionValidator, classIdParamValidator } = require('../validators/transcriptionValidators');

// Guardar texto
router.post('/', verifyToken, saveTranscriptionValidator, validate, saveTranscription);

// Obtener textos por clase
router.get('/:classId', verifyToken, classIdParamValidator, validate, getTranscriptionsByClass);

module.exports = router;