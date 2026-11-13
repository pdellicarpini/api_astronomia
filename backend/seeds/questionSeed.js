import fs from 'fs';
import Question from '../models/questionModel.js';
import Lesson from '../models/lessonModel.js';

const questions = JSON.parse(
    fs.readFileSync(new URL('./data/questions.json', import.meta.url), 'utf-8')
);

async function seedQuestions() {
    for (const questionData of questions) {
        const lesson = await Lesson.findOne({ title: questionData.lesson });
        if (!lesson) {
            console.error(`No se encontró la lección con título "${questionData.lesson}" para la pregunta "${questionData.question}".`);
            continue;
        }

        await Question.updateOne(
            { question: questionData.question },
            { $set: { ...questionData, lesson: lesson._id } },
            { upsert: true, runValidators: true }
        );
    }

    const result = await Question.deleteMany({
        question: { $nin: questions.map(q => q.question) }
    });
    console.log(`Preguntas obsoletas eliminadas: ${ result.deletedCount }`);
    
    console.log('Seed de preguntas completado');
}

export default seedQuestions;