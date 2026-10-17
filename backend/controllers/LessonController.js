import mongoose from 'mongoose';
import LessonModel from '../models/lessonModel.js';
import LevelModel from '../models/levelModel.js';
import QuestionModel from '../models/questionModel.js';

class LessonController {
    async getLessons(req, res) {
        try {
            const { title, levelOrder } = req.query;
            const filteredLessons = {};

            if (levelOrder) {
                const orderNumber = Number(levelOrder);
                if (!Number.isInteger(orderNumber) || orderNumber < 1 ) {
                    return res.status(400).json({ msg: 'El nivel proporcionado no es válido, debe escribir el orden en un número mayor o igual a 1.', data: {} });
                }

                const level = await LevelModel.findOne({ order: orderNumber }).select('_id');

                if (!level) {
                    return res.status(404).json({ msg: 'No se encontró un nivel con el orden proporcionado.', data: {} });
                }

                filteredLessons.level = level._id;
            }

            if (title) {
                filteredLessons.title = { $regex: new RegExp(title, 'i') };
            }

            const lessons = await LessonModel.find(filteredLessons).populate('level', 'name order').sort({ order: 1 });

            if (lessons.length === 0) {
                if (Object.keys(filteredLessons).length > 0) {
                    return res.status(404).json({ msg: 'No se encontraron lecciones con los filtros proporcionados.', data: {} });
                } else {
                    return res.status(404).json({ msg: 'No se encontraron lecciones.', data: {} });
                }
            }

            return res.status(200).json({ msg: 'Lecciones encontradas.', data: { lessons } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible obtener las lecciones.', data: {} })
        }
    }

    async getLessonById(req, res) {
        try {
            const id = req.params.id;

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const lesson = await LessonModel.findById(id).populate('level', 'name order');

            if (lesson) {
                return res.status(200).json({ msg: 'Lección encontrada.', data: { lesson } });
            } else {
                return res.status(404).json({ msg: 'Lección no encontrada.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async postLesson(req, res) {
        try {
            const { title, description, order, level, totalXp } = req.body;

            if (!title || !description || !order || !level || !totalXp) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validaciones para el campo 'level'
            if (!mongoose.isValidObjectId(level)) {
                return res.status(400).json({ msg: 'El ID del nivel proporcionado no es válido.', data: {} });
            }

            const levelExists = await LevelModel.exists({ _id: level })
            if (!levelExists) {
                return res.status(404).json({ msg: 'El nivel proporcionado no existe.', data: {} });
            }

            // validación para no repetir lecciones
            const lessonData = await LessonModel.findOne({ title });

            if (lessonData) {
                return res.status(400).json({ msg: 'La lección ya existe, intente nuevamente.', data: {} });
            }

            // guardar lección
            const newLesson = new LessonModel({ title, description, order, level, totalXp });
            await newLesson.save();
            res.status(201).json({ msg: 'Lección creada exitosamente.', data: { lesson: newLesson } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            } 

            if (error.code === 11000) {
                return res.status(400).json({ msg: 'Lección ya existe, intente nuevamente.', data: {} });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo guardar la lección.', data: {} });
        }
    }

    async updateLessonById(req, res) {
        try {
            const { id } = req.params;
            const { title, description, order, level, totalXp } = req.body;
            if (!title || !description || !order || !level || !totalXp) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            // validar ID de 'level'
            if (!mongoose.isValidObjectId(level)) {
                return res.status(400).json({ msg: 'El ID del nivel proporcionado no es válido.', data: {} });
            }

            // verificar si el nivel existe
            const levelExists = await LevelModel.exists({ _id: level });

            if (!levelExists) {
                return res.status(404).json({ msg: 'El nivel proporcionado no existe.', data: {} });
            }

            // actualizar
            const updatedLesson = await LessonModel.findByIdAndUpdate(id, { title, description, order, level, totalXp }, { new: true, runValidators: true }).populate('level', 'name order');

            if (!updatedLesson) {
                return res.status(404).json({ msg: 'Lección no encontrada.', data: {} });
            }
            res.status(200).json({ msg: 'Lección actualizada correctamente.', data: { lesson: updatedLesson } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            } 

            if (error.code === 11000) {
                return res.status(400).json({ msg: 'El título de la lección ya existe, intente nuevamente.', data: {} });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo actualizar la lección.', data: {} });
        }
    }

    async deleteLessonById(req, res) {
        try {
            const { id } = req.params;
            
            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }
            
            // validar que la lección no tenga preguntas asociadas antes de eliminarla
            const hasQuestions = await QuestionModel.exists({ lesson: id });
            if (hasQuestions) {
                return res.status(400).json({ msg: 'No se puede eliminar la lección porque tiene preguntas asociadas.', data: {} });
            }
            
            const deletedLesson = await LessonModel.findByIdAndDelete(id);
            
            if (deletedLesson) {
                return res.status(200).json({ msg: 'Lección eliminada correctamente.', data: { lesson: deletedLesson } });
            } else {
                return res.status(404).json({ msg: 'Lección no encontrada.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }
}

export default LessonController;