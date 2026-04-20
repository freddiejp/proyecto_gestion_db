const express = require('express');
const router = express.Router();

const { createProfesor } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// SOLO ADMIN puede crear profesores
router.post('/create-profesor', verifyToken, isAdmin, createProfesor);

module.exports = router;