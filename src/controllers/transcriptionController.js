const Transcription = require('../models/Transcription');
const Class = require('../models/Class');

// Guardar texto
exports.saveTranscription = async (req, res) => {
  try {
    const { classId, texto } = req.body;

    const clase = await Class.findById(classId);

    if (!clase || clase.estado !== 'activa') {
      return res.status(400).json({ message: 'Clase no activa' });
    }

    const newText = new Transcription({
      clase: classId,
      texto,
      usuario: req.user.id
    });

    await newText.save();

    res.status(201).json({ message: 'Texto guardado', newText });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener transcripción
exports.getTranscriptionsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const texts = await Transcription.find({ clase: classId })
      .populate('usuario', 'nombre')
      .sort({ timestamp: 1 });

    res.json(texts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};