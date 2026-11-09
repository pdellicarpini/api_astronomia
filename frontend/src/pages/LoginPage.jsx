import Login from "../components/login-register/Login";

function LoginPage() {
    return (
        <main className="main-container main-animation auth-container">
            <div className="auth-header">
                <h1>Asteria</h1>
                <h2 className="text-asteria-orange title">Hola de nuevo, iniciá sesión</h2>
                <p className="text-orange">Conectá con el cosmos.</p>
            </div>
            <div className="card">
                <Login />
            </div>
        </main>
    )
}

export default LoginPage;