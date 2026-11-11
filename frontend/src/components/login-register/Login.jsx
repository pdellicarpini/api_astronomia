import './AuthForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <div className='input'>
                    <i className="bi bi-envelope"></i>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete='email'
                        placeholder='nombre@ejemplo.com'
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="password-heading">
                    <label htmlFor="password">Contraseña</label>
                    <a className="forgot-link" href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <div className='input'>
                    <i className="bi bi-person"></i>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='Ingresá tu contraseña'
                        autoComplete='current-password'
                        required
                    />
                </div>
            </div>

            {error && <p role='alert'>{error}</p>}

            <label className="checkbox">
                <input
                    type="checkbox"
                />
                Recordarme
            </label>

            <button className="main-button" type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
            </button>

            <div className="divider"><span>o</span></div>

            <button className="main-button" type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Continuar con Google'}
            </button>
        </form>
    )
}

export default Login;