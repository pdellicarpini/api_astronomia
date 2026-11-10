import './AuthLayout.css';
import Navbar from '../common/Navbar';
import imagotipo from '../../assets/asteria/imagotipoV1.png'

function AuthLayout({ title, subtitle, compact = false, children }) {
    return (
        <main className="main-container main-animation auth-container">
            <header className={`auth-hero ${ compact ? 'auth-hero--compact' : '' }`}>
                <img className='auth-brand' src={ imagotipo } alt='Asteria' />
                <div>
                    <h1 className='text-asteria-orange'>{ title }</h1>
                    <p className='subtitle text-orange'>{ subtitle }</p>
                </div>
            </header>

            <section className="auth-sheet">
                { children }
            </section>
            <Navbar/>
        </main>
    );
}

export default AuthLayout;