import api from './api.js';

export async function login (email, password) {
    const { data } = await api.post('/api/auth/login', { email, password });
    return data;
}

export async function register(userData) {
    const { data } = await api.post('/api/auth/register', userData);
    return data;
}    
