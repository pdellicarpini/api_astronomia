import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' })
                return;
            }

            const userData = await UserModel.findOne({ email });

            if (userData) {
                res.status(400).json({ msg: 'El email ya existe, intente nuevamente' });
                return;
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new UserModel({ name, email, password: passwordHash });
            await newUser.save();

            res.status(201).json({ msg: 'Usuario registrado correctamente', data: newUser });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas' });
        }
    }

    async login(req, res) {
        const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar' })
                return;
            }

            const userData = await UserModel.findOne({ email });

            if (!userData) {
                res.status(401).json({ msg: 'Credenciales inválidas' });
                return;
            }

            const isValid = await bcrypt.compare(password, userData.password);

            if(!isValid) {
                res.status(401).json({ msg: 'Credenciales inválidas' });
                return;
            }
    }
}