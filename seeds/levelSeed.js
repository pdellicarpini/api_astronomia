import Level from '../models/levelModel.js';

const levels = [
    {
        name: 'Aprendiz del Cielo',
        description: 'Iniciate en la astronomía y conocé los conceptos fundamentales del universo.',
        order: 1,
    },
    {
        name: 'Explorador Espacial',
        description: 'Ampliá tus conocimientos y comenzá a explorar los principales cuerpos y fenómenos del espacio.',
        order: 2,
    }
];

async function seedLevels() {
    for (const levelData of levels) {
        await Level.updateOne(
            { name: levelData.name },
            { $set: levelData },
            { upsert: true }
        );
    }
    
    console.log('Seed de niveles completado');
}

export default seedLevels;