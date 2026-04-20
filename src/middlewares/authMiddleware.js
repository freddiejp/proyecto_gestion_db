const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    // Formato: Bearer TOKEN
    const tokenClean = token.split(' ')[1];

    const decoded = jwt.verify(tokenClean, 'secreto_super');

    // Guardar datos del usuario en la request
    req.user = decoded;

    next(); // continuar
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para admin' });
  }
  next();
};

exports.isProfesor = (req, res, next) => {
  if (req.user.rol !== 'profesor') {
    return res.status(403).json({ message: 'Acceso solo para profesores' });
  }
  next();
};