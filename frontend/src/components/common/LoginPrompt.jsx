import './LoginPrompt.css';
import { Link, useLocation } from 'react-router-dom';

function LoginPrompt({ message, onClose }) {
    const location = useLocation();
    const state = { from: location.pathname };

    return (
        <div className='prompt-overlay' onClick={onClose}>
            <div
                className='card prompt'
                role='dialog'
                aria-modal='true'
                aria-labelledby='prompt-title'
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id='prompt-title' className='subtitle'>Necesitás una cuenta</h2>
                <p className='text-soft'>{message}</p>
                <div className='auth-links'>
                    <Link to='/iniciar-sesion' state={state} className='main-button'>Ingresar</Link>
                    <Link to='/registrarse' state={state} className='main-button'>Crear cuenta</Link>
                </div>
                <button className='main-button not-now' onClick={onClose}>Ahora no</button>
            </div>
        </div>
    );
}

export default LoginPrompt;