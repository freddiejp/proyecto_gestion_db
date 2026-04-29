const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const tokenClean = token.split(' ')[1];

    // ✅ FIX: JWT secret desde variable de entorno
    const decoded = jwt.verify(tokenClean, process.env.JWT_SECRET);

    req.user = decoded;

    next();
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