import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    async function login(email, password) {
        const result = await authService.login(email, password);

        if (!result.token) {
            throw new Error('No se recibió el token de la API.');
        }

        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data));
        setUser(result.data);
    }

    function register(userData) {
        return authService.register(userData);
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}