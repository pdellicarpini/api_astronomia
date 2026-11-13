import UserModel from '../models/userModel.js';
import LevelModel from '../models/levelModel.js';
import LessonModel from '../models/lessonModel.js';
import UserProgressModel from '../models/userProgressModel.js';
import { getActiveStreak } from '../utils/streak.js';

class HomeController {
    async getHome(req, res) {
        try {
            const [user, levels] = await Promise.all([
                UserModel.findById(req.user.id)
                    .select('name profileImg streak level')
                    .populate('level', 'name description order')
                    .lean(),
                LevelModel.find().sort({ order: 1 }).lean()
            ]);

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado.', data: {} });
            }

            const lessons = await LessonModel.find({ level: user.level._id })
                .sort({ order: 1 })
                .lean();

            const progress = await UserProgressModel.find({
                user: user._id,
                lesson: { $in: lessons.map(lesson => lesson._id) }
            }).select('lesson').lean();

            const completedIds = new Set(progress.map(item => item.lesson.toString()))

            let currentAssigned = false;
            const lessonsWithStatus = lessons.map(lesson => {
                if (completedIds.has(lesson._id.toString())) {
                    return { ...lesson, status: 'completed' }
                }
                if (!currentAssigned) {
                    currentAssigned = true;
                    return { ...lesson, status: 'current' }
                }
                return { ...lesson, status: 'locked' }
            })

            return res.status(200).json({
                msg: 'Home obtenida correctamente.', 
                data: {
                    user: { ...user, streak: { ...user.streak, current: getActiveStreak(user.streak) } },
                    levels,
                    lessons: lessonsWithStatus
                }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'No fue posible obtener la home.', data: {} });
        }
    }
}

export default HomeController;