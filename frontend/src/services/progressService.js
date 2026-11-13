import api from './api.js';

function getErrorMessage(error) {
    return error.response?.data?.msg || 'No se pudo conectar con el servidor.';
}

export async function completeLesson(lessonId) {
    try {
        const { data } = await api.post('/progress', { lessonId });
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}