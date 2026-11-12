import mongoose from 'mongoose';
import UserModel from '../models/userModel.js';
import LevelModel from '../models/levelModel.js';
import LessonModel from '../models/lessonModel.js';
import UserProgressModel from '../models/userProgressModel.js';

class UserProgressController {
    async completeLesson(req, res) {
        try {
            const { lessonId } = req.body;

            if (!mongoose.isValidObjectId(lessonId)) {
                return res.status(400).json({ msg: 'El ID de la lección no es válido.', data: {} });
            }

            const [user, lesson] = await Promise.all([
                UserModel.findById(req.user.id).populate('level', 'order'),
                LessonModel.findById(lessonId).populate('level', 'order')
            ])

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado.', data: {} });
            }

            if (!lesson) {
                return res.status(404).json({ msg: 'Lección no encontrada.', data: {} });
            }

            // lecciones bloqueadas
            if (lesson.level.order > user.level.order) {
                return res.status(403).json({ msg: 'Esta lección pertenece a un nivel bloqueado.', data: {} });
            }

            if (lesson.level.order === user.level.order) {
                const previous = await LessonModel.find({
                    level: lesson.level._id,
                    order: { $lt: lesson.order }
                }).select('_id').lean();

                const completedPrevious = await UserProgressModel.countDocuments({
                    user: user._id,
                    lesson: { $in: previous.map(item => item._id) }
                })
                
                if (completedPrevious !== previous.length) {
                    return res.status(403).json({ msg: 'Tenés que completar las lecciones anteriores.', data: {} });
                }
            }

            // proceso del usuario
            const result = await UserProgressModel.updateOne(
                { user: user._id, lesson: lesson._id },
                { $setOnInsert: { completedAt: new Date() } },
                { upsert: true }
            );
            const firstCompletion = result.upsertedCount === 1;

            let levelUp = false;

            if (lesson.level._id.equals(user.level._id)) {
                const levelLessons = await LessonModel.find({ level: user.level._id }).select('_id').lean();         
                const completedCount = await UserProgressModel.countDocuments({
                    user: user._id,
                    lesson: { $in: levelLessons.map(item => item._id) }
                })

                if (completedCount === levelLessons.length) {
                    const nextLevel = await LevelModel.findOne({ order: user.level.order + 1 }).select('_id');

                    if (nextLevel) {
                        await UserModel.updateOne({ _id: user._id }, { level: nextLevel._id });
                        levelUp = true;
                    }
                }
            }

            return res.status(200).json({ msg: 'Lección completada correctamente.', data: { firstCompletion, levelUp} })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible registrar el progreso.', data: {} });
        }
    }
}

export default UserProgressController;