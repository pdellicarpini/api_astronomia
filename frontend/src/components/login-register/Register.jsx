import './AuthForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const { name, email, password, confirmPassword } = formData;

        if (!emailRegex.test(email.trim())) {
            return setError('El email no tiene un formato válido.');
        }

        if (password.length < 8 || password.length > 64) {
            return setError('La contraseña debe tener entre 8 y 64 caracteres.');
        }

        if (password !== confirmPassword) {
            return setError('Las contraseñas no coinciden.');
        }

        setLoading(true);

        try {
            await register({ name: name.trim(), email: email.trim(), password })
            navigate('/iniciar-sesion', { replace: true, state: { registered: true } });
        } catch (err) {
            setError(err.response?.data?.msg || 'No se pudo registrar el usuario. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='register'>
            <div className="field">
                <label htmlFor="name">Nombre</label>
                <div className='input'>
                    <i className="bi bi-person"></i>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Tu nombre"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <div className='input'>
                    <i className="bi bi-envelope"></i>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="nombre@ejemplo.com"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="password-heading">
                    <label htmlFor="password">Contraseña</label>
                    <span className="text-muted text-small">Debe ser entre 8 a 64 caracteres</span>
                </div>
                <div className='input'>
                    <i class="bi bi-lock"></i>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        placeholder="Creá una contraseña"
                        minLength={8}
                        maxLength={64}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label htmlFor="confirmPassword">Repetir contraseña</label>
                <div className='input'>
                    <i class="bi bi-lock"></i>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        placeholder="Repetí tu contraseña"
                        required
                    />
                </div>
            </div>

            {error && <p role="alert">{error}</p>}

            <button className="main-button" type="submit" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <div className="divider"><span>o</span></div>

            <button className="main-button" type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Continuar con Google'}
            </button>
        </form>
    );
}

export default Register;
