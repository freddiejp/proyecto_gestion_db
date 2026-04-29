const bcrypt = require('bcrypt');
const User = require('../models/User');

// Crear profesor (solo admin)
exports.createProfesor = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // ✅ FIX: hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      rol: 'profesor'
    });

    await newUser.save();

    // ✅ FIX: no devolver el password en la respuesta
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({ message: 'Profesor creado', newUser: userWithoutPassword });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};