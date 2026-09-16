import CourseModel from '../models/courseModel.js';

class CourseController {
    async getCourses(req, res) {
        try {
            const { title, subject } = req.query;
            const filteredCourses = {};

            if (subject) {
                filteredCourses.subject = { $regex: new RegExp(subject, 'i') };
            }

            if (title) {
                filteredCourses.title = { $regex: new RegExp(title, 'i') };
            }

            const courses = await CourseModel.find(filteredCourses);

            if (courses.length === 0) {
                if (Object.keys(filteredCourses).length > 0) {
                    return res.status(404).json({ msg: 'No se encontraron cursos con los filtros proporcionados' });
                } else {
                    return res.status(404).json({ msg: 'No se encontraron cursos' });
                }
            }

            res.status(200).json({ msg: 'Cursos encontrados', data: courses });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener los cursos' })
        }
    }

    async getCourseById(req, res) {
        try {
            const id = req.params.id;
            const course = await CourseModel.findById(id);

            if (course) {
                res.status(200).json({ msg: 'Curso encontrado', data: course });
            } else {
                res.status(404).json({ msg: 'Curso no encontrado', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async postCourse(req, res) {
        try {
            const { title, description, subject, level, lessons } = req.body;
            if (!title || !description || !subject || !level) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' })
                return;
            }

            const courseData = await CourseModel.findOne({ title });

            if (courseData) {
                res.status(400).json({ msg: 'El curso ya existe, intente nuevamente' });
                return;
            }

            const newCourse = new CourseModel({ title, description, subject, level, lessons });

            const data = await newCourse.save();
            res.status(201).json({ msg: 'Curso creado exitosamente', data });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Error de validación',
                    details: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'No se pudo guardar el curso' });
            }
        }
    }

    async deleteCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await CourseModel.findByIdAndDelete(id);

            if (course) {
                res.status(200).json({ msg: 'Curso eliminado correctamente', data: course });
            } else {
                res.status(404).json({ msg: 'Curso no encontrado', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async updateCourseById(req, res) {
        try {
            const { id } = req.params;
            const { title, description, subject, level, lessons } = req.body;
            if (!title || !description || !subject || !level) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' });
                return;
            }

            const updatedCourse = await CourseModel.findByIdAndUpdate(id, { title, description, subject, level, lessons }, { new: true, runValidators: true });

            if (!updatedCourse) {
                res.status(404).json({ msg: 'Curso no encontrado', data: {} });
                return;
            }

            res.status(200).json({ msg: 'Curso actualizado correctamente', data: updatedCourse });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Error de validación',
                    details: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'No se pudo guardar el curso' });
            }
        }
    }
}

export default CourseController;