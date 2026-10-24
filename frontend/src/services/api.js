const API_URL = import.meta.env.VITE_API_URL;

export async function fetchLevels() {
    const res = await fetch(`${API_URL}/api/levels`);
    // const body = await res.json();

    if (!res.ok) {
        throw new Error('Error de conexión con el servidor.');
    }

    return res.json();
}