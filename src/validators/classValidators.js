const { body, param } = require('express-validator');

exports.startClassValidator = [
  body('courseId')
    .notEmpty().withMessage('El ID del curso es requerido')
    .isMongoId().withMessage('El ID del curso no es válido')
];

exports.classIdParamValidator = [
  param('classId')
    .isMongoId().withMessage('El ID de la clase no es válido')
];

exports.courseIdParamValidator = [
  param('courseId')
    .isMongoId().withMessage('El ID del curso no es válido')
];