import { useState } from 'react';

function MultipleChoice({ question, onAnswer }) {
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);

    function handleCheck() {
        setChecked(true);
        onAnswer(selected === question.correctAnswer);
    }

    return (
        <div className='multiple-choice'>
            <h2>{ question.question }</h2>
            <ul>
                { question.options.map(option => (
                    <li key={ option }>
                        <button
                            onClick={ () => setSelected(option)}
                            disabled={ checked }
                            aria-pressed={ selected === option }
                        >
                            { option }
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={ handleCheck } disabled={ selected === null || checked }>
                Enviar
            </button>
        </div>
    )
}

export default MultipleChoice;