import { useState } from 'react';

function LevelsCard({ currentLevel, levels, completed, total }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='level-card card'> 
            <div className='level-card__top'>
                <div>
                    <p className='label text-info'>Nivel { currentLevel.order }</p>
                    <h2 className='title title--lg'>{ currentLevel.name }</h2>
                </div>

                <button 
                    className='level-card__toggle'
                    onClick={ () => setIsOpen(!isOpen)}
                    aria-expanded={ isOpen }
                    aria-label={ isOpen ? 'Ocultar niveles' : 'Ver todos los niveles'}
                    >
                    <i className='bi bi-chevron-down'></i>
                </button>
            </div>
            <div className='segments' aria-hidden='true'>
                { Array.from({ length: total }, (_, i) => (
                    <span key={ i } className={ i < completed ? 'is-done' : '' }></span>
                ))}
            </div>
            <p className='label text-soft'>{ completed } de { total } lecciones completadas</p>
            
            { isOpen && (
                <ul className='level-list'>
                    { levels.map(level => {
                        const isCurrent = level._id === currentLevel._id;
                        const isLocked = level.order > currentLevel.order;

                        return (
                            <li 
                                key={ level._id } 
                                className={ `card card--row level-item ${ isLocked ? 'card--locked' : '' } ${ isCurrent ? 'level-item--current' : '' }` }>
                                <div>
                                    <p className='label text-soft'>Nivel { level.order }</p>
                                    <h3 className='title'>{ level.name }</h3>
                                </div>  
                                { isCurrent && <span className='chip'>Estás acá</span> }
                                { isLocked && <i className='bi bi-lock-fill text-muted'></i> }
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    );
}

export default LevelsCard;