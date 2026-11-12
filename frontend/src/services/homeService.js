import api from './api.js';

function getErrorMessage(error) {
    return error.response?.data?.msg || 'No se pudo conectar con el servidor.';
}

export async function getHome() {
    try {
        const { data } = await api.get('/home');
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}