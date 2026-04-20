const Course = require('../models/Course');
const User = require('../models/user');

// Crear curso (solo admin)
exports.createCourse = async (req, res) => {
  try {
    const { nombre, descripcion, profesor } = req.body;

    // Verificar que el profesor exista
    const profesorExiste = await User.findById(profesor);

    if (!profesorExiste || profesorExiste.rol !== 'profesor') {
      return res.status(400).json({ message: 'Profesor inválido' });
    }

    const course = new Course({
      nombre,
      descripcion,
      profesor
    });

    await course.save();

    res.status(201).json({ message: 'Curso creado', course });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cursos
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('profesor', 'nombre email');

    res.json(courses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStudentToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { studentId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Evitar duplicados
    if (course.estudiantes.includes(studentId)) {
      return res.status(400).json({ message: 'El estudiante ya está en el curso' });
    }

    course.estudiantes.push(studentId);
    await course.save();

    res.json({ message: 'Estudiante agregado al curso', course });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};