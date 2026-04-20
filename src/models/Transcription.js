const mongoose = require('mongoose');

const transcriptionSchema = new mongoose.Schema({
  clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transcription', transcriptionSchema);