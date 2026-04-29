const express = require('express');
const router = express.Router();

const { createProfesor } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { createProfesorValidator } = require('../validators/userValidators');

// SOLO ADMIN puede crear profesores
router.post('/create-profesor', verifyToken, isAdmin, createProfesorValidator, validate, createProfesor);

module.exports = router;