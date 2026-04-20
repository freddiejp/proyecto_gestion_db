const Class = require('../models/Class');
const Course = require('../models/Course');

// Iniciar clase
exports.startClass = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no existe' });
    }

    // Validar que el profesor sea el del curso
    if (course.profesor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No eres el profesor de este curso' });
    }

    const newClass = new Class({
      curso: courseId,
      profesor: req.user.id
    });

    await newClass.save();

    res.status(201).json({ message: 'Clase iniciada', newClass });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const clase = await Class.findById(classId).populate('curso');

    if (!clase || clase.estado !== 'activa') {
      return res.status(404).json({ message: 'Clase no disponible' });
    }

    const course = await Course.findById(clase.curso._id);

    // 🔥 VALIDACIÓN CLAVE
    const isStudent = course.estudiantes.some(
      id => id.toString() === req.user.id
    );

    if (!isStudent) {
      return res.status(403).json({ message: 'No estás matriculado en este curso' });
    }

    res.json({ message: 'Acceso permitido a la clase', clase });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.endClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const clase = await Class.findById(classId);

    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    if (clase.profesor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    clase.estado = 'finalizada';
    clase.fechaFin = new Date();

    await clase.save();

    res.json({ message: 'Clase finalizada' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};