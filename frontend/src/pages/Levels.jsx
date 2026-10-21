import { useEffect, useState } from 'react';
import { getLevels } from '../services/api.js';

function Levels() {
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getLevels()
            .then((data) => {
                console.log('Respuesta:', data);
                setLevels(data.levels);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {levels.map((level) => (
                <li key={level._id}>
                    {level.order}. {level.name}: {level.description}
                </li>
            ))}
        </ul>
    );
}

export default Levels;