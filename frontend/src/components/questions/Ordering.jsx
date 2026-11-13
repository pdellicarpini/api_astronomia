import './Questions.css';
import { useState } from 'react';
import shuffle from '../../utils/shuffle.js';

function Ordering({ question, onAnswer }) {
    const [items] = useState(() => {
        const indexed = question.options.map((text, originalIndex) => ({ text, originalIndex }));
        let mixed = shuffle(indexed);

        // evita que las opciones aparezcan ya ordenadas
        while (indexed.length > 1 && mixed.every((item, i) => item.originalIndex === i)) {
            mixed = shuffle(indexed);
        }
        return mixed;
    });
    const [chosen, setChosen] = useState([]);   // originalIndex en el orden elegido
    const [checked, setChecked] = useState(false);

    function handleToggle(originalIndex) {
        setChosen(prev => prev.includes(originalIndex)
            ? prev.filter(index => index !== originalIndex)
            : [...prev, originalIndex]
        );
    }

    function handleCheck() {
        setChecked(true);
        // la posición correcta de cada elemento es su índice original
        onAnswer(chosen.every((originalIndex, position) => originalIndex === position));
    }

    return (
        <div className='multiple-choice ordering'>
            <h3>{ question.question }</h3>
            <div>
                <ul>
                    { items.map(item => {
                        const position = chosen.indexOf(item.originalIndex);
                        return (
                            <li key={ item.originalIndex }>
                                <button
                                    onClick={ () => handleToggle(item.originalIndex) }
                                    disabled={ checked }
                                    aria-pressed={ position !== -1 }
                                    className='button-option'
                                >
                                    { position !== -1 && <span className='ordering-badge'>{ position + 1 }</span> }
                                    { item.text }
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <button
                    onClick={ handleCheck }
                    disabled={ chosen.length !== items.length || checked }
                    className='main-button'
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Ordering;