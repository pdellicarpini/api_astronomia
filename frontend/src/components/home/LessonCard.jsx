// import lessonIcon from '../../assets/lessonIcon.png';

function LessonCard({ lesson, status, onStart }) {
    // estados de la lección
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={ `lesson-card lesson-card--${status}` }>
            <div>
                <div className="lesson-icon">
                    {/* <img src={ lessonIcon } alt="" /> */}
                    <i class="bi bi-journal-bookmark"></i>
                </div>
                <div>
                    <p>Lección { lesson.order }</p>
                    <h3>{ lesson.title }</h3>
                </div>
                
            </div>
            <p>{ lesson.description }</p>
            { isLocked ? (
                <p>Completá la lección anterior para desbloquear esta</p>
            ) : (
                <button onClick={ () => onStart(lesson._id) }>
                    { isCompleted ? 'Completada' : 'Empezar' }
                </button>
            )}
        </div>
    );
}

export default LessonCard;