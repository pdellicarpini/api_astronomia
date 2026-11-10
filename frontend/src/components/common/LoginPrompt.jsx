import { Link, useLocation } from 'react-router-dom';

function LoginPrompt({ message, onClose }) {
    const location = useLocation();
    const state = { from: location.pathname };

    return (
        <div className='prompt-overlay' onClick={ onClose }>
            <div
                className='card prompt'
                role='dialog'
                aria-modal='true'
                aria-labelledby='prompt-title'
                onClick={ (event) => event.stopPropagation() }
            >
                <h2 id='prompt-title' className='subtitle'>Necesitás una cuenta</h2>
                <p className='text-soft'>{ message }</p>
                <Link to='/iniciar-sesion' state={ state } className='submit-button'>Ingresar</Link>
                <Link to='/registrarse' state={ state }>Crear cuenta</Link>
                <button className='main-button' onClick={ onClose }>Ahora no</button>
            </div>
        </div>
    );
}

export default LoginPrompt;