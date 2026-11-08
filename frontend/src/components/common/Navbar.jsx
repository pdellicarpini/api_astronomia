import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
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
            </nav>
        </header>
    );
}

export default Navbar;