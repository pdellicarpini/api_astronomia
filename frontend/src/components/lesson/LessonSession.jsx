import './LessonSession.css';
import QuestionRenderer from './QuestionRenderer';
import FeedbackBar from './FeedbackBar';
import LessonComplete from './LessonComplete';
import useLessonSession from '../../hooks/useLessonSession';
import LessonBanner from './LessonBanner.jsx';
import Loader from '../common/Loader.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { completeLesson } from '../../services/progressService.js';

function LessonSession({ lesson, questions }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [result, setResult] = useState(null);
    const [saveError, setSaveError] = useState('');

    const {
        currentQuestion, progress, lastResult, mistakes, finished, answer, next
    } = useLessonSession(questions);

    useEffect(() => {
        if (!finished) return;
        completeLesson(lesson._id)
            .then(setResult)
            .catch(err => setSaveError(err.message));
    }, [finished, lesson._id]);

    if (finished) {
        if (!result && !saveError) return <Loader text='Guardando tu progreso...' />

        return (
            <main className='lesson-finished'>
                <section className='lesson-complete'>
                    { saveError && <p className='text text-muted'>{ saveError }</p> }
                    <LessonComplete 
                        user={ user.name }
                        lesson={ lesson.order }
                        mistakes={ mistakes }
                        total={ questions.length }
                        xpEarned={ result?.firstCompletion ? lesson.totalXp : 0 }
                        onExit={ () => navigate('/') }
                    />
                </section>
            </main>
        )
    }

    return (
        <main className={ `questions container-animation ${ lastResult !== null ? 'questions--with-feedback' : '' }` }>
            <LessonBanner lesson={ lesson } progress={ progress }/>

            <div className='lesson-question-area'>
                <QuestionRenderer
                    key={ `${ currentQuestion._id }-${ mistakes }` }
                    question={ currentQuestion }
                    onAnswer={ answer }
                />
            </div>

            <FeedbackBar isCorrect={ lastResult } onNext={ next } explanation={ currentQuestion.explanation } />
        </main>
    )
}

export default LessonSession;