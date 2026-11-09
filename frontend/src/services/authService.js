import api from './api.js';

function getErrorMessage(error) {
    return error.response?.data?.msg || 'No se pudo conectar con el servidor.';
}

export async function login(email, password) {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function register(userData) {
    try {
        const { data } = await api.post('/auth/register', userData);
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

