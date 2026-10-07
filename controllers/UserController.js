import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

class UserController {
    async getUsers ( req, res ) {
        try {
            const users = await UserModel.find().select('-password');

            if (users.length === 0) {
                return res.status(200).json({ msg: 'No hay usuarios cargados en la base de datos', data: {} });
            }

            res.status(200).json({ msg: 'Usuarios encontrados', data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener los usuarios', data: {} })
        }
    }

    async getUserById (req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id).select('-password');
            
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
        const {name, email, password, role} = req.body;
        if(!name || !email || !password) {
            res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar', data: {} });
            return;
        }

        const userExists = await UserModel.findOne({email});

        if(userExists){
            res.status(409).json({ msg: 'Ya existe un usuario con ese email, intente nuevamente', data: {} });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user =  new UserModel({ name, email, password: passwordHash, role: role || 'user' });

        const data = await user.save();
        res.status(201).json({ msg: 'ok', data:{ id: data._id, email: data.email, role: data.role} });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No se pudo guardar el usuario', data: {} });
        }
    }

    async deleteUserById (req, res) {
        try {
            const {id}= req.params;
            const user = await UserModel.findByIdAndDelete(id);
            
            if(user){
                res.status(200).json({msg: 'Usuario eliminado correctamente', data: {}});
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
            const {name, email, password, role} = req.body;
            if(!name || !email) {
                res.status(400).json({msg: 'Faltan campos obligatorios por rellenar', data: {}});
                return;
            }
            const data = {
                name,
                email,
            }
            
            if(password){
                data.password = await bcrypt.hash(password, 10);
            }

            if(role){
                data.role = role;
            }
            
            const user = await UserModel.findByIdAndUpdate(id, data, {new: true, runValidators: true}).select('-password');

            if(!user) {
                res.status(404).json({msg: 'Usuario no encontrado', data: {}});
                return;
            }

            res.status(200).json({msg: 'Usuario actualizado correctamente', data:{ id: user._id, email: user.email, role: user.role}});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }
}

export default UserController;