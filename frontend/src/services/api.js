const API_URL = import.meta.env.VITE_API_URL;

async function request(path) {
    console.log('Pidiendo:', `${API_URL}${path}`);
    const res = await fetch(`${API_URL}${path}`);
    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.msg ?? 'Error de conexión con el servidor');
    }

    return body.data;
}

export const getLevels = () => request('/api/levels');