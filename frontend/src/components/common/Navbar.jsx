import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/iniciar-sesion', { replace: true });
    }

    return (
        <header>
            <nav className="nav-bar">
                <ul>
                    <li>
                        <Link to='/'>
                            <i className="bi bi-book"></i>
                            <span>Aprende</span>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/foro'>
                            <i className="bi bi-people"></i>
                            <span>Foro</span>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/calendario'>
                            <i className="bi bi-calendar-event"></i>
                            <span>Calendario</span>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/aprende'>
                            <i className="bi bi-journal"></i>
                            <span>Eventos</span>
                        </Link>
                    </li>
                </ul>
            <button onClick={handleLogout}>Cerrar sesión</button> 
            </nav>
        </header>
    );
}

export default Navbar;