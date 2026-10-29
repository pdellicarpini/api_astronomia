import api from './api.js';

export async function login (email, password) {
    try {
        const { data } = await api.post('/api/auth/login', { email, password });
        return data;
    } catch (error) {
        error.response?.data?.message || 'No se pudo conectar con el servidor.'
    }
}

export async function register(userData) {
    try {
        const { data } = await api.post('/api/auth/register', userData);
        return data;
    } catch (error) {
        error.response?.data?.message || 'No se pudo conectar con el servidor.'
    }
}    


// const [error, setError] = useState("");

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const data = await login(email, password);
//     // guardar token, redirigir, etc.
//   } catch (err) {
//     setError(err.message);
//   }
// };