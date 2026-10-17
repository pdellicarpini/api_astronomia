import Lesson from '../models/lessonModel.js';
import Level from '../models/levelModel.js';

const lessons = [
    {
        title: '¿Qué es la astronomía?',
        description: 'Descubrí qué estudia esta ciencia, en qué se diferencia de la astrología y por qué mirar el cielo cambió la historia de la humanidad.',
        order: '1',
        level: 'Aprendiz del Cielo',
        totalXp: '10',
    },
    {
        title: 'El cielo de día y de noche',
        description: 'Entendé por qué el cielo cambia de color y qué podés ver a simple vista según la hora.',
        order: '2',
        level: 'Aprendiz del Cielo',
        totalXp: '10',
    },
    {
        title: 'Las fases de la Luna',
        description: 'Aprendé por qué la Luna cambia de forma y cómo se repite su ciclo.',
        order: '3',
        level: 'Aprendiz del Cielo',
        totalXp: '10',
    },
    {
        title: 'El Sol, nuestra estrella más cercana',
        description: 'Conocé qué es el Sol, qué energía emite y por qué es clave para la vida en la Tierra.',
        order: '4',
        level: 'Aprendiz del Cielo',
        totalXp: '15',
    },
    {
        title: 'Reconociendo el cielo',
        description: 'Aprendé a identificar patrones en el cielo y cómo distintas culturas los usaron para orientarse.',
        order: '5',
        level: 'Aprendiz del Cielo',
        totalXp: '15',
    },
    {
        title: 'Nuestro hogar: la Tierra',
        description: 'Forma, movimientos de rotación y traslación, estaciones y relación con el Sol.',
        order: '1',
        level: 'Explorador Espacial',
        totalXp: '15',
    }
];

async function seedLessons() {
    for (const lessonData of lessons) { 
        const level = await Level.findOne({ name: lessonData.level });
        if (!level) {
            console.error(`No se encontró el nivel con nombre "${lessonData.level}" para la lección "${lessonData.title}".`);
            continue;
        }

        await Lesson.updateOne(
            { level: level._id, title: lessonData.title },
            { $set: { ...lessonData, level: level._id } },
            { upsert: true }
        );
    }

    console.log('Seed de lecciones completado');
}

export default seedLessons;