import './LessonBanner.css';
import { useNavigate } from 'react-router-dom';

function LessonBanner({ lesson, progress }) {
    const navigate = useNavigate();
    return (
        <div className='lesson-banner'>
                <div className='lesson-banner--text'>
                    <p>Lección { lesson.order }</p>
                    <h2 className='subtitle'>{ lesson.title }</h2>
                </div>
                <div className='lesson-banner--progress'>
                    <button className='exit-lesson-button' onClick={ () => navigate('/') }>
                        <i className='bi bi-x-lg'></i>
                    </button>
                    <progress value={ progress } max='1' />
                </div>
        </div>
    );
}

export default LessonBanner;
