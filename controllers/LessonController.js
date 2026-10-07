import LessonModel from '../models/lessonModel.js';

class LessonController {
    async getLessons(req, res) {
        try {
            const { title, subject } = req.query;
            const filteredLessons = {};

            if (subject) {
                filteredLessons.subject = { $regex: new RegExp(subject, 'i') };
            }

            if (title) {
                filteredLessons.title = { $regex: new RegExp(title, 'i') };
            }

            const lessons = await LessonModel.find(filteredLessons);

            if (lessons.length === 0) {
                if (Object.keys(filteredLessons).length > 0) {
                    return res.status(404).json({ msg: 'No se encontraron lecciones con los filtros proporcionados' });
                } else {
                    return res.status(404).json({ msg: 'No se encontraron lecciones' });
                }
            }

            res.status(200).json({ msg: 'Lecciones encontradas', data: lessons });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener las lecciones' })
        }
    }

    async getLessonById(req, res) {
        try {
            const id = req.params.id;
            const lesson = await LessonModel.findById(id);

            if (lesson) {
                res.status(200).json({ msg: 'Lección encontrada', data: lesson });
            } else {
                res.status(404).json({ msg: 'Lección no encontrada', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async postLesson(req, res) {
        try {
            const { title, description, subject, level, lessons } = req.body;
            if (!title || !description || !subject || !level) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' })
                return;
            }

            const lessonData = await LessonModel.findOne({ title });

            if (lessonData) {
                res.status(400).json({ msg: 'La lección ya existe, intente nuevamente' });
                return;
            }

            const newLesson = new LessonModel({ title, description, subject, level, lessons });

            const data = await newLesson.save();
            res.status(201).json({ msg: 'Lección creada exitosamente', data });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Error de validación',
                    details: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'No se pudo guardar la lección', data: {} });
            }
        }
    }

    async deleteLessonById(req, res) {
        try {
            const { id } = req.params;
            const lesson = await LessonModel.findByIdAndDelete(id);

            if (lesson) {
                res.status(200).json({ msg: 'Lección eliminada correctamente', data: {} });
            } else {
                res.status(404).json({ msg: 'Lección no encontrada', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async updateLessonById(req, res) {
        try {
            const { id } = req.params;
            const { title, description, subject, level, lessons } = req.body;
            if (!title || !description || !subject || !level) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar', data: {} });
                return;
            }

            const updatedLesson = await LessonModel.findByIdAndUpdate(id, { title, description, subject, level, lessons }, { new: true, runValidators: true });

            if (!updatedLesson) {
                res.status(404).json({ msg: 'Lección no encontrada', data: {} });
                return;
            }

            res.status(200).json({ msg: 'Lección actualizada correctamente', data: updatedLesson });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Error de validación',
                    details: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'No se pudo guardar la lección', data: {} });
            }
        }
    }
}

export default LessonController;