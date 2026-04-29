const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

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
    next(error);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ FIX: excluir password de la respuesta final
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Usuario no existe' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // ✅ FIX: JWT secret desde variable de entorno
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // ✅ FIX: no enviar el password en la respuesta
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      message: 'Login exitoso',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    next(error);
  }
};