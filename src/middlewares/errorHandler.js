const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} →`, err.message);

  // Error de ID inválido de MongoDB
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  // Email duplicado (unique en MongoDB)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `El ${campo} ya está registrado` });
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Error de validación', errors: mensajes });
  }

  // JWT inválido o expirado
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expirado' });
  }

  // Error genérico
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;