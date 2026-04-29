const { body, param } = require('express-validator');

exports.saveTranscriptionValidator = [
  body('classId')
    .notEmpty().withMessage('El ID de la clase es requerido')
    .isMongoId().withMessage('El ID de la clase no es válido'),

  body('texto')
    .trim()
    .notEmpty().withMessage('El texto no puede estar vacío')
    .isLength({ max: 5000 }).withMessage('El texto no puede superar 5000 caracteres')
];

exports.classIdParamValidator = [
  param('classId')
    .isMongoId().withMessage('El ID de la clase no es válido')
];
