import api from './api.js';

function getErrorMessage(error) {
    const data = error.response?.data;
    return data?.errors?.[0] || data?.msg || 'No se pudo conectar con el servidor.';
}

export async function createPost({ title, category, body }) {
    try {
        const { data } = await api.post('/posts', { title, category, body })
        return data.data.post;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function getPostById(postId) {
    try {
        const { data } = await api.get(`/posts/${postId}`);
        return data.data.post;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function toggleLike(postId) {
    try {
        const { data } = await api.post(`/posts/${postId}/like`);
        return data.data.likes;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function addComment(postId, body) {
    try {
        const { data } = await api.post(`/posts/${postId}/comments`, { body });
        return data.data.comments;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}