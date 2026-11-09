import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

class AuthController {
    async register(req, res) {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                return res.status(400).json({ msg: 'Los datos ingresados no son válidos.', data: {} });
            }

            // validar email
            const formattedEmail = email.trim().toLowerCase();

            if (!emailRegex.text(email)) {
                return res.status(400).json({ msg: 'El email no tiene un formato válido.', data: {} });
            }

            const userData = await UserModel.findOne({ email });

            if (userData) {
                return res.status(400).json({ msg: 'El email ya existe, intente nuevamente.', data: {} });
            }


            // validar contraseña
            if (password.length < 8 || password.length > 64) {
                return res.status(400).json({ msg: 'La contraseña debe tener entre 8 y 64 caracteres.', data: {} });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new UserModel({ name, email, password: passwordHash });
            await newUser.save();

            return res.status(201).json({ msg: 'Usuario registrado correctamente.', data: { id: newUser._id, email: newUser.email, role: newUser.role } });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async login(req, res) {
        try {
            const { password } = req.body;
            const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : null; 

            if (!email || !password) {
                return res.status(400).json({
                    msg: 'Faltan campos obligatorios por rellenar.', data: {}
                });
            }

            const userData = await UserModel.findOne({ email });

            if (!userData) {
                return res.status(401).json({
                    msg: 'Credenciales inválidas.', data: {}
                });
            }

            const isValid = await bcrypt.compare(
                password,
                userData.password
            );

            if (!isValid) {
                return res.status(401).json({
                    msg: 'Credenciales inválidas.', data: {}
                });
            }

            const payload = {
                id: userData._id,
                email: userData.email,
                role: userData.role
            };

            const token = jwt.sign(
                payload,
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                msg: 'Usuario logueado correctamente.', data: {
                    id: userData._id,
                    email: userData.email,
                    role: userData.role,
                    name: userData.name,
                    profileImg: userData.profileImg,
                    level: userData.level
                },
                token
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}
            });
        }
    }
}

export default AuthController;