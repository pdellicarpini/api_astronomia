import mongoose from 'mongoose';
import LevelModel from '../models/levelModel.js';
import LessonModel from '../models/lessonModel.js';

class LevelController {
    async getLevels(req, res) {
        try {
            const levels = await LevelModel.find().sort({ order: 1 });

            if (levels.length === 0) {
                return res.status(404).json({ msg: 'No se encontraron niveles.', data: {} });
            }
            return res.status(200).json({ msg: 'Niveles encontrados.', data: { levels } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible obtener los niveles.', data: {} });
        }
    }

    async getLevelById(req, res) {
        try {
            const id = req.params.id;
            
            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }
            
            const level = await LevelModel.findById(id);

            if (level) {
                return res.status(200).json({ msg: 'Nivel encontrado.', data: { level } });
            } else {
                return res.status(404).json({ msg: 'Nivel no encontrado.', data: {} });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas.', data: {} });
        }
    }

    async postLevel(req, res) {
        try {
            const { name, description, order } = req.body;
            if (!name || !description || !order) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validación para no repetir niveles
            const levelData = await LevelModel.findOne({ order });

            if (levelData) {
                return res.status(400).json({ msg: 'El nivel ya existe.', data: {} });
            }

            // guardar nivel
            const newLevel = new LevelModel({ name, description, order });
            await newLevel.save();
            return res.status(201).json({ msg: 'Nivel creado exitosamente.', data: { level: newLevel } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            } 

            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0]; // 'name' o 'order'
                const msg = field === 'order'
                    ? 'Ya existe un nivel con ese orden.'
                    : 'El nombre del nivel ya existe, intente nuevamente.';
                return res.status(400).json({ msg, data: {} });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo guardar el nivel.', data: {} });
        }
    }

    async updateLevelById(req, res) {
        try {
            const { id } = req.params;
            const { name, description, order } = req.body;
            if (!name || !description || !order ) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar.', data: {} });
            }

            // validar ID 
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            const updatedLevel = await LevelModel.findByIdAndUpdate(id, { name, description, order }, { new: true, runValidators: true });

            if (!updatedLevel) {
                return res.status(404).json({ msg: 'Nivel no encontrado.', data: {} });
            }

            return res.status(200).json({ msg: 'Nivel actualizado exitosamente.', data: { level: updatedLevel } });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    msg: 'Los datos ingresados no son válidos.',
                    errors: Object.values(error.errors).map((e) => e.message),
                });
            } 

            if (error.code === 11000) {
                return res.status(400).json({ msg: 'El nombre del nivel ya existe, intente nuevamente.', data: {} });
            }

            console.error(error);
            return res.status(500).json({ msg: 'No se pudo actualizar el nivel.', data: {} });
        }
    }

    async deleteLevelById(req, res) {
        try {
            const { id } = req.params;

            // validar ID
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: 'El ID proporcionado no es válido.', data: {} });
            }

            // validar que el nivel no tenga lecciones asociadas antes de eliminarlo
            const hasLessons = await LessonModel.exists({level: id});
            if (hasLessons) {
                return res.status(400).json({ msg: 'No se puede eliminar el nivel porque tiene lecciones asociadas.', data: {} });
            }

            const deletedLevel = await LevelModel.findByIdAndDelete(id);

            if (deletedLevel) {
                return res.status(200).json({ msg: 'Nivel eliminado exitosamente.', data: { level: deletedLevel } });
            } else {
                return res.status(404).json({ msg: 'Nivel no encontrado.', data: {} });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible eliminar el nivel.', data: {} });
        }
    }
}

export default LevelController;