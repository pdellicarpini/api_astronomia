import api from './api.js';

function getErrorMessage(error) {
    return error.response?.data?.msg || 'No se pudo conectar con el servidor.';
}

export async function getLessonWithQuestions(lessonId) {
    try {
        const [lessonRes, questionsRes] = await Promise.all([
            api.get(`/lessons/${lessonId}`),
            api.get('/questions', { params: { lessonId } })
        ]);

        return {
            lesson: lessonRes.data.data.lesson,
            questions: questionsRes.data.data.questions
        }
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}