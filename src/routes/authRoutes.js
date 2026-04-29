const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { registerValidator, loginValidator } = require('../validators/authValidators');

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

module.exports = router;