import './Profile.css';
import avatar from '../assets/munecoyyo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';

function Profile({ user }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate('/iniciar-sesion', { replace: true });
    }

    return (
        <>
            <main className='main-container container-animation profile-container'>
                <header className='profile-details'>
                    <div className='profile-nav'>
                        <button onClick={() => navigate('/')} className='details-button'>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <h1 className='title'>Mi perfil</h1>
                        <button onClick={handleLogout} className='details-button'>
                            <i className="bi bi-box-arrow-right"></i>
                        </button>
                    </div>

                    <div className='profile-info'>
                        <img src={avatar} alt={`Avatar de Priscila`} className="profile-info--img" />
                        <h2 className='title--lg'>Priscila</h2>
                        <p className='text-small text-muted'>Explorador desde octubre 2026</p>
                    </div>
                </header>

                <section className='profile-progress card'>
                    <div className='d-flex justify-content-between'>
                        <p className='text-info text-small'>Tu rango</p>
                        <p className='text-muted text-small'>Nivel 1</p>
                    </div>
                    <div className='profile-progress--level'>
                        <div className='level-icon'>
                            <i className="bi bi-star"></i>
                        </div>
                        <div>
                            <h3 className='subtitle'>Aprendiz del Cielo</h3>
                            <p className='text-soft'>340 / 500 XP</p>
                        </div>
                    </div>
                    <div className='progress-bar'></div>
                    <p className='text-soft text-small'>Te faltan <span className='text-orange'>160 XP</span> para subir al <span className='text-gold'>Nivel 2</span></p>
                </section>

                <section className='profile-streak'>
                    <div className='d-flex gap-5'>
                        <div className='card streak-stats'>
                            <i className="bi bi-stars text-asteria-orange title"></i>
                            <p className='title--lg'>12 días</p>
                            <p className='text-muted text-small'>Racha actual</p>
                        </div>
                        <div className='card streak-stats'>
                            <i className="bi bi-trophy text-gold title"></i>
                            <p className='title--lg'>21 días</p>
                            <p className='text-muted text-small'>Mejor racha</p>
                        </div>
                    </div>
                    <div className='card'>
                        <h3>Noviembre 2026</h3>
                    </div>
                </section>

                <section className='profile-activity'>
                    <div className='card'>
                        <div className='d-flex gap-5 align-items-center'>
                            <i className="bi bi-chat text-info title"></i>
                            <div>
                                <h3 className='text'>Mi actividad</h3>
                                <p className='text-small text-muted'>4 posteos · 9 me gusta</p>
                            </div>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </section>

                <section className='profile-activity'>
                    <div className='card'>
                        <div className='d-flex gap-5 align-items-center'>
                            <i className="bi bi-gear text-orange title--lg"></i>
                            <div>
                                <h3 className='text'>Editar perfil</h3>
                                <p className='text-small text-muted'>Foto, nombre y contraseña</p>
                            </div>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </section>
            </main>
            <Navbar />
        </>
    )
}

export default Profile;