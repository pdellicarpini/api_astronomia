import { useEffect, useState } from 'react';
import { fetchLevels } from '../../services/api.js';

function LevelsCard() {
    const [error, setError] = useState('');
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        async function getLevels() {
            try {
                const result = await fetchLevels();
                setLevels(result.data.levels);
            } catch (error) {
                console.log(error);
                setError('No pudimos obtener los niveles, intente nuevamente.');
            } finally {
                console.log('Hola!');
            }
        } 

        getLevels();
    }, [error]); 

    return (
        <>
                { levels.map (level => (
                    <div key={ level._id } className='levels-card'>
                        <div className='levels-title'>
                            <p>Nivel { level.order }</p>
                            <h2>{ level.name }</h2>
                        </div>
                        <p>2 de 5 lecciones completas</p>
                    </div>))}
                
        </>
    );
}

export default LevelsCard;