// variables para cambiar los estilos dependiendo si la card está disponible, completada o bloqueada
const states = {
    completed: { 
        card: 'card',               
        icon: 'bi bi-star-fill',  
        color: 'text-gold',   
        suffix: ' · Completada' },

    current: { 
        card: 'card card--current', 
        icon: 'bi bi-star-half', 
        color: 'text-orange', 
        suffix: ' · En progreso' },

    locked: { 
        card: 'card card--locked',  
        icon: 'bi bi-lock-fill', 
        color: 'text-muted',  
        suffix: '· Bloqueada' },
}

function LessonCard({ lesson, status, previusStatus, isLast, onStart }) {
    const key = status in states ? status : 'current';
    const state = states[key];

    const lockedHint = previusStatus === 'current' ? `Completá la lección ${lesson.order - 1} para desbloquearla` : 'Se desbloquea al completar las lecciones anteriores'

    return (
        <li 
            className={ `step step--${ key }${ isLast ? 'step--last' : '' }` }
            aria-current={ key === 'current' ? 'step' : undefined }
        >
            <div className={ `step__node icon-circle icon-circle--${ key }` }>
                <i className={ state.icon }></i> 
            </div>

            <div className='step__body'>
                { key === 'locked' ? (
                    <>
                        <p className={ `label ${ state.color }` }>Lección { lesson.order }{ state.suffix }</p>
                        <h3 className='title text-soft'>{ lesson.title }</h3>
                        <p className="text text-soft step__hint">{ lockedHint }</p>
                    </>
                ) : (
                    <div className={ `step__card ${ state.card }` }>
                        <div>
                            <p className={ `label ${ state.color }` }>Lección { lesson.order }{ state.suffix }</p>
                            <h3 className='title'>{ lesson.title }</h3>
                        </div>

                        { key === 'current' && <p className='text'>{ lesson.description }</p> }

                        { key === 'completed' && (
                            <button className='outline-button' onClick={ () => onStart(lesson._id) }>
                                <i className='bi bi-arrow-repeat'></i> Repasar
                            </button>
                        )}

                        { key === 'current' && (
                            <button className='main-button button--block' onClick={ () => onStart(lesson._id) }>
                                Comenzar
                            </button>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
}

export default LessonCard;