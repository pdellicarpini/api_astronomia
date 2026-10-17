import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar', data: {} });
                return;
            }

            const userData = await UserModel.findOne({ email });

            if (userData) {
                res.status(400).json({ msg: 'El email ya existe, intente nuevamente', data: {} });
                return;
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new UserModel({ name, email, password: passwordHash });
            await newUser.save();

            res.status(201).json({ msg: 'Usuario registrado correctamente', data: { id: newUser._id, email: newUser.email, role: newUser.role } });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {} });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    msg: 'Faltan campos obligatorios por rellenar', data: {}
                });
                return;
            }

            const userData = await UserModel.findOne({ email });

            if (!userData) {
                res.status(401).json({
                    msg: 'Credenciales inválidas', data: {}
                });
                return;
            }

            const isValid = await bcrypt.compare(
                password,
                userData.password
            );

            if (!isValid) {
                res.status(401).json({
                    msg: 'Credenciales inválidas', data: {}
                });
                return;
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

            res.status(200).json({
                msg: 'Usuario logueado correctamente', data: { id: userData._id, email: userData.email, role: userData.role },
                token
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}
            });
        }
    }
}

export default AuthController;