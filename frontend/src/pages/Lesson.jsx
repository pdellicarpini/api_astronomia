import LessonSession from '../components/lesson/LessonSession';
import Loader from '../components/common/Loader';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonWithQuestions } from '../services/lessonService';

function Lesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setData(null);
        setError('');

        getLessonWithQuestions(id)
            .then(setData)
            .catch(err => setError(err.message));
    }, [id]);

    if (error) {
        return (
            <main className='lesson-finished'>
                <div className='card'>
                    <p className='text'>{ error }</p>
                    <button className='main-button' onClick={() => navigate('/')}>Volver al inicio</button>
                </div>
            </main>
        );
    }

    if (!data) return <Loader text='Cargando lección...' />

    return <LessonSession lesson={ data.lesson } questions={ data.questions } />
}

export default Lesson;
