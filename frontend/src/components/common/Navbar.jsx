import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="nav-bar" aria-label="Principal">
            <ul>
                <li>
                    <NavLink to="/" end>
                        <i className="bi bi-book"></i>
                        <span>Aprende</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/foro">
                        <i className="bi bi-people"></i>
                        <span>Foro</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/calendario">
                        <i className="bi bi-calendar-event"></i>
                        <span>Calendario</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/eventos">
                        <i className="bi bi-journal"></i>
                        <span>Eventos</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;