const User = require('../models/user');

// Crear profesor (solo admin)
exports.createProfesor = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = new User({
      nombre,
      email,
      password,
      rol: 'profesor'
    });

    await newUser.save();

    res.status(201).json({ message: 'Profesor creado', newUser });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};