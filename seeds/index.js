import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import seedLevels from './levelSeed.js';
import seedLessons from './lessonSeed.js';
import seedQuestions from './questionSeed.js';

const tasks = { 
    levels: seedLevels, 
    lessons: seedLessons, 
    questions: seedQuestions 
};

try {
    await connectDB();
    console.log('Conectado a la base de datos:', mongoose.connection.name);

    const args = process.argv.slice(2);
    const toExecute = args.length > 0 ? args : Object.keys(tasks);

    for (const task of toExecute) {
        await tasks[task]();
    }
} catch (err) {
    console.error('Error al ejecutar los seeds:', err);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos');
}