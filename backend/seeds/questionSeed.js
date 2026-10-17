import Question from '../models/questionModel.js';
import Lesson from '../models/lessonModel.js';

const questions = [
    {
        question: '¿Qué distingue a la astronomía de la astrología?',
        type: 'multiple-choice',
        options: [
            'La astronomía hace afirmaciones que pueden comprobarse con observaciones; la astrología no.',
            'La astrología estudia planetas y la astronomía solo estrellas.',
            'La astronomía usa telescopios y la astrología solo observa a simple vista.',
            'Son la misma disciplina con distinto nombre.'],
        matchOptions: [],
        correctAnswer: '0',
        explanation: ' “Astronomía” viene del griego astron (astro) y nomos (ley, norma): las normas que rigen los astros. La astrología (astro + logos, “discurso”) no es una ciencia, porque sus predicciones no resisten pruebas controladas.',
        difficulty: 'easy',
        lesson: '¿Qué es la astronomía?',
    },
    {
        question: '“Una teoría científica es solo una idea que todavía no se comprobó.”',
        type: 'true-false',
        options: [],
        matchOptions: [],
        correctAnswer: '1',
        explanation: ' “En ciencia, una teoría es una explicación amplia sostenida por mucha evidencia, como la gravitación o la evolución estelar. “Hipótesis” es la palabra para la idea sin comprobar.',
        difficulty: 'intermediate',
        lesson: '¿Qué es la astronomía?',
    }
];

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
            { upsert: true }
        );
    }

    console.log('Seed de preguntas completado');
}

export default seedQuestions;