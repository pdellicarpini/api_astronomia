import { useParams, useNavigate } from 'react-router-dom';
import QuestionRenderer from '../components/lesson/QuestionRenderer';
import FeedbackBar from '../components/lesson/FeedbackBar';
import LessonComplete from '../components/lesson/LessonComplete';
import useLessonSession from '../hooks/useLessonSession';
import { questions } from '../mocks/questions';
import { lessons } from '../mocks/lessons';

function Lesson() {
    const { id } = useParams();
    const lesson = lessons.find(item => item._id === id);
    const navigate = useNavigate();
    const {
        currentQuestion, progress, lastResult, mistakes, finished, answer, next
    } = useLessonSession(questions);

    if (finished) {
        return <LessonComplete mistakes={mistakes} onExit={() => navigate('/')} />
    }
    
    return (
        <main className='questions'>
            <p>Lección {id}</p>
            <h2>{ lesson?.title }</h2>
            <button onClick={() => navigate('/')}><i className="bi bi-x-lg"></i></button>
            <progress value={progress} max="1" />

            <QuestionRenderer
                key={`${currentQuestion._id}-${mistakes}`}
                question={currentQuestion}
                onAnswer={answer}
            />

            <FeedbackBar isCorrect={lastResult} onNext={next} />
        </main>
    );
}

export default Lesson;
