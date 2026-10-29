
import { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Acá conectarías tu función register()
        console.log(formData);
    };

    return (
        <main className="register-page">
            <section className="register-card">
                <header className="register-header">
                    <div className="register-icon" aria-hidden="true">
                        ✦
                    </div>

                    <h1>Creá tu cuenta</h1>
                    <p>Empezá tu viaje por el cosmos.</p>
                </header>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-field">
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mínimo 8 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repetí tu contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <button className="register-button" type="submit">
                        Crear cuenta
                    </button>
                </form>

                <footer className="register-footer">
                    <p>
                        ¿Ya tenés una cuenta?{' '}
                        <a href="/login">Iniciá sesión</a>
                    </p>
                </footer>
            </section>
        </main>
    );
}

export default Register;
