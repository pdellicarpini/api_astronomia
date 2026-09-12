import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

class UserController {
    async getUsers ( req, res ) {
        try {
            const users = await UserModel.find();

            if (users.length === 0) {
                return res.status(200).json({ msg: 'No hay usuarios cargados en la base de datos', data: {} });
            }

            res.status(200).json({ msg: 'Usuarios encontrados', data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener los usuarios'})
        }
    }

    async getUserById (req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            
            if(user){
                res.status(200).json({msg: 'Usuario encontrado', data: user});
            } else {
                res.status(404).json({msg: 'Usuario no encontrado', data: {}});
            }
        } catch(error){
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    async postUser (req, res) {
        try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar'})
            return;
        }

        const userData = await UserModel.findOne({email});

        if( userData){
            res.status(400).json({ msg: 'El email ya existe, intente nuevamente' });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, password: passwordHash });

        const data = await user.save();
        res.status(201).json({ msg: 'ok', data:{ id: data._id, email: data.email} });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No se pudo guardar el usuario'});
        }
    }

    async deleteUserById (req, res) {
        try {
            const {id}= req.params;
            const user = await UserModel.findByIdAndDelete(id);
            
            if(user){
                res.status(200).json({msg: 'Usuario eliminado correctamente', data: user});
            } else {
                res.status(404).json({msg: 'Usuario no encontrado', data: {}});
            } 
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    async updateUserById (req, res) {
        try {
            const {id}= req.params;
            const {name, email, password} = req.body;
            if(!name || !email || !password) {
                res.status(400).json({msg: 'Faltan campos obligatorios por rellenar'});
                return;
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.findByIdAndUpdate(id, {name, email, password: passwordHash}, {new: true});

            if(!user) {
                res.status(404).json({msg: 'Usuario no encontrado', data: {}});
                return;
            }

            res.status(200).json({msg: 'Usuario actualizado correctamente', data: user});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }
}

export default UserController;