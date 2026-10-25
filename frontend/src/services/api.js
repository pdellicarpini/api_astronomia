const API_URL = import.meta.env.VITE_API_URL;

export async function fetchLevels() {
    const res = await fetch(`${API_URL}/api/levels`);

    if (!res.ok) {
        throw new Error('Error de conexión con el servidor.');
    }

    return res.json();
}

export async function fetchQuestions() {
    const res = await fetch(`${API_URL}/api/questions`);

    if (!res.ok) {
        throw new Error('Error de conexión con el servidor.');
    }

    return res.json();
}