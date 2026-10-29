import { useParams, useNavigate } from 'react-router-dom';

import QuestionRenderer from '../components/lesson/QuestionRenderer';
import FeedbackBar from '../components/lesson/FeedbackBar';
import LessonComplete from '../components/lesson/LessonComplete';

import useLessonSession from '../hooks/useLessonSession';

import { questions } from '../mocks/questions';
import { lessons } from '../mocks/lessons';
import { currentUser } from '../mocks/users.js';        
// const [isExiting, useIsExiting] = use        

function Lesson() {
    const { id } = useParams();
    const lesson = lessons.find(item => item._id === id);
    const navigate = useNavigate();
    const {
        currentQuestion, progress, lastResult, mistakes, finished, answer, next
    } = useLessonSession(questions);

    if (finished) {
        return (
            <main className="lesson-finished">
                <section className="lesson-complete">
                    <LessonComplete
                        user={currentUser.name}
                        mistakes={mistakes}
                        onExit={() => navigate('/')}
                    />
                </section>
            </main>
        );
    }
    
    return (
        <main className={ `questions 
        ${ lastResult !== null ? 'questions--with-feedback' : '' }` }>
            <div className='lesson-banner'>
                <div className='lesson-banner__text'>
                    <p>Lección {id}</p>
                    <h2>{ lesson?.title }</h2>
                </div>
                <div className='lesson-banner__progress'>
                    <button className='exit-lesson-button' onClick={() => navigate('/')}><i className="bi bi-x-lg"></i></button>
                    <progress value={progress} max="1" />
                </div>
            </div>

            <div className="lesson-question-area">
                <QuestionRenderer
                    key={`${currentQuestion._id}-${mistakes}`}
                    question={currentQuestion}
                    onAnswer={answer}
                />
            </div>

            <FeedbackBar isCorrect={ lastResult } onNext={ next } explanation={ currentQuestion.explanation }/>
        </main>
    );
}

export default Lesson;
