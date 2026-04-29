const { body, param } = require('express-validator');

exports.createCourseValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del curso es requerido')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),

  body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 500 }).withMessage('La descripción no puede superar 500 caracteres'),

  body('profesor')
    .notEmpty().withMessage('El ID del profesor es requerido')
    .isMongoId().withMessage('El ID del profesor no es válido')
];

exports.addStudentValidator = [
  param('courseId')
    .isMongoId().withMessage('El ID del curso no es válido'),

  body('studentId')
    .notEmpty().withMessage('El ID del estudiante es requerido')
    .isMongoId().withMessage('El ID del estudiante no es válido')
];
