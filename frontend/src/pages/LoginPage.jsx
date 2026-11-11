import Login from "../components/login-register/Login";
import AuthLayout from "../components/login-register/AuthLayout";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <AuthLayout title={'¡Hola de nuevo!'} subtitle={'Conectá con el cosmos'} compact={ false }>
            <Login />
            <p className='register-link'>¿No tenés cuenta? <Link to='/registrarse'>Registrate</Link></p>
        </AuthLayout>
    )
}

export default LoginPage;