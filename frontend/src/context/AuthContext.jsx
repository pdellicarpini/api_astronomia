import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

function getSession(token) {
    if (!token) {
        return { token: null, user: null };
    }

    try {
        const payload = jwtDecode(token);
        console.log('Contenido del JWT:', payload);

        if (!payload.exp || payload.exp * 1000 <= Date.now()) {
            return { token: null, user: null };
        }

        const user = {
            id: payload.id || payload._id || payload.sub,
            name: payload.name,
            email: payload.email,
            role: payload.role
        };

        return { token, user };

    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return { token: null, user: null };
    }
}

function restoreSession() {
    const token = localStorage.getItem('token');
    const session = getSession(token);

    if (!session.token) {
        localStorage.removeItem('token');
    }

    return session;
}

export function AuthProvider({ children }) {

    const [session, setSession] = useState(restoreSession);

    async function login(email, password) {
        const result = await authService.login(email, password);

        if (!result.token) {
            throw new Error('No se recibió el token de la API.');
        }

        const newSession = getSession(result.token);

        if (!newSession.token) {
            throw new Error('El token es inválido o está vencido.');
        }

        localStorage.setItem('token', newSession.token);
        setSession(newSession);
    }

    function register(userData) {
        return authService.register(userData);
    }

    function logout() {
        localStorage.removeItem('token');

        setSession({
            token: null,
            user: null
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: session.token,
                user: session.user,
                isAuthenticated: Boolean(session.token && session.user),
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
