const express = require('express');
const router = express.Router();

const { startClass, joinClass, endClass, getClassesByCourse } = require('../controllers/classController');
const { verifyToken, isProfesor } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { startClassValidator, classIdParamValidator, courseIdParamValidator } = require('../validators/classValidators');

// Iniciar clase (profesor)
router.post('/start', verifyToken, isProfesor, startClassValidator, validate, startClass);

// Entrar a clase (estudiantes)
router.get('/join/:classId', verifyToken, classIdParamValidator, validate, joinClass);

// Finalizar clase
router.post('/end/:classId', verifyToken, isProfesor, classIdParamValidator, validate, endClass);

// Endpoint
router.get('/course/:courseId', verifyToken, courseIdParamValidator, validate, getClassesByCourse);

module.exports = router;