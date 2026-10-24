import book from '../assets/book.svg';

function Header() {
    return (
        <header>
            <nav className="navbar">
                <ul>
                    <li>
                        <img src={ book } alt="Libro" />
                        Aprendé
                    </li>
                    <li>
                        Comunidad
                    </li>
                    <li>
                        Calendario
                    </li>
                    <li>
                        Eventos
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;