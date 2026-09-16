import QuestionModel from '../models/questionModel.js';

class QuestionController {
    async getQuestions(req, res) {
        try {
            const { subject, difficulty, question } = req.query;
            const filteredQuestions = {};

            if (subject) {
                filteredQuestions.subject = { $regex: new RegExp(subject, 'i') };
            }

            if (difficulty) {
                filteredQuestions.difficulty = { $regex: new RegExp(difficulty, 'i') };
            }

            if (question) {
                const words = question.split(' ');

                filteredQuestions.$and = words.map(word => ({
                    question: { $regex: new RegExp(word, 'i') }
                }));
            }

            const questions = await QuestionModel.find(filteredQuestions);

            if (questions.length === 0) {
                if (Object.keys(filteredQuestions).length > 0) {
                    return res.status(404).json({ msg: 'No se encontraron preguntas con los filtros proporcionados' });
                } else {
                    return res.status(404).json({ msg: 'No se encontraron preguntas' });
                }
            }

            res.status(200).json({ msg: 'Preguntas encontradas', data: questions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener las preguntas' })
        }
    }

    async getQuestionById(req, res) {
        try {
            const id = req.params.id;
            const question = await QuestionModel.findById(id);

            if (question) {
                res.status(200).json({ msg: 'Pregunta encontrada', data: question });
            } else {
                res.status(404).json({ msg: 'Pregunta no encontrada', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async postQuestion(req, res) {
        try {
            const { question, options, correctAnswer, subject, difficulty } = req.body;
            if (!question || !options || options.length === 0 || !correctAnswer || !subject || !difficulty) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' })
                return;
            }

            const questionData = await QuestionModel.findOne({ question });

            if (questionData) {
                res.status(400).json({ msg: 'La pregunta ya existe, intente nuevamente' });
                return;
            }

            const newQuestion = new QuestionModel({ question, options, correctAnswer, subject, difficulty });

            const data = await newQuestion.save();
            res.status(201).json({ msg: 'Pregunta creada exitosamente', data });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos',
                    error: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'No se pudo guardar la pregunta' });
            }
        }
    }

    async deleteQuestionById(req, res) {
        try {
            const { id } = req.params;
            const question = await QuestionModel.findByIdAndDelete(id);

            if (question) {
                res.status(200).json({ msg: 'Pregunta eliminada correctamente', data: question });
            } else {
                res.status(404).json({ msg: 'Pregunta no encontrada', data: {} });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async updateQuestionById(req, res) {
        try {
            const { id } = req.params;
            const { question, options, correctAnswer, subject, difficulty } = req.body;
            if (!question || !options || options.length === 0 || !correctAnswer || !subject || !difficulty) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' });
                return;
            }

            const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, { question, options, correctAnswer, subject, difficulty }, { new: true, runValidators: true });

            if (!updatedQuestion) {
                res.status(404).json({ msg: 'Pregunta no encontrada', data: {} });
                return;
            }

            res.status(200).json({ msg: 'Pregunta actualizada correctamente', data: updatedQuestion });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos',
                    error: error.message
                });
            } else {
                console.error(error);
                res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
            }
        }
    }
}

export default QuestionController;