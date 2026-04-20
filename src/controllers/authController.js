const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    await user.save();

    res.status(201).json({ message: 'Usuario registrado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no existe' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      'secreto_super',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};