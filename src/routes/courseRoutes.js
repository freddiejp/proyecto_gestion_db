const express = require('express');
const router = express.Router();

const { createCourse, getCourses, addStudentToCourse } = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { createCourseValidator, addStudentValidator } = require('../validators/courseValidators');

// Solo admin crea cursos
router.post('/', verifyToken, isAdmin, createCourseValidator, validate, createCourse);

// Usuarios logueados pueden ver cursos
router.get('/', verifyToken, getCourses);

// Admin asigna estudiantes
router.post('/:courseId/add-student', verifyToken, isAdmin, addStudentValidator, validate, addStudentToCourse);

module.exports = router;