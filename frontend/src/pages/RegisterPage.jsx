import Register from "../components/login-register/Register.jsx";
import AuthLayout from "../components/login-register/AuthLayout";
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <AuthLayout title={'Creá una cuenta'} subtitle={'Conectá con el cosmos'} compact={ true }>
            <Register />
            <p className='register-link'>¿Ya estás registrad@? <Link to='/iniciar-sesion'>Iniciá sesión</Link></p>
        </AuthLayout>
    )
}

export default RegisterPage;