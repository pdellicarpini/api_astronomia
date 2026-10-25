import { useState } from 'react';

function LevelsCard({ currentLevel, levels }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='level-card'>
                <div>
                    <p>Nivel { currentLevel.order }</p>
                    <h2>{ currentLevel.name }</h2>
                    <p>1 de 5 lecciones completadas</p>
                </div>

                <button onClick={ () => setIsOpen(!isOpen)}>
                    { isOpen ? 'Volver' : <i class="bi bi-chevron-right"></i> }
                </button>
            </div>
            <div>
                { isOpen && (
                    <ul className='flex-column'>
                        { levels.map(level => (
                            <li key={ level._id } className='level-card flex-column'>
                                <p>Nivel { level.order }</p> 
                                <h2>{ level.name }</h2>
                            </li>
                        )) }
                    </ul>
                )}
            </div>
        </>
    );
}

export default LevelsCard;