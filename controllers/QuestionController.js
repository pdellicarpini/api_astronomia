import mongoose from 'mongoose';
import QuestionModel from '../models/questionModel.js';
import LessonModel from '../models/lessonModel.js';

class QuestionController {
    async getQuestions(req, res) {
        try {
            const { lessonId, difficulty, type } = req.query;
            const filteredQuestions = {};

            if (lessonId) {
                if (!mongoose.isValidObjectId(lessonId)) {
                    return res.status(400).json({ msg: 'El ID de la lección proporcionada no es válido.', data: {} });
                }

                const lessonExists = await LessonModel.exists({ _id: lessonId });
                if (!lessonExists) {
                    return res.status(404).json({ msg: 'La lección con el ID proporcionado no existe.', data: {} });
                }

                filteredQuestions.lesson = lessonId;
            }

            if (difficulty) {
                filteredQuestions.difficulty = difficulty;
            }

            if (type) {
                filteredQuestions.type = type;
            }

            const questions = await QuestionModel.find(filteredQuestions).populate('lesson', 'title order');

            if (questions.length === 0) {
                if (Object.keys(filteredQuestions).length > 0) {
                    return res.status(404).json({ msg: 'No se encontraron preguntas con los filtros proporcionados.', data: {} });
                } else {
                    return res.status(404).json({ msg: 'No se encontraron preguntas.', data: {} });
                }
            }

            return res.status(200).json({ msg: 'Preguntas encontradas.', data: { questions } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible obtener las preguntas.', data: {} })
        }
    }

    async getQuestionById(req, res) {
        try {
            const id = req.params.id;

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const question = await QuestionModel.findById(id).populate('lesson', 'title order');

            if (question) {
                return res.status(200).json({ msg: 'Pregunta encontrada.', data: { question } });
            } else {
                return res.status(404).json({ msg: 'Pregunta no encontrada.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async postQuestion(req, res) {
        try {
            const { question, type, options, matchOptions, correctAnswer, explanation, difficulty, lesson } = req.body;

            if (!question || !type || !explanation || !difficulty || !lesson) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validaciones para el campo 'lesson'
            if (!mongoose.isValidObjectId(lesson)) {
                return res.status(400).json({ msg: 'El ID de la lección proporcionada no es válido.', data: {} });
            }

            const lessonExists = await LessonModel.exists({_id: lesson})
            if (!lessonExists) {
                return res.status(404).json({ msg: 'La lección proporcionada no existe.', data: {} })
            }

            // validación para no repetir preguntas
            const questionData = await QuestionModel.findOne({ question });

            if (questionData) {
                return res.status(400).json({ msg: 'La pregunta ya existe, intente nuevamente.', data: {} });
            }

            // guardar pregunta
            const newQuestion = new QuestionModel({ question, type, options, matchOptions, correctAnswer, explanation, difficulty, lesson });
            await newQuestion.save();

            return res.status(201).json({ msg: 'Pregunta creada exitosamente.', data: { question: newQuestion } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            } 

            if (error.code === 11000) {
                return res.status(400).json({ msg: 'La pregunta ya existe, intente nuevamente.', data: {} });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo guardar la pregunta.', data: {} });
        }
    }

    async updateQuestionById(req, res) {
        try {
            const { id } = req.params;
            const { question, type, options, matchOptions, correctAnswer, explanation, difficulty, lesson } = req.body;
            if (!question || !type || !explanation || !difficulty || !lesson) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            // validar ID de 'lesson'
            if (!mongoose.isValidObjectId(lesson)) {
                return res.status(400).json({ msg: 'El ID de la lección proporcionada no es válido.', data: {} });
            }

            // verificar si la lección existe
            const lessonExists = await LessonModel.exists({ _id: lesson });

            if (!lessonExists) {
                return res.status(404).json({ msg: 'La lección proporcionada no existe.', data: {} });
            }

            // actualizar para que corran las validaciones del schema nuevamente
            const updatedQuestion  = await QuestionModel.findById(id);
            if (!updatedQuestion) {
                return res.status(404).json({ msg: 'Pregunta no encontrada.', data: {} });
            }

            updatedQuestion.set({ question, type, options, matchOptions, correctAnswer, explanation, difficulty, lesson });
            await updatedQuestion.save();
            await updatedQuestion.populate('lesson', 'title order');

            return res.status(200).json({ msg: 'Pregunta actualizada correctamente.', data: { question: updatedQuestion } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            }

            if (error.code === 11000) {
                return res.status(400).json({ msg: 'La pregunta ya existe, intente nuevamente.', data: {} });
            }
            
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async deleteQuestionById(req, res) {
        try {
            const { id } = req.params;

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

            if (deletedQuestion) {
                return res.status(200).json({ msg: 'Pregunta eliminada correctamente.', data: { question: deletedQuestion } });
            } else {
                return res.status(404).json({ msg: 'Pregunta no encontrada.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }
}

export default QuestionController;