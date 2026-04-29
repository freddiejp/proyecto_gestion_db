const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estado: {
    type: String,
    enum: ['activa', 'finalizada'],
    default: 'activa'
  },
  fechaInicio: {
    type: Date,
    default: Date.now
  },
  fechaFin: {
    type: Date
  }
});

classSchema.index({ curso: 1 });       // Buscar clases de un curso
classSchema.index({ estado: 1 });      // Filtrar clases activas/finalizadas
classSchema.index({ curso: 1, estado: 1 }); // Índice compuesto — el más útil

module.exports = mongoose.model('Class', classSchema);