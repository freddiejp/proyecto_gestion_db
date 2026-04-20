const express = require('express');
const router = express.Router();

const { createCourse, getCourses } = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { addStudentToCourse } = require('../controllers/courseController');

// Solo admin crea cursos
router.post('/', verifyToken, isAdmin, createCourse);

// Usuarios logueados pueden ver cursos
router.get('/', verifyToken, getCourses);

// Admin asigna estudiantes
router.post('/:courseId/add-student', verifyToken, isAdmin, addStudentToCourse);

module.exports = router;