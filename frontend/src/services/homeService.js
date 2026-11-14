import api from './api.js';

function getErrorMessage(error) {
    const data = error.response?.data;
    return data?.errors?.[0] || data?.msg || 'No se pudo conectar con el servidor.';
}

export async function getHome() {
    try {
        const { data } = await api.get('/home');
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}