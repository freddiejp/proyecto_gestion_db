const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estudiantes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  default: []
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

courseSchema.index({ profesor: 1 });   // Buscar cursos de un profesor
courseSchema.index({ estudiantes: 1 }); // Verificar si un estudiante está matriculado

module.exports = mongoose.model('Course', courseSchema);