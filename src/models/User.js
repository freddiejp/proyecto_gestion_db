const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'profesor', 'estudiante'],
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ rol: 1 });          // Buscas profesores por rol al crear cursos

module.exports = mongoose.models.User || mongoose.model('User', userSchema);